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

def _doc_clip(page, js, arg=None):
    """js는 [시작요소, 끝요소]를 돌려준다. 문서 좌표 기준으로 두 요소 사이를 세로로 잘라낸다(맨 위로 스크롤한 상태에서 계산)"""
    page.evaluate("window.scrollTo(0, 0)"); page.wait_for_timeout(150)
    r = page.evaluate("""([js, arg]) => {
      const [a, b] = (0, eval)(js)(arg);
      const r1 = a.getBoundingClientRect(), r2 = b.getBoundingClientRect();
      const pv = a.previousElementSibling, nx = b.nextElementSibling;
      // 섹션 사이 공백의 절반씩만 여유로 포함(이웃 섹션 제목이 보이지 않도록), 이웃이 없으면 24px
      const half = (gap) => Math.min(Math.max(gap, 0) / 2, 24);
      const up = pv ? half(r1.top - pv.getBoundingClientRect().bottom) : 24;
      const down = nx ? half(nx.getBoundingClientRect().top - r2.bottom) : 24;
      const top = Math.max(r1.top - up, 61);   // 상단 바(61px)는 제외
      return {x: 0, y: top, w: innerWidth, h: r2.bottom + down - top};   // 가로는 LNB만 숨기고 전체 폭
    }""", [js, arg])
    return page.screenshot(clip={'x': r['x'], 'y': r['y'], 'width': r['w'], 'height': r['h']}, full_page=True)

HEAD = "(t) => [...document.querySelectorAll('h2,h3')].find(e => e.textContent.trim() === t)"

def card_clip(page, w, text):
    """제목이 text인 카드·섹션 하나를 잘라낸다"""
    return _doc_clip(page, "(t) => { const h = (%s)(t); const box = h.closest('.card') || h.closest('.form-section') || h.parentElement; return [box, box]; }" % HEAD, text)

def between_clip(page, start, end):
    """제목 start부터 제목 end 직전까지 세로로 잘라낸다(같은 카드 안의 연속 영역)"""
    js = "([s, e]) => { const h1 = (%s)(s), h2 = (%s)(e); const sec1 = h1.closest('.form-section') || h1, sec2 = h2.closest('.form-section') || h2; return [sec1, sec2.previousElementSibling || sec1]; }" % (HEAD, HEAD)
    return _doc_clip(page, js, [start, end])

def section_range(page, first, last):
    """form-section 제목이 first인 섹션부터 last인 섹션까지 (first가 '#card'면 첫 잔여 현황 카드부터)"""
    js = """([f, l]) => {
      const secs = [...document.querySelectorAll('section.form-section')];
      const by = t => secs.find(e => e.textContent.trim().startsWith(t));
      const a = f === '#card' ? document.querySelector('#contentWrapper .col-6.card') : by(f);
      return [a, by(l)];
    }"""
    return _doc_clip(page, "(arg) => (" + js + ")", [first, last]) if False else _doc_clip(page, js, [first, last])

def popup_clip(page, pad=24):
    """열려 있는 팝업(.modal-box)을 주변 딤 영역 pad만큼 포함해 잘라낸다(고정 레이어라 현재 화면 좌표 사용)"""
    page.wait_for_timeout(200)
    r = page.evaluate("""(pad) => {
      const m = [...document.querySelectorAll('.modal-box')].pop(); const r = m.getBoundingClientRect();
      const x = Math.max(r.left - pad, 0), y = Math.max(r.top - pad, 0);
      return {x, y, w: Math.min(r.right + pad, innerWidth) - x, h: Math.min(r.bottom + pad, innerHeight) - y};
    }""", pad)
    return page.screenshot(clip={'x': r['x'], 'y': r['y'], 'width': r['w'], 'height': r['h']})

