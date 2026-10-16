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

# 이름, 계정, 메뉴, 준비 동작, 모드, 클립 인자, PC 뷰포트(너비, 높이), 모바일 뷰포트(너비, 높이)
LIST_PC = (1680, 1500); DET_PC = (1440, 640); DET_MO = (440, 1000)
STEPS = [
    ('fr-list-main', '가맹점 목록', None, 'view', None, LIST_PC, (440, 1200)),
    ('fr-list-wait', '가맹점 목록', tab_status('이용대기'), 'view', None, LIST_PC, (440, 1200)),
    ('fr-list-remote', '가맹점 목록', seq(tab_status('이용승인'), click('[data-franchise-remote]', 0)), 'popup', None, LIST_PC, (440, 1200)),
    ('fr-list-delete', '가맹점 목록', seq(tab_status('이용불가'), click('[data-franchise-delete]', 0)), 'popup', None, LIST_PC, (440, 1200)),
    ('fr-st-wait-unlinked', '가맹점 목록', open_detail('ga01'), 'view', None, DET_PC, DET_MO),
    ('fr-st-wait-linked', '가맹점 목록', seq(open_detail('ga01'), link_payapp()), 'view', None, DET_PC, DET_MO),
    ('fr-st-approved', '가맹점 목록', open_detail('ga03'), 'view', None, DET_PC, DET_MO),
    ('fr-st-restricted-confirm', '가맹점 목록', seq(open_detail('ga03'), click_btn('이용제한')), 'popup', None, DET_PC, DET_MO),
    ('fr-st-restricted-busy', '가맹점 목록', open_detail('ga04'), 'view', None, DET_PC, DET_MO),
    ('fr-st-restricted-free', '가맹점 목록', open_detail('ga05'), 'view', None, DET_PC, DET_MO),
    ('fr-st-blocked', '가맹점 목록', open_detail('ga06'), 'view', None, DET_PC, DET_MO),
]

if __name__ == '__main__':
    only = sys.argv[1:]
    with sync_playwright() as p:
        b = p.chromium.launch()
        for name, menu, prep, mode, clip_text, pc, mo in STEPS:
            if only and not any(o in name for o in only): continue
            for label, (w, h) in (('pc', pc), ('mobile', mo)):
                ctx, page = new_page(b, w, h, 'bonsa')
                goto_franchise(page, menu)
                if prep: prep(page, label)
                page.wait_for_timeout(250)
                png = popup_clip(page) if mode == 'popup' else page.screenshot()
                save(png, '%s-%s' % (name, label))
                ctx.close()
        b.close()
