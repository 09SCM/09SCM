# 도매관리 > 도매상품 주문하기·주문내역 이용가이드 캡처 (mock/partner.html -> assets/img/partner/wh-*.webp)
# 사용: python3 tools/capture_partner_wholesale.py
# 규격: PC 1440×1500(LNB 제외, 하단 고정바 전체 폭), 모바일 440×1200(고정바가 있는 화면은 화면 전체 높이), 2배 해상도
# 계정: bonsa1(본사) — 도매 구매 이력이 있는 계정
import io, os, sys
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(ROOT, 'mock', 'partner.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'partner')
PC_CSS = '.lnb{display:none!important}.market-buybar{left:0!important}'

ONLY = set(os.environ.get('ONLY', '').split(',')) - {''}   # 지정하면 해당 이름의 캡처만 저장한다(예: ONLY=wh-orders-rows-claim-mobile)

def save(png, name):
    if ONLY and name not in ONLY: return
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    print(name, im.size)

def login(page):
    page.goto(URL); page.wait_for_timeout(400)
    page.fill('#loginIdInput', 'bonsa1'); page.fill('#loginPwInput', 'a1234')
    page.click('#loginSubmitBtn'); page.mouse.move(0, 0); page.wait_for_timeout(800)   # 마우스를 치워 hover 상태가 찍히지 않게 한다

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
    vw = page.viewport_size['width']
    if vw < 800:   # 모바일은 화면 폭 전체를 사용한다
        x, w = 0, vw
    cx = max(0, b['x'] - pad) if x is None else x
    cw = (b['w'] + pad * 2) if w is None else w
    clip = {'x': cx, 'y': max(0, b['y'] - pad), 'width': min(cw, vw - cx), 'height': b['h'] + pad * 2}
    save(page.screenshot(clip=clip, full_page=True), name)

def tag_section(page, title, sid):
    """.form-section 중 제목이 title인 영역에 id를 붙인다"""
    idx = page.evaluate("(t) => [...document.querySelectorAll('.form-section')].findIndex(s => s.querySelector('.form-section-title').innerText === t)", title)
    page.evaluate("([i, id]) => { document.querySelectorAll('.form-section')[i].id = id; }", [idx, sid])

def keep_cards(page, key_label, keys, hide_labels):
    """모바일 카드 목록에서 keys에 해당하는 카드만 남기고 hide_labels 항목은 숨긴 뒤, 카드 영역에 id(rows-area)를 붙인다"""
    page.evaluate("""([kl, keys, hide]) => {
      const rows = [...document.querySelectorAll('.tpl-table tbody tr')];
      rows.forEach(tr => {
        const td = tr.querySelector('td[data-label="' + kl + '"]');
        const ok = td && keys.some(k => td.innerText.trim() === k);
        tr.style.display = ok ? '' : 'none';
        if (!ok) return;
        hide.forEach(h => { const t = tr.querySelector('td[data-label="' + h + '"]'); if (t) t.style.display = 'none'; });
        tr.style.marginBottom = '12px';
        tr.classList.add('rows-keep');
      });
    }""", [key_label, keys, hide_labels])
    page.wait_for_timeout(300)

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
    if pc: page.hover('.help-tip')      # PC는 마우스를 올리면, 모바일은 누르면 표시
    else: page.click('.help-tip')
    page.wait_for_timeout(300)
    clip_shot(page, ['.filter-bar', '.help-pop'], 'wh-list-help-' + suffix, pad=20)
    if pc: page.mouse.move(5, 5)
    else: page.click('.help-tip'); page.wait_for_timeout(200)
    page.fill('#marketSearchInput', '햇양파'); page.click('#marketSearchBtn'); page.wait_for_timeout(400)
    clip_shot(page, ['.table-toolbar', '.market-grid'], 'wh-list-badge-' + suffix, pad=16)
    page.fill('#marketSearchInput', '없는상품명'); page.click('#marketSearchBtn'); page.wait_for_timeout(400)
    clip_shot(page, ['.filter-bar', '.market-grid'], 'wh-list-empty-' + suffix, pad=16)
    page.fill('#marketSearchInput', ''); page.click('#marketSearchBtn'); page.wait_for_timeout(300)

    # ---- 상품 상세 ----
    goto_item(page, 'wholesale-product-list')
    card_click(page, '1++한우 등심 5kg')
    if not pc: fit_height(page, 900)
    save(page.screenshot(), 'wh-detail-' + suffix)
    # 상황별 케이스: 장바구니 담기 · 품절 · 내 상품 — 하단 고정바만 촬영(PC는 표준 규격 1440 전체 폭, 모바일은 위에 뜨는 안내 영역 포함, 가이드에서는 본래 비율로 높이를 맞춘다)
    bar = ['.market-buybar', '.inline-confirm']
    def bar_shot(name, top=28):   # 위쪽 28px 여백: 안내 박스·토스트가 이미지 상단에 붙어 잘려 보이지 않게 한다
        page.mouse.move(0, 0); page.wait_for_timeout(200)
        b = bbox(page, bar)
        y = max(0, b['y'] - top)
        save(page.screenshot(clip={'x': 0, 'y': y, 'width': vp['width'], 'height': b['y'] + b['h'] - y}, full_page=True), name)
    page.click('#qtyPlusBtn'); page.click('#addToCartBtn'); page.wait_for_timeout(300)
    bar_shot('wh-detail-cart-' + suffix)
    for code, name in (('P0308', 'soldout'), ('P0232', 'own')):
        goto_item(page, 'wholesale-market-detail', code=code)
        if not pc: fit_height(page, 900)
        bar_shot('wh-detail-%s-%s' % (name, suffix))

    # ---- 장바구니 ----
    page.set_viewport_size(vp)
    goto_item(page, 'wholesale-cart')
    page.evaluate("document.querySelector('.cart-group-card .cart-row-check').click()")
    page.wait_for_timeout(300)
    save(page.screenshot(), 'wh-cart-' + suffix)
    b = page.evaluate("""() => { const cs = [...document.querySelectorAll('.cart-group-card')].slice(1, 4); return cs.map(c => { const r = c.getBoundingClientRect(); return [r.top + scrollY, r.bottom + scrollY]; }); }""")
    top, bottom = b[0][0], b[-1][1]
    save(page.screenshot(clip={'x': 0, 'y': top - 8, 'width': vp['width'], 'height': bottom - top + 16}, full_page=True), 'wh-cart-block-' + suffix)

    # ---- 주문서 ----
    goto_item(page, 'wholesale-cart')
    page.evaluate("CART.forEach(c => { if (findMarketProduct(c.code).sellerName === '횡성한우') c.qty = 2; })")
    open_order(page, '횡성한우')
    if not pc: fit_height(page, 1200)
    save(page.screenshot(), 'wh-order-' + suffix)
    pick(page, 'orderPayMethod', 'transfer')
    ids = page.evaluate("[...document.querySelectorAll('.form-section')].map(s => s.querySelector('.form-section-title').innerText)")
    page.evaluate("([a, c]) => { const f = document.querySelectorAll('.form-section'); f[a].id = 'sec-pay'; f[c].id = 'sec-sum'; }", [ids.index('결제수단'), ids.index('결제금액 요약')])
    clip_shot(page, ['#sec-pay', '#sec-sum'], 'wh-order-transfer-' + suffix, pad=16)
    pick(page, 'orderPayMethod', 'card')
    clip_shot(page, ['#sec-pay', '#sec-sum'], 'wh-order-fee-' + suffix, pad=16)
    pick(page, 'orderAddressMode', 'custom')
    page.click('#orderZipcodeSearchBtn'); page.wait_for_timeout(300)
    idx = page.evaluate("[...document.querySelectorAll('.form-section')].findIndex(s => s.querySelector('.form-section-title').innerText === '배송 정보')")
    page.evaluate("(i) => { document.querySelectorAll('.form-section')[i].id = 'sec-ship'; }", idx)
    clip_shot(page, ['#sec-ship'], 'wh-order-address-' + suffix, pad=16)
    pick(page, 'orderAddressMode', 'profile')
    page.fill('#orderRecipient', ''); page.fill('#orderEmail', '')
    page.click('#orderSubmitBtn'); page.wait_for_timeout(500)
    clip_shot(page, ['#orderErrorBanner', '.form-actions'], 'wh-order-error-' + suffix, pad=20)
    page.fill('#orderRecipient', '박도매'); page.fill('#orderEmail', 'order@woorimarket.kr')
    # 주문서를 연 뒤 상품이 품절된 경우
    page.evaluate("findMarketProduct('P0307').saleStatus = 'soldout'")
    page.click('#orderSubmitBtn'); page.wait_for_timeout(500)
    clip_shot(page, ['#orderErrorBanner', '.form-actions'], 'wh-order-soldout-' + suffix, pad=20)
    page.evaluate("findMarketProduct('P0307').saleStatus = 'sale'")
    page.evaluate("findMarketProduct('P0307').saleStatus = undefined")

    # ---- 주문 완료 (카드결제) ----
    page.click('#orderSubmitBtn'); page.wait_for_timeout(600)
    if not pc: fit_height(page, 1200)
    save(page.screenshot(), 'wh-done-' + suffix)
    # 계좌이체 주문 완료
    goto_item(page, 'wholesale-cart')
    page.evaluate("""() => { if (!CART.some(c => findMarketProduct(c.code).sellerName === '365청과 수원점')) CART.push({code: 'P0105', qty: 1}); }""")
    open_order(page, '365청과 수원점')
    # 공급자부담 설정 공급자: 카드결제를 골라도 수수료 안내·결제수수료 없음
    ids = page.evaluate("[...document.querySelectorAll('.form-section')].map(s => s.querySelector('.form-section-title').innerText)")
    page.evaluate("([a, c]) => { const f = document.querySelectorAll('.form-section'); f[a].id = 'sec-pay'; f[c].id = 'sec-sum'; }", [ids.index('결제수단'), ids.index('결제금액 요약')])
    clip_shot(page, ['#sec-pay', '#sec-sum'], 'wh-order-nofee-' + suffix, pad=16)
    pick(page, 'orderPayMethod', 'transfer')
    page.click('#orderSubmitBtn'); page.wait_for_timeout(600)
    if not pc: fit_height(page, 1200)
    done_titles = page.evaluate("[...document.querySelectorAll('.form-section')].map(s => { const h = s.querySelector('.form-section-title'); return h ? h.innerText.trim() : ''; })")
    print('wh-done-transfer sections:', done_titles)
    tag_section(page, '결제 정보', 'sec-done-pay')
    clip_shot(page, ['#sec-done-pay'], 'wh-done-transfer-' + suffix, pad=16)
    # 빈 장바구니
    page.evaluate("CART.splice(0)")
    goto_item(page, 'wholesale-cart')
    clip_shot(page, ['.grid12 > .card'], 'wh-cart-empty-' + suffix, pad=0, x=0, w=vp['width'])

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

    # 기간 직접 선택
    page.evaluate("document.querySelector('[data-order-history-period=custom]').click()")
    page.wait_for_timeout(300)
    page.fill('#orderHistoryDateFrom', '2026-09-01'); page.wait_for_timeout(300)
    page.fill('#orderHistoryDateTo', '2026-09-20'); page.wait_for_timeout(300)
    clip_shot(page, ['.tab-row-sub', '.tab-row'], 'wh-orders-period-' + device, pad=16)
    page.evaluate("document.querySelector('[data-order-history-period=all]').click()")
    page.wait_for_timeout(300)

    # 행 단위 캡처 — 필요한 컬럼(항목)만 남기고 선택한 주문만 표시
    def rows(orders, name):
        if pc:
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
            clip_shot(page, ['.tpl-table'], name + '-pc', pad=6)
        else:
            keep_cards(page, '주문번호', orders, ['주문일시', '공급자', '상품정보', '합계금액'])
            clip_shot(page, ['.rows-keep'], name + '-mobile', pad=6)
        page.reload(); page.wait_for_timeout(300)

    def reopen():
        login(page); go_menu(page, '주문내역')
        if pc: page.add_style_tag(content=PC_CSS)
    rows(['WO20260919014', 'WO20260912015', 'WO20260919016', 'WO20260912021', 'WO20260916011', 'WO20260910008'], 'wh-orders-rows-action')
    reopen()
    rows(['WO20260911009', 'WO20260909010', 'WO20260906006', 'WO20260918007'], 'wh-orders-rows-claim')
    reopen()

    # ---- 팝업: 주문취소(즉시) / 취소요청 / 반품요청 / 배송확정(알럿, PC만) ----
    goto_item(page, 'wholesale-order-status')
    if pc:
        page.evaluate("document.querySelector('[data-buyer-cancel-open=WO20260919014]').click()")
        modal_shot(page, 'wh-pop-cancel-pc')
        page.evaluate("document.getElementById('buyerCancelCloseBtn').click()")
        page.evaluate("document.querySelector('[data-buyer-cancel-open=WO20260912015]').click()")
        modal_shot(page, 'wh-pop-cancel-wait-pc')
        page.evaluate("document.getElementById('buyerCancelCloseBtn').click()")
    page.evaluate("document.querySelector('[data-cr-open=WO20260919016]').click()")
    modal_shot(page, 'wh-pop-cancelreq-' + device)
    page.evaluate("document.getElementById('crModalCancelBtn').click()")
    page.evaluate("document.querySelector('[data-cr-open=WO20260916011]').click()")
    modal_shot(page, 'wh-pop-return-' + device)
    page.evaluate("document.getElementById('crModalCancelBtn').click()")
    if pc:
        page.evaluate("document.querySelector('[data-delivery-confirm=WO20260916011]').click()")
        modal_shot(page, 'wh-pop-confirm-pc')
        page.evaluate("document.getElementById('deliveryModalCancelBtn').click()")
    # 계좌이체 요청 입력 오류
    page.evaluate("document.querySelector('[data-cr-open=WO20260919016]').click()")
    page.evaluate("document.getElementById('crModalSubmitBtn').click()")
    modal_shot(page, 'wh-pop-cancelreq-error-' + device)
    page.evaluate("document.getElementById('crModalCancelBtn').click()")

    # ---- 주문 상세 (배송중) ----
    def detail(no):
        goto_item(page, 'wholesale-order-detail', orderNo=no)
        if not pc: fit_height(page, 1200)
    detail('WO20260916011')
    save(page.screenshot(), 'wh-od-' + device)
    tag_section(page, '배송 정보', 'sec-ship')
    clip_shot(page, ['#sec-ship'], 'wh-od-ship-' + device, pad=16)
    # 취소·반품 정보가 있는 주문
    for no, name in (('WO20260911009', 'wh-od-claim-req-'), ('WO20260909010', 'wh-od-claim-done-')):
        detail(no)
        tag_section(page, '취소·반품 정보', 'sec-cr')
        clip_shot(page, ['#sec-cr'], name + device, pad=16)
    # 바로 취소(결제 완료 후): 결제상태에 환불구분·취소 일시·결제완료 일시 표기
    detail('WO20260918007')
    tag_section(page, '결제 정보', 'sec-pay')
    clip_shot(page, ['#sec-pay'], 'wh-od-paid-cancel-' + device, pad=16)
    # 입금 전 주문을 취소한 주문: 환불 없이 결제취소
    goto_item(page, 'wholesale-order-status')
    page.evaluate("document.querySelector('[data-buyer-cancel-open=WO20260912015]').click()")
    page.wait_for_timeout(300)
    page.evaluate("document.getElementById('buyerCancelConfirmBtn').click()")
    page.wait_for_timeout(300)
    detail('WO20260912015')
    tag_section(page, '결제 정보', 'sec-pay'); tag_section(page, '취소·반품 정보', 'sec-cr')
    clip_shot(page, ['#sec-pay', '#sec-cr'], 'wh-od-cancel-unpaid-' + device, pad=16)
    ctx.close()


with sync_playwright() as p:
    b = p.chromium.launch()
    for d in ('pc', 'mobile'):
        if not ONLY or any('-orders-' in n or '-od-' in n or '-pop-' in n for n in ONLY if n.endswith(d)):
            run_orders(d, p, b)
        if not ONLY or any(not ('-orders-' in n or '-od-' in n or '-pop-' in n) for n in ONLY if n.endswith(d)):
            run(d, p, b)
    b.close()
