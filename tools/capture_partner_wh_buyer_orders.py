# 이용가이드 도매 > 주문내역(구매자) 소매와 통일 캡처: 주문 상세 흐름·결과 영역, 정산 후 즉시취소 실패, 반품요청 팝업
# (mock/partner.html -> assets/img/partner/wh-od-*, wh-pop-*.webp)
# 사용: python3 tools/capture_partner_wh_buyer_orders.py   (ONLY=이름,이름 으로 일부만 저장)
# 기준: 취소·반품 처리 흐름(요청 → 반려 → 승인)은 같은 계좌이체 주문(WO20260911009, 환불계좌·요청 사유·처리 사유가 모두 보이는 주문)으로 촬영한다.
# 목업 파일은 수정하지 않고 캡처 중 메모리 상의 주문 데이터만 바꾼다.
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
import capture_partner_case_blocks as cb

SECS = ['배송 정보', '결제 정보', '취소·반품 정보']
NO = 'WO20260911009'
REFUNDWAIT = """() => { const o = ORDER_LIST.find(x => x.orderNo === 'WO20260914023'); Object.assign(o, {paymentStatus: '환불대기', processStatus: null,
  cancelReturnStatus: '취소승인', cancelReturnPrevStatus: '주문접수', cancelReturnInitiator: 'supplier', cancelReturnReason: null,
  cancelReturnRequestedAt: '26.09.15 10:00', cancelReturnResolvedAt: '26.09.15 10:00', cancelReturnSellerNote: '재고 부족으로 취소 처리합니다.',
  refundType: 'full', productRefundAmount: 24000, shippingFeeRefunded: true, cardFeeRefundAmount: 672, totalRefundAmount: 27672, returnHolder: '우리마켓 본사'}); }"""

def run(device, b):
    pc = device == 'pc'
    ctx = b.new_context(viewport={'width': 1440 if pc else 440, 'height': 1500 if pc else 2000}, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page(); cb.login(page)
    if pc: page.add_style_tag(content=cb.PC_CSS)

    def detail(no, **v):
        page.evaluate("""([no, v]) => { const o = ORDER_LIST.find(x => x.orderNo === no); Object.assign(o, v);
          currentCat = 'wholesale'; currentOrderDetailNo = no; currentOrderDetailFrom = 'wholesale-order-status'; currentItem = 'wholesale-order-detail'; renderAll(); window.scrollTo(0, 0); }""", [no, v])
        page.wait_for_timeout(500); page.mouse.move(0, 0)
        cb.fit_height(page, 1500 if pc else 700)

    def bar(name):
        if cb.bbox(page, ['.market-buybar', '.inline-confirm'])['w'] > 0: cb.bar_shot(page, name + '-' + device)
        else: print('no bar', name)

    def modal(name):
        page.mouse.move(0, 0); page.wait_for_timeout(300)
        bx = cb.bbox(page, ['.modal-box'])
        cb.save(page.screenshot(clip={'x': max(0, bx['x'] - 40), 'y': max(0, bx['y'] - 40), 'width': bx['w'] + 80, 'height': bx['h'] + 80}), name + '-' + device)

    # 취소·반품 처리 흐름: 요청 → 반려(반품) → 승인, 같은 계좌이체 주문
    detail(NO); cb.sec_shot(page, None, 'wh-od-claim-req-sec-' + device, SECS); bar('wh-od-claim-req-bar')
    detail(NO, processStatus='배송중', cancelReturnStatus='반품반려', cancelReturnResolvedAt='26.09.13 18:00', processedAt='26.09.13 18:00',
           cancelReturnSellerNote='포장 상태를 확인한 결과 반품 사유에 해당하지 않아 반려합니다.')
    cb.sec_shot(page, None, 'wh-od-claim-reject-sec-' + device, SECS); bar('wh-od-claim-reject-bar')
    detail(NO, processStatus=None, paymentStatus='결제취소', cancelReturnStatus='반품승인', cancelReturnResolvedAt='26.09.14 10:00',
           cancelReturnSellerNote='상태를 확인해 반품을 승인합니다.', refundType='full', productRefundAmount=320000, shippingFeeRefunded=True, totalRefundAmount=326000)
    cb.sec_shot(page, None, 'wh-od-claim-done-sec-' + device, SECS); bar('wh-od-claim-done-bar')
    # 취소요청 반려(주문접수 복귀)
    detail('WO20260906006'); cb.sec_shot(page, None, 'wh-od-cancel-reject-sec-' + device, SECS); bar('wh-od-cancel-reject-bar')
    # 배송확정된 주문
    detail('WO20260910008'); cb.sec_shot(page, None, 'wh-od-confirmed-sec-' + device, ['배송 정보']); bar('wh-od-confirmed-bar')
    # 결과: 결제완료 주문이 취소·반품되면(카드·정산 전, 반환 예금주 표시) / 정산 후 카드결제 → 환불대기
    detail('WO20260909010', returnHolder='우리마켓 본사'); cb.sec_shot(page, None, 'wh-od-done-sec-' + device, ['결제 정보', '취소·반품 정보'])
    page.evaluate(REFUNDWAIT); detail('WO20260914023'); cb.sec_shot(page, None, 'wh-od-refundwait-sec-' + device, ['결제 정보', '취소·반품 정보'])

    # 팝업: 정산 후 카드 즉시취소 실패 알럿(PC), 카드·계좌이체 반품요청
    page.evaluate("() => { ORDER_LIST.find(x => x.orderNo === 'WO20260914023').paymentStatus = '결제완료'; currentItem = 'wholesale-order-status'; renderAll(); }")
    ORD = {}
    # 정산 후 즉시취소: 환불대기 변형 전에 원본 상태 필요 → 새 컨텍스트에서 처리
    ctx.close()
    ctx = b.new_context(viewport={'width': 1440 if pc else 440, 'height': 1500 if pc else 2000}, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page(); cb.login(page)
    if pc: page.add_style_tag(content=cb.PC_CSS)
    page.evaluate("() => { currentCat = 'wholesale'; currentItem = 'wholesale-order-status'; renderAll(); }"); page.wait_for_timeout(500)
    if pc:
        page.evaluate("document.querySelector('[data-buyer-cancel-open=WO20260914023]').click()"); page.wait_for_timeout(300)
        page.evaluate("document.getElementById('buyerCancelConfirmBtn').click()"); page.wait_for_timeout(400)
        modal('wh-pop-cancel-settled')
        page.evaluate("document.querySelectorAll('.modal-box').forEach(m => { let r = m; while (r.parentElement && r.parentElement !== document.body) r = r.parentElement; r.remove(); })")
    page.evaluate("document.querySelector('[data-cr-open=WO20260916011]').click()"); page.wait_for_timeout(300); modal('wh-pop-return')
    page.evaluate("document.getElementById('crModalCancelBtn').click()")
    page.evaluate("document.querySelector('[data-cr-open=WO20260917003]').click()"); page.wait_for_timeout(300); modal('wh-pop-return-transfer')
    page.evaluate("document.getElementById('crModalSubmitBtn').click()"); page.wait_for_timeout(300); modal('wh-pop-returnreq-error')
    ctx.close()

if __name__ == '__main__':
    with sync_playwright() as p:
        b = p.chromium.launch()
        for d in ('pc', 'mobile'): run(d, b)
        b.close()
