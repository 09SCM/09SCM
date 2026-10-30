# 이용가이드 도매 > 주문접수관리(공급자) 캡처: 주문목록(대표·행·탭·일괄변경) / 주문 상세(섹션·하단 바) / 배송확정 팝업 / 취소·반품 처리 팝업
# (mock/partner.html -> assets/img/partner/wh-recv-*.webp)
# 사용: python3 tools/capture_partner_wh_receive.py   (ONLY=이름,이름 으로 일부만 저장 / 이름은 -pc,-mobile 제외한 접두)
# 기준: 공급자 계정은 bonsa1(우리마켓 본사). 샘플 주문은 목업 시드를 그대로 쓰고, 시드에 없는 조합만 캡처 중 메모리 상의 주문 데이터를 바꾼다(목업 파일은 수정하지 않는다).
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
import capture_partner_case_blocks as cb
import capture_partner_margin_fix as M

C = M.C
ONLY = set(os.environ.get('ONLY', '').split(',')) - {''}
def want(n): return not ONLY or n in ONLY
cb.ONLY = set(); C.ONLY = set()   # 저장 이름 필터는 이 스크립트의 want()로만 처리
_save = cb.save
def save(png, name):
    base = name.rsplit('-', 1)[0]
    if want(base): _save(png, name)
cb.save = save
C_save = C.save
def csave(png, name):
    base = name.rsplit('-', 1)[0]
    if want(base): C_save(png, name)
C.save = csave

CLOSE = "document.querySelectorAll('.modal-box').forEach(m => { let r = m; while (r.parentElement && r.parentElement !== document.body) r = r.parentElement; r.remove(); })"
SECS = ['배송 정보', '결제 정보', '취소·반품 정보']
LIST_HIDE = ['주문일시', '주문자', '상품정보', '합계금액']

