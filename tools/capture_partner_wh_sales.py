# 도매매출조회 이용가이드 캡처 (mock/partner.html -> assets/img/partner/wh-sales-*.webp)
# 사용: python3 tools/capture_partner_wh_sales.py
import io, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
import capture_partner_sales_settings as base

def goto_wh(page, label):
    page.evaluate("""(label) => {
      const find = t => [...document.querySelectorAll('a,button,li,div,span')].find(e => e.children.length === 0 && e.textContent.trim() === t);
      const c = find('도매관리'); c && c.click();
      const m = find(label); m && m.click();
    }""", label)
    page.wait_for_timeout(500)

def both(b, name, prep=None):
    for label, w, h in (('pc', 1440, 1500), ('mobile', 440, 1200)):
        ctx, page = base.new_page(b, w, h)
        goto_wh(page, '도매매출조회')
        if prep: prep(page, label)
        base.snap(page, w, '%s-%s' % (name, label))
        ctx.close()

def main():
    with sync_playwright() as p:
        b = p.chromium.launch()
        both(b, 'wh-sales-main')
        def custom(pg, l):
            pg.click('[data-wholesale-sales-period="custom"]'); pg.wait_for_timeout(300)
            pg.fill('#wholesaleSalesDateFrom', '2026-09-01'); pg.wait_for_timeout(300)
            pg.fill('#wholesaleSalesDateTo', '2026-09-20'); pg.wait_for_timeout(300)
        both(b, 'wh-sales-custom', custom)
        both(b, 'wh-sales-monthly', lambda pg, l: (pg.click('[data-wholesale-sales-trend-mode="monthly"]'), pg.wait_for_timeout(300)))
        both(b, 'wh-sales-today', lambda pg, l: (pg.click('[data-wholesale-sales-period="today"]'), pg.wait_for_timeout(300)))
        b.close()

if __name__ == '__main__':
    main()
