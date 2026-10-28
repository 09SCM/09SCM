# 소매몰 이용가이드(둘러보기 > 상품목록·상품상세)용 목업 캡처 (09SCM-Shop dist -> assets/img/shop/*.webp)
# 사용: python3 tools/capture_shop_list_detail.py [목업 dist 경로]
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

def open_search(page, dev):
    page.click('#searchOpen' if dev == 'pc' else '#mobileSearchToggle')
    page.wait_for_timeout(500)

def open_menu(page, dev):
    page.click('#categoryOpen')
    page.wait_for_timeout(700)

def fit_full(page, dev):
    page.wait_for_timeout(300)
    h = page.evaluate("document.documentElement.scrollHeight")
    page.set_viewport_size({'width': 1440 if dev == 'pc' else 440, 'height': h})
    page.wait_for_timeout(400)
    h2 = page.evaluate("document.documentElement.scrollHeight")
    if h2 != h:
        page.set_viewport_size({'width': 1440 if dev == 'pc' else 440, 'height': h2})
        page.wait_for_timeout(300)

def empty_all(page, dev):
    page.evaluate("products.forEach(p => { p.retailExposure = '미노출'; }); renderMain();")
    page.wait_for_timeout(300)

with sync_playwright() as p:
    b = p.chromium.launch()
    # 상품목록: 진입별 (모두 뷰포트 상단)
    snap(b, 'list-all', '?view=catalog')
    snap(b, 'list-category', '?view=catalog&category1=' + '신선식품' + '&category2=' + '과일')
    snap(b, 'list-pickup', '?view=catalog&pickupDate=today')
    snap(b, 'list-delivery', '?view=catalog&fulfillment=delivery')
    snap(b, 'list-search', '?view=catalog&q=' + '토마토')
    snap(b, 'list-empty', '?view=catalog&q=' + '없는상품')
    # 상품상세 대표컷: 유틸리티바부터 푸터까지 전체 (뷰포트 높이를 문서 높이에 맞춤)
    snap(b, 'detail-main', '?view=product&id=1', steps=fit_full)
    # 케이스: PC는 상세 영역, 모바일은 상품 정보 영역(하단 고정 버튼은 정보 영역 끝에 놓임)
    for name, pid in (('detail-soldout', 5), ('detail-pickup', 2)):
        q = '?view=product&id=%d' % pid
        snap(b, name, q, area=['.detail-layout'], devices=(('pc', 1440),))
        snap(b, name, q, area=['.detail-copy'], devices=(('mobile', 440),))
    snap(b, 'detail-info', '?view=product&id=1', area=['.product-description'])
    snap(b, 'detail-notfound', '?view=product&id=999')
    b.close()

json.dump({k: list(v) for k, v in DIMS.items()}, open('/tmp/claude-0/list_dims.json', 'w'))
