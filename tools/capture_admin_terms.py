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

def full(page, name):
    h = page.evaluate('Math.max(document.documentElement.scrollHeight, 900)')
    page.set_viewport_size({'width': 1440, 'height': h}); page.wait_for_timeout(300)
    save(page.screenshot(), name)

def crop_modal(page, name, margin=M):
    # 팝업 뒤 배경 UI가 여백에 비치지 않도록 오버레이를 흰색으로 덮고 팝업만 자른다
    page.evaluate("document.querySelectorAll('.modal-box').forEach(b => { b.parentElement.style.background = '#fff'; })")
    page.wait_for_timeout(200)
    crop(page, page.locator('.modal-box').last, name, margin)

def crop(page, loc, name, margin=M):
    box = loc.bounding_box()
    save(page.screenshot(clip={'x': max(box['x'] - margin, 0), 'y': max(box['y'] - margin, 0),
                               'width': box['width'] + margin * 2, 'height': box['height'] + margin * 2}), name)

with sync_playwright() as p:
    b = p.chromium.launch()
    # 1) 약관 관리 화면 (이용약관 탭) 전체
    ctx, page = login(b); open_terms(page)
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
    # 4) 개정 등록 화면 / 입력 오류 / 등록 확인
    ctx, page = login(b); open_terms(page)
    page.click('#termsRegBtn'); page.wait_for_timeout(400)
    full(page, 'terms-reg-pc')
    page.click('#termsFormSave'); page.wait_for_timeout(400)
    page.set_viewport_size({'width': 1440, 'height': 900})
    full(page, 'terms-reg-error-pc')
    page.fill('#tfEffective', '2026-11-01'); page.fill('#tfReason', '이용 조건 문구 보완')
    page.click('#tfLoadCur'); page.wait_for_timeout(300)
    page.click('#termsFormSave'); page.wait_for_timeout(400)
    page.set_viewport_size({'width': 1440, 'height': 900})
    crop_modal(page, 'terms-reg-confirm-pc')
    ctx.close()
    b.close()
