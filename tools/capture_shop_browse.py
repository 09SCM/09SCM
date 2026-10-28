# 소매몰 이용가이드(둘러보기)용 목업 캡처 (09SCM-Shop dist -> assets/img/shop/*.webp)
# 사용: python3 tools/capture_shop_browse.py [목업 dist 경로]
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

def common_full(page, dev):
    # 대표컷: 유틸리티바~푸터와 [주문 조회] 버튼이 한 화면에 보이도록 메인 콘텐츠를 줄인다
    page.evaluate("""(dev) => {
      document.querySelectorAll('.availability-section').forEach(e => e.remove());
      const keep = dev === 'pc' ? 4 : 2;
      document.querySelectorAll('.featured-section .product-grid').forEach(g => [...g.children].filter(e => !e.querySelector('img')).forEach(e => e.remove()));
      document.querySelectorAll('.featured-section .product-grid').forEach(g => [...g.children].slice(keep).forEach(e => e.remove()));
    }""", dev)
    page.wait_for_timeout(300)
    w = 1440 if dev == 'pc' else 440
    for _ in range(2):
        h = page.evaluate("document.documentElement.scrollHeight")
        if dev == 'pc' and _ == 0: h += 80  # 떠 있는 [주문 조회] 버튼이 푸터 글자를 가리지 않도록 아래 여백
        page.set_viewport_size({'width': w, 'height': h})
        page.wait_for_timeout(400)

def empty_all(page, dev):
    page.evaluate("products.forEach(p => { p.retailExposure = '미노출'; }); renderMain();")
    page.wait_for_timeout(300)

with sync_playwright() as p:
    b = p.chromium.launch()
    # 메인화면
    snap(b, 'browse-main', hide_quick=False)
    snap(b, 'browse-store', area=['.store-information'])
    snap(b, 'browse-today', area=['.availability-section:first-of-type'])
    snap(b, 'browse-empty', steps=empty_all, hide_quick=False)
    # 공통 영역
    snap(b, 'browse-common', steps=common_full, hide_quick=False)
    snap(b, 'browse-search', steps=open_search, area=['.utility-bar', '.main-header'])
    snap(b, 'browse-menu', steps=open_menu)
    # 로그인한 상태: PC는 헤더, 모바일은 헤더에 로그인 메뉴가 없으므로 카테고리 메뉴 상단
    snap(b, 'browse-login', area=['.utility-bar', '.main-header'], init=LOGIN, devices=(('pc', 1440),))
    ctx = b.new_context(viewport={'width': 440, 'height': 900}, device_scale_factor=2)
    ctx.add_init_script(LOGIN)
    pg = ctx.new_page(); pg.goto(BASE); pg.wait_for_timeout(700)
    pg.add_style_tag(content=NO_FIXED)
    open_menu(pg, 'mobile')
    bottom = pg.evaluate("document.querySelector('.drawer-member-menu').getBoundingClientRect().bottom")
    save(pg.screenshot(clip={'x': 0, 'y': 0, 'width': 440, 'height': round(bottom) + 1}), 'browse-login-mobile')
    ctx.close()
    snap(b, 'browse-footer', area=['.site-footer'])
    b.close()

json.dump({k: list(v) for k, v in DIMS.items()}, open('/tmp/claude-0/browse_dims.json', 'w'))
