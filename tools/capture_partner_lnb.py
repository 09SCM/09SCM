# 관리자 공통 영역 > 왼쪽 메뉴 캡처 (mock/partner.html -> assets/img/partner/lnb-*.webp)
# 본사·가맹점 계정을 대시보드 메뉴가 선택된 상태로 PC 1440 기준 LNB(232px)와 오른쪽 16px 여백까지 촬영한다. 두 이미지의 세로 높이는 같다.
# 사용: python3 tools/capture_partner_lnb.py
import io, os
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(ROOT, 'mock', 'partner.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'partner')
PW = 'a1234'
ACCOUNTS = {'hq': 'bonsa', 'fr': 'ga02'}   # 본사, 가맹점(이용승인·도매공급권한 보유)
LNB_W = 232
M = 16
H = 540

with sync_playwright() as p:
    b = p.chromium.launch()
    for key, acct in ACCOUNTS.items():
        ctx = b.new_context(viewport={'width': 1440, 'height': H}, device_scale_factor=2)
        page = ctx.new_page(); page.goto(URL); page.wait_for_timeout(400)
        page.fill('#loginIdInput', acct); page.fill('#loginPwInput', PW)
        page.click('#loginSubmitBtn'); page.wait_for_timeout(900)
        page.click('#toggle .toggle-btn[data-cat="dashboard"]'); page.wait_for_timeout(300)
        page.add_style_tag(content='#contentWrapper{visibility:hidden!important}')
        png = page.screenshot(clip={'x': 0, 'y': 0, 'width': LNB_W + M, 'height': H})
        im = Image.open(io.BytesIO(png)).convert('RGB')
        im.save(os.path.join(OUT, 'lnb-%s-pc.webp' % key), 'WEBP', quality=88)
        print('lnb-%s-pc' % key, im.size)
        ctx.close()
    b.close()
