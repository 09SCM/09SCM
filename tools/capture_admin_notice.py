# 통합관리자 공지사항 화면 캡처 (mock/admin.html -> assets/img/admin/notice-*.webp)
# 통합관리자는 PC 1장만 촬영한다(이용가이드 디자인시스템 9-2절). 섹션·팝업 크롭은 16px 여백을 둔다.
# 사용: python3 tools/capture_admin_notice.py
import io, os
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(ROOT, 'mock', 'admin.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'admin')
ID, PW = 'admin', 'admin1234'
M = 16

def save(png, name):
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    print(name, im.size)

HIDE_OTHERS_JS = """(box) => {
  // 팝업 뒤의 화면은 숨기고(자리는 유지), 팝업과 실제 딤 배경만 남긴다
  let el = box;
  while (el && el.parentElement && el !== document.body) {
    Array.from(el.parentElement.children).forEach(s => { if (s !== el) s.style.visibility = 'hidden'; });
    el = el.parentElement;
  }
}"""

def login(b, h=900):
    ctx = b.new_context(viewport={'width': 1440, 'height': h}, device_scale_factor=2)
    page = ctx.new_page(); page.goto(URL); page.wait_for_timeout(500)
    page.fill('#loginId', ID); page.fill('#loginPw', PW)
    page.evaluate("document.getElementById('loginCaptcha').value = captchaCode")
    page.click('#loginSubmit'); page.wait_for_timeout(900)
    return ctx, page

def open_notice(page):
    page.get_by_text('시스템 관리', exact=True).first.click(); page.wait_for_timeout(300)
    page.get_by_text('공지사항', exact=True).first.click(); page.wait_for_timeout(500)

def hide_lnb(page):
    # 대표·케이스 화면 캡처는 LNB를 제외한다(이용가이드 디자인시스템 9절)
    page.add_style_tag(content='.lnb{display:none!important} .bottom-bar{left:0!important}'); page.wait_for_timeout(300)

def full(page, name):
    h = page.evaluate('Math.max(document.documentElement.scrollHeight, 900)')
    page.set_viewport_size({'width': 1440, 'height': h}); page.wait_for_timeout(300)
    save(page.screenshot(), name)

def crop_modal(page, name, margin=M):
    # 팝업 뒤 화면 UI가 여백에 비치지 않도록 숨기고, 팝업 + 딤 배경 여백 16px로 자른다(그림자·딤 그대로 유지)
    page.evaluate(HIDE_OTHERS_JS, page.locator('.modal-box').last.element_handle())
    page.wait_for_timeout(200)
    crop(page, page.locator('.modal-box').last, name, margin)

def crop(page, loc, name, margin=M):
    box = loc.bounding_box()
    save(page.screenshot(clip={'x': max(box['x'] - margin, 0), 'y': max(box['y'] - margin, 0),
                               'width': box['width'] + margin * 2, 'height': box['height'] + margin * 2}), name)


def tall(page):
    h = page.evaluate('Math.max(document.documentElement.scrollHeight, 900)')
    page.set_viewport_size({'width': 1440, 'height': h}); page.wait_for_timeout(300)

def toast_shot(page, name):
    # 안내 토스트: 알럿형 팝업과 같은 폭(452px)으로, 토스트 중심에 맞춰 여백을 두고 자른다.
    # 여백에 뒤 화면의 글자·선이 비치지 않게 토스트 외 요소는 숨기고 배경은 흰색으로 둔다.
    page.evaluate(HIDE_OTHERS_JS, page.locator('#toastEl').element_handle())
    page.evaluate("document.documentElement.style.background = document.body.style.background = '#fff'")
    page.wait_for_timeout(200)
    tb = page.locator('#toastEl').bounding_box(); cx = tb['x'] + tb['width'] / 2
    save(page.screenshot(clip={'x': cx - 226, 'y': max(tb['y'] - 32, 0), 'width': 452, 'height': tb['height'] + 64}), name)

def hide(page, sel):
    page.evaluate("(s) => document.querySelectorAll(s).forEach(e => e.style.visibility = 'hidden')", sel)

def crop_between(page, top_loc, bottom_loc, container_loc, name, margin=M):
    t = top_loc.bounding_box(); bt = bottom_loc.bounding_box(); c = container_loc.bounding_box()
    x0, y0 = max(c['x'] - margin, 0), max(t['y'] - margin, 0)
    save(page.screenshot(clip={'x': x0, 'y': y0, 'width': c['width'] + margin * 2, 'height': bt['y'] + bt['height'] + margin - y0}), name)

def register(page, title='10월 정기 점검 안내'):
    page.click('#noticeRegBtn'); page.wait_for_timeout(400)
    page.check('input[name="nfTarget"][value="본사/가맹점"]'); page.check('input[name="nfExposed"][value="노출"]')
    page.fill('#nfTitle', title)
    page.click('.re-area'); page.keyboard.type('안녕하세요. 09SCM 운영팀입니다.'); page.wait_for_timeout(200)

with sync_playwright() as p:
    b = p.chromium.launch()
    # 1) 공지사항 목록 (대표)
    ctx, page = login(b); open_notice(page); hide_lnb(page)
    page.set_viewport_size({'width': 1440, 'height': 900}); page.wait_for_timeout(300)   # 목록 대표 화면은 첫 화면(1440×900)만 촬영
    save(page.screenshot(), 'notice-list-pc')
    ctx.close()
    # 2) 검색 결과 없음
    ctx, page = login(b); open_notice(page); hide_lnb(page)
    page.fill('#noticeSearchInput', '존재하지 않는 제목'); page.click('#noticeSearchBtn'); page.wait_for_timeout(300)
    crop_between(page, page.locator('.filter-bar'), page.locator('.sales-empty'), page.locator('.page-section'), 'notice-empty-search-pc')
    ctx.close()
    # 3) 단건 삭제 확인 / 삭제 완료 안내 / 모든 공지가 삭제된 목록
    ctx, page = login(b); open_notice(page); hide_lnb(page)
    page.locator('[data-notice-del]').first.click(); page.wait_for_timeout(300)
    crop_modal(page, 'notice-delete-pc')
    page.click('#cfOk'); page.wait_for_timeout(400)
    toast_shot(page, 'notice-deleted-pc')
    ctx.close()
    ctx, page = login(b); open_notice(page); hide_lnb(page)
    for _ in range(3):
        if not page.locator('#noticeSelAll').count(): break
        page.check('#noticeSelAll'); page.click('#noticeBulkDelBtn'); page.wait_for_timeout(300)
        page.click('#cfOk'); page.wait_for_timeout(2800)
    crop_between(page, page.locator('.filter-bar'), page.locator('.sales-empty'), page.locator('.page-section'), 'notice-empty-all-pc')
    ctx.close()
    # 4) 선택 삭제 확인
    ctx, page = login(b); open_notice(page); hide_lnb(page)
    page.locator('[data-notice-check]').nth(0).check(); page.locator('[data-notice-check]').nth(1).check(); page.wait_for_timeout(200)
    page.click('#noticeBulkDelBtn'); page.wait_for_timeout(300)
    crop_modal(page, 'notice-bulk-delete-pc')
    ctx.close()
    # 5) 공지사항 상세 (첨부파일 있음) / 첨부파일 없음
    ctx, page = login(b); open_notice(page); hide_lnb(page)
    page.locator('[data-notice-open="n1"]').first.click(); page.wait_for_timeout(400)
    full(page, 'notice-detail-pc')
    page.set_viewport_size({'width': 1440, 'height': 900}); page.click('#noticeBackBtn'); page.wait_for_timeout(300)
    page.locator('[data-notice-open="n2"]').first.click(); page.wait_for_timeout(400)
    hide(page, '.detail-header, .viewer')
    crop(page, page.locator('.detail-grid'), 'notice-detail-nofile-pc')
    ctx.close()
    # 6) 공지사항 등록 화면 (대표) / 입력 오류 / 첨부파일 오류 / 작성 취소 확인 / 저장 완료 안내
    ctx, page = login(b); open_notice(page); hide_lnb(page)
    page.click('#noticeRegBtn'); page.wait_for_timeout(400)
    full(page, 'notice-form-pc')
    page.fill('#nfDate', ''); page.click('#noticeFormSave'); page.wait_for_timeout(400)
    tall(page)
    hide(page, '.detail-header, .form-section .form-row:has(#nfAddFile), .form-section .field-hint')
    crop_between(page, page.locator('.form-row').first, page.locator('.field-error:visible').last, page.locator('.form-section'), 'notice-form-error-pc')
    ctx.close()
    ctx, page = login(b); open_notice(page); hide_lnb(page)
    page.click('#noticeRegBtn'); page.wait_for_timeout(400)
    page.set_input_files('#nfFileInput', {'name': 'setup.exe', 'mimeType': 'application/octet-stream', 'buffer': b'x'}); page.wait_for_timeout(400)
    tall(page)
    page.evaluate("""() => { const keep = e => e.matches('.form-row:has(#nfAddFile), .field-hint, #nfFileErr');
      document.querySelectorAll('.form-section > *').forEach(e => { if (!keep(e)) e.style.visibility = 'hidden'; });
      document.querySelector('.detail-header').style.visibility = 'hidden'; }""")
    crop_between(page, page.locator('.form-row:has(#nfAddFile)'), page.locator('#nfFileErr'), page.locator('.form-section'), 'notice-attach-error-pc')
    ctx.close()
    ctx, page = login(b); open_notice(page); hide_lnb(page)
    page.click('#noticeRegBtn'); page.wait_for_timeout(400)
    page.fill('#nfTitle', '10월 정기 점검 안내')
    page.click('#noticeFormCancel'); page.wait_for_timeout(300)
    crop_modal(page, 'notice-leave-pc')
    ctx.close()
    ctx, page = login(b); open_notice(page); hide_lnb(page)
    register(page)
    page.click('#noticeFormSave'); page.wait_for_timeout(400)
    toast_shot(page, 'notice-saved-pc')
    ctx.close()
    # 7) 공지사항 수정 (첨부파일 2개 있는 공지)
    ctx, page = login(b); open_notice(page); hide_lnb(page)
    page.locator('[data-notice-edit="n6"]').first.click(); page.wait_for_timeout(400)
    tall(page); hide(page, '.detail-header')
    crop(page, page.locator('.form-section'), 'notice-edit-pc')
    ctx.close()
    b.close()
