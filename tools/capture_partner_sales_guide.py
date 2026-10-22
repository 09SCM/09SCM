# 매출조회 이용가이드 캡처 통합 스크립트 — 소매·도매·통합매출조회 (그래프가 자연스럽게 보이는 데이터로 촬영)
# 사용: python3 tools/capture_partner_sales_guide.py
# 목업 주문 데이터가 9월 일부 일자에만 있어 그래프가 비어 보이므로, 촬영할 때만 4~9월 일별 주문을 임시로 생성해 넣는다.
# mock/partner.html 파일은 수정하지 않는다. 캡처에 보이는 금액은 가이드 설명용 임의 값이다.
import os, sys, io
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
from PIL import Image, ImageChops
import capture_partner_sales_settings as base
import capture_partner_wh_sales as wh
from capture_partner_system import new_page as sys_new_page, save as sys_save, OUT as SYS_OUT
from capture_partner_franchise import goto_franchise

FROM, TO = '2026-04-01', '2026-09-20'
PC, MO = (1440, 1500), (440, 1200)

SEED_JS = """() => {
  let s = 20261022;
  const rnd = () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
  const pad = n => String(n).padStart(2, '0');
  const grow = (list) => {
    const all = list.filter(o => !o.demo && o.paidAt && o.grandTotal > 0);
    if (!all.length) return;
    // 가맹점별 주문 목록은 가맹점마다 따로 생성해 가맹점 상세 그래프도 채운다.
    const groups = all[0].franchiseId ? [...new Set(all.map(o => o.franchiseId))].filter(id => !/^del/.test(id)) : [null];
    groups.forEach(gid => growOne(list, gid ? all.filter(o => o.franchiseId === gid) : all));
  };
  const growOne = (list, src) => {
    const months = [[4, 30, 0.8], [5, 31, 1.0], [6, 30, 1.3], [7, 31, 0.9], [8, 31, 1.1], [9, 19, 1.2]];
    months.forEach(([m, last, dens]) => {
      for (let d = 1; d <= last; d++) {
        if (rnd() < 0.08) continue;
        const n = 1 + Math.floor(rnd() * 3 * dens);
        for (let k = 0; k < n; k++) {
          const b = src[Math.floor(rnd() * src.length)];
          const c = Object.assign({}, b);
          const date = '26.' + pad(m) + '.' + pad(d);
          c.orderNo = (b.orderNo || 'X') + '-S' + m + pad(d) + k;
          c.createdAt = date + ' 09:30';
          c.paidAt = date + ' 10:00';
          c.grandTotal = Math.max(10000, Math.round(b.grandTotal * (0.5 + rnd()) / 100) * 100);
          c.cancelReturnStatus = null; c.totalRefundAmount = 0; c.cancelReturnResolvedAt = null;
          if (rnd() < 0.12) {
            const rd = Math.min(d + 1, last);
            c.cancelReturnStatus = '취소승인';
            c.totalRefundAmount = Math.round(c.grandTotal * (0.3 + rnd() * 0.7) / 100) * 100;
            c.cancelReturnResolvedAt = '26.' + pad(m) + '.' + pad(rd) + ' 11:00';
          }
          list.push(c);
        }
      }
    });
  };
  grow(ORDER_LIST); grow(RETAIL_ORDER_LIST);
  if (typeof FRANCHISE_SALES_ORDERS !== 'undefined') grow(FRANCHISE_SALES_ORDERS);
}"""

def trim_ratio(name):
    """하단 여백을 잘라내고 가로/세로 비를 돌려준다(통합매출조회 캡처용)."""
    p = os.path.join(base.OUT, name + '.webp')
    im = Image.open(p).convert('RGB')
    bbox = ImageChops.difference(im, Image.new('RGB', im.size, (255, 255, 255))).getbbox()
    h = min(im.height, bbox[3] + 48)
    im.crop((0, 0, im.width, h)).save(p, 'WEBP', quality=88)
    return round(im.width / h, 4)

