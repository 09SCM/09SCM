# 이용가이드 "한 영역만 달라지는 케이스" 섹션 크롭 캡처 — 가맹점관리(통합매출조회·공지사항)·시스템관리(공지사항·알림설정)
# 사용: python3 tools/capture_partner_case_sections_fs.py   (ONLY=이름,이름 으로 일부만 저장)
# 규격: capture_partner_case_sections.py와 동일(상하좌우 16px 여백, 모바일은 화면 폭 전체, 2배 해상도)
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
import capture_partner_system as S
import capture_partner_case_sections as C
from capture_partner_franchise import goto_franchise

shot = C.shot
Q = lambda sel, i=0: "document.querySelectorAll(%r)[%d]" % (sel, i)
SECS = "[...document.querySelectorAll('.form-section')]"
SEC_STARTS = lambda t: SECS + ".find(s => s.innerText.trim().startsWith(%r))" % t
FIELD_STARTS = lambda t: "[...document.querySelectorAll('.form-field')].find(f => f.innerText.trim().startsWith(%r))" % t

def page_for(b, device, acct='bonsa1'):
    pc = device == 'pc'
    ctx, page = S.new_page(b, 1440 if pc else 440, 1500 if pc else 1200, acct)
    return ctx, page

def run(device, b):
    sfx = '-' + device

    # ---------- 가맹점관리 > 통합매출조회 > 전체 현황 ----------
    def sales(prep):
        ctx, page = page_for(b, device); goto_franchise(page, '통합매출조회'); prep(page); page.wait_for_timeout(400); return ctx, page
    top_rows = [Q('.tab-row-sub', 0), Q('.tab-row-sub', 1)]
    cards = Q('.form-section', 0)
    ctx, page = sales(lambda p: p.click('[data-fs-scope="franchise"]'))
    shot(page, 'frm-sales-franchise' + sfx, [Q('.tab-row-sub', 2), cards]); ctx.close()
    ctx, page = sales(lambda p: p.click('[data-fs-trade="retail"]'))
    shot(page, 'frm-sales-trade' + sfx, [Q('.tab-row-sub', 1), cards]); ctx.close()
    ctx, page = sales(lambda p: p.click('[data-fs-period="custom"]'))
    shot(page, 'frm-sales-custom' + sfx, top_rows + [cards]); ctx.close()
    ctx, page = sales(lambda p: p.click('[data-fs-trend-mode="monthly"]'))
    shot(page, 'frm-sales-monthly' + sfx, [Q('.form-section', 1)]); ctx.close()
    ctx, page = sales(lambda p: p.click('[data-fs-period="today"]'))
    shot(page, 'frm-sales-today' + sfx, [cards, Q('.form-section', 1)]); ctx.close()

    # ---------- 가맹점관리 > 공지사항 ----------
    def notice(prep):
        ctx, page = page_for(b, device); goto_franchise(page, '공지사항'); prep(page); page.wait_for_timeout(400); return ctx, page
    ctx, page = notice(lambda p: p.select_option('#fnoticeExposeFilter', '미노출'))
    shot(page, 'frm-notice-filter' + sfx, [Q('.filter-bar'), Q('.table-toolbar'), Q('.table-wrap'), Q('.pagination')]); ctx.close()
    form_all = [Q('.back-link'), Q('.card-head'), Q('.form-section')]
    ctx, page = notice(lambda p: p.locator('[data-fnotice-edit]').nth(3).click())
    shot(page, 'frm-notice-edit' + sfx, form_all); ctx.close()
    ctx, page = notice(lambda p: (p.click('#fnoticeNewBtn'), p.click('#fnoticeSaveBtn')))
    shot(page, 'frm-notice-form-error' + sfx, form_all); ctx.close()
    ctx, page = notice(lambda p: (p.click('#fnoticeNewBtn'), p.set_input_files('#fnoticeFileInput', {'name': 'sample.exe', 'mimeType': 'application/octet-stream', 'buffer': b'x'})))
    shot(page, 'frm-notice-attach-error' + sfx, [FIELD_STARTS('첨부파일')]); ctx.close()

    # ---------- 시스템관리 > 공지사항(가맹점 계정) > 작성자 탭 ----------
    ctx, page = page_for(b, device, 'ga02'); S.goto_menu(page, '공지사항')
    page.click('[data-notice-tab="hq"]'); page.wait_for_timeout(400)
    shot(page, 'sys-notice-tab' + sfx, [Q('.tab-row'), Q('.table-toolbar'), Q('.table-wrap'), Q('.pagination')]); ctx.close()

    # ---------- 시스템관리 > 알림설정 ----------
    ctx, page = page_for(b, device); S.goto_menu(page, '알림설정')
    page.click('#notiMasterToggle'); page.wait_for_timeout(400)
    shot(page, 'sys-noti-off' + sfx, [Q('.form-section', 1), Q('.form-section', 2) + ".querySelector('.form-section-title')", Q('.form-section', 2) + ".querySelector('.tab-row-sub')", Q('.form-section', 2) + ".querySelector('.filter-bar')"]); ctx.close()   # 사용하기 스위치 → 발송내역 제목(발송 메시지 영역이 사라진 상태)
    ctx, page = page_for(b, device, 'ga03'); S.goto_menu(page, '알림설정')
    page.click('#notiMasterToggle'); page.wait_for_timeout(400)
    shot(page, 'sys-noti-low' + sfx, [Q('.col-6.card', 0), Q('.col-6.card', 1), Q('.form-section', 0), Q('.form-section', 1)]); ctx.close()
    ctx, page = page_for(b, device); S.goto_menu(page, '알림설정')
    hist = SEC_STARTS('발송내역')
    shot(page, 'sys-noti-history' + sfx, [hist + ".querySelector('.form-section-title')", hist + ".querySelector('.tab-row-sub')", hist + ".querySelector('.filter-bar')", hist + ".querySelector('.table-toolbar')", "[...(%s).querySelectorAll('tbody tr')].slice(0, 5)" % hist]); ctx.close()
    ctx, page = page_for(b, device); S.goto_menu(page, '알림설정')
    page.click('[data-noti-tab="wholesale"]'); page.wait_for_timeout(300)
    page.locator('[data-noti-category-toggle]').nth(2).click(); page.wait_for_timeout(400)
    shot(page, 'sys-noti-category' + sfx, [SEC_STARTS('도매판매 알림'), SEC_STARTS('시스템 알림')]); ctx.close()

if __name__ == '__main__':
    with sync_playwright() as p:
        b = p.chromium.launch()
        for d in ('pc', 'mobile'): run(d, b)
        b.close()
