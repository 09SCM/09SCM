# 가맹점관리(이용료관리·통합매출조회·공지사항) 이용가이드 캡처 (mock/partner.html -> assets/img/partner/frm-*.webp)
# 사용: python3 tools/capture_partner_franchise_menu.py [이름 일부 ...]   (인자가 없으면 전체)
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from capture_partner_system import *   # 공통 캡처 도우미(저장·크롭·팝업)
from capture_partner_system import _doc_clip, new_page, save, popup_clip, card_clip, between_clip
from capture_partner_franchise import goto_franchise

def SEC(t):
    return "() => { const h = [...document.querySelectorAll('h3')].find(e => e.textContent.trim() === '%s'); const s = h.closest('.form-section'); return [s, s]; }" % t

PC = (1440, 1500); MO = (440, 1200)

def sel(selector, value):
    return lambda p, l: (p.select_option(selector, value), p.wait_for_timeout(300))

# (이름, 메뉴, 준비 동작, 모드 view|popup|clip|between|card, 클립 인자, 모바일도 캡처 여부)
STEPS = [
    # 이용료관리
    ('frm-fee-main', '이용료관리', None, 'view', None, True),
    ('frm-fee-default-error', '이용료관리', seq(fill('#feeMgmtDefaultAmount', 'abc'), click('#feeMgmtDefaultSaveBtn')), 'sec', '기본 이용료 설정', True),
    ('frm-fee-filter', '이용료관리', seq(click('[data-fee-mgmt-period="custom"]'), sel('#feeMgmtStatusSelect', '결제실패')), 'sec', '결제내역', True),
    ('frm-fee-collect', '이용료관리', seq(sel('#feeMgmtStatusSelect', '결제실패'), click('[data-fee-mgmt-collect]')), 'popup', None, True),
    ('frm-fee-collect-error', '이용료관리', seq(sel('#feeMgmtStatusSelect', '결제실패'), click('[data-fee-mgmt-collect]'), fill('#feeMgmtCollectAmount', '0'), click('#feeMgmtCollectSubmitBtn')), 'popup', None, True),
    ('frm-fee-detail', '이용료관리', seq(sel('#feeMgmtStatusSelect', '수기완납'), click('[data-fee-mgmt-detail]')), 'popup', None, True),
    # 통합매출조회
    ('frm-sales-main', '통합매출조회', None, 'view', None, True),
    ('frm-sales-franchise', '통합매출조회', click('[data-fs-scope="franchise"]'), 'view', None, True),
    ('frm-sales-trade', '통합매출조회', click('[data-fs-trade="retail"]'), 'view', None, True),
    ('frm-sales-custom', '통합매출조회', click('[data-fs-period="custom"]'), 'view', None, True),
    ('frm-sales-monthly', '통합매출조회', click('[data-fs-trend-mode="monthly"]'), 'view', None, True),
    ('frm-sales-today', '통합매출조회', click('[data-fs-period="today"]'), 'view', None, True),
    ('frm-sales-list', '통합매출조회', click('[data-fs-tab="byFranchise"]'), 'view', None, True),
    ('frm-sales-detail', '통합매출조회', seq(click('[data-fs-tab="byFranchise"]'), click('[data-fs-view]')), 'view', None, True),
    # 공지사항
    ('frm-notice-list', '공지사항', None, 'view', None, True),
    ('frm-notice-filter', '공지사항', sel('#fnoticeExposeFilter', '미노출'), 'view', None, True),
    ('frm-notice-form', '공지사항', click('#fnoticeNewBtn'), 'view', None, True),
    ('frm-notice-form-error', '공지사항', seq(click('#fnoticeNewBtn'), click('#fnoticeSaveBtn')), 'view', None, True),
    ('frm-notice-attach-error', '공지사항', seq(click('#fnoticeNewBtn'), lambda p, l: (p.set_input_files('#fnoticeFileInput', {'name': 'sample.exe', 'mimeType': 'application/octet-stream', 'buffer': b'x'}), p.wait_for_timeout(300))), 'view', None, True),
    ('frm-notice-edit', '공지사항', click('[data-fnotice-edit]', 3), 'view', None, True),
    ('frm-notice-detail', '공지사항', click('[data-fnotice-view]'), 'view', None, True),
    ('frm-notice-delete', '공지사항', click('[data-fnotice-delete]'), 'popup', None, False),
    ('frm-notice-bulk-confirm', '공지사항', seq(click('tbody input[type=checkbox]', 0), click('tbody input[type=checkbox]', 1), click('#fnoticeBulkDeleteBtn')), 'popup', None, False),
    ('frm-notice-bulk-empty', '공지사항', click('#fnoticeBulkDeleteBtn'), 'popup', None, False),
    ('frm-notice-leave', '공지사항', seq(click('#fnoticeNewBtn'), fill('#fnoticeTitle', '임시 제목'), click('#fnoticeCancelBtn')), 'popup', None, False),
]

if __name__ == '__main__':
    only = sys.argv[1:]
    with sync_playwright() as p:
        b = p.chromium.launch()
        for name, menu, prep, mode, clip_text, mobile in STEPS:
            if only and not any(o in name for o in only): continue
            for label, (w, h) in (('pc', PC), ('mobile', MO)):
                if name.startswith(('frm-notice-form', 'frm-notice-attach', 'frm-notice-detail', 'frm-notice-edit')):
                    w, h = (1440, 1150) if label == 'pc' else (440, 1500)
                if label == 'mobile' and not mobile: continue
                ctx, page = new_page(b, w, h, 'bonsa1')
                goto_franchise(page, menu)
                if prep: prep(page, label)
                page.wait_for_timeout(250)
                if mode == 'popup': png = popup_clip(page)
                elif mode == 'sec': png = _doc_clip(page, SEC(clip_text))
                else: png = page.screenshot()
                save(png, '%s-%s' % (name, label))
                ctx.close()
        b.close()
