# 가맹점관리(가맹점 목록·상세 등) 이용가이드 캡처 (mock/partner.html -> assets/img/partner/fr-*.webp)
# 사용: python3 tools/capture_partner_franchise.py [이름 일부 ...]   (인자가 없으면 전체)
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from capture_partner_system import *   # 공통 캡처 도우미(저장·크롭·팝업)

def goto_franchise(page, label):
    page.evaluate("""(label) => {
      const find = t => [...document.querySelectorAll('a,button,li,div,span')].find(e => e.children.length === 0 && e.textContent.trim() === t);
      const g = find('가맹점관리'); g && g.click();
      const m = find(label); m && m.click();
    }""", label)
    page.wait_for_timeout(500)

def open_detail(fid, tab=None):
    def run(p, l):
        p.fill('#franchiseSearchInput', fid); p.click('#franchiseSearchBtn'); p.wait_for_timeout(300)
        p.evaluate("(id) => document.querySelector('[data-franchise-detail=\"' + id + '\"]').click()", fid); p.wait_for_timeout(400)
        if tab: p.locator('[data-franchise-detail-tab="%s"]' % tab).click(); p.wait_for_timeout(300)
    return run

def tab_status(label):
    return lambda p, l: (p.locator('[data-franchise-status-tab]', has_text=label).first.click(), p.wait_for_timeout(300))

def link_payapp():
    def run(p, l):
        p.fill('#fdPayappUserid', 'ga01store'); p.fill('#fdPayappLinkkey', 'AB12CD34EF56'); p.fill('#fdPayappLinkval', 'GH78IJ90KL12')
        p.click('#fdPayappLinkBtn'); p.wait_for_timeout(500)
        p.evaluate("window.scrollTo(0,0)"); p.wait_for_timeout(200)
    return run

def click_btn(text):
    return lambda p, l: (p.locator('button', has_text=text).last.click(), p.wait_for_timeout(300))

# 본사 계정(bonsa) 화면: 이름, 메뉴, 준비 동작, 모드, 클립 인자, PC 뷰포트, 모바일 뷰포트(None이면 PC만 캡처 — 팝업(알럿)은 PC만)
LIST_PC = (1680, 1500); DET_PC = (1440, 640); DET_MO = (440, 1000)
STEPS = [
    ('fr-list-main', '가맹점 목록', None, 'view', None, LIST_PC, (440, 1200)),
    ('fr-list-remote', '가맹점 목록', seq(tab_status('이용승인'), click('[data-franchise-remote]', 0)), 'popup', None, LIST_PC, None),
    ('fr-list-delete', '가맹점 목록', seq(tab_status('이용불가'), click('[data-franchise-delete]', 0)), 'popup', None, LIST_PC, None),
    ('fr-st-approved', '가맹점 목록', open_detail('ga03'), 'view', None, DET_PC, DET_MO),
    ('fr-st-restricted-confirm', '가맹점 목록', seq(open_detail('ga03'), click_btn('이용제한')), 'popup', None, DET_PC, None),
]

# 가맹점 계정으로 로그인했을 때 보이는 화면(이용상태별): 이름, 계정, 모바일 동작, 모드
MEMBER_PC = (1440, 760); MEMBER_MO = (440, 900)
def open_drawer(p, l):
    if l == 'mobile': p.click('#menuBtn'); p.wait_for_timeout(400)
MEMBER_STEPS = [
    ('fr-st-wait', 'ga01', open_drawer),
    ('fr-st-approved-user', 'ga02', None),
    ('fr-st-restricted', 'ga05', None),
]

def shot_login_blocked(b, name, acct):
    for label, (w, h) in (('pc', MEMBER_PC), ('mobile', MEMBER_MO)):
        ctx = b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2)
        page = ctx.new_page(); page.goto(URL); page.wait_for_timeout(400)
        page.fill('#loginIdInput', acct); page.fill('#loginPwInput', PW)
        page.click('#loginSubmitBtn'); page.wait_for_timeout(600)
        save(page.screenshot(), '%s-%s' % (name, label)); ctx.close()

if __name__ == '__main__':
    only = sys.argv[1:]
    with sync_playwright() as p:
        b = p.chromium.launch()
        for name, menu, prep, mode, clip_text, pc, mo in STEPS:
            if only and not any(o in name for o in only): continue
            for label, size in (('pc', pc), ('mobile', mo)):
                if size is None: continue
                w, h = size
                ctx, page = new_page(b, w, h, 'bonsa')
                goto_franchise(page, menu)
                if prep: prep(page, label)
                page.wait_for_timeout(250)
                png = popup_clip(page) if mode == 'popup' else page.screenshot()
                save(png, '%s-%s' % (name, label))
                ctx.close()
        for name, acct, prep in MEMBER_STEPS:
            if only and not any(o in name for o in only): continue
            for label, (w, h) in (('pc', MEMBER_PC), ('mobile', MEMBER_MO)):
                ctx = b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2)
                page = ctx.new_page(); page.goto(URL); page.wait_for_timeout(400)
                page.fill('#loginIdInput', acct); page.fill('#loginPwInput', PW)
                page.click('#loginSubmitBtn'); page.wait_for_timeout(900)
                if prep: prep(page, label)
                page.wait_for_timeout(250)
                save(page.screenshot(), '%s-%s' % (name, label)); ctx.close()
        if not only or any(o in 'fr-st-blocked' for o in only):
            shot_login_blocked(b, 'fr-st-blocked', 'ga06')
        b.close()
