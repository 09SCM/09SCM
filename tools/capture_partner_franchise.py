# 가맹점관리(가맹점 목록·상세 등) 이용가이드 캡처 (mock/partner.html -> assets/img/partner/fr-*.webp)
# 사용: python3 tools/capture_partner_franchise.py [이름 일부 ...]   (인자가 없으면 전체)
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from capture_partner_system import *   # 공통 캡처 도우미(저장·크롭·팝업)
from capture_partner_system import _doc_clip

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
    # 본사 시점 상태별 화면(하단 고정 바 포함)
    ('fr-st-b-wait', '가맹점 목록', open_detail('ga01'), 'view', None, DET_PC, DET_MO),
    ('fr-st-b-restricted', '가맹점 목록', open_detail('ga04'), 'view', None, DET_PC, DET_MO),
    ('fr-st-b-blocked', '가맹점 목록', open_detail('ga06'), 'view', None, DET_PC, DET_MO),
]


def hide_bar(p, l):
    p.add_style_tag(content='.market-buybar{display:none!important}'); p.wait_for_timeout(100)

def do(fn):
    return lambda p, l: (fn(p), p.wait_for_timeout(300))

FEE_CUSTOM = "() => [document.querySelector('#fdFeeCustomToggle').closest('.form-grid'), document.querySelector('#fdSaveFeeBtn').parentElement]"
def SEC(t):
    return "() => { const h = [...document.querySelectorAll('h3')].find(e => e.textContent.trim() === '%s'); const s = h.closest('.form-section'); return [s, s]; }" % t
TAB_RANGE = "() => { const t = document.querySelector('[data-franchise-detail-tab]').parentElement; const s = [...document.querySelectorAll('.form-section')]; return [t, s[s.length - 1]]; }"
DET_FULL = (1440, 1500); DET_FULL_MO = (440, 1200)
TAB_STEPS = [
    ('fr-d-main', open_detail('ga04'), 'view', None, (1440, 900), (440, 900)),
    ('fr-d-tab-member', seq(open_detail('ga04'), hide_bar), 'custom', TAB_RANGE, (1440, 2400), (440, 3600)),
    ('fr-d-tab-fee', seq(open_detail('ga04', 'fee'), hide_bar), 'custom', TAB_RANGE, DET_FULL, DET_FULL_MO),
    ('fr-d-tab-memo', seq(open_detail('ga04', 'memo'), hide_bar), 'custom', TAB_RANGE, DET_FULL, DET_FULL_MO),
    ('fr-d-error', seq(open_detail('ga03'), hide_bar, fill('#fdManagerName', ''), fill('#fdBizRegNo', '123-45-67890'), click('#fdSaveMemberBtn')), 'between', ('회원 정보', '비밀번호 변경'), DET_FULL, DET_FULL_MO),
    ('fr-d-corp', seq(open_detail('ga03'), hide_bar, do(lambda p: p.select_option('#fdBizPersonType', 'corp'))), 'between', ('사업자 정보', 'PayApp 연동 정보'), DET_FULL, DET_FULL_MO),
    ('fr-d-payapp-unlinked', seq(open_detail('ga01'), hide_bar), 'between', ('PayApp 연동 정보', '이용약관 동의'), DET_FULL, DET_FULL_MO),
    ('fr-d-payapp-linked', seq(open_detail('ga03'), hide_bar), 'between', ('PayApp 연동 정보', '이용약관 동의'), DET_FULL, DET_FULL_MO),
    ('fr-d-fee-custom', seq(open_detail('ga03', 'fee'), hide_bar, click('#fdFeeCustomToggle'), click('#fdSaveFeeBtn')), 'custom', FEE_CUSTOM, DET_FULL, DET_FULL_MO),
    ('fr-d-pay-reg', seq(open_detail('ga04', 'fee'), hide_bar), 'custom', SEC('결제 정보'), DET_FULL, DET_FULL_MO),
    ('fr-d-pay-none', seq(open_detail('ga01', 'fee'), hide_bar), 'custom', SEC('결제 정보'), DET_FULL, DET_FULL_MO),
    ('fr-d-memo', seq(open_detail('ga04', 'memo'), hide_bar), 'custom', SEC('내부 메모'), DET_FULL, DET_FULL_MO),
]

# 가맹점 계정으로 로그인했을 때 보이는 화면(이용상태별): 이름, 계정, 모바일 동작, 모드
MEMBER_PC = (1440, 760); MEMBER_MO = (440, 900)
def open_drawer(p, l):
    if l == 'mobile': p.click('#menuBtn'); p.wait_for_timeout(400)
def goto_menu(group, label):
    def run(p, l):
        if l == 'mobile': p.click('#menuBtn'); p.wait_for_timeout(400)
        p.evaluate("""([g, t]) => {
          const find = x => [...document.querySelectorAll('a,button,li,div,span')].find(e => e.children.length === 0 && e.textContent.trim() === x);
          const a = find(g); a && a.click();
          const b = find(t); b && b.click();
        }""", [group, label])
        p.wait_for_timeout(600)
    return run
MEMBER_STEPS = [
    ('fr-st-restricted-supply', 'ga04', goto_menu('도매관리', '내 도매상품')),
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
        for name, prep, mode, clip_text, pc, mo in TAB_STEPS:
            if only and not any(o in name for o in only): continue
            for label, (w, h) in (('pc', pc), ('mobile', mo)):
                ctx, page = new_page(b, w, h, 'bonsa')
                goto_franchise(page, '가맹점 목록')
                prep(page, label)
                page.wait_for_timeout(250)
                if mode == 'between': png = between_clip(page, clip_text[0], clip_text[1])
                elif mode == 'clip': png = card_clip(page, w, clip_text)
                elif mode == 'custom': png = _doc_clip(page, clip_text)
                else: png = page.screenshot()
                save(png, '%s-%s' % (name, label)); ctx.close()
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
