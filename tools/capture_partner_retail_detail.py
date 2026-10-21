# 소매관리 > 주문목록 > 주문 상세 이용가이드 캡처 (mock/partner.html -> assets/img/partner/order-detail*.webp)
# 사용: python3 tools/capture_partner_retail_detail.py
# 규격: PC 1440 폭(LNB 제외, 하단 고정바 전체 폭, 화면 전체 높이), 모바일 440 폭(화면 전체 높이), 2배 해상도
# 계정: bonsa(본사)
import io, os
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(ROOT, 'mock', 'partner.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'partner')
PC_CSS = '.lnb{display:none!important}.market-buybar{left:0!important}'
ONLY = set(os.environ.get('ONLY', '').split(',')) - {''}

# 캡처 이름 -> 주문번호
SHOTS = {
    'order-detail': 'RO20260919101',
    'order-detail-delivery': 'RO20260917003',
    'order-detail-unpaid': 'RO20260919102',
    'order-detail-noshow': 'RO20260918003',
    'order-detail-claim': 'RO20260919001',
    'order-detail-done': 'RO20260919002',
}

def save(png, name):
    if ONLY and name not in ONLY: return
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    print(name, im.size)

def login(page):
    page.goto(URL); page.wait_for_timeout(400)
    page.fill('#loginIdInput', 'bonsa'); page.fill('#loginPwInput', 'a1234')
    page.click('#loginSubmitBtn'); page.mouse.move(0, 0); page.wait_for_timeout(800)

def fit_height(page, minh=700, maxh=3000):
    page.set_viewport_size({'width': page.viewport_size['width'], 'height': 600}); page.wait_for_timeout(200)
    h = page.evaluate("Math.ceil(Math.max(document.documentElement.scrollHeight, document.body.scrollHeight))")
    page.set_viewport_size({'width': page.viewport_size['width'], 'height': max(minh, min(maxh, h))})
    page.wait_for_timeout(300)

def run(device, b, shots):
    pc = device == 'pc'
    ctx = b.new_context(viewport={'width': 1440 if pc else 440, 'height': 1500 if pc else 1200}, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page(); login(page)
    if pc: page.add_style_tag(content=PC_CSS)
    for name, no in shots.items():
        page.evaluate("(no) => { currentCat = 'retail'; currentRetailOrderDetailNo = no; currentItem = 'retail-order-detail'; renderAll(); window.scrollTo(0, 0); }", no)
        page.wait_for_timeout(500); page.mouse.move(0, 0)
        fit_height(page, 1500 if pc else 700)
        save(page.screenshot(), name + '-' + device)
    ctx.close()

if __name__ == '__main__':
    with sync_playwright() as p:
        b = p.chromium.launch()
        for d in ('pc', 'mobile'): run(d, b, SHOTS)
        b.close()
