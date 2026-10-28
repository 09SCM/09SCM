# 소매몰 이용가이드(주문하기 > 장바구니·주문·결제)용 목업 캡처 (09SCM-Shop dist -> assets/img/shop/*.webp)
# 사용: python3 tools/capture_shop_order.py [목업 dist 경로]
# 규격: PC 1440 / 모바일 440, 2배 해상도. 영역 크롭은 해당 영역 외 요소를 숨기고 위아래 16px 여백, 가로는 화면 폭 전체.
import io, os, sys, json
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/superbeanchoi/09scm-shop/dist'
BASE = 'file://' + os.path.join(DIST, 'index.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'shop')
os.makedirs(OUT, exist_ok=True)
DEVICES = (('pc', 1440), ('mobile', 440))
DIMS = {}

NO_FIXED = '#quickOrderLookup{display:none!important}'
LOGIN = "localStorage.setItem('onmaeul-login', JSON.stringify({phone:'01023456789', name:'김사과'}));"

def save(png, name):
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    DIMS[name] = im.size
    print(name, im.size, round(im.size[0] / im.size[1], 4))

def only(page, sels):
    """sels 요소만 남기고 나머지는 숨긴다(레이아웃은 유지)"""
    page.evaluate("""(sels) => {
      const st = document.createElement('style');
      st.textContent = 'body *{visibility:hidden!important}' + sels.map(s => s + ',' + s + ' *').join(',') + '{visibility:visible!important}';
      document.head.appendChild(st);
    }""", sels)

def rect(page, sels):
    return page.evaluate("""(sels) => {
      let t = 1e9, b = 0;
      sels.forEach(s => document.querySelectorAll(s).forEach(el => {
        const q = el.getBoundingClientRect();
        t = Math.min(t, q.top + scrollY); b = Math.max(b, q.bottom + scrollY);
      }));
      return [t, b, document.documentElement.scrollWidth, document.documentElement.scrollHeight];
    }""", sels)

def snap(b, name, query='', steps=None, area=None, margin=16, hide_quick=True, init=None, devices=DEVICES, vh=900, css=''):
    """area가 있으면 해당 영역만 남겨 세로로 크롭(가로 전체), 없으면 뷰포트 전체"""
    for dev, w in devices:
        ctx = b.new_context(viewport={'width': w, 'height': vh}, device_scale_factor=2)
        if init:
            ctx.add_init_script(init)
        page = ctx.new_page()
        page.goto(BASE + query)
        page.wait_for_timeout(700)
        if hide_quick or area:
            page.add_style_tag(content=NO_FIXED)
        if css:
            page.add_style_tag(content=css)
        if steps:
            steps(page, dev)
        page.evaluate("document.activeElement && document.activeElement.blur()")
        if area:
            only(page, area)
            t, bt, sw, sh = rect(page, area)
            y = max(0, t - margin); y2 = min(sh, bt + margin)
            png = page.screenshot(full_page=True, clip={'x': 0, 'y': y, 'width': w, 'height': y2 - y})
        else:
            png = page.screenshot()
        save(png, '%s-%s' % (name, dev))
        ctx.close()

def fit_full(page, dev):
    page.wait_for_timeout(300)
    w = 1440 if dev == 'pc' else 440
    for _ in range(2):
        h = page.evaluate("document.documentElement.scrollHeight")
        page.set_viewport_size({'width': w, 'height': h})
        page.wait_for_timeout(400)

LOGIN_OK = "localStorage.setItem('onmaeul-login', JSON.stringify({phone:'01012345678', name:'홍길동'}));"
def cart_seed(items):
    return "localStorage.setItem('onmaeul-cart', JSON.stringify(%s)); localStorage.setItem('onmaeul-cart-soldout-seeded-v2','1');" % json.dumps(items)
def draft_seed(items):
    return LOGIN_OK + "sessionStorage.setItem('onmaeul-order-draft', JSON.stringify({items: %s, source: 'cart-all'}));" % json.dumps(items)
PICK = [{'id': 1, 'quantity': 1, 'fulfillment': 'pickup'}, {'id': 6, 'quantity': 2, 'fulfillment': 'pickup'}]
DELI = [{'id': 7, 'quantity': 1, 'fulfillment': 'delivery'}, {'id': 12, 'quantity': 2, 'fulfillment': 'delivery'}]

def jsclick(page, sel):
    page.evaluate("(s) => document.querySelector(s).click()", sel)
    page.wait_for_timeout(200)

def select_all(page, dev):
    page.click('#cartSelectAll'); page.wait_for_timeout(300)
def cart_main(page, dev):
    select_all(page, dev); fit_full(page, dev)
def cart_delivery(page, dev):
    page.click('[data-cart-tab=delivery]'); page.wait_for_timeout(300)
    select_all(page, dev)
def cart_change(page, dev):
    page.click('[data-change-fulfillment]'); page.wait_for_timeout(500)
def cart_nowindow(page, dev):
    select_all(page, dev)
def sub(n):
    return lambda page, dev: page.evaluate("(n) => document.querySelectorAll('.checkout-section')[n].scrollIntoView()", n)
def pick_transfer(page, dev):
    jsclick(page, 'input[name=payment][value=transfer]'); page.wait_for_timeout(300)
def fill_and_submit(pay=None):
    def f(page, dev):
        if pay == 'transfer':
            jsclick(page, 'input[name=payment][value=transfer]')
            page.fill('#depositorName', '홍길동')
        elif pay == 'onsite':
            jsclick(page, 'input[name=payment][value=onsite]')
        jsclick(page, '#orderAgreement')
        page.click('#orderSubmit')
        page.wait_for_url('**view=order-complete**'); page.wait_for_timeout(700)
        page.add_style_tag(content=NO_FIXED)
        fit_full(page, dev)
    return f

with sync_playwright() as p:
    b = p.chromium.launch()
    # 장바구니
    snap(b, 'cart-main', '?view=cart', steps=cart_main)
    snap(b, 'cart-delivery', '?view=cart', steps=cart_delivery, area=['.cart-page'])
    snap(b, 'cart-change', '?view=cart', steps=cart_change, hide_quick=True)
    snap(b, 'cart-nowindow', '?view=cart', steps=cart_nowindow, area=['.cart-page'],
         init=cart_seed([{'id': 1, 'quantity': 1, 'fulfillment': 'pickup'}, {'id': 11, 'quantity': 1, 'fulfillment': 'pickup'}]))
    snap(b, 'cart-empty', '?view=cart', area=['.cart-page'], init=cart_seed([]))
    # 주문서
    snap(b, 'order-main', '?view=order', steps=fit_full, init=draft_seed(PICK))
    snap(b, 'order-delivery', '?view=order', area=['.checkout-section:nth-of-type(3)', '.checkout-section:nth-of-type(4)', '.checkout-section:nth-of-type(5)'], init=draft_seed(DELI))
    snap(b, 'order-transfer', '?view=order', steps=pick_transfer, area=['.checkout-section:nth-of-type(5)'], init=draft_seed(PICK))
    # 주문 완료 (실제 주문서 제출)
    snap(b, 'done-main', '?view=order', steps=fill_and_submit(), init=draft_seed(PICK), hide_quick=True)
    snap(b, 'done-transfer', '?view=order', steps=fill_and_submit('transfer'), init=draft_seed(PICK), hide_quick=True)
    snap(b, 'done-delivery', '?view=order', steps=fill_and_submit(), init=draft_seed(DELI), hide_quick=True)
    b.close()

json.dump({k: list(v) for k, v in DIMS.items()}, open('/tmp/claude-0/order_dims.json', 'w'))
