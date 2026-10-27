# 소매몰 이용가이드(시작하기)용 목업 캡처 (09SCM-Shop dist -> assets/img/shop/*.webp)
# 사용: python3 tools/capture_shop.py [목업 dist 경로]
# 규격: PC 1440 / 모바일 440, 2배 해상도. 뷰포트 캡처는 높이 900, 긴 입력 화면은 카드 하단까지 캡처.
import io, os, sys
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/superbeanchoi/09scm-shop/dist'
BASE = 'file://' + os.path.join(DIST, 'index.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'shop')
os.makedirs(OUT, exist_ok=True)
DEVICES = (('pc', 1440), ('mobile', 440))

HIDE_NOTICE = """
document.querySelectorAll('.field-message').forEach(function (el) {
  if (el.textContent.indexOf('목업') > -1) el.textContent = '';
});
document.activeElement && document.activeElement.blur();
"""

def open_page(ctx, query):
    page = ctx.new_page()
    page.goto(BASE + query)
    page.wait_for_timeout(700)
    page.evaluate(HIDE_NOTICE)
    return page

def shoot(b, name, query, tall=None, action=None):
    """tall: 카드 선택자 — 지정하면 해당 카드 하단 + 여백까지 캡처하고 고정 요소는 숨김"""
    for dev, w in DEVICES:
        ctx = b.new_context(viewport={'width': w, 'height': 900}, device_scale_factor=2)
        page = open_page(ctx, query)
        if action:
            action(page)
        if tall:
            page.add_style_tag(content='#quickOrderLookup{display:none!important}')
            h = page.evaluate("Math.ceil(document.querySelector('%s').getBoundingClientRect().bottom + window.scrollY)" % tall) + (60 if dev == 'pc' else 24)
            save(page.screenshot(full_page=True, clip={'x': 0, 'y': 0, 'width': w, 'height': h}), '%s-%s' % (name, dev))
        else:
            save(page.screenshot(), '%s-%s' % (name, dev))
        ctx.close()

def franchise_done(page):
    page.evaluate("showFranchiseApplicationModal()")
    page.wait_for_timeout(400)

def lookup(page):
    page.fill('input[inputmode="numeric"]', '7942')
    page.click('button:has-text("조회")')
    page.wait_for_timeout(600)
    page.evaluate("window.scrollTo(0,0)")


import json
DIMS = {}

def save(png, name):
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    DIMS[name] = im.size
    print(name, im.size, round(im.size[0] / im.size[1], 4))

NO_FIXED = '#quickOrderLookup{display:none!important}'
MODAL_BG = '.franchise-modal-backdrop,.franchise-terms-modal-backdrop{background:#f4f4f4!important}'

FIT_CSS = 'html,body,.auth-card,.auth-page,main{background:#fff!important}.auth-card{border:0!important;box-shadow:none!important}'

FIT_JS = """(sels) => {
  let l = 1e9, t = 1e9, r = 0, b = 0;
  const ok = el => { const q = el.getBoundingClientRect(); return q.width > 0 && q.height > 0; };
  sels.forEach(s => document.querySelectorAll(s).forEach(root => {
    root.querySelectorAll('*').forEach(el => {
      const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
      const ctrl = /^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(el.tagName);
      if (!(own || ctrl) || !ok(el)) return;
      if (el.type === 'radio' || el.type === 'checkbox') { const w = el.closest('label') || el; var q = w.getBoundingClientRect(); } else { var q = el.getBoundingClientRect(); }
      l = Math.min(l, q.left + scrollX); t = Math.min(t, q.top + scrollY);
      r = Math.max(r, q.right + scrollX); b = Math.max(b, q.bottom + scrollY);
    });
  }));
  return [l, t, r, b, document.documentElement.scrollWidth, document.documentElement.scrollHeight];
}"""

def snap(b, name, query, steps=None, targets=None, vh=900, margin=16, init=None, css='', devices=DEVICES, clip=None, fit=False):
    """steps(page, dev)로 상태를 만든 뒤 촬영. targets가 있으면 해당 요소들의 합집합 영역만 여백을 두고 크롭, 없으면 뷰포트 전체."""
    for dev, w in devices:
        ctx = b.new_context(viewport={'width': w, 'height': vh}, device_scale_factor=2)
        if init:
            ctx.add_init_script(init)
        page = open_page(ctx, query)
        page.add_style_tag(content=NO_FIXED + css + (FIT_CSS if fit else ''))
        if steps:
            steps(page, dev)
        page.evaluate("document.activeElement && document.activeElement.blur()")
        if clip:
            save(page.screenshot(clip={'x': clip[0], 'y': clip[1], 'width': clip[2], 'height': clip[3]}), '%s-%s' % (name, dev))
        elif targets:
            if fit:
                page.evaluate("""(sels) => {
                  const roots = sels.flatMap(q => [...document.querySelectorAll(q)]);
                  document.querySelectorAll('.auth-card *').forEach(el => {
                    if (roots.some(r => r.contains(el) || el.contains(r))) return;
                    el.style.visibility = 'hidden';
                  });
                }""", targets)
            rect = page.evaluate(FIT_JS if fit else """(sels) => {
              let l = 1e9, t = 1e9, r = 0, b = 0;
              sels.forEach(s => document.querySelectorAll(s).forEach(el => {
                const q = el.getBoundingClientRect();
                l = Math.min(l, q.left + scrollX); t = Math.min(t, q.top + scrollY);
                r = Math.max(r, q.right + scrollX); b = Math.max(b, q.bottom + scrollY);
              }));
              return [l, t, r, b, document.documentElement.scrollWidth, document.documentElement.scrollHeight];
            }""", targets)
            x = max(0, rect[0] - margin); y = max(0, rect[1] - margin)
            x2 = min(rect[4], rect[2] + margin); y2 = min(rect[5], rect[3] + margin)
            png = page.screenshot(full_page=True, clip={'x': x, 'y': y, 'width': x2 - x, 'height': y2 - y})
            if fit:
                # 입력 영역(라벨·입력란·버튼·안내문) 기준으로 사방 동일 여백. 페이지 가장자리에서 모자라는 만큼은 흰 배경으로 채운다
                dl, dt, dr, db = rect[0] - margin, rect[1] - margin, rect[2] + margin, rect[3] + margin
                im = Image.open(io.BytesIO(png)).convert('RGB')
                canvas = Image.new('RGB', (round((dr - dl) * 2), round((db - dt) * 2)), '#ffffff')
                canvas.paste(im, (round((x - dl) * 2), round((y - dt) * 2)))
                buf = io.BytesIO(); canvas.save(buf, 'PNG'); png = buf.getvalue()
            save(png, '%s-%s' % (name, dev))
        else:
            save(page.screenshot(), '%s-%s' % (name, dev))
        ctx.close()

def scroll_to(page, sel, offset=110):
    page.evaluate("""([s, o]) => { const el = document.querySelector(s); window.scrollTo(0, el.getBoundingClientRect().top + scrollY - o); }""", [sel, offset])
    page.wait_for_timeout(150)

def wait_toast(page):
    page.wait_for_timeout(700)

# ---------- 단계 정의 ----------
def phone_dup(page, dev):
    page.fill('#signupPhone', '010-1234-5678')
    page.click('#checkSignupPhone')

def phone_ok(page, dev):
    page.fill('#signupPhone', '010-2345-6789')
    page.click('#checkSignupPhone')

def phone_sent(page, dev):
    phone_ok(page, dev)
    page.click('#sendSignupCode')

def phone_verified(page, dev):
    phone_sent(page, dev)
    page.fill('#signupCode', '123456')
    page.click('#verifySignupCode')

def alias_ok(page, dev):
    page.fill('#aliasCode', '2468')
    page.click('#checkAliasCode')

def alias_dup(page, dev):
    scroll_to(page, '#aliasCode', 200)
    page.fill('#aliasCode', '7942')
    page.click('#checkAliasCode')
    wait_toast(page)

def reset_sent(page, dev):
    page.fill('#resetPhone', '010-2345-6789')
    page.click('#sendResetCode')

def reset_verified(page, dev):
    reset_sent(page, dev)
    page.fill('#resetCode', '123456')
    page.click('#verifyResetCode')

def reset_step2(page, dev):
    reset_verified(page, dev)
    page.click('#resetNext')
    page.wait_for_timeout(200)

def reset_error(page, dev):
    reset_step2(page, dev)
    page.fill('#newPassword', 'password1')
    page.fill('#newPasswordConfirm', 'password2')
    page.click('#newPasswordForm .auth-submit')
    wait_toast(page)

def open_drawer(page, dev):
    page.click('#categoryOpen')
    page.wait_for_timeout(700)

def fr_id_ok(page, dev):
    page.fill('#franchiseUserId', 'onmaeul01')
    page.click('#checkFranchiseUserId')

def fr_phone_verified(page, dev):
    page.fill('#franchisePhone', '010-2345-6789')
    page.click('#sendFranchiseCode')
    page.fill('#franchiseCode', '123456')
    page.click('#verifyFranchiseCode')

def fr_biz_ok(page, dev):
    page.fill('#businessNumber', '1234567890')
    page.click('#verifyBusinessNumber')

def fr_corp(page, dev):
    page.check('input[name=businessType][value=corporation]')

def fr_terms(page, dev):
    page.evaluate("showFranchiseTermsModal('service', document.querySelector('[data-franchise-terms=service]'))")
    page.wait_for_timeout(400)

def fr_error(page, dev):
    page.fill('input[name=memberName]', '홍길동')
    page.fill('input[name=email]', 'owner@example.com')
    page.fill('#franchiseUserId', 'onmaeul01')
    page.fill('#franchisePassword', 'password1')
    page.fill('#franchisePasswordConfirm', 'password1')
    page.fill('#franchisePhone', '010-2345-6789')
    page.fill('#franchiseCode', '123456')
    page.fill('input[name=businessName]', '온마을 상점')
    page.fill('input[name=representativeName]', '홍길동')
    page.fill('#businessNumber', '1234567890')
    page.evaluate("document.querySelector('#businessPostalCode').value='16690'; document.querySelector('#businessAddress').value='경기 수원시 영통구 온마을로 27'")
    page.fill('input[name=businessAddressDetail]', '1층')
    page.check('#franchiseAgreeAll')
    scroll_to(page, '.franchise-form-actions', 420)
    page.click('.franchise-form-actions .primary-button')
    wait_toast(page)

NICK = "sessionStorage.setItem('onmaeul-signup-complete', JSON.stringify({nicknameCode:'1111', chatNickname:'사과맘'}));"
PLAIN = "sessionStorage.setItem('onmaeul-signup-complete', JSON.stringify({nicknameCode:'1111', chatNickname:''}));"


with sync_playwright() as p:
    b = p.chromium.launch()
    # 기본 화면
    shoot(b, 'intro', '')
    shoot(b, 'login', '?view=login')
    shoot(b, 'signup', '?view=signup', tall='.auth-card')
    shoot(b, 'reset', '?view=reset-password')
    shoot(b, 'franchise', '?view=franchise-signup', tall='.auth-card')
    shoot(b, 'gate', '?view=unavailable')
    shoot(b, 'gate-result', '?view=unavailable', action=lookup)

    # 로그인 오류

    # 회원가입 단계
    SEC1 = ['#signupForm > .auth-form-section:nth-of-type(1)']
    snap(b, 'signup-phone-dup', '?view=signup', phone_dup, SEC1, fit=True, margin=32)
    snap(b, 'signup-phone-ok', '?view=signup', phone_ok, SEC1, fit=True, margin=32)
    snap(b, 'signup-phone-sent', '?view=signup', phone_sent, SEC1, fit=True, margin=32)
    snap(b, 'signup-phone-verified', '?view=signup', phone_verified, SEC1, fit=True, margin=32)
    snap(b, 'signup-alias-ok', '?view=signup', alias_ok, ['.auth-field:has(#aliasCode)'], fit=True, margin=32)
    snap(b, 'signup-error', '?view=signup', alias_dup, vh=640)
    snap(b, 'signup-terms', '?view=terms')
    snap(b, 'signup-done', '?view=signup-complete', init=NICK)
    snap(b, 'signup-done-plain', '?view=signup-complete', init=PLAIN)

    # 비밀번호 재설정
    snap(b, 'reset-sent', '?view=reset-password', reset_sent, ['#resetStepOne .auth-form'], fit=True, margin=32)
    snap(b, 'reset-verified', '?view=reset-password', reset_verified, ['#resetStepOne .auth-form'], fit=True, margin=32)
    snap(b, 'reset-step2', '?view=reset-password', reset_step2)
    snap(b, 'reset-error', '?view=reset-password', reset_error, vh=600)

    # 가맹점 가입 신청
    snap(b, 'franchise-entry-bar', '', clip=(0, 0, 1440, 104), devices=(('pc', 1440),))
    snap(b, 'franchise-entry-menu', '', open_drawer)
    snap(b, 'franchise-id-ok', '?view=franchise-signup', fr_id_ok, ['.auth-field:has(#franchiseUserId)'], fit=True, margin=32)
    snap(b, 'franchise-phone-verified', '?view=franchise-signup', fr_phone_verified, ['.auth-field:has(#franchisePhone)', '.auth-field:has(#franchiseCode)'], fit=True, margin=32)
    snap(b, 'franchise-biz-ok', '?view=franchise-signup', fr_biz_ok, ['.auth-field:has(#businessNumber)'], fit=True, margin=32)
    snap(b, 'franchise-corp', '?view=franchise-signup', fr_corp, ['.business-type-field', '.auth-field:has(input[name=businessName])', '.auth-field:has(input[name=representativeName])', '#corporationNumberField', '.auth-field:has(#businessNumber)'], fit=True, margin=32)
    snap(b, 'franchise-terms', '?view=franchise-signup', fr_terms)
    snap(b, 'franchise-done', '?view=franchise-signup', lambda pg, dv: franchise_done(pg))
    snap(b, 'franchise-error', '?view=franchise-signup', fr_error, vh=640)
    b.close()

json.dump({k: list(v) for k, v in DIMS.items()}, open('/tmp/claude-0/shot_dims.json', 'w'))
