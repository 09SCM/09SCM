# 도매관리 > 도매상품 주문하기·주문내역 이용가이드 캡처 (mock/partner.html -> assets/img/partner/wh-*.webp)
# 사용: python3 tools/capture_partner_wholesale.py
# 규격: PC 1440×1500(LNB 제외, 하단 고정바 전체 폭), 모바일 440×1200(고정바가 있는 화면은 화면 전체 높이), 2배 해상도
# 계정: bonsa(본사) — 도매 구매 이력이 있는 계정
import io, os, sys
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(ROOT, 'mock', 'partner.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'partner')
PC_CSS = '.lnb{display:none!important}.market-buybar{left:0!important}'

def save(png, name):
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    print(name, im.size)

def login(page):
    page.goto(URL); page.wait_for_timeout(400)
    page.fill('#loginIdInput', 'bonsa'); page.fill('#loginPwInput', 'a1234')
    page.click('#loginSubmitBtn'); page.wait_for_timeout(800)

def go_menu(page, label):
    page.evaluate("""(m) => {
      const find = t => [...document.querySelectorAll('a,button,li,div,span')].find(e => e.children.length === 0 && e.textContent.trim() === t);
      find('도매관리').click();
      setTimeout(() => { find(m).click(); }, 100);
    }""", label)
    page.wait_for_timeout(700)

def goto_item(page, item, **vars_):
    page.evaluate("""([item, vars]) => {
      if (vars.code) currentMarketCode = vars.code;
      if (vars.orderNo) { currentOrderDetailNo = vars.orderNo; currentOrderDetailFrom = 'wholesale-order-status'; }
      currentItem = item; renderAll();
    }""", [item, vars_])
    page.wait_for_timeout(500)

def bbox(page, selectors):
    """여러 요소를 모두 포함하는 문서 좌표 영역"""
    return page.evaluate("""(sels) => {
      let x1 = 1e9, y1 = 1e9, x2 = 0, y2 = 0;
      sels.forEach(s => document.querySelectorAll(s).forEach(el => {
        const r = el.getBoundingClientRect();
        if (!r.width) return;
        x1 = Math.min(x1, r.left + scrollX); y1 = Math.min(y1, r.top + scrollY);
        x2 = Math.max(x2, r.right + scrollX); y2 = Math.max(y2, r.bottom + scrollY);
      }));
      return {x: x1, y: y1, w: x2 - x1, h: y2 - y1};
    }""", selectors)

def clip_shot(page, selectors, name, pad=16, x=None, w=None):
    b = bbox(page, selectors)
    cx = max(0, b['x'] - pad) if x is None else x
    cw = (b['w'] + pad * 2) if w is None else w
    clip = {'x': cx, 'y': max(0, b['y'] - pad), 'width': min(cw, 1440 - cx), 'height': b['h'] + pad * 2}
    save(page.screenshot(clip=clip, full_page=True), name)

def modal_shot(page, name):
    page.wait_for_timeout(300)
    b = bbox(page, ['.modal-box'])
    clip = {'x': max(0, b['x'] - 40), 'y': max(0, b['y'] - 40), 'width': b['w'] + 80, 'height': b['h'] + 80}
    save(page.screenshot(clip=clip), name)

def fit_height(page, minh=700, maxh=2600):
    page.set_viewport_size({'width': page.viewport_size['width'], 'height': 600}); page.wait_for_timeout(200)
    h = page.evaluate("Math.ceil(Math.max(document.documentElement.scrollHeight, document.body.scrollHeight))")
    page.set_viewport_size({'width': page.viewport_size['width'], 'height': max(minh, min(maxh, h))})
    page.wait_for_timeout(300)

def pick(page, name, value):
    page.evaluate("([n, v]) => document.querySelector('input[name=' + n + '][value=' + v + ']').click()", [name, value])
    page.wait_for_timeout(300)

def card_click(page, text):
    page.evaluate("""(t) => { const c = [...document.querySelectorAll('.market-card')].find(x => x.innerText.includes(t)); c.click(); }""", text)
    page.wait_for_timeout(500)

def set_cart(page, code, qty):
    page.evaluate("([c, q]) => { const it = CART.find(x => x.code === c); if (it) it.qty = q; }", [code, qty])

def open_order(page, seller_text, only_selected=True):
    """장바구니에서 공급자 그룹의 상품을 골라 주문서로 이동"""
    goto_item(page, 'wholesale-cart')
    page.evaluate("""(s) => {
      const card = [...document.querySelectorAll('.cart-group-card')].find(c => c.querySelector('h2').innerText.includes(s));
      const box = card.querySelector('.cart-row-check');
      if (!box.checked) box.click();
    }""", seller_text)
    page.wait_for_timeout(300)
    page.evaluate("""(s) => {
      const card = [...document.querySelectorAll('.cart-group-card')].find(c => c.querySelector('h2').innerText.includes(s));
      card.querySelector('[data-order-selected]').click();
    }""", seller_text)
    page.wait_for_timeout(500)

def run(device, p, b):
    vp = {'width': 1440, 'height': 1500} if device == 'pc' else {'width': 440, 'height': 1200}
    ctx = b.new_context(viewport=vp, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page()
    login(page)
    go_menu(page, '도매상품 주문하기')
    pc = device == 'pc'
    if pc:
        page.add_style_tag(content=PC_CSS)
    suffix = device

    # ---- 상품 목록 ----
    save(page.screenshot(), 'wh-list-' + suffix)
    if pc:
        page.hover('.help-tip'); page.wait_for_timeout(300)
        clip_shot(page, ['.filter-bar', '.help-pop'], 'wh-list-help-pc', pad=20)
        page.mouse.move(5, 5)
        page.fill('#marketSearchInput', '햇양파'); page.click('#marketSearchBtn'); page.wait_for_timeout(400)
        clip_shot(page, ['.table-toolbar', '.market-grid'], 'wh-list-badge-pc', pad=16)
        page.fill('#marketSearchInput', '없는상품명'); page.click('#marketSearchBtn'); page.wait_for_timeout(400)
        clip_shot(page, ['.filter-bar', '.market-grid'], 'wh-list-empty-pc', pad=16)
        page.fill('#marketSearchInput', ''); page.click('#marketSearchBtn'); page.wait_for_timeout(300)

    # ---- 상품 상세 ----
    goto_item(page, 'wholesale-product-list')
    card_click(page, '1++한우 등심 5kg')
    if not pc: fit_height(page, 900)
    save(page.screenshot(), 'wh-detail-' + suffix)
    if pc:
        page.set_viewport_size({'width': 1440, 'height': 900}); page.wait_for_timeout(300)
        page.click('#qtyPlusBtn'); page.click('#addToCartBtn'); page.wait_for_timeout(300)
        clip_shot(page, ['.market-buybar'], 'wh-detail-cart-pc', pad=0, x=0, w=1440)
        goto_item(page, 'wholesale-market-detail', code='P0308')
        clip_shot(page, ['.market-buybar'], 'wh-detail-soldout-pc', pad=0, x=0, w=1440)
        goto_item(page, 'wholesale-market-detail', code='P0232')
        clip_shot(page, ['.market-buybar'], 'wh-detail-own-pc', pad=0, x=0, w=1440)
        page.set_viewport_size({'width': 1440, 'height': 1500})

    # ---- 장바구니 ----
    page.set_viewport_size(vp)
    goto_item(page, 'wholesale-cart')
    page.evaluate("document.querySelector('.cart-group-card .cart-row-check').click()")
    page.wait_for_timeout(300)
    save(page.screenshot(), 'wh-cart-' + suffix)
    if pc:
        b = page.evaluate("""() => { const cs = [...document.querySelectorAll('.cart-group-card')].slice(1, 4); return cs.map(c => { const r = c.getBoundingClientRect(); return [r.top + scrollY, r.bottom + scrollY]; }); }""")
        top, bottom = b[0][0], b[-1][1]
        save(page.screenshot(clip={'x': 0, 'y': top - 8, 'width': 1440, 'height': bottom - top + 16}, full_page=True), 'wh-cart-block-pc')

    # ---- 주문서 ----
    goto_item(page, 'wholesale-cart')
    page.evaluate("CART.forEach(c => { if (findMarketProduct(c.code).sellerName === '횡성한우') c.qty = 2; })")
    open_order(page, '횡성한우')
    if not pc: fit_height(page, 1200)
    save(page.screenshot(), 'wh-order-' + suffix)
    if pc:
        pick(page, 'orderPayMethod', 'transfer')
        ids = page.evaluate("[...document.querySelectorAll('.form-section')].map(s => s.querySelector('.form-section-title').innerText)")
        page.evaluate("([a, c]) => { const f = document.querySelectorAll('.form-section'); f[a].id = 'sec-pay'; f[c].id = 'sec-sum'; }", [ids.index('결제수단'), ids.index('결제금액 요약')])
        clip_shot(page, ['#sec-pay', '#sec-sum'], 'wh-order-transfer-pc', pad=16)
        pick(page, 'orderPayMethod', 'card')
        clip_shot(page, ['#sec-pay', '#sec-sum'], 'wh-order-fee-pc', pad=16)
        pick(page, 'orderAddressMode', 'custom')
        page.click('#orderZipcodeSearchBtn'); page.wait_for_timeout(300)
        idx = page.evaluate("[...document.querySelectorAll('.form-section')].findIndex(s => s.querySelector('.form-section-title').innerText === '배송 정보')")
        page.evaluate("(i) => { document.querySelectorAll('.form-section')[i].id = 'sec-ship'; }", idx)
        clip_shot(page, ['#sec-ship'], 'wh-order-address-pc', pad=16)
        pick(page, 'orderAddressMode', 'profile')
        page.fill('#orderRecipient', ''); page.fill('#orderEmail', '')
        page.click('#orderSubmitBtn'); page.wait_for_timeout(500)
        clip_shot(page, ['#orderErrorBanner', '.form-actions'], 'wh-order-error-pc', pad=20)
        page.fill('#orderRecipient', '박도매'); page.fill('#orderEmail', 'order@woorimarket.kr')
        # 주문서를 연 뒤 상품이 품절된 경우
        page.evaluate("findMarketProduct('P0307').saleStatus = 'soldout'")
        page.click('#orderSubmitBtn'); page.wait_for_timeout(500)
        clip_shot(page, ['#orderErrorBanner', '.form-actions'], 'wh-order-soldout-pc', pad=20)
        page.evaluate("findMarketProduct('P0307').saleStatus = 'sale'")
        page.evaluate("findMarketProduct('P0307').saleStatus = undefined")

    # ---- 주문 완료 (카드결제) ----
    page.click('#orderSubmitBtn'); page.wait_for_timeout(600)
    if not pc: fit_height(page, 1200)
    save(page.screenshot(), 'wh-done-' + suffix)
    if pc:
        # 계좌이체 주문 완료
        goto_item(page, 'wholesale-cart')
        page.evaluate("""() => { if (!CART.some(c => findMarketProduct(c.code).sellerName === '365청과 수원점')) CART.push({code: 'P0105', qty: 1}); }""")
        open_order(page, '365청과 수원점')
        pick(page, 'orderPayMethod', 'transfer')
        page.click('#orderSubmitBtn'); page.wait_for_timeout(600)
        save(page.screenshot(), 'wh-done-transfer-pc')
        # 빈 장바구니
        page.evaluate("CART.splice(0)")
        goto_item(page, 'wholesale-cart')
        clip_shot(page, ['.grid12 > .card'], 'wh-cart-empty-pc', pad=0, x=0, w=1440)

    ctx.close()


def run_orders(device, p, b):
    pc = device == 'pc'
    vp = {'width': 1440, 'height': 1500} if pc else {'width': 440, 'height': 1200}
    ctx = b.new_context(viewport=vp, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page()
    login(page)
    go_menu(page, '주문내역')
    if pc:
        page.add_style_tag(content=PC_CSS)
    save(page.screenshot(), 'wh-orders-' + device)

    if not pc:
        # 팝업 대표 화면(모바일)
        page.evaluate("document.querySelector('[data-cr-open=WO20260919016]').click()")
        page.wait_for_timeout(300)
        modal_shot(page, 'wh-pop-cancelreq-mobile')
        page.evaluate("document.getElementById('crModalCancelBtn').click()")
        page.evaluate("document.querySelector('[data-delivery-confirm=WO20260916011]').click()")
        page.wait_for_timeout(300)
        modal_shot(page, 'wh-pop-confirm-mobile')
        page.evaluate("document.getElementById('deliveryModalCancelBtn').click()")
    if pc:
        # 기간 직접 선택
        page.evaluate("document.querySelector('[data-order-history-period=custom]').click()")
        page.wait_for_timeout(300)
        page.fill('#orderHistoryDateFrom', '2026-09-01'); page.wait_for_timeout(300)
        page.fill('#orderHistoryDateTo', '2026-09-20'); page.wait_for_timeout(300)
        clip_shot(page, ['.tab-row-sub', '.tab-row'], 'wh-orders-period-pc', pad=16)
        page.evaluate("document.querySelector('[data-order-history-period=all]').click()")
        page.wait_for_timeout(300)

        # 행 단위 캡처 — 필요한 컬럼만 남기고 선택한 주문만 표시
        def rows(orders, name):
            page.evaluate("""(nos) => {
              document.querySelectorAll('tbody tr').forEach(tr => {
                const no = tr.children[0].innerText.trim();
                tr.style.display = nos.includes(no) ? '' : 'none';
              });
              document.querySelectorAll('.tpl-table tr').forEach(tr => {
                [...tr.children].forEach((td, i) => { if ([1, 2, 3, 8].includes(i)) td.style.display = 'none'; });
              });
              const t = document.querySelector('.tpl-table'); t.style.width = '860px'; t.style.tableLayout = 'auto';
              document.querySelector('.table-wrap').style.overflow = 'visible';
            }""", orders)
            page.wait_for_timeout(200)
            clip_shot(page, ['.tpl-table'], name, pad=6)
            page.reload(); page.wait_for_timeout(300)

        def reopen():
            login(page); go_menu(page, '주문내역'); page.add_style_tag(content=PC_CSS)
        rows(['WO20260919016', 'WO20260919014', 'WO20260912015', 'WO20260916011', 'WO20260912021', 'WO20260910008'], 'wh-orders-rows-action-pc')
        reopen()
        page.evaluate("() => { const o = ORDER_LIST.find(x => x.orderNo === 'WO20260916011'); }")
        rows(['WO20260911009', 'WO20260906006', 'WO20260918007', 'WO20260909010'], 'wh-orders-rows-claim-pc')
        reopen()

    # ---- 주문 상세 (배송중) ----
    goto_item(page, 'wholesale-order-detail', orderNo='WO20260916011')
    if not pc: fit_height(page, 1200)
    save(page.screenshot(), 'wh-od-' + device)
    if pc:
        # 취소·반품 정보가 있는 주문
        for no, name in (('WO20260911009', 'wh-od-claim-req-pc'), ('WO20260909010', 'wh-od-claim-done-pc')):
            goto_item(page, 'wholesale-order-detail', orderNo=no)
            idx = page.evaluate("[...document.querySelectorAll('.form-section')].findIndex(s => s.querySelector('.form-section-title').innerText === '취소·반품 정보')")
            page.evaluate("(i) => { document.querySelectorAll('.form-section')[i].id = 'sec-cr'; }", idx)
            clip_shot(page, ['#sec-cr'], name, pad=16)

        # 팝업: 주문취소(즉시) / 취소요청 / 반품요청 / 배송확정
        goto_item(page, 'wholesale-order-status')
        page.evaluate("document.querySelector('[data-buyer-cancel-open=WO20260919014]').click()")
        modal_shot(page, 'wh-pop-cancel-pc')
        page.evaluate("document.getElementById('buyerCancelCloseBtn').click()")
        page.evaluate("document.querySelector('[data-buyer-cancel-open=WO20260912015]').click()")
        modal_shot(page, 'wh-pop-cancel-wait-pc')
        page.evaluate("document.getElementById('buyerCancelCloseBtn').click()")
        page.evaluate("document.querySelector('[data-cr-open=WO20260919016]').click()")
        modal_shot(page, 'wh-pop-cancelreq-pc')
        page.evaluate("document.getElementById('crModalCancelBtn').click()")
        page.evaluate("document.querySelector('[data-cr-open=WO20260916011]').click()")
        modal_shot(page, 'wh-pop-return-pc')
        page.evaluate("document.getElementById('crModalCancelBtn').click()")
        page.evaluate("document.querySelector('[data-delivery-confirm=WO20260916011]').click()")
        modal_shot(page, 'wh-pop-confirm-pc')
        page.evaluate("document.getElementById('deliveryModalCancelBtn').click()")
        # 계좌이체 요청 입력 오류
        page.evaluate("document.querySelector('[data-cr-open=WO20260919016]').click()")
        page.evaluate("document.getElementById('crModalSubmitBtn').click()")
        modal_shot(page, 'wh-pop-cancelreq-error-pc')
        page.evaluate("document.getElementById('crModalCancelBtn').click()")
    ctx.close()


with sync_playwright() as p:
    b = p.chromium.launch()
    for d in ('pc', 'mobile'):
        run(d, p, b)
        run_orders(d, p, b)
    b.close()
