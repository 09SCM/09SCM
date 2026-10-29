# 통합관리자 시작하기·대시보드 캡처 (mock/admin.html -> assets/img/admin/*.webp)
# 통합관리자 이용가이드는 운영용 PC 화면이라 PC 1장만 촬영한다(이용가이드 디자인시스템 9-2절).
# 사용: python3 tools/capture_admin_start.py
import io, os
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(ROOT, 'mock', 'admin.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'admin')
os.makedirs(OUT, exist_ok=True)
ID, PW = 'admin', 'admin1234'
MARGIN = 16

def save(png, name):
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    print(name, im.size)

def new_page(b, h=900):
    ctx = b.new_context(viewport={'width': 1440, 'height': h}, device_scale_factor=2)
    page = ctx.new_page(); page.goto(URL); page.wait_for_timeout(500)
    return ctx, page

def login(page):
    page.fill('#loginId', ID); page.fill('#loginPw', PW)
    page.evaluate("document.getElementById('loginCaptcha').value = captchaCode")
    page.click('#loginSubmit'); page.wait_for_timeout(900)

def crop_login_card(page, name, pad=MARGIN):
    box = page.locator('#loginForm').bounding_box()
    page.add_style_tag(content='.login-hint{visibility:visible}')
    png = page.screenshot(clip={'x': box['x'] - pad, 'y': box['y'] - pad, 'width': box['width'] + pad * 2, 'height': box['height'] + pad * 2})
    save(png, name)

with sync_playwright() as p:
    b = p.chromium.launch()
    # 1) 로그인 화면 (1440x900)
    ctx, page = new_page(b)
    save(page.screenshot(), 'login-pc')
    ctx.close()
    # 2) 로그인 오류 안내 대표 1장 (비밀번호 오류)
    ctx, page = new_page(b)
    page.fill('#loginId', ID); page.fill('#loginPw', 'wrong')
    page.evaluate("document.getElementById('loginCaptcha').value = captchaCode")
    page.click('#loginSubmit'); page.wait_for_timeout(300)
    crop_login_card(page, 'login-error-pw-pc')
    ctx.close()
    # 3) 대시보드 (로그인 직후, 전체 길이)
    ctx, page = new_page(b, 1500)
    page.add_style_tag(content='.lnb{display:none!important}')  # 대표 화면 캡처는 LNB 제외(차트가 본문 폭에 맞게 그려지도록 로그인 전에 숨긴다)
    login(page)
    # 본문 마지막 카드 아래 여백(본문 하단 패딩 60px)만 남기도록 화면 높이를 맞춘다
    bottom = page.evaluate("Math.max(...[...document.querySelectorAll('#contentWrapper .card, #contentWrapper .page-section, #contentWrapper > .grid12 > *')].map(e => e.getBoundingClientRect().bottom))")
    h = int(bottom) + 60
    print('dashboard content bottom', bottom, '-> viewport', h)
    page.set_viewport_size({'width': 1440, 'height': h}); page.wait_for_timeout(600)
    save(page.screenshot(), 'dashboard-pc')
    ctx.close()
    b.close()
