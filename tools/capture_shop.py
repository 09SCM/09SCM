# 소매몰 이용가이드(시작하기)용 목업 캡처 (09SCM-Shop dist -> assets/img/shop/*.webp)
# 사용: python3 tools/capture_shop.py [목업 dist 경로]
# 규격: PC 1440 / 모바일 440, 2배 해상도. 뷰포트 캡처는 높이 900, 긴 입력 화면은 카드 하단까지 캡처.
import io, os, sys
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/superbeanchoi/09scm-shop/dist'
BASE = 'file://' + os.path.join(DIST, 'index.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'shop')
os.makedirs(OUT, exist_ok=True)
DEVICES = (('pc', 1440), ('mobile', 440))

HIDE_NOTICE = """
document.querySelectorAll('.field-message').forEach(function (el) {
  if (el.textContent.indexOf('목업') > -1) el.textContent = '';
});
document.activeElement && document.activeElement.blur();
"""

def save(png, name):
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    print(name, im.size, round(im.size[0] / im.size[1], 4))

def open_page(ctx, query):
    page = ctx.new_page()
    page.goto(BASE + query)
    page.wait_for_timeout(700)
    page.evaluate(HIDE_NOTICE)
    return page

def shoot(b, name, query, tall=None, action=None):
    """tall: 카드 선택자 — 지정하면 해당 카드 하단 + 여백까지 캡처하고 고정 요소는 숨김"""
    for dev, w in DEVICES:
        ctx = b.new_context(viewport={'width': w, 'height': 900}, device_scale_factor=2)
        page = open_page(ctx, query)
        if action:
            action(page)
        if tall:
            page.add_style_tag(content='#quickOrderLookup{display:none!important}')
            h = page.evaluate("Math.ceil(document.querySelector('%s').getBoundingClientRect().bottom + window.scrollY)" % tall) + (60 if dev == 'pc' else 24)
            save(page.screenshot(full_page=True, clip={'x': 0, 'y': 0, 'width': w, 'height': h}), '%s-%s' % (name, dev))
        else:
            save(page.screenshot(), '%s-%s' % (name, dev))
        ctx.close()

def franchise_done(page):
    page.evaluate("showFranchiseApplicationModal()")
    page.wait_for_timeout(400)

def lookup(page):
    page.fill('input[inputmode="numeric"]', '7942')
    page.click('button:has-text("조회")')
    page.wait_for_timeout(600)
    page.evaluate("window.scrollTo(0,0)")

with sync_playwright() as p:
    b = p.chromium.launch()
    shoot(b, 'intro', '')
    shoot(b, 'login', '?view=login')
    shoot(b, 'signup', '?view=signup', tall='.auth-card')
    shoot(b, 'signup-done', '?view=signup-complete')
    shoot(b, 'reset', '?view=reset-password')
    shoot(b, 'franchise', '?view=franchise-signup', tall='.auth-card')
    shoot(b, 'franchise-done', '?view=franchise-signup', action=franchise_done)
    shoot(b, 'gate', '?view=unavailable')
    shoot(b, 'gate-result', '?view=unavailable', action=lookup)
    b.close()
