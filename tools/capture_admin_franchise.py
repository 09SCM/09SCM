# 통합관리자 가맹점 정보 화면 캡처 (mock/admin.html -> assets/img/admin/fr-*.webp)
# 통합관리자는 PC 1장만 촬영한다(이용가이드 디자인시스템 9-2절). 목록 화면은 LNB를 제외한 1440x900,
# 상세 화면은 전체 높이, 섹션·팝업 크롭은 16px 여백을 둔다. 헬퍼는 capture_admin_hq.py를 그대로 쓴다.
# 사용: python3 tools/capture_admin_franchise.py [그룹 ...]   (그룹: list detail, 인자가 없으면 전체)
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
from capture_admin_hq import (login, hide_lnb, fit, full, view900, hide, crop, crop_between, crop_modal, sec)


def open_fr(page):
    page.get_by_text('본사/가맹점 관리', exact=True).first.click(); page.wait_for_timeout(300)
    page.get_by_text('가맹점 정보', exact=True).first.click(); page.wait_for_timeout(500)


def list_filter_shot(page, name):
    fit(page)
    hide(page, '.filter-bar')
    crop_between(page, page.locator('.hq-filter-tabs'), page.locator('.table-scroll'), page.locator('.page-section'), name)
    page.evaluate("document.querySelectorAll('.filter-bar').forEach(e => e.style.visibility = '')")


def list_shots(b):
    ctx, page = login(b); open_fr(page); hide_lnb(page)
    view900(page, 'fr-list-pc')
    ctx.close()

    # 검색 결과 없음 / 소속 본사 상호명 검색
    ctx, page = login(b); open_fr(page); hide_lnb(page)
    page.fill('#franchiseSearchInput', '없는상호'); page.click('#franchiseSearchBtn'); page.wait_for_timeout(300)
    list_filter_shot(page, 'fr-search-empty-pc')
    page.fill('#franchiseSearchInput', '써니팜'); page.click('#franchiseSearchBtn'); page.wait_for_timeout(300)
    list_filter_shot(page, 'fr-search-hq-pc')
    ctx.close()


def open_detail(b, fid):
    ctx, page = login(b); open_fr(page); hide_lnb(page)
    page.click('[data-franchise-detail="%s"]' % fid); page.wait_for_timeout(400)
    return ctx, page


def detail_shots(b):
    # 대표: 이용승인 가맹점(모든 항목이 채워진 정상 이용 가맹점)
    ctx, page = open_detail(b, 'hm7218')
    full(page, 'fr-detail-pc')
    ctx.close()

    # PayApp 연동 정보: 값 있음 / 값 없음
    ctx, page = open_detail(b, 'hm7218')
    fit(page); crop(page, sec(page, 'PayApp 연동 정보'), 'fr-d-payapp-pc')
    ctx.close()
    ctx, page = open_detail(b, 'wj9021')
    fit(page); crop(page, sec(page, 'PayApp 연동 정보'), 'fr-d-payapp-empty-pc')
    ctx.close()

    # 연동 값 변경: 확인 창 -> 편집 -> 검증완료
    ctx, page = open_detail(b, 'hm7218')
    page.click('#frPayappEditBtn'); page.wait_for_timeout(300)
    crop_modal(page, 'fr-d-payapp-alert-pc')
    page.click('#frPayappAlertContinue'); page.wait_for_timeout(300)
    fit(page); crop(page, sec(page, 'PayApp 연동 정보 (편집중)'), 'fr-d-payapp-edit-pc')
    page.click('#frPayappVerifyBtn'); page.wait_for_timeout(300)
    fit(page); crop(page, sec(page, 'PayApp 연동 정보 (편집중)'), 'fr-d-payapp-verified-pc')
    ctx.close()

    # 관리자접속
    ctx, page = open_detail(b, 'hm7218')
    page.click('#franchiseAdminAccessBtn'); page.wait_for_timeout(300)
    # 목업 전용 안내 문구는 실제 화면에 없으므로 가린다
    page.evaluate("document.querySelectorAll('.modal-box p').forEach(p => { if (p.textContent.indexOf('※ 목업') === 0) p.remove(); })")
    crop_modal(page, 'fr-d-access-pc')
    ctx.close()


if __name__ == '__main__':
    only = sys.argv[1:]
    groups = [('list', list_shots), ('detail', detail_shots)]
    with sync_playwright() as p:
        b = p.chromium.launch()
        for name, fn in groups:
            if not only or name in only:
                fn(b)
        b.close()