def retail(b):
    for label, (w, h) in (('pc', PC), ('mobile', MO)):
        for name, prep in (
            ('sales-main', None),
            ('sales-custom', lambda p: (p.click('[data-retail-sales-period="custom"]'), p.wait_for_timeout(300), p.fill('#retailSalesDateFrom', '2026-09-01'), p.wait_for_timeout(300), p.fill('#retailSalesDateTo', '2026-09-20'), p.wait_for_timeout(300))),
            ('sales-monthly', lambda p: (p.click('[data-retail-sales-period="custom"]'), p.wait_for_timeout(300), p.fill('#retailSalesDateFrom', FROM), p.wait_for_timeout(300), p.fill('#retailSalesDateTo', TO), p.wait_for_timeout(300), p.click('[data-retail-sales-trend-mode="monthly"]'), p.wait_for_timeout(300))),
        ):
            ctx, page = base.new_page(b, w, h); page.evaluate(SEED_JS)
            base.goto_menu(page, '소매매출조회')
            if prep: prep(page)
            base.snap(page, w, '%s-%s' % (name, label)); ctx.close()

def wholesale(b):
    for label, (w, h) in (('pc', PC), ('mobile', MO)):
        for name, prep in (
            ('wh-sales-main', None),
            ('wh-sales-custom', lambda p: (p.click('[data-wholesale-sales-period="custom"]'), p.wait_for_timeout(300), p.fill('#wholesaleSalesDateFrom', '2026-09-01'), p.wait_for_timeout(300), p.fill('#wholesaleSalesDateTo', '2026-09-20'), p.wait_for_timeout(300))),
            ('wh-sales-monthly', lambda p: (p.click('[data-wholesale-sales-period="custom"]'), p.wait_for_timeout(300), p.fill('#wholesaleSalesDateFrom', FROM), p.wait_for_timeout(300), p.fill('#wholesaleSalesDateTo', TO), p.wait_for_timeout(300), p.click('[data-wholesale-sales-trend-mode="monthly"]'), p.wait_for_timeout(300))),
        ):
            ctx, page = base.new_page(b, w, h); page.evaluate(SEED_JS)
            wh.goto_wh(page, '도매매출조회')
            if prep: prep(page)
            base.snap(page, w, '%s-%s' % (name, label)); ctx.close()

def franchise(b):
    ratios = {}
    steps = (
        ('frm-sales-main', lambda p: None),
        ('frm-sales-monthly', lambda p: (p.click('[data-fs-period="custom"]'), p.wait_for_timeout(300), p.fill('#fsDateFrom', FROM), p.wait_for_timeout(300), p.fill('#fsDateTo', TO), p.wait_for_timeout(300), p.click('[data-fs-trend-mode="monthly"]'))),
        ('frm-sales-list', lambda p: p.click('[data-fs-tab="byFranchise"]')),
        ('frm-sales-detail', lambda p: (p.click('[data-fs-tab="byFranchise"]'), p.wait_for_timeout(300), p.click('[data-fs-view]'))),
    )
    for name, prep in steps:
        for label, (w, h) in (('pc', PC), ('mobile', MO)):
            ctx, page = sys_new_page(b, w, h, 'bonsa'); page.evaluate(SEED_JS)
            goto_franchise(page, '통합매출조회')
            prep(page); page.wait_for_timeout(500)
            sys_save(page.screenshot(), '%s-%s' % (name, label)); ctx.close()
            if name == 'frm-sales-monthly': ratios['%s-%s' % (name, label)] = trim_ratio('%s-%s' % (name, label))  # 월별만 하단 여백 제거(기존과 동일)
    print('RATIOS', ratios)

if __name__ == '__main__':
    with sync_playwright() as p:
        b = p.chromium.launch(); retail(b); wholesale(b); franchise(b); b.close()