def shot(b, name, acct, menu, prep=None, mode='view', clip_text=None):
    for label, w, h in (('pc', 1440, 1500), ('mobile', 440, 1200)):
        if name == 'sys-notice-detail': w, h = (1440, 900) if label == 'pc' else (440, 1000)
        ctx, page = new_page(b, w, h, acct)
        goto_menu(page, menu)
        if prep: prep(page, label)
        page.wait_for_timeout(250)
        if mode == 'full':
            fit(page, w); png = page.screenshot()
        elif mode == 'clip':
            png = card_clip(page, w, clip_text)
        elif mode == 'between':
            png = between_clip(page, clip_text[0], clip_text[1])
        elif mode == 'sections':
            png = section_range(page, clip_text[0], clip_text[1])
        elif mode == 'popup':
            png = popup_clip(page)
        elif mode == 'card':
            png = _doc_clip(page, "() => { const c = document.querySelector('#contentWrapper .card'); return [c, c]; }")
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
    ('sys-notice-tab', 'ga02', '공지사항', click('[data-notice-tab="hq"]'), 'card', None),
    ('sys-notice-detail', 'ga02', '공지사항', click('[data-notice-view]'), 'view', None),
    # 이용료관리
    ('sys-fee-main', 'ga02', '이용료관리', None, 'view', None),
    ('sys-fee-card', 'ga01', '이용료관리', None, 'between', ('결제 정보', '결제 내역')),
    ('sys-fee-history', 'ga02', '이용료관리', None, 'clip', '결제 내역'),
    # 회원정보
    ('sys-member-main', 'ga02', '회원정보', None, 'view', None),
    ('sys-member-phone', 'ga02', '회원정보', seq(fill('#memberPhone', '010-9999-0000'), click('#memberPhoneAuthSendBtn')), 'between', ('회원 정보', '비밀번호 변경')),
    ('sys-member-pw', 'ga02', '회원정보', seq(fill('#memberNewPw', 'b1234'), fill('#memberNewPwConfirm', 'b12345'), click('#savePwBtn')), 'between', ('비밀번호 변경', '사업자 정보')),
    ('sys-member-corp', 'bonsa', '회원정보', None, 'between', ('사업자 정보', '계좌정보')),
    ('sys-member-account', 'ga02', '회원정보', seq(clear('#bankAccountNumber'), clear('#bankAccountHolder'), click('#saveBankAccountBtn')), 'between', ('계좌정보', 'PayApp 연동 정보')),
    ('sys-member-payapp', 'ga01', '회원정보', None, 'between', ('PayApp 연동 정보', '이용약관 동의')),
    ('sys-member-terms', 'ga02', '회원정보', click('[data-terms-view]', 2), 'popup', None),
    # 알림설정
    ('sys-noti-main', 'bonsa', '알림설정', None, 'view', None),
    ('sys-noti-low', 'ga03', '알림설정', click('#notiMasterToggle'), 'sections', ('#card', '알림톡 사용하기')),
    ('sys-noti-history', 'bonsa', '알림설정', None, 'sections', ('발송내역', '발송내역')),
    ('sys-noti-system', 'bonsa', '알림설정', click('[data-noti-tab="wholesale"]'), 'view', None),
    ('sys-noti-push', 'bonsa', '알림설정', seq(click('[data-noti-tab="wholesale"]'), click_text('허용 방법 보기')), 'popup', None),
    ('sys-noti-category', 'bonsa', '알림설정', seq(click('[data-noti-tab="wholesale"]'), click('[data-noti-category-toggle]', 2)), 'sections', ('도매판매 알림', '시스템 알림')),
    ('sys-center', 'bonsa', '알림설정', click('#notificationCenterBtn'), 'popup', None),
    ('sys-center-empty', 'bonsa', '알림설정', seq(click('#notificationCenterBtn'), click_text('모두 확인')), 'popup', None),
]

if __name__ == '__main__':
    only = sys.argv[1:]
    with sync_playwright() as p:
        b = p.chromium.launch()
        for name, acct, menu, prep, mode, clip_text in STEPS:
            if only and not any(o in name for o in only): continue
            shot(b, name, acct, menu, prep, mode, clip_text)
        b.close()