def new_page(b, device, w=None, h=None):
    pc = device == 'pc'
    ctx = b.new_context(viewport={'width': w or (1440 if pc else 440), 'height': h or (1500 if pc else 1200)}, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page(); cb.login(page)
    if pc: page.add_style_tag(content=cb.PC_CSS)
    return ctx, page

def mutate(page, no, **v):
    page.evaluate("([no, v]) => { Object.assign(ORDER_LIST.find(x => x.orderNo === no), v); }", [no, v])

def open_list(page):
    page.evaluate("() => { currentCat = 'wholesale'; currentItem = 'wholesale-order-receive'; orderReceiveTab1 = 'all'; orderReceiveTab2 = 'all'; renderAll(); window.scrollTo(0, 0); }")
    page.wait_for_timeout(600); page.mouse.move(0, 0)

def detail(page, device, no, **v):
    page.evaluate("""([no, v]) => { const o = ORDER_LIST.find(x => x.orderNo === no); Object.assign(o, v);
      currentCat = 'wholesale'; currentOrderDetailNo = no; currentOrderDetailFrom = 'wholesale-order-receive'; currentItem = 'wholesale-order-detail'; renderAll(); window.scrollTo(0, 0); }""", [no, v])
    page.wait_for_timeout(500); page.mouse.move(0, 0)
    cb.fit_height(page, 1500 if device == 'pc' else 700)

def bar(page, name, device):
    if cb.bbox(page, ['.market-buybar', '.inline-confirm'])['w'] > 0: cb.bar_shot(page, name + '-' + device)
    else: print('no bar', name)

def modal(page, name, device):
    page.mouse.move(0, 0); page.wait_for_timeout(300)
    bx = cb.bbox(page, ['.modal-box'])
    cb.save(page.screenshot(clip={'x': max(0, bx['x'] - 40), 'y': max(0, bx['y'] - 40), 'width': bx['w'] + 80, 'height': bx['h'] + 80}), name + '-' + device)

def run_list(b, device):
    pc = device == 'pc'
    ctx, page = new_page(b, device, 1760 if pc else None)   # 컬럼 수가 많아 PC 표가 1440을 넘으므로 넓은 뷰포트 사용
    # 대표 화면
    open_list(page); cb.save(page.screenshot(), 'wh-recv-list-' + device)
    # 처리상태별 행 — 배송중·결제대기 조합은 시드에 없어 한 건을 바꿔 사용한다
    mutate(page, 'WO20260914021', paymentMethod='transfer', paymentStatus='결제대기', processStatus='배송중', settled=False)
    for name, keys in (('wh-recv-rows-process', ['WO20260915001', 'WO20260915002', 'WO20260914005', 'WO20260913012', 'WO20260914021', 'WO20260910003']),
                       ('wh-recv-rows-claim', ['WO20260915003', 'WO20260912007', 'WO20260913022', 'WO20260919018', 'WO20260913020', 'WO20260915004'])):
        if not want(name): continue
        open_list(page)
        M.rows_crop(page, device, name, '주문번호', keys, LIST_HIDE)
    # 결제 탭(2차) 환불대기
    if want('wh-recv-tab-refundwait'):
        open_list(page)
        page.evaluate("document.querySelector('[data-order-tab2=환불대기]').click()"); page.wait_for_timeout(500)
        page.evaluate("() => { document.querySelectorAll('.tpl-table tbody tr').forEach(tr => { tr.querySelectorAll('td').forEach((td, i) => { if ([2, 3, 4, 9].includes(i)) td.style.display = 'none'; }); }); document.querySelectorAll('.tpl-table thead th').forEach((th, i) => { if ([2, 3, 4, 9].includes(i)) th.style.display = 'none'; }); }")
        C.shot(page, 'wh-recv-tab-refundwait-' + device, ["document.querySelector('.tab-row-sub')", "document.querySelector('.tpl-table')"])
    ctx.close()
    # 일괄변경 알럿(PC만)
    if pc:
        ctx, page = new_page(b, device)
        def bulk(name, nos, label):
            open_list(page)
            page.evaluate("([nos]) => { wsOrderChecked.clear(); nos.forEach(n => wsOrderChecked.add(n)); renderAll(); }", [nos])
            page.evaluate("""(label) => { const s = document.getElementById('wsBulkSelect'); s.value = label; document.getElementById('wsBulkApplyBtn').click(); }""", label)
            page.wait_for_timeout(400)
            if cb.bbox(page, ['.modal-box'])['w'] > 0: modal(page, name, device)
            else: print('no alert', name)
            page.evaluate(CLOSE)
        # 모두 가능: 주문접수 건만 선택 / 일부: 주문접수+배송대기 / 불가: 배송확정·배송중 건
        bulk('wh-recv-bulk-none', [], '배송대기')
        bulk('wh-recv-bulk-noopt', ['WO20260915001'], '')
        bulk('wh-recv-bulk-all', ['WO20260915001', 'WO20260915002'], '배송대기')
        bulk('wh-recv-bulk-part', ['WO20260915002', 'WO20260914005'], '배송대기')
        bulk('wh-recv-bulk-fail', ['WO20260913012', 'WO20260910003'], '배송대기')
        ctx.close()

def run_detail(b, device):
    pc = device == 'pc'
    ctx, page = new_page(b, device, None, 2000 if pc else 2000)
    sec = lambda name, titles: cb.sec_shot(page, None, name + '-' + device, titles)
    # 대표: 배송중 · 카드결제
    detail(page, device, 'WO20260913012'); cb.save(page.screenshot(full_page=True), 'wh-recv-detail-' + device)
    # 처리상태·결제상태
    detail(page, device, 'WO20260915001'); sec('wh-recv-od-unpaid-sec', ['결제 정보']); bar(page, 'wh-recv-od-unpaid-bar', device)
    detail(page, device, 'WO20260914021', paymentMethod='transfer', paymentStatus='결제대기', processStatus='배송중', settled=False); bar(page, 'wh-recv-od-shipunpaid-bar', device)
    detail(page, device, 'WO20260913012'); sec('wh-recv-od-ship-sec', ['배송 정보']); bar(page, 'wh-recv-od-ship-bar', device)
    detail(page, device, 'WO20260910003', requestNote='배송 전 연락 부탁드립니다.'); sec('wh-recv-od-confirmed-sec', ['배송 정보']); bar(page, 'wh-recv-od-confirmed-bar', device)
    # 취소·반품 흐름: 요청 → 반려 → 승인
    detail(page, device, 'WO20260915003'); sec('wh-recv-od-claim-sec', SECS); bar(page, 'wh-recv-od-claim-bar', device)
    # 같은 흐름(요청 → 반려 → 승인)은 계좌이체 주문으로 맞춰 구매자 요청 사유·공급자 처리 사유·환불계좌가 모두 보이게 캡처
    detail(page, device, 'WO20260913020', paymentMethod='transfer', cardFeeAmount=0, cardFeeRate=0, grandTotal=147000, depositorName='온누리식자재',
           refundBank='신한은행', refundAccount='110333444555', refundHolder='온누리식자재'); sec('wh-recv-od-reject-sec', SECS); bar(page, 'wh-recv-od-reject-bar', device)
    detail(page, device, 'WO20260909004', paymentMethod='transfer', cardFeeAmount=0, cardFeeRate=0, grandTotal=68000, totalRefundAmount=68000, depositorName='건강밥상',
           refundBank='국민은행', refundAccount='123456789012', refundHolder='건강밥상'); sec('wh-recv-od-approved-sec', SECS); bar(page, 'wh-recv-od-approved-bar', device)
    # 결과: 결제취소(정산 전 카드) / 환불대기(정산 후 카드) / 결제대기 취소 / 배송확정 후 반품
    detail(page, device, 'WO20260909004', paymentMethod='card', cardFeeAmount=1820, cardFeeRate=2.8, grandTotal=69820, totalRefundAmount=69820, depositorName=None, refundBank=None, refundAccount=None, refundHolder=None, returnHolder='우리마켓 본사'); sec('wh-recv-od-done-sec', ['결제 정보', '취소·반품 정보'])
    detail(page, device, 'WO20260913022'); sec('wh-recv-od-refundwait-sec', ['결제 정보', '취소·반품 정보'])
    detail(page, device, 'WO20260915004', paymentStatus='결제취소', processStatus=None, cancelReturnStatus='취소승인', cancelReturnPrevStatus='주문접수', cancelReturnInitiator='supplier',
           cancelReturnRequestedAt='26.09.15 11:00', cancelReturnResolvedAt='26.09.15 11:00', cancelReturnSellerNote='입금 기한이 지나 취소 처리합니다.',
           cancelReturnReason=None, refundBank=None, refundAccount=None, refundHolder=None)
    sec('wh-recv-od-unpaid-cancel-sec', ['결제 정보', '취소·반품 정보'])
    detail(page, device, 'WO20260910003', paymentStatus='결제취소', processStatus=None, cancelReturnStatus='반품승인', cancelReturnPrevStatus='배송확정', cancelReturnInitiator='supplier',
           cancelReturnRequestedAt='26.09.20 14:00', cancelReturnResolvedAt='26.09.20 14:00', cancelReturnSellerNote='배송 후 상품 하자가 확인되어 반품 처리합니다.',
           refundType='full', productRefundAmount=45000, shippingFeeRefunded=True, cardFeeRefundAmount=1260, totalRefundAmount=49260, returnHolder='우리마켓 본사',
           cancelReturnReason=None)
    sec('wh-recv-od-confirmed-return-sec', SECS)
    ctx.close()

def run_status(b, device):
    ctx, page = new_page(b, device, None, 2000)
    # 배송확정 팝업: 결제완료 건 / 결제대기 건
    open_list(page)
    page.evaluate("document.querySelector('[data-supplier-delivery-confirm=WO20260913012]').click()"); page.wait_for_timeout(300)
    modal(page, 'wh-recv-confirm-ship', device); page.evaluate(CLOSE)
    mutate(page, 'WO20260914021', paymentMethod='transfer', paymentStatus='결제대기', processStatus='배송중', settled=False)
    open_list(page)
    page.evaluate("document.querySelector('[data-supplier-delivery-confirm=WO20260914021]').click()"); page.wait_for_timeout(300)
    modal(page, 'wh-recv-confirm-shipunpaid', device); page.evaluate(CLOSE)
    ctx.close()

def run_cancel(b, device):
    pc = device == 'pc'
    ctx, page = new_page(b, device, None, 2400)
    def state(no, **v):
        if v: mutate(page, no, **v)
        open_list(page)
    def popup(no, kind, name, setup=None):
        page.evaluate("([no, k]) => openSupplierCrModal(no, k)", [no, kind]); page.wait_for_timeout(400)
        if setup: page.evaluate(setup); page.wait_for_timeout(300)
        modal(page, name, device); page.evaluate(CLOSE)
    def setv(sel, v):
        page.evaluate("([s, v]) => { const e = document.querySelector('#supplierCrModalRoot ' + s); e.disabled = false; e.value = v; e.dispatchEvent(new Event('input', {bubbles: true})); }", [sel, v])
    def click(sel): page.evaluate("(s) => document.querySelector('#supplierCrModalRoot ' + s).click()", sel)

    # 대표: 카드결제(정산 전) · 구매자부담 수수료 · 주문접수 직권 취소
    state('WO20260915002'); popup('WO20260915002', '취소', 'wh-recv-cancel')
    # 결제수단별: 계좌이체 결제완료(환불계좌 입력) / 결제대기
    page.evaluate("openSupplierCrModal('WO20260914005','취소')"); page.wait_for_timeout(400)
    for s, v in [('#supplierCrRefundBank', '국민은행'), ('#supplierCrRefundHolder', '김영희'), ('#supplierCrRefundAccount', '12345678901')]: setv(s, v)
    modal(page, 'wh-recv-cancel-transfer', device); page.evaluate(CLOSE)
    popup('WO20260915001', '취소', 'wh-recv-cancel-unpaid')
    # 카드 부분환불(구매자부담): 상품환불금액 + 수수료환불금액 + 배송비 포함
    partial = """() => {
      const r = document.querySelector('#supplierCrModalRoot'); r.querySelector('input[type=radio][value=partial]').click();
      const e = r.querySelector('#supplierCrProductRefundAmount'); e.value = '20000'; e.dispatchEvent(new Event('input', {bubbles: true})); }"""
    popup('WO20260915002', '취소', 'wh-recv-cancel-partial', partial)
    # 카드 부분환불(공급자부담): 수수료환불금액 항목 없음
    mutate(page, 'WO20260915002', cardFeeAmount=0)
    page.evaluate("() => { const o = ORDER_LIST.find(x => x.orderNo === 'WO20260915002'); o.grandTotal = o.itemsTotal + o.shippingFee; }")
    popup('WO20260915002', '취소', 'wh-recv-cancel-partial-feeseller', partial)
    page.evaluate("() => { const o = ORDER_LIST.find(x => x.orderNo === 'WO20260915002'); o.cardFeeAmount = Math.round(o.itemsTotal * 0.028); o.grandTotal = o.itemsTotal + o.shippingFee + o.cardFeeAmount; }")
    # 계좌이체 부분환불: 환불계좌 입력
    page.evaluate("openSupplierCrModal('WO20260914005','취소')"); page.wait_for_timeout(400)
    for s_, v in [('#supplierCrRefundBank', '국민은행'), ('#supplierCrRefundHolder', '김영희'), ('#supplierCrRefundAccount', '12345678901')]: setv(s_, v)
    page.evaluate(partial); page.wait_for_timeout(300)
    modal(page, 'wh-recv-cancel-partial-transfer', device); page.evaluate(CLOSE)
    # 입력 오류: 부분환불 0원 + 반환 예금주 비움
    popup('WO20260915002', '취소', 'wh-recv-cancel-error', """() => {
      const r = document.querySelector('#supplierCrModalRoot'); r.querySelector('input[type=radio][value=partial]').click();
      const e = r.querySelector('#supplierCrProductRefundAmount'); e.value = '0'; e.dispatchEvent(new Event('input', {bubbles: true}));
      const sh = r.querySelector('#supplierCrShipIncluded'); if (sh && sh.checked) sh.click();
      const h = r.querySelector('#supplierCrReturnHolder'); h.value = ''; h.dispatchEvent(new Event('input', {bubbles: true})); }""")
    # 정산 후 카드결제: 같은 팝업, 승인 후 토스트 + 환불대기
    popup('WO20260914021', '취소', 'wh-recv-cancel-settled')
    if pc:
        page.evaluate("openSupplierCrModal('WO20260914021','취소')"); page.wait_for_timeout(400)
        page.evaluate("document.querySelector('#supplierCrModalRoot #supplierCrModalSubmitBtn').click()"); page.wait_for_timeout(400)
        cb.sec_shot(page, ['.bulk-toast'], 'wh-recv-cancel-settled-toast-' + device)
    # 구매자 요청: 승인 / 반려 (계좌이체 취소요청)
    open_list(page)
    popup('WO20260915003', '취소', 'wh-recv-cancel-request')
    popup('WO20260915003', '취소', 'wh-recv-cancel-reject', "() => document.querySelector('#supplierCrModalRoot input[name=supplierCrDecision][value=취소반려]').click()")
    # 반품: 배송중 직권(카드) / 배송확정 후 직권 / 구매자 요청 승인
    open_list(page)
    popup('WO20260913012', '반품', 'wh-recv-return')
    popup('WO20260910003', '반품', 'wh-recv-return-confirmed')
    popup('WO20260912007', '반품', 'wh-recv-return-request')
    ctx.close()

if __name__ == '__main__':
    with sync_playwright() as p:
        b = p.chromium.launch()
        for d in ('pc', 'mobile'):
            if any(want(n) for n in ('wh-recv-list', 'wh-recv-rows-process', 'wh-recv-rows-claim', 'wh-recv-tab-refundwait', 'wh-recv-bulk-none', 'wh-recv-bulk-noopt', 'wh-recv-bulk-all', 'wh-recv-bulk-part', 'wh-recv-bulk-fail')) or not ONLY: run_list(b, d)
            run_detail(b, d); run_status(b, d); run_cancel(b, d)
        b.close()
