# 매출조회 [월별] 탭 캡처 — 여러 달이 보이도록 기간을 직접 선택한 상태로 촬영 (소매·도매·통합)
# 사용: python3 tools/capture_partner_sales_monthly.py
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
import capture_partner_sales_settings as base
import capture_partner_wh_sales as wh
from capture_partner_system import new_page as sys_new_page, save as sys_save
from capture_partner_franchise import goto_franchise

FROM, TO = '2026-04-01', '2026-09-20'

# 목업 주문 데이터가 9월에만 있어, 촬영할 때만 과거 달(4~8월) 주문을 임시로 복제해 넣는다. mock/partner.html 파일은 수정하지 않는다.
SEED_JS = """() => {
  const F = [0.8, 0.6, 1.1, 0.7, 0.5];
  const shiftStamp = (v, m) => v ? v.replace(/^(\\d\\d)\\.(\\d\\d)/, (a, y, mm) => y + '.' + String(Number(mm) - m).padStart(2, '0')) : v;
  const grow = (list) => {
    const base = list.filter(o => !o.demo && o.paidAt);
    const add = [];
    base.forEach((o, i) => {
      for (let m = 1; m <= 5; m++) {
        if ((i + m) % 3 === 0) continue;
        const c = Object.assign({}, o);
        c.orderNo = (o.orderNo || 'X') + '-S' + m;
        c.createdAt = shiftStamp(o.createdAt, m);
        c.paidAt = shiftStamp(o.paidAt, m);
        c.cancelReturnResolvedAt = shiftStamp(o.cancelReturnResolvedAt, m);
        c.grandTotal = Math.round(o.grandTotal * F[m - 1] / 100) * 100;
        c.totalRefundAmount = Math.round((o.totalRefundAmount || 0) * F[m - 1] / 100) * 100;
        add.push(c);
      }
    });
    add.forEach(x => list.push(x));
  };
  grow(ORDER_LIST); grow(RETAIL_ORDER_LIST);
  if (typeof FRANCHISE_SALES_ORDERS !== 'undefined') grow(FRANCHISE_SALES_ORDERS);
}"""

def retail(b):
    for label, w, h in (('pc', 1440, 1500), ('mobile', 440, 1200)):
        ctx, page = base.new_page(b, w, h)
        page.evaluate(SEED_JS); base.goto_menu(page, '소매매출조회')
        page.click('[data-retail-sales-period="custom"]'); page.wait_for_timeout(300)
        page.fill('#retailSalesDateFrom', FROM); page.wait_for_timeout(300)
        page.fill('#retailSalesDateTo', TO); page.wait_for_timeout(300)
        page.click('[data-retail-sales-trend-mode="monthly"]'); page.wait_for_timeout(300)
        base.snap(page, w, 'sales-monthly-' + label); ctx.close()

def wholesale(b):
    for label, w, h in (('pc', 1440, 1500), ('mobile', 440, 1200)):
        ctx, page = base.new_page(b, w, h)
        page.evaluate(SEED_JS); wh.goto_wh(page, '도매매출조회')
        page.click('[data-wholesale-sales-period="custom"]'); page.wait_for_timeout(300)
        page.fill('#wholesaleSalesDateFrom', FROM); page.wait_for_timeout(300)
        page.fill('#wholesaleSalesDateTo', TO); page.wait_for_timeout(300)
        page.click('[data-wholesale-sales-trend-mode="monthly"]'); page.wait_for_timeout(300)
        base.snap(page, w, 'wh-sales-monthly-' + label); ctx.close()

def franchise(b):
    for label, (w, h) in (('pc', (1440, 1500)), ('mobile', (440, 1200))):
        ctx, page = sys_new_page(b, w, h, 'bonsa')
        page.evaluate(SEED_JS); goto_franchise(page, '통합매출조회')
        page.click('[data-fs-period="custom"]'); page.wait_for_timeout(300)
        page.fill('#fsDateFrom', FROM); page.wait_for_timeout(300)
        page.fill('#fsDateTo', TO); page.wait_for_timeout(300)
        page.click('[data-fs-trend-mode="monthly"]'); page.wait_for_timeout(500)
        sys_save(page.screenshot(), 'frm-sales-monthly-' + label); ctx.close()

if __name__ == '__main__':
    with sync_playwright() as p:
        b = p.chromium.launch(); retail(b); wholesale(b); franchise(b); b.close()
