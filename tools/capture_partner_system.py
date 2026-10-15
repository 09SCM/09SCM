# 시스템관리(공지사항·이용료관리·회원정보·알림설정) 이용가이드 캡처 (mock/partner.html -> assets/img/partner/sys-*.webp)
# 사용: python3 tools/capture_partner_system.py [이름 일부 ...]   (인자가 없으면 전체)
import io, os, sys
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(ROOT, 'mock', 'partner.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'partner')
HIDE_LNB = ':root{--lnb-w:0px!important}.lnb{display:none!important}'
PW = 'a1234'

def save(png, name):
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    print(name, im.size, 'ratio %d / %d' % im.size)

def goto_menu(page, label):
    page.evaluate("""(label) => {
      const find = t => [...document.querySelectorAll('a,button,li,div,span')].find(e => e.children.length === 0 && e.textContent.trim() === t);
      const c = find('시스템관리'); c && c.click();
      const m = find(label); m && m.click();
    }""", label)
    page.wait_for_timeout(500)

def new_page(b, w, h, acct):
    ctx = b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2)
    page = ctx.new_page(); page.goto(URL); page.wait_for_timeout(400)
    page.fill('#loginIdInput', acct); page.fill('#loginPwInput', PW)
    page.click('#loginSubmitBtn'); page.wait_for_timeout(800)
    if w > 860: page.add_style_tag(content=HIDE_LNB)
    return ctx, page

def fit(page, w):
    height = page.evaluate('document.documentElement.scrollHeight')
    page.set_viewport_size({'width': w, 'height': height}); page.wait_for_timeout(300)

def card_clip(page, w, text):
    """제목 텍스트가 text인 카드·섹션 하나를 잘라낸다"""
    r = page.evaluate("""(text) => {
      const h = [...document.querySelectorAll('h2,h3')].find(e => e.textContent.trim() === text);
      const box = h && (h.closest('.card') || h.closest('.form-section') || h.parentElement);
      if (!box) return null;
      box.scrollIntoView({block: 'start'}); window.scrollBy(0, -16);
      const r = box.getBoundingClientRect();
      return {x: Math.max(r.left, 0), y: Math.max(r.top, 0), w: r.width, h: r.height};
    }""", text)
    page.wait_for_timeout(200)
    return page.screenshot(clip={'x': r['x'], 'y': r['y'], 'width': r['w'], 'height': r['h']}, full_page=True)

def shot(b, name, acct, menu, prep=None, mode='view', clip_text=None):
    for label, w, h in (('pc', 1440, 1500), ('mobile', 440, 1200)):
        ctx, page = new_page(b, w, h, acct)
        goto_menu(page, menu)
        if prep: prep(page, label)
        page.wait_for_timeout(250)
        if mode == 'full':
            fit(page, w); png = page.screenshot()
        elif mode == 'clip':
            png = card_clip(page, w, clip_text)
        else:
            png = page.screenshot()
        save(png, '%s-%s' % (name, label))
        ctx.close()

def click(sel, idx=0):
    return lambda p, l: (p.locator(sel).nth(idx).click(), p.wait_for_timeout(300))

def seq(*fns):
    def run(p, l):
        for f in fns: f(p, l)
    return run

def clear(sel):
    return lambda p, l: (p.fill(sel, ''), p.wait_for_timeout(100))

def click_text(text):
    return lambda p, l: (p.get_by_text(text, exact=True).first.click(), p.wait_for_timeout(300))

def focus_text(text):
    return lambda p, l: (p.evaluate("""(t) => { const h = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && e.textContent.trim() === t);
      h.scrollIntoView({block: 'start'}); window.scrollBy(0, -120); }""", text), p.wait_for_timeout(200))

def fill(sel, val):
    return lambda p, l: (p.fill(sel, val), p.wait_for_timeout(100))

def focus(sel):
    return lambda p, l: (p.evaluate("(s) => { const e = document.querySelector(s); e.scrollIntoView({block: 'start'}); window.scrollBy(0, -80); }", sel), p.wait_for_timeout(200))

def focus_title(text):
    return lambda p, l: (p.evaluate("""(t) => { const h = [...document.querySelectorAll('h2,h3')].find(e => e.textContent.trim() === t);
      h.scrollIntoView({block: 'start'}); window.scrollBy(0, -80); }""", text), p.wait_for_timeout(200))

STEPS = [
    # 공지사항
    ('sys-notice-list', 'ga02', '공지사항', None, 'view', None),
    ('sys-notice-tab', 'ga02', '공지사항', click('[data-notice-tab="hq"]'), 'view', None),
    ('sys-notice-detail', 'ga02', '공지사항', click('[data-notice-view]'), 'view', None),
    # 이용료관리
    ('sys-fee-main', 'ga02', '이용료관리', None, 'view', None),
    ('sys-fee-card', 'ga01', '이용료관리', None, 'view', None),
    ('sys-fee-history', 'ga02', '이용료관리', None, 'clip', '결제 내역'),
    # 회원정보
    ('sys-member-main', 'ga02', '회원정보', None, 'view', None),
    ('sys-member-phone', 'ga02', '회원정보', seq(fill('#memberPhone', '010-9999-0000'), click('#memberPhoneAuthSendBtn')), 'view', None),
    ('sys-member-pw', 'ga02', '회원정보', seq(fill('#memberNewPw', 'b1234'), fill('#memberNewPwConfirm', 'b12345'), click('#savePwBtn'), focus_title('비밀번호 변경')), 'view', None),
    ('sys-member-account', 'ga02', '회원정보', seq(clear('#bankAccountNumber'), clear('#bankAccountHolder'), click('#saveBankAccountBtn'), focus_title('계좌정보')), 'view', None),
    ('sys-member-payapp', 'ga01', '회원정보', focus_title('PayApp 연동 정보'), 'view', None),
    ('sys-member-terms', 'ga02', '회원정보', seq(focus_title('이용약관 동의'), click('[data-terms-view]')), 'view', None),
    # 알림설정
    ('sys-noti-main', 'bonsa', '알림설정', None, 'view', None),
    ('sys-noti-low', 'ga03', '알림설정', click('#notiMasterToggle'), 'view', None),
    ('sys-noti-history', 'bonsa', '알림설정', seq(focus_title('발송내역')), 'view', None),
    ('sys-noti-system', 'bonsa', '알림설정', click('[data-noti-tab="wholesale"]'), 'view', None),
    ('sys-noti-push', 'bonsa', '알림설정', seq(click('[data-noti-tab="wholesale"]'), click_text('허용 방법 보기')), 'view', None),
    ('sys-noti-category', 'bonsa', '알림설정', seq(click('[data-noti-tab="wholesale"]'), click('[data-noti-category-toggle]', 2), focus_text('소매 알림')), 'view', None),
    ('sys-center', 'bonsa', '알림설정', click('#notificationCenterBtn'), 'view', None),
    ('sys-center-empty', 'bonsa', '알림설정', seq(click('#notificationCenterBtn'), click_text('모두 확인')), 'view', None),
]

if __name__ == '__main__':
    only = sys.argv[1:]
    with sync_playwright() as p:
        b = p.chromium.launch()
        for name, acct, menu, prep, mode, clip_text in STEPS:
            if only and not any(o in name for o in only): continue
            shot(b, name, acct, menu, prep, mode, clip_text)
        b.close()
