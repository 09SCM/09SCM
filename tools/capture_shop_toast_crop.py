# 소매몰 이용가이드: 케이스 표 안에 들어가는 토스트 캡처(토스트만 상하좌우 여백을 두고 자른 PC 1장)
# 사용: python3 tools/capture_shop_toast_crop.py [목업 dist 경로]   ONLY=이름,이름 이면 해당 캡처만 다시 촬영
# 규격: PC 1440, 2배 해상도. 페이지는 흰 배경으로 가리고 토스트만 남긴 뒤 사방 24px 여백을 두고 자른다.
import io, os, sys, json
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/superbeanchoi/09scm-shop/dist'
BASE = 'file://' + os.path.join(DIST, 'index.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'shop')
MARGIN = 24
LOGIN_OK = "localStorage.setItem('onmaeul-login', JSON.stringify({phone:'01012345678', name:'홍길동'}));"
CSS = 'body{background:#fff!important} body *{visibility:hidden!important} .toast,.toast *{visibility:visible!important} #quickOrderLookup{display:none!important} .toast{transition:none!important}'
DIMS = {}

def crop_toast(b, name, query, steps, init=''):
    if os.environ.get('ONLY') and name not in os.environ['ONLY'].split(','):
        return
    ctx = b.new_context(viewport={'width': 1440, 'height': 480}, device_scale_factor=2)
    if init:
        ctx.add_init_script(init)
    page = ctx.new_page()
    page.goto(BASE + query); page.wait_for_timeout(700)
    page.add_style_tag(content='#quickOrderLookup{display:none!important} .toast{transition:none!important}')
    steps(page)
    page.wait_for_timeout(500)
    page.add_style_tag(content=CSS)
    page.evaluate("document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 0)")  # clip은 문서 좌표 기준이라 스크롤을 맨 위로 되돌려 고정 요소 위치와 맞춘다
    page.wait_for_timeout(400)
    r = page.evaluate("(() => { const q = document.querySelector('.toast').getBoundingClientRect(); return [q.left, q.top, q.width, q.height]; })()")
    x, y = max(0, r[0] - MARGIN), max(0, r[1] - MARGIN)
    w, h = min(1440, r[0] + r[2] + MARGIN) - x, min(480, r[1] + r[3] + MARGIN) - y
    png = page.screenshot(clip={'x': x, 'y': y, 'width': w, 'height': h})
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '-pc.webp'), 'WEBP', quality=88)
    DIMS[name] = im.size
    print(name, im.size)
    ctx.close()

def change_fulfillment(page):
    page.click('[data-change-fulfillment]'); page.wait_for_timeout(500)
    page.evaluate("document.querySelector('#fulfillmentChangeForm input:not(:checked)').click()")
    page.click('#fulfillmentChangeForm button[type=submit]')

def request_result(kind, num, mutate=False):
    def f(page):
        if mutate:
            page.evaluate("(() => { const o = mockOrders.find(x => x.orderNumber === 'RO20260905013'); o.cancelRefundStatus = ''; renderPage(); })()"); page.wait_for_timeout(400)
        n = num or page.get_attribute('[data-order-request=%s]' % kind, 'data-order-number')  # num이 없으면 지금 반품 가능한 첫 주문(주문번호가 실행일 기준으로 생성됨)
        page.click('[data-order-request=%s][data-order-number=%s]' % (kind, n)); page.wait_for_timeout(500)
        if page.query_selector('textarea[name=requestReason]'):
            page.fill('textarea[name=requestReason]', '단순 변심으로 취소하려고 합니다.')
        if page.query_selector('select[name=refundBank]'):
            page.select_option('select[name=refundBank]', '국민은행')
            page.fill('input[name=refundAccount]', '1234-56-789012')
            page.fill('input[name=refundHolder]', '홍길동')
        page.click('#orderRequestForm button[type=submit]')
    return f

HIST = '?view=order-history'
with sync_playwright() as p:
    b = p.chromium.launch()
    crop_toast(b, 'cart-change-toast', '?view=cart', change_fulfillment, init=LOGIN_OK)
    crop_toast(b, 'check-toast-cancel-card', HIST, request_result('cancel', 'RO20260913005'), init=LOGIN_OK)
    crop_toast(b, 'check-toast-cancel-wait', HIST, request_result('cancel', 'RO20260909009'), init=LOGIN_OK)
    crop_toast(b, 'check-toast-cancel-request', HIST, request_result('cancel', 'RO20260905013', True), init=LOGIN_OK)
    crop_toast(b, 'check-toast-return', HIST, request_result('return', None), init=LOGIN_OK)
    b.close()
print(json.dumps({k: list(v) for k, v in DIMS.items()}))
