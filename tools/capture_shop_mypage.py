# 소매몰 이용가이드(마이페이지 > 내정보·배달지관리·회원탈퇴)용 목업 캡처 (09SCM-Shop dist -> assets/img/shop/*.webp)
# 사용: python3 tools/capture_shop_mypage.py [목업 dist 경로]   ONLY=이름,이름 이면 해당 캡처만 다시 촬영
# 규격: PC 1440 / 모바일 440, 2배 해상도. 대표 화면은 문서 높이 전체, 안내 토스트는 PC 1440x480 / 모바일 440x480(입력 오류 토스트와 같은 규격).
import io, os, sys, json
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/superbeanchoi/09scm-shop/dist'
BASE = 'file://' + os.path.join(DIST, 'index.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'shop')
DEVICES = (('pc', 1440), ('mobile', 440))
DIMS = {}
NO_FIXED = '#quickOrderLookup{display:none!important} .toast{transition:none!important}'
L = "localStorage.setItem('onmaeul-login', JSON.stringify({phone:'01012345678', name:'홍길동'}));"          # 진행 중인 주문이 있는 회원
NEW = "localStorage.setItem('onmaeul-login', JSON.stringify({phone:'01012341234', name:'신규회원'}));"       # 주문이 없는 회원
NO_REDIRECT = "(() => { const st = window.setTimeout; window.setTimeout = function (f, t) { if ((t === 500 || t === 600) && String(f).indexOf('location.href') > -1) return 0; return st.apply(window, arguments); }; })();"

def save(png, name):
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    DIMS[name] = im.size
    print(name, im.size)

def fit_full(page, dev):
    page.wait_for_timeout(300)
    w = 1440 if dev == 'pc' else 440
    for _ in range(2):
        h = page.evaluate("document.documentElement.scrollHeight")
        page.set_viewport_size({'width': w, 'height': h})
        page.wait_for_timeout(400)

def settle(page):
    page.wait_for_timeout(500)

def snap(b, name, query, init, steps=None, vh=900, area=None, margin=16):
    """area: 해당 요소 하나를 여백(margin)을 두고 크롭(가로는 화면 폭 전체)"""
    if os.environ.get('ONLY') and name not in os.environ['ONLY'].split(','):
        return
    for dev, w in DEVICES:
        ctx = b.new_context(viewport={'width': w, 'height': vh}, device_scale_factor=2)
        ctx.add_init_script(init)
        page = ctx.new_page()
        page.goto(BASE + query); page.wait_for_timeout(700)
        page.add_style_tag(content=NO_FIXED)
        if steps:
            steps(page, dev)
        page.evaluate("document.activeElement && document.activeElement.blur()")
        if area:
            r = page.evaluate("(s) => { const q = document.querySelector(s).getBoundingClientRect(); return [q.top + scrollY, q.bottom + scrollY, q.left, q.right]; }", area)
            h = page.evaluate("document.documentElement.scrollHeight")
            y, y2 = max(0, r[0] - margin), min(h, r[1] + margin)
            save(page.screenshot(full_page=True, clip={'x': max(0, r[2] - margin), 'y': y, 'width': min(w, r[3] + margin) - max(0, r[2] - margin), 'height': y2 - y}), '%s-%s' % (name, dev))
        else:
            save(page.screenshot(), '%s-%s' % (name, dev))
        ctx.close()

def to_bottom(sel):
    return "document.querySelector('%s').scrollIntoView({block: 'center'})" % sel

# ---------- 단계 ----------
def code_ok(page, dev):
    page.fill('#myNicknameCode', '2468'); page.click('#checkMyNickname'); page.wait_for_timeout(300)

def info_saved(page, dev):
    page.fill('input[name=chatNickname]', '산책러')
    page.evaluate(to_bottom('#myInfoForm .mypage-actions'))
    page.click('#myInfoForm button[type=submit]'); settle(page)

def info_nocheck(page, dev):
    page.fill('#myNicknameCode', '2468')
    page.evaluate(to_bottom('#myInfoForm .mypage-actions'))
    page.click('#myInfoForm button[type=submit]'); settle(page)

def address_saved(page, dev):
    page.evaluate(to_bottom('#deliveryAddressForm .mypage-actions'))
    page.click('#deliveryAddressForm button[type=submit]'); settle(page)

def address_empty(page, dev):
    page.fill('input[name=address]', '')
    page.evaluate(to_bottom('#deliveryAddressForm .mypage-actions'))
    page.click('#deliveryAddressForm button[type=submit]'); settle(page)

def withdraw_error(page, dev):
    page.fill('input[name=password]', 'wrongpass1')
    page.evaluate("document.querySelector('input[name=agreeWithdrawal]').click()")
    page.evaluate(to_bottom('#withdrawalForm .mypage-actions'))
    page.click('#withdrawalForm button[type=submit]'); settle(page)

def withdraw_done(page, dev):
    page.fill('input[name=password]', 'demo1234')
    page.evaluate("document.querySelector('input[name=agreeWithdrawal]').click()")
    page.evaluate(to_bottom('#withdrawalForm .mypage-actions'))
    page.click('#withdrawalForm button[type=submit]'); settle(page)

with sync_playwright() as p:
    b = p.chromium.launch()
    snap(b, 'mypage-info-main', '?view=my-info', L, steps=fit_full)
    snap(b, 'mypage-info-code', '?view=my-info', L, steps=code_ok, area='.mypage-panel:nth-of-type(2)')
    snap(b, 'mypage-info-saved-toast', '?view=my-info', L, steps=info_saved, vh=480)
    snap(b, 'mypage-info-error-toast', '?view=my-info', L, steps=info_nocheck, vh=480)
    snap(b, 'mypage-address-main', '?view=delivery-address', L, steps=fit_full)
    snap(b, 'mypage-address-saved-toast', '?view=delivery-address', L, steps=address_saved, vh=480)
    snap(b, 'mypage-address-error-toast', '?view=delivery-address', L, steps=address_empty, vh=480)
    snap(b, 'mypage-withdraw-main', '?view=withdrawal', NEW, steps=fit_full)
    snap(b, 'mypage-withdraw-blocked', '?view=withdrawal', L, steps=fit_full)
    snap(b, 'mypage-withdraw-error-toast', '?view=withdrawal', NEW, steps=withdraw_error, vh=480)
    snap(b, 'mypage-withdraw-done-toast', '?view=withdrawal', NEW + NO_REDIRECT, steps=withdraw_done, vh=480)
    b.close()
print(json.dumps({k: list(v) for k, v in DIMS.items()}))
