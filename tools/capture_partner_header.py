# 관리자 헤더 계정 정보 캡처 (mock/partner.html -> assets/img/partner/header-*.webp)
# PC는 헤더 오른쪽 560px(알림·계정 영역), 모바일은 헤더 전체(440px)를 자른다. 이용가이드 디자인시스템 9절에 따라 헤더 아래에 16px 여백을 두고 자르며,
# 여백 안에 본문 UI가 비치지 않도록 본문 영역을 숨기고 촬영한다. PC·모바일 쌍의 세로 높이는 같다
# 사용: python3 tools/capture_partner_header.py
import io, os
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(ROOT, 'mock', 'partner.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'partner')
PW = 'a1234'
ACCOUNTS = {'hq': 'bonsa1', 'fr': 'ga02'}   # 본사, 가맹점(이용승인·도매공급권한 보유)
TOPBAR_H = 61
MARGIN = 16

def shot(b, acct, w, clip_x, clip_w, name):
    ctx = b.new_context(viewport={'width': w, 'height': 400}, device_scale_factor=2)
    page = ctx.new_page(); page.goto(URL); page.wait_for_timeout(400)
    page.fill('#loginIdInput', acct); page.fill('#loginPwInput', PW)
    page.click('#loginSubmitBtn'); page.wait_for_timeout(900)
    page.add_style_tag(content='#contentWrapper{visibility:hidden!important}')
    png = page.screenshot(clip={'x': clip_x, 'y': 0, 'width': clip_w, 'height': TOPBAR_H + MARGIN})
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    print(name, im.size)
    ctx.close()

with sync_playwright() as p:
    b = p.chromium.launch()
    for key, acct in ACCOUNTS.items():
        shot(b, acct, 1440, 880, 560, 'header-%s-pc' % key)
        shot(b, acct, 440, 0, 440, 'header-%s-mobile' % key)
    b.close()
