# 이용가이드 "섹션 + 하단 바" 혼재 케이스 캡처(장바구니 품절·구매불가는 카드 푸터가 같은 카드 안에 있어 한 장) (mock/partner.html -> assets/img/partner/*-sec-*.webp, *-bar-*.webp)
# 사용: python3 tools/capture_partner_case_blocks.py   (ONLY=이름,이름 으로 일부만 저장)
# 규격: 섹션 크롭은 상하좌우 16px 여백(모바일은 화면 폭 전체), 하단 바 크롭은 PC 1440 전체 폭·모바일 440 폭에 위쪽 28px 여백, 2배 해상도
# 계정: bonsa1(본사)
import io, os
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(ROOT, 'mock', 'partner.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'partner')
PC_CSS = '.lnb{display:none!important}.market-buybar{left:0!important}'
ONLY = set(os.environ.get('ONLY', '').split(',')) - {''}
PAD = 16

def save(png, name):
    if ONLY and name not in ONLY: return
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    print(name, im.size)

def login(page):
    page.goto(URL); page.wait_for_timeout(400)
    page.fill('#loginIdInput', 'bonsa1'); page.fill('#loginPwInput', 'a1234')
    page.click('#loginSubmitBtn'); page.mouse.move(0, 0); page.wait_for_timeout(800)

def go_menu(page, top, label):
    page.evaluate("""([a, b]) => {
      const find = t => [...document.querySelectorAll('a,button,li,div,span')].find(e => e.children.length === 0 && e.textContent.trim() === t);
      find(a).click();
      setTimeout(() => { find(b).click(); }, 100);
    }""", [top, label])
    page.wait_for_timeout(700)

def fit_height(page, minh=700, maxh=3000):
    page.set_viewport_size({'width': page.viewport_size['width'], 'height': 600}); page.wait_for_timeout(200)
    h = page.evaluate("Math.ceil(Math.max(document.documentElement.scrollHeight, document.body.scrollHeight))")
    page.set_viewport_size({'width': page.viewport_size['width'], 'height': max(minh, min(maxh, h))})
    page.wait_for_timeout(300)

def bbox(page, sels):
    return page.evaluate("""(sels) => {
      let x1 = 1e9, y1 = 1e9, x2 = 0, y2 = 0;
      sels.forEach(s => document.querySelectorAll(s).forEach(el => {
        const r = el.getBoundingClientRect();
        if (!r.width) return;
        x1 = Math.min(x1, r.left + scrollX); y1 = Math.min(y1, r.top + scrollY);
        x2 = Math.max(x2, r.right + scrollX); y2 = Math.max(y2, r.bottom + scrollY);
      }));
      return {x: x1, y: y1, w: x2 - x1, h: y2 - y1};
    }""", sels)

def title_box(page, titles):
    """제목(.form-section-title)이 titles에 있는 영역들을 모두 포함하는 문서 좌표 영역(한 번의 호출로 계산한다)"""
    return page.evaluate("""(titles) => {
      let x1 = 1e9, y1 = 1e9, x2 = 0, y2 = 0, n = 0;
      document.querySelectorAll('.form-section').forEach(s => {
        const t = s.querySelector('.form-section-title');
        if (!t || !titles.includes(t.innerText.trim())) return;
        const r = s.getBoundingClientRect(); n++;
        x1 = Math.min(x1, r.left + scrollX); y1 = Math.min(y1, r.top + scrollY);
        x2 = Math.max(x2, r.right + scrollX); y2 = Math.max(y2, r.bottom + scrollY);
      });
      return {x: x1, y: y1, w: x2 - x1, h: y2 - y1, n: n};
    }""", titles)

def sec_shot(page, sels, name, titles=None, box=None):
    page.wait_for_timeout(400)
    b = box or (title_box(page, titles) if titles else bbox(page, sels))
    if b['w'] <= 0: raise SystemExit('영역을 찾지 못했습니다: ' + name)
    vw = page.viewport_size['width']
    page.mouse.move(0, 0); page.wait_for_timeout(200)
    if vw < 800: x, w = 0, vw
    else: x = max(0, b['x'] - PAD); w = min(b['w'] + PAD * 2, vw - x)
    y = max(0, b['y'] - PAD)
    save(page.screenshot(clip={'x': x, 'y': y, 'width': w, 'height': b['h'] + PAD * 2}, full_page=True), name)

def bar_shot(page, name, top=28):
    page.mouse.move(0, 0); page.wait_for_timeout(200)
    b = bbox(page, ['.market-buybar', '.inline-confirm'])
    y = max(0, b['y'] - top)
    save(page.screenshot(clip={'x': 0, 'y': y, 'width': page.viewport_size['width'], 'height': b['y'] + b['h'] - y}, full_page=True), name)

def tag(page, title, sid):
    return page.evaluate("""([t, id]) => {
      const el = [...document.querySelectorAll('.form-section')].find(s => s.querySelector('.form-section-title').innerText.trim() === t);
      if (!el) return false; el.id = id; return true; }""", [title, id])

def run(device, b):
    pc = device == 'pc'
    ctx = b.new_context(viewport={'width': 1440 if pc else 440, 'height': 1500 if pc else 1200}, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page(); login(page)
    if pc: page.add_style_tag(content=PC_CSS)

    # ---- 소매 > 주문목록 > 주문 상세 보기 ----
    def retail_detail(no):
        page.evaluate("(no) => { currentCat = 'retail'; currentRetailOrderDetailNo = no; currentItem = 'retail-order-detail'; renderAll(); window.scrollTo(0, 0); }", no)
        page.wait_for_timeout(500); page.mouse.move(0, 0)
        fit_height(page, 1500 if pc else 700)
    retail_detail('RO20260919102')   # 결제대기
    sec_shot(page, None, 'order-detail-unpaid-sec-' + device, ['결제정보']); bar_shot(page, 'order-detail-unpaid-bar-' + device)
    retail_detail('RO20260918003')   # 노쇼후보
    sec_shot(page, None, 'order-detail-noshow-sec-' + device, ['픽업정보']); bar_shot(page, 'order-detail-noshow-bar-' + device)
    retail_detail('RO20260919001')   # 취소·반품 요청
    sec_shot(page, None, 'order-detail-claim-sec-' + device, ['픽업정보', '결제정보', '취소·반품 정보']); bar_shot(page, 'order-detail-claim-bar-' + device)
    retail_detail('RO20260919002')   # 처리 완료
    # order-detail-done-sec(결제완료 주문이 취소·반품되면)은 tools/capture_partner_claim_flow.py 에서 촬영
    bar_shot(page, 'order-detail-done-bar-' + device)

    # ---- 소매 > 상품목록 > 상세보기 (보유수량 0: 소매판매상태~판매가능수량, 하단 바) ----
    page.set_viewport_size({'width': 1440 if pc else 440, 'height': 1500 if pc else 1200})
    go_menu(page, '소매관리', '상품관리')
    page.evaluate("""() => {
      const b = [...document.querySelectorAll('[data-retail-view]')].find(x => x.dataset.code === 'P0227');
      b.click(); }""")
    page.wait_for_timeout(600); page.mouse.move(0, 0)
    fit_height(page, 1500 if pc else 700)
    page.evaluate("""() => {
      const item = t => [...document.querySelectorAll('.detail-label')].find(e => e.textContent.trim() === t).closest('.detail-item');
      item('소매판매상태').id = 'p-top';
      item('판매가능수량').id = 'p-end'; }""")
    sec_shot(page, ['#p-top', '#p-end'], 'product-detail-soldout-sec-' + device)
    bar_shot(page, 'product-detail-soldout-bar-' + device)
    # ---- 도매 > 주문내역 > 주문 상세 보기 (배송중: 배송 정보 + [배송확정]·[반품요청]) ----
    def wh_item(item, **v):
        page.evaluate("""([item, vars]) => {
          if (vars.code) currentMarketCode = vars.code;
          if (vars.orderNo) { currentOrderDetailNo = vars.orderNo; currentOrderDetailFrom = 'wholesale-order-status'; }
          currentItem = item; renderAll(); window.scrollTo(0, 0); }""", [item, v])
        page.wait_for_timeout(500)
    wh_item('wholesale-order-detail', orderNo='WO20260916011')
    fit_height(page, 1200 if not pc else 1500)
    sec_shot(page, None, 'wh-od-ship-sec-' + device, ['배송 정보']); bar_shot(page, 'wh-od-ship-bar-' + device)

    # ---- 도매 > 도매상품 주문하기 > 장바구니 보기 (품절·구매불가: 상품 행 뱃지 + 하단 바 주문 버튼 비활성) ----
    wh_item('wholesale-cart')
    page.evaluate("document.querySelector('.cart-group-card .cart-row-check').click()")
    page.wait_for_timeout(300)
    if not pc: fit_height(page, 1200)
    box = page.evaluate("""() => { const cs = [...document.querySelectorAll('.cart-group-card')].slice(1, 4);
      let x1 = 1e9, y1 = 1e9, x2 = 0, y2 = 0;
      cs.forEach(c => { const r = c.getBoundingClientRect(); x1 = Math.min(x1, r.left + scrollX); y1 = Math.min(y1, r.top + scrollY); x2 = Math.max(x2, r.right + scrollX); y2 = Math.max(y2, r.bottom + scrollY); });
      return {x: x1, y: y1, w: x2 - x1, h: y2 - y1}; }""")
    sec_shot(page, None, 'wh-cart-block-' + device, box=box)   # 푸터([선택상품주문]·[전체주문])가 카드 안에 있어 한 장으로 둔다
    ctx.close()

if __name__ == '__main__':
    with sync_playwright() as p:
        b = p.chromium.launch()
        for d in ('pc', 'mobile'): run(d, b)
        b.close()
