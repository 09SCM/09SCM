# 소매관리 > 상품목록·주문목록 이용가이드의 "행마다 보이는 버튼" 케이스 모바일 캡처
#   (mock/partner.html -> assets/img/partner/{product-list-rows,order-list-rows-process,order-list-rows-claim,order-list-noshow}-mobile.webp)
# 사용: python3 tools/capture_partner_list_rows_mobile.py
# 규격: 모바일 440 폭, 2배 해상도. 케이스에 해당하는 주문·상품 카드만 남기고, PC 캡처의 컬럼과 같은 항목만 보이게 한다.
import io, os
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(ROOT, 'mock', 'partner.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'partner')

def save(png, name):
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    print(name, im.size)

def login(page):
    page.goto(URL); page.wait_for_timeout(500)
    page.fill('#loginIdInput', 'bonsa1'); page.fill('#loginPwInput', 'a1234')
    page.click('#loginSubmitBtn'); page.wait_for_timeout(800)

def go_retail(page, label):
    page.evaluate("""(m) => {
      const find = t => [...document.querySelectorAll('a,button,li,div,span')].find(e => e.children.length === 0 && e.textContent.trim() === t);
      find('소매관리').click();
      setTimeout(() => { const x = find(m); x && x.click(); }, 100);
    }""", label)
    page.wait_for_timeout(700)

def keep_rows(page, key_label, keys, hide_labels):
    """keys에 해당하는 카드만 남기고, hide_labels 항목은 숨긴 뒤 카드 영역을 반환"""
    page.evaluate("""([kl, keys, hide]) => {
      document.querySelectorAll('.tpl-table tbody tr').forEach(tr => {
        const td = tr.querySelector('td[data-label="' + kl + '"]');
        const ok = td && keys.some(k => td.innerText.trim() === k);
        tr.style.display = ok ? '' : 'none';
        if (!ok) return;
        hide.forEach(h => { const t = tr.querySelector('td[data-label="' + h + '"]'); if (t) t.style.display = 'none'; });
        tr.style.marginBottom = '12px';
      });
    }""", [key_label, keys, hide_labels])
    page.wait_for_timeout(300)
    return page.evaluate("""() => {
      const rows = [...document.querySelectorAll('.tpl-table tbody tr')].filter(r => r.style.display !== 'none');
      const a = rows[0].getBoundingClientRect(), z = rows[rows.length - 1].getBoundingClientRect();
      return {y: a.top + scrollY, h: z.bottom - a.top, n: rows.length};
    }""")

def shot_rows(page, name, r):
    page.set_viewport_size({'width': 440, 'height': 1200}); page.wait_for_timeout(200)
    clip = {'x': 0, 'y': max(0, r['y'] - 12), 'width': 440, 'height': r['h'] + 24}
    save(page.screenshot(clip=clip, full_page=True), name)

ORDER_HIDE = ['주문일시', '주문자', '회원주문 코드', '주문경로', '합계금액']
CASES_ORDER = [
    ('order-list-rows-process-mobile', ['RO20260919103', 'RO20260919102', 'RO20260919101', 'RO20260917003', 'RO20260916001', 'RO20260918003']),
    ('order-list-rows-claim-mobile',   ['RO20260919002', 'RO20260916105', 'RO20260919001', 'RO20260915001', 'RO20260913001']),
    ('order-list-noshow-mobile',       ['RO20260918003', 'RO20260916101']),
]

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={'width': 440, 'height': 1200}, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page()
    login(page)
    go_retail(page, '상품관리')
    r = keep_rows(page, '상품코드', ['P0232', 'P0305', 'P0001', 'P0230', 'P0227'], ['소비자가/할인가', '소매판매상태', '소매노출여부', '채팅주문여부', '등록일시', '수정일시'])
    shot_rows(page, 'product-list-rows-mobile', r)
    for name, keys in CASES_ORDER:
        page.evaluate("currentItem = 'retail-order-list'; renderAll()"); page.wait_for_timeout(600)
        r = keep_rows(page, '주문번호', keys, ORDER_HIDE)
        shot_rows(page, name, r)
    ctx.close(); b.close()
