# 소매몰 이용가이드(주문조회 > 간편주문조회·주문내역·주문상세)용 목업 캡처 (09SCM-Shop dist -> assets/img/shop/*.webp)
# 사용: python3 tools/capture_shop_check.py [목업 dist 경로]
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

def snap(b, name, query='', steps=None, area=None, margin=16, hide_quick=True, init=None, devices=DEVICES, vh=900, css='', hcrop=False, modal=False):
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
            x, cw = 0, w
            if hcrop and dev == 'pc':
                lr = page.evaluate("(sels) => { let l = 1e9, r = 0; sels.forEach(s => document.querySelectorAll(s).forEach(el => { const q = el.getBoundingClientRect(); l = Math.min(l, q.left); r = Math.max(r, q.right); })); return [l, r]; }", area)
                x = max(0, lr[0] - 16); cw = min(w, lr[1] + 16) - x
            png = page.screenshot(full_page=True, clip={'x': x, 'y': y, 'width': cw, 'height': y2 - y})
        elif modal and dev == 'pc':
            q = page.evaluate("(() => { const r = document.querySelector('.order-request-modal').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; })()")
            png = page.screenshot(clip={'x': max(0, q[0] - 16), 'y': max(0, q[1] - 16), 'width': q[2] + 32, 'height': q[3] + 32})
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
def pick_other(page, dev):
    jsclick(page, 'input[name=deliveryAddressMode][value=manual]'); page.wait_for_timeout(300)
    page.fill('#deliveryAddress', '경기 수원시 영통구 광교로 100, 202동 303호')
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


HIST = "?view=order-history"
def card(n): return '#orderHistoryList .order-history-card:nth-child(%d)' % n
def detail_q(num): return '?view=order-detail&order=' + num

def quick_search(code, tab=None):
    def f(page, dev):
        page.fill('#quickLookupCode', code); page.click('#quickLookupForm button[type=submit]'); page.wait_for_timeout(500)
        if tab:
            page.click('[data-quick-tab=%s]' % tab); page.wait_for_timeout(300)
        page.evaluate("window.scrollTo(0, 0)")
    return f
def quick_full(code):
    def f(page, dev):
        quick_search(code)(page, dev); fit_full(page, dev)
    return f
def quick_empty_full(page, dev):
    page.fill('#quickLookupCode', '4826'); page.click('#quickLookupForm button[type=submit]'); page.wait_for_timeout(500); fit_full(page, dev)

def reopen(num=None):
    return "(() => { const o = mockOrders.find(x => x.orderNumber === '%s'); o.cancelRefundStatus = ''; renderPage(); })()" % num

def clear_history(page, dev):
    page.evaluate(reopen('RO20260905013')); page.wait_for_timeout(400)
def open_req(kind, num, mutate=False):
    def f(page, dev):
        if mutate: clear_history(page, dev)
        page.click('[data-order-request=%s][data-order-number=%s]' % (kind, num)); page.wait_for_timeout(500)
    return f
def open_detail(num):
    def f(page, dev):
        page.click('[data-request-detail=%s]' % num); page.wait_for_timeout(500)
    return f
def filter_chat(page, dev):
    page.click('[data-order-channel-filter=채팅주문]'); page.wait_for_timeout(400)

L = LOGIN_OK
with sync_playwright() as p:
    b = p.chromium.launch()
    # 간편주문조회
    snap(b, 'check-quick-main', '?view=quick-order-lookup', steps=fit_full)
    snap(b, 'check-quick-active', '?view=quick-order-lookup', steps=quick_search('7942'))
    snap(b, 'check-quick-complete', '?view=quick-order-lookup', steps=quick_search('7942', 'complete'))
    snap(b, 'check-quick-none', '?view=quick-order-lookup', steps=quick_full('0000'))
    snap(b, 'check-quick-empty', '?view=quick-order-lookup', steps=quick_empty_full)
    # 주문내역
    snap(b, 'check-history-main', HIST, init=L)
    snap(b, 'check-history-chat', HIST, steps=filter_chat, init=L)
    snap(b, 'check-history-empty', HIST, init="localStorage.setItem('onmaeul-login', JSON.stringify({phone:'01012341234', name:'신규회원'}));")
    snap(b, 'check-btn-card', HIST, area=[card(2)], init=L, hcrop=True)
    snap(b, 'check-btn-wait', HIST, area=[card(10)], init=L, hcrop=True)
    snap(b, 'check-btn-request', HIST, steps=clear_history, area=[card(14)], init=L, hcrop=True)
    snap(b, 'check-btn-return', HIST, area=[card(1)], init=L, hcrop=True)
    snap(b, 'check-btn-none', HIST, area=[card(8)], init=L, hcrop=True)
    snap(b, 'check-btn-detail', HIST, area=[card(13)], init=L, hcrop=True)
    snap(b, 'check-btn-rejected', HIST, area=[card(14)], init=L, hcrop=True)
    # 요청 팝업
    snap(b, 'check-modal-cancel', HIST, steps=open_req('cancel', 'RO20260915001'), init=L, modal=True)
    snap(b, 'check-modal-wait', HIST, steps=open_req('cancel', 'RO20260909009'), init=L, modal=True)
    snap(b, 'check-modal-request', HIST, steps=open_req('cancel', 'RO20260905013', True), init=L, vh=1060, modal=True)
    snap(b, 'check-modal-return', HIST, steps=open_req('return', 'RO20261025001'), init=L, modal=True)
    snap(b, 'check-modal-pending', HIST, steps=open_detail('RO20260906012'), init=L, modal=True)
    snap(b, 'check-modal-done', HIST, steps=open_detail('RO20260915002'), init=L, modal=True)
    # 주문상세
    snap(b, 'check-detail-main', detail_q('RO20260914003'), steps=fit_full, init=L)
    snap(b, 'check-detail-delivery', detail_q('RO20260913005'), steps=fit_full, init=L)
    snap(b, 'check-detail-request', detail_q('RO20260906012'), area=['.order-detail-top'], init=L, hcrop=True)
    print(json.dumps({k: [v[0], v[1]] for k, v in DIMS.items()}, ensure_ascii=False))
