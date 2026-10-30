# 통합관리자 본사 관리 화면 캡처 (mock/admin.html -> assets/img/admin/hq-*.webp)
# 통합관리자는 PC 1장만 촬영한다(이용가이드 디자인시스템 9-2절). 목록·대표 화면은 LNB를 제외하고,
# 섹션·팝업 크롭은 16px 여백을 둔다. 운영제한 본사 계정 화면만 09SCM 관리자 목업(mock/partner.html)에서 촬영한다.
# 사용: python3 tools/capture_admin_hq.py [그룹 ...]   (그룹: list register detail status partner, 인자가 없으면 전체)
import io, os, sys
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(ROOT, 'mock', 'admin.html')
PARTNER_URL = 'file://' + os.path.join(ROOT, 'mock', 'partner.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'admin')
ID, PW = 'admin', 'admin1234'
M = 16

HIDE_OTHERS_JS = """(box) => {
  // 팝업 뒤의 화면은 숨기고(자리는 유지), 팝업과 실제 딤 배경만 남긴다
  let el = box;
  while (el && el.parentElement && el !== document.body) {
    Array.from(el.parentElement.children).forEach(s => { if (s !== el) s.style.visibility = 'hidden'; });
    el = el.parentElement;
  }
}"""


def save(png, name):
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    print(name, im.size)


def login(b, h=900):
    ctx = b.new_context(viewport={'width': 1440, 'height': h}, device_scale_factor=2)
    page = ctx.new_page(); page.goto(URL); page.wait_for_timeout(500)
    page.fill('#loginId', ID); page.fill('#loginPw', PW)
    page.evaluate("document.getElementById('loginCaptcha').value = captchaCode")
    page.click('#loginSubmit'); page.wait_for_timeout(900)
    return ctx, page


def open_hq(page):
    page.get_by_text('본사/가맹점 관리', exact=True).first.click(); page.wait_for_timeout(300)
    page.get_by_text('본사 관리', exact=True).first.click(); page.wait_for_timeout(500)


def hide_lnb(page):
    page.add_style_tag(content='.lnb{display:none!important} .bottom-bar{left:0!important}'); page.wait_for_timeout(300)


def fit(page):
    """페이지 전체 높이로 뷰포트를 늘린다(고정 하단바는 맨 아래에 놓인다)."""
    page.evaluate('window.scrollTo(0,0)')
    h = page.evaluate('Math.max(document.documentElement.scrollHeight, 900)')
    page.set_viewport_size({'width': 1440, 'height': h}); page.wait_for_timeout(300)


def full(page, name):
    fit(page)
    save(page.screenshot(), name)


def view900(page, name):
    page.set_viewport_size({'width': 1440, 'height': 900}); page.wait_for_timeout(300)
    page.evaluate('window.scrollTo(0,0)')
    save(page.screenshot(), name)


def hide(page, sel):
    page.evaluate("(s) => document.querySelectorAll(s).forEach(e => e.style.visibility = 'hidden')", sel)


def crop(page, loc, name, margin=M):
    box = loc.bounding_box()
    save(page.screenshot(clip={'x': max(box['x'] - margin, 0), 'y': max(box['y'] - margin, 0),
                               'width': box['width'] + margin * 2, 'height': box['height'] + margin * 2}), name)


def crop_between(page, top_loc, bottom_loc, container_loc, name, margin=M):
    t = top_loc.bounding_box(); bt = bottom_loc.bounding_box(); c = container_loc.bounding_box()
    x0, y0 = max(c['x'] - margin, 0), max(t['y'] - margin, 0)
    save(page.screenshot(clip={'x': x0, 'y': y0, 'width': c['width'] + margin * 2, 'height': bt['y'] + bt['height'] + margin - y0}), name)


def crop_modal(page, name, margin=M):
    # 팝업 뒤 화면 UI가 여백에 비치지 않도록 숨기고, 팝업 + 딤 배경 여백 16px로 자른다
    page.evaluate(HIDE_OTHERS_JS, page.locator('.modal-box').last.element_handle())
    page.wait_for_timeout(200)
    crop(page, page.locator('.modal-box').last, name, margin)


def sec(page, title):
    return page.locator('section.form-section:has(h3.form-section-title:text-is("%s"))' % title)


# ---- 목록 ----
def list_filter_shot(page, name):
    fit(page)
    hide(page, '.filter-bar')
    crop_between(page, page.locator('.hq-filter-tabs'), page.locator('.table-scroll'), page.locator('.page-section'), name)
    page.evaluate("document.querySelectorAll('.filter-bar').forEach(e => e.style.visibility = '')")


def list_shots(b):
    ctx, page = login(b); open_hq(page); hide_lnb(page)
    view900(page, 'hq-list-pc')
    ctx.close()

    for tab, name in (('승인대기', 'hq-filter-wait-pc'), ('운영중', 'hq-filter-run-pc'), ('운영제한', 'hq-filter-limit-pc'), ('승인불가', 'hq-filter-reject-pc')):
        ctx, page = login(b); open_hq(page); hide_lnb(page)
        page.click('[data-hq-filter="%s"]' % tab); page.wait_for_timeout(300)
        list_filter_shot(page, name)
        ctx.close()

    # 검색 결과 없음 / 사업자번호(하이픈 없이) 검색
    ctx, page = login(b); open_hq(page); hide_lnb(page)
    page.fill('#hqSearchInput', '없는상호'); page.click('#hqSearchBtn'); page.wait_for_timeout(300)
    list_filter_shot(page, 'hq-search-empty-pc')
    page.fill('#hqSearchInput', '2108812345'); page.click('#hqSearchBtn'); page.wait_for_timeout(300)
    list_filter_shot(page, 'hq-search-biz-pc')
    ctx.close()

    # 선택
    ctx, page = login(b); open_hq(page); hide_lnb(page)
    page.check('[data-hq-row-check="hq1"]'); page.check('[data-hq-row-check="hq2"]'); page.wait_for_timeout(300)
    fit(page)
    crop_between(page, page.locator('.card-head'), page.locator('.table-scroll'), page.locator('.page-section'), 'hq-select-pc')
    ctx.close()

    # SMS 발송
    ctx, page = login(b); open_hq(page)
    page.click('[data-hq-sms="hq2"]'); page.wait_for_timeout(300)
    page.select_option('#smsTemplateSelect', 'approve')
    page.fill('#smsContent', '운영승인이 완료되었습니다. 09SCM 관리자에 로그인해 주세요.')
    crop_modal(page, 'hq-sms-pc')
    ctx.close()

    # 삭제: 소속 가맹점 없음 / 있음 / 선택 삭제(소속 가맹점 있음)
    ctx, page = login(b); open_hq(page)
    page.click('[data-hq-delete="hq1"]'); page.wait_for_timeout(300)
    crop_modal(page, 'hq-delete-pc')
    ctx.close()
    ctx, page = login(b); open_hq(page)
    page.click('[data-hq-delete="hq2"]'); page.wait_for_timeout(300)
    crop_modal(page, 'hq-delete-fr-pc')
    ctx.close()
    ctx, page = login(b); open_hq(page)
    page.check('[data-hq-row-check="hq1"]'); page.check('[data-hq-row-check="hq2"]'); page.wait_for_timeout(200)
    page.click('#hqBulkDeleteBtn'); page.wait_for_timeout(300)
    crop_modal(page, 'hq-bulk-delete-pc')
    ctx.close()
    # 삭제 완료
    ctx, page = login(b); open_hq(page); hide_lnb(page)
    page.click('[data-hq-delete="hq4"]'); page.wait_for_timeout(300)
    page.click('#hqDeleteConfirmBtn'); page.wait_for_timeout(400)
    list_filter_shot(page, 'hq-deleted-pc')
    ctx.close()


# ---- 직접등록 ----
def reg_open(b):
    ctx, page = login(b); open_hq(page); hide_lnb(page)
    page.click('#hqDirectRegisterBtn'); page.wait_for_timeout(400)
    return ctx, page


def reg_shots(b):
    ctx, page = reg_open(b)
    full(page, 'hq-reg-pc')
    ctx.close()

    # 아이디 중복확인: 사용 가능 / 이미 사용 중 / 규칙 위반
    for val, name in (('newbiz01', 'hq-reg-id-ok-pc'), ('hong01', 'hq-reg-id-dup-pc'), ('A1', 'hq-reg-id-rule-pc')):
        ctx, page = reg_open(b)
        page.fill('#hqRegUserId', val); page.click('#hqRegCheckIdBtn'); page.wait_for_timeout(300)
        fit(page); crop(page, sec(page, '회원정보'), name)
        ctx.close()

    # 사업자인증: 완료 / 이미 등록
    for val, name in (('234-56-78901', 'hq-reg-biz-ok-pc'), ('123-45-67890', 'hq-reg-biz-dup-pc')):
        ctx, page = reg_open(b)
        page.fill('#hqRegBizRegNo', val); page.click('#hqRegBizAuthBtn'); page.wait_for_timeout(300)
        fit(page); crop(page, sec(page, '사업자정보'), name)
        ctx.close()

    # 법인사업자 선택 / 주소찾기
    ctx, page = reg_open(b)
    page.check('input[name="hqRegBizType"][value="법인"]'); page.wait_for_timeout(300)
    fit(page); crop(page, sec(page, '사업자정보'), 'hq-reg-corp-pc')
    ctx.close()
    ctx, page = reg_open(b)
    page.click('#hqRegAddressFindBtn'); page.wait_for_timeout(300)
    fit(page); crop(page, sec(page, '사업자정보'), 'hq-reg-addr-pc')
    ctx.close()

    # 페이앱 유효성 검증: 입력 부족 / 검증완료
    ctx, page = reg_open(b)
    page.click('#hqRegPayappVerifyBtn'); page.wait_for_timeout(300)
    fit(page); crop(page, sec(page, '페이앱 연동정보'), 'hq-reg-payapp-fail-pc')
    ctx.close()
    ctx, page = reg_open(b)
    page.fill('#hqRegPayappUserId', 'newbiz_reseller'); page.fill('#hqRegPayappKey', 'RS11AA22BB33'); page.fill('#hqRegPayappValue', 'VL44CC55DD66')
    page.click('#hqRegPayappVerifyBtn'); page.wait_for_timeout(300)
    fit(page); crop(page, sec(page, '페이앱 연동정보'), 'hq-reg-payapp-ok-pc')
    ctx.close()

    # 등록 오류: 약관 미동의 / 입력 규칙 위반 / 비밀번호 불일치
    def err_shot(page, name):
        fit(page)
        crop_between(page, sec(page, '이용약관 동의'), page.locator('.form-actions').last, page.locator('.tab-body'), name)

    ctx, page = reg_open(b)
    page.click('#hqRegisterSaveBtn'); page.wait_for_timeout(300)
    err_shot(page, 'hq-reg-terms-error-pc')
    ctx.close()
    ctx, page = reg_open(b)
    page.fill('#hqRegPhone', '0101234'); page.check('#hqRegTermsService'); page.check('#hqRegTermsPrivacy')
    page.click('#hqRegisterSaveBtn'); page.wait_for_timeout(300)
    err_shot(page, 'hq-reg-rule-error-pc')
    ctx.close()
    ctx, page = reg_open(b)
    page.fill('#hqRegPassword', 'abc12345'); page.fill('#hqRegPasswordConfirm', 'abc12340')
    page.check('#hqRegTermsService'); page.check('#hqRegTermsPrivacy')
    page.click('#hqRegisterSaveBtn'); page.wait_for_timeout(300)
    err_shot(page, 'hq-reg-pw-error-pc')
    ctx.close()

    # 등록 완료
    ctx, page = reg_open(b)
    page.fill('#hqRegUserId', 'newbiz01'); page.fill('#hqRegPassword', 'abc12345'); page.fill('#hqRegPasswordConfirm', 'abc12345')
    page.fill('#hqRegName', '최유나'); page.fill('#hqRegPhone', '01055556666'); page.fill('#hqRegEmail', 'yuna@hangyeol.co.kr')
    page.fill('#hqRegCompanyName', '한결마트'); page.fill('#hqRegCeoName', '최유나'); page.fill('#hqRegBizRegNo', '234-56-78901')
    page.check('#hqRegTermsService'); page.check('#hqRegTermsPrivacy')
    page.click('#hqRegisterSaveBtn'); page.wait_for_timeout(400)
    list_filter_shot(page, 'hq-reg-done-pc')
    ctx.close()


# ---- 상세 ----
def open_detail(b, hid, tab=None, lnb=False):
    ctx, page = login(b); open_hq(page)
    if not lnb: hide_lnb(page)
    page.click('[data-hq-detail="%s"]' % hid); page.wait_for_timeout(400)
    if tab:
        page.click('[data-hq-tab="%s"]' % tab); page.wait_for_timeout(300)
    return ctx, page


def body_shot(page, name):
    """하단 고정영역을 가리고 탭 본문(tab-body)만 자른다."""
    fit(page)
    page.add_style_tag(content='.bottom-bar{visibility:hidden}')
    crop(page, page.locator('.tab-body'), name)


def detail_shots(b):
    # 대표: 운영중 본사의 신청정보 탭
    ctx, page = open_detail(b, 'hq2')
    full(page, 'hq-detail-pc')
    ctx.close()

    # 신청정보 탭
    ctx, page = open_detail(b, 'hq2')
    fit(page); page.add_style_tag(content='.bottom-bar{visibility:hidden}')
    crop(page, sec(page, '회원정보'), 'hq-d-id-locked-pc')
    ctx.close()
    ctx, page = open_detail(b, 'hq1')
    fit(page); page.add_style_tag(content='.bottom-bar{visibility:hidden}')
    crop(page, sec(page, '회원정보'), 'hq-d-wait-id-pc')
    page.fill('#hqUserId', 'minjibiz'); page.click('#hqCheckIdBtn'); page.wait_for_timeout(300)
    fit(page); crop(page, sec(page, '회원정보'), 'hq-d-id-dup-pc')
    ctx.close()
    ctx, page = open_detail(b, 'hq2')
    page.click('#hqPasswordEditBtn'); page.wait_for_timeout(300)
    fit(page); page.add_style_tag(content='.bottom-bar{visibility:hidden}')
    crop(page, sec(page, '회원정보'), 'hq-d-pw-edit-pc')
    page.fill('#hqNewPassword', 'abc12345'); page.fill('#hqNewPasswordConfirm', 'abc12340'); page.click('#hqPasswordSaveBtn'); page.wait_for_timeout(300)
    fit(page); crop(page, sec(page, '회원정보'), 'hq-d-pw-error-pc')
    ctx.close()
    ctx, page = open_detail(b, 'hq1')
    page.check('input[name="hqBizType"][value="법인"]'); page.wait_for_timeout(300)
    fit(page); page.add_style_tag(content='.bottom-bar{visibility:hidden}')
    crop(page, sec(page, '사업자정보'), 'hq-d-corp-pc')
    ctx.close()
    ctx, page = open_detail(b, 'hq2')
    page.fill('#hqPhone', '0101234'); page.click('#hqApplySaveBtn'); page.wait_for_timeout(300)
    fit(page); page.add_style_tag(content='.bottom-bar{visibility:hidden}')
    crop_between(page, sec(page, '이용약관 동의'), page.locator('.form-actions').last, page.locator('.tab-body'), 'hq-d-save-error-pc')
    ctx.close()

    # 페이앱 연동 탭
    ctx, page = open_detail(b, 'hq2', 'payapp')
    body_shot(page, 'hq-d-payapp-pc')
    ctx.close()
    ctx, page = open_detail(b, 'hq1', 'payapp')
    body_shot(page, 'hq-d-payapp-empty-pc')
    ctx.close()
    ctx, page = open_detail(b, 'hq2', 'payapp')
    page.click('#hqPayappEditBtn'); page.wait_for_timeout(300)
    crop_modal(page, 'hq-d-payapp-alert-pc')
    page.click('#hqPayappAlertContinue'); page.wait_for_timeout(300)
    body_shot(page, 'hq-d-payapp-edit-pc')
    page.click('#hqPayappVerifyBtn'); page.wait_for_timeout(300)
    body_shot(page, 'hq-d-payapp-verified-pc')
    ctx.close()

    # 가맹점·매출 요약 탭
    ctx, page = open_detail(b, 'hq2', 'trade')
    body_shot(page, 'hq-d-trade-pc')
    ctx.close()
    ctx, page = open_detail(b, 'hq1', 'trade')
    body_shot(page, 'hq-d-trade-zero-pc')
    ctx.close()
    ctx, page = open_detail(b, 'hq2', 'trade')
    page.click('#hqGoFranchiseBtn'); page.wait_for_timeout(500)
    view900(page, 'hq-d-go-franchise-pc')
    ctx.close()
    ctx, page = open_detail(b, 'hq2', 'trade')
    page.click('#hqGoSettlementBtn'); page.wait_for_timeout(500)
    view900(page, 'hq-d-go-sales-pc')
    ctx.close()

    # 내부메모 탭
    ctx, page = open_detail(b, 'hq2', 'memo')
    body_shot(page, 'hq-d-memo-pc')
    page.fill('#hqMemoInput', '26.10.30 사업자등록증 사본 재확인 요청함.'); page.click('#hqMemoAddBtn'); page.wait_for_timeout(300)
    body_shot(page, 'hq-d-memo-add-pc')
    ctx.close()
    ctx, page = open_detail(b, 'hq1', 'memo')
    page.click('[data-hq-memo-delete]'); page.wait_for_timeout(300)
    body_shot(page, 'hq-d-memo-empty-pc')
    ctx.close()

    # 관리자접속
    ctx, page = open_detail(b, 'hq2')
    page.click('#hqAdminAccessBtn'); page.wait_for_timeout(300)
    # 목업 전용 안내 문구는 실제 화면에 없으므로 가린다
    page.evaluate("document.querySelectorAll('.modal-box p').forEach(p => { if (p.textContent.indexOf('목업에서는') === 0 || p.textContent.indexOf('※ 목업') === 0) p.remove(); })")
    crop_modal(page, 'hq-d-access-pc')
    ctx.close()


# ---- 상태 변경 ----
def bar_shot(page, name):
    page.set_viewport_size({'width': 1440, 'height': 900}); page.wait_for_timeout(200)
    crop(page, page.locator('.bottom-bar'), name, 0)


def status_shots(b):
    # 대표: 운영중 본사 상세 1440x900
    ctx, page = open_detail(b, 'hq2')
    view900(page, 'hq-status-pc')
    bar_shot(page, 'hq-s-run-pc')
    page.check('input[name="hqStatusRadio"][value="운영제한"]'); page.wait_for_timeout(300)
    bar_shot(page, 'hq-s-limit-select-pc')
    page.click('#hqStatusChangeBtn'); page.wait_for_timeout(400)
    bar_shot(page, 'hq-s-limit-done-pc')
    ctx.close()

    # 운영제한 본사
    ctx, page = open_detail(b, 'hq3')
    bar_shot(page, 'hq-s-limit-pc')
    ctx.close()

    # 승인대기 → 운영승인 흐름 (우리마켓: 비밀번호·페이앱 연동 없음)
    ctx, page = open_detail(b, 'hq1')
    bar_shot(page, 'hq-s-wait-pc')
    page.click('[data-hq-tab="payapp"]'); page.wait_for_timeout(300)
    page.click('#hqPayappEditBtn'); page.wait_for_timeout(300)
    page.fill('#hqPayappUserId', 'woori_reseller'); page.fill('#hqPayappKey', 'RS55EE66FF77'); page.fill('#hqPayappValue', 'VL88GG99HH00')
    page.click('#hqPayappVerifyBtn'); page.wait_for_timeout(300)
    page.click('#hqPayappCommitBtn'); page.wait_for_timeout(300)
    bar_shot(page, 'hq-s-wait-ready-pc')
    page.click('#hqApproveBtn'); page.wait_for_timeout(400)
    bar_shot(page, 'hq-s-approve-error-pc')
    page.click('[data-hq-tab="apply"]'); page.wait_for_timeout(300)
    page.click('#hqPasswordEditBtn'); page.wait_for_timeout(200)
    page.fill('#hqNewPassword', 'abc12345'); page.fill('#hqNewPasswordConfirm', 'abc12345'); page.click('#hqPasswordSaveBtn'); page.wait_for_timeout(300)
    page.click('#hqApproveBtn'); page.wait_for_timeout(400)
    bar_shot(page, 'hq-s-approved-pc')
    ctx.close()

    # 승인불가 처리 → 반려철회
    ctx, page = open_detail(b, 'hq1')
    page.click('#hqRejectBtn'); page.wait_for_timeout(400)
    bar_shot(page, 'hq-s-reject-done-pc')
    page.click('#hqRevokeBtn'); page.wait_for_timeout(400)
    bar_shot(page, 'hq-s-revoke-done-pc')
    ctx.close()
    ctx, page = open_detail(b, 'hq4')
    bar_shot(page, 'hq-s-reject-pc')
    ctx.close()


# ---- 운영제한 본사 계정으로 본 09SCM 관리자 ----
def partner_shots(b):
    ctx = b.new_context(viewport={'width': 1440, 'height': 760}, device_scale_factor=2)
    page = ctx.new_page(); page.goto(PARTNER_URL); page.wait_for_timeout(400)
    page.fill('#loginIdInput', 'bonsa2'); page.fill('#loginPwInput', 'a1234')
    page.click('#loginSubmitBtn'); page.wait_for_timeout(900)
    page.add_style_tag(content=':root{--lnb-w:0px!important}.lnb{display:none!important}')
    page.evaluate("""([g, t]) => {
      const find = x => [...document.querySelectorAll('a,button,li,div,span')].find(e => e.children.length === 0 && e.textContent.trim() === x);
      const a = find(g); a && a.click();
      const b = find(t); b && b.click();
    }""", ['도매관리', '내 도매상품'])
    page.wait_for_timeout(700)
    save(page.screenshot(), 'hq-s-limit-partner-pc')
    ctx.close()


if __name__ == '__main__':
    only = sys.argv[1:]
    groups = [('list', list_shots), ('register', reg_shots), ('detail', detail_shots), ('status', status_shots), ('partner', partner_shots)]
    with sync_playwright() as p:
        b = p.chromium.launch()
        for key, fn in groups:
            if only and key not in only: continue
            fn(b)
        b.close()
