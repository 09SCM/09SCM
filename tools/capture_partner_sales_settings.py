# 소매매출조회·소매설정 이용가이드 캡처 (mock/partner.html -> assets/img/partner/*.webp)
# 사용: python3 tools/capture_partner_sales_settings.py
import io, os, sys
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(ROOT, 'mock', 'partner.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'partner')
HIDE_LNB = ':root{--lnb-w:0px!important}.lnb{display:none!important}'

def save(png, name):
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    print(name, im.size, 'ratio %d / %d' % im.size)

def goto_menu(page, label):
    page.evaluate("""(label) => {
      const find = t => [...document.querySelectorAll('a,button,li,div,span')].find(e => e.children.length === 0 && e.textContent.trim() === t);
      const c = find('소매관리'); c && c.click();
      const m = find(label); m && m.click();
    }""", label)
    page.wait_for_timeout(500)

def new_page(b, w, h):
    ctx = b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2)
    page = ctx.new_page(); page.goto(URL); page.wait_for_timeout(400)
    page.fill('#loginIdInput', 'bonsa'); page.fill('#loginPwInput', 'a1234')
    page.click('#loginSubmitBtn'); page.wait_for_timeout(800)
    if w > 860: page.add_style_tag(content=HIDE_LNB)
    return ctx, page

def snap(page, w, name, full=False, h=None):
    if full or h:
        height = h or page.evaluate('document.documentElement.scrollHeight')
        page.set_viewport_size({'width': w, 'height': height}); page.wait_for_timeout(300)
    save(page.screenshot(), name)

def both(b, name, menu, prep=None, full=False):
    for label, w, h in (('pc', 1440, 1500), ('mobile', 440, 1200)):
        ctx, page = new_page(b, w, h)
        goto_menu(page, menu)
        if prep: prep(page, label)
        snap(page, w, '%s-%s' % (name, label), full=full)
        ctx.close()

SALES = '소매매출조회'
SETTINGS = '소매설정'

def run_sales(b):
    both(b, 'sales-main', SALES)
    def custom(p, l):
        p.click('[data-retail-sales-period="custom"]'); p.wait_for_timeout(300)
        p.fill('#retailSalesDateFrom', '2026-09-01'); p.wait_for_timeout(300)
        p.fill('#retailSalesDateTo', '2026-09-20'); p.wait_for_timeout(300)
    both(b, 'sales-custom', SALES, custom)
    both(b, 'sales-monthly', SALES, lambda p, l: (p.click('[data-retail-sales-trend-mode="monthly"]'), p.wait_for_timeout(300)))
    both(b, 'sales-today', SALES, lambda p, l: (p.click('[data-retail-sales-period="today"]'), p.wait_for_timeout(300)))

def run_settings(b):
    TERMS_TAB = '[data-retail-basic-tab="terms"]'
    both(b, 'settings-basic', SETTINGS, full=True)
    both(b, 'settings-terms', SETTINGS, lambda p, l: (p.click(TERMS_TAB), p.wait_for_timeout(300)), full=True)
    def err(p, l):
        p.fill('#rbMallName', ''); p.fill('#rbMallDisplayName', '')
        p.click('#rbSaveBtn'); p.wait_for_timeout(300)
    both(b, 'settings-error', SETTINGS, err, full=True)
    # 기본 수령방식 '픽업만' — 기본 배달비 입력란 숨김(수령방식 영역 크롭)
    for label, w, h in (('pc', 1440, 1500), ('mobile', 440, 1200)):
        ctx, page = new_page(b, w, h); goto_menu(page, SETTINGS)
        page.check('input[name="rbSalesMethod"][value="pickup"]'); page.wait_for_timeout(200)
        sec = page.locator('section.form-section', has_text='수령방식').first
        box = sec.bounding_box()
        save(page.screenshot(clip={'x': 0, 'y': box['y'] - 8, 'width': w, 'height': box['height'] + 16}), 'settings-pickup-' + label)
        ctx.close()

if __name__ == '__main__':
    which = sys.argv[1:] or ['sales']
    with sync_playwright() as p:
        b = p.chromium.launch()
        if 'sales' in which: run_sales(b)
        if 'settings' in which: run_settings(b)
        b.close()
