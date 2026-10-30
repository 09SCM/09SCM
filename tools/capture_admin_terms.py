# 통합관리자 약관 관리 화면 캡처 (mock/admin.html -> assets/img/admin/terms-*.webp)
# 통합관리자는 PC 1장만 촬영한다(이용가이드 디자인시스템 9-2절). 섹션·팝업 크롭은 16px 여백을 둔다.
# 사용: python3 tools/capture_admin_terms.py
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

def open_terms(page):
    page.get_by_text('시스템 관리', exact=True).first.click(); page.wait_for_timeout(300)
    page.get_by_text('약관 관리', exact=True).first.click(); page.wait_for_timeout(500)

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

with sync_playwright() as p:
    b = p.chromium.launch()
    # 1) 약관 관리 화면 (이용약관 탭) 전체
    ctx, page = login(b); open_terms(page); hide_lnb(page)
    full(page, 'terms-main-pc')
    ctx.close()
    # 2) 개정 이력 없음 (마케팅정보 수신동의 탭) - 개정 이력 영역
    ctx, page = login(b); open_terms(page)
    page.get_by_text('마케팅정보 수신동의', exact=True).first.click(); page.wait_for_timeout(300)
    crop(page, page.locator('.terms-block').nth(1), 'terms-no-history-pc')
    ctx.close()
    # 3) 개정 이력 상세 모달 (이용약관 v1)
    ctx, page = login(b); open_terms(page)
    page.locator('[data-term-view]').first.click(); page.wait_for_timeout(400)
    crop_modal(page, 'terms-detail-pc')
    ctx.close()
    # 4) 개정 등록 화면 / 입력 오류(시행일~내용) / 등록 확인 / 덮어쓰기 확인 / 작성 취소 확인 / 저장 완료 안내
    ctx, page = login(b); open_terms(page); hide_lnb(page)
    page.click('#termsRegBtn'); page.wait_for_timeout(400)
    full(page, 'terms-reg-pc')
    page.click('#termsFormSave'); page.wait_for_timeout(400)
    h = page.evaluate('Math.max(document.documentElement.scrollHeight, 900)')
    page.set_viewport_size({'width': 1440, 'height': h}); page.wait_for_timeout(300)
    # 입력 오류가 표시된 시행일 ~ 내용 영역만 자른다
    # 자르는 범위 밖(약관 종류·버전, 현재 시행본 불러오기)이 여백에 걸리지 않게 숨긴다
    page.evaluate("""() => { const rows = [...document.querySelectorAll('.form-section > .form-row')]; rows.slice(0, 2).forEach(r => r.style.visibility = 'hidden'); document.querySelector('.form-indent').style.visibility = 'hidden'; }""")
    top = page.locator('.form-row:has(#tfEffective)').bounding_box()
    sec = page.locator('.form-section').bounding_box()
    last = page.locator('.field-error').last.bounding_box()
    x0, y0 = max(sec['x'] - M, 0), max(top['y'] - M, 0)
    save(page.screenshot(clip={'x': x0, 'y': y0, 'width': sec['width'] + M * 2, 'height': last['y'] + last['height'] + M - y0}), 'terms-reg-error-pc')
    page.evaluate("() => document.querySelectorAll('.form-section > .form-row, .form-indent').forEach(r => r.style.visibility = '')")
    page.set_viewport_size({'width': 1440, 'height': 900})
    page.fill('#tfEffective', '2026-11-01'); page.fill('#tfReason', '이용 조건 문구 보완')
    page.click('#tfLoadCur'); page.wait_for_timeout(300)
    # 입력된 내용이 있는 상태에서 다시 불러오기 -> 덮어쓰기 확인
    page.click('#tfLoadCur'); page.wait_for_timeout(300)
    crop_modal(page, 'terms-reg-overwrite-pc')
    ctx.close()
    ctx, page = login(b); open_terms(page); hide_lnb(page)
    page.click('#termsRegBtn'); page.wait_for_timeout(400)
    page.fill('#tfReason', '이용 조건 문구 보완')
    page.click('#termsFormCancel'); page.wait_for_timeout(300)
    crop_modal(page, 'terms-reg-leave-pc')
    ctx.close()
    ctx, page = login(b); open_terms(page); hide_lnb(page)
    page.click('#termsRegBtn'); page.wait_for_timeout(400)
    page.fill('#tfEffective', '2026-11-01'); page.fill('#tfReason', '이용 조건 문구 보완')
    page.click('#tfLoadCur'); page.wait_for_timeout(300)
    page.click('#termsFormSave'); page.wait_for_timeout(400)
    page.set_viewport_size({'width': 1440, 'height': 900})
    crop_modal(page, 'terms-reg-confirm-pc')
    ctx.close()
    ctx, page = login(b); open_terms(page); hide_lnb(page)
    page.click('#termsRegBtn'); page.wait_for_timeout(400)
    page.fill('#tfEffective', '2026-11-01'); page.fill('#tfReason', '이용 조건 문구 보완')
    page.click('#tfLoadCur'); page.wait_for_timeout(300)
    page.click('#termsFormSave'); page.wait_for_timeout(400)
    page.click('#cfOk'); page.wait_for_timeout(400)
    # 안내 토스트: 알럿형 팝업과 같은 폭(452px)으로, 토스트 중심에 맞춰 여백을 두고 자른다.
    # 여백에 뒤 화면의 글자·선이 비치지 않게 토스트 외 요소는 숨기고 배경은 흰색으로 둔다.
    page.evaluate(HIDE_OTHERS_JS, page.locator('#toastEl').element_handle())
    page.evaluate("document.documentElement.style.background = document.body.style.background = '#fff'")
    page.wait_for_timeout(200)
    tb = page.locator('#toastEl').bounding_box(); cx = tb['x'] + tb['width'] / 2
    save(page.screenshot(clip={'x': cx - 226, 'y': max(tb['y'] - 32, 0), 'width': 452, 'height': tb['height'] + 64}), 'terms-reg-done-pc')
    ctx.close()
    b.close()
