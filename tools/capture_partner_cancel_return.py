# 이용가이드 소매 > 주문목록 > 취소·반품 처리하기 팝업 캡처
# (mock/partner.html -> assets/img/partner/order-cancel-*.webp, order-return-*.webp)
# 사용: python3 tools/capture_partner_cancel_return.py   (ONLY=이름,이름 으로 일부만 저장)
# 기준: 계좌이체 픽업 주문(환불계좌 입력값이 보이는 주문)을 공통 기준으로 하고, 결제수단·수령방식이 다른 케이스만 해당 주문으로 촬영한다.
# 목업 파일은 수정하지 않고 캡처 중 메모리 상의 주문 데이터만 바꾼다.
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
import capture_partner_case_blocks as cb

CLOSE = "document.querySelectorAll('.modal-box').forEach(m => { let r = m; while (r.parentElement && r.parentElement !== document.body) r = r.parentElement; r.remove(); })"

def run(device, b):
    pc = device == 'pc'
    ctx = b.new_context(viewport={'width': 1440 if pc else 440, 'height': 1500 if pc else 2000}, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page(); cb.login(page)
    if pc: page.add_style_tag(content=cb.PC_CSS)

    def state(no, **v):
        page.evaluate("""([no, v]) => { const o = RETAIL_ORDER_LIST.find(x => x.orderNo === no); Object.assign(o, v);
          currentCat = 'retail'; currentItem = 'retail-order-list'; renderAll(); window.scrollTo(0, 0); }""", [no, v])
        page.wait_for_timeout(400)

    def popup(no, kind, name, setup=None):
        page.evaluate("([no, k]) => openRetailSupplierCrModal(no, k)", [no, kind])
        page.wait_for_timeout(400)
        if setup: page.evaluate(setup); page.wait_for_timeout(300)
        page.mouse.move(0, 0)
        bx = cb.bbox(page, ['.modal-box'])
        clip = {'x': max(0, bx['x'] - 40), 'y': max(0, bx['y'] - 40), 'width': bx['w'] + 80, 'height': bx['h'] + 80}
        cb.save(page.screenshot(clip=clip), name + '-' + device)
        page.evaluate(CLOSE)

    SET = "(sel, v) => { const e = document.querySelector('#retailSupplierCrModalRoot ' + sel); e.value = v; e.dispatchEvent(new Event('input', {bubbles: true})); }"
    def setv(sel, v): page.evaluate("([s, v]) => { const e = document.querySelector('#retailSupplierCrModalRoot ' + s); e.value = v; e.dispatchEvent(new Event('input', {bubbles: true})); }", [sel, v])

    # 대표 화면: 카드결제(정산 전) 픽업 주문 취소처리
    state('RO20260919101'); popup('RO20260919101', '취소', 'order-cancel')
    # 결제수단별: 계좌이체(공급자 직권, 환불계좌 입력) / 현장결제 / 결제대기
    state('RO20260919102', paymentStatus='결제완료', paidAt='26.09.19 16:00', processStatus='픽업대기')
    page.evaluate("openRetailSupplierCrModal('RO20260919102','취소')"); page.wait_for_timeout(400)
    for s, v in [('input[id$=RefundBank]', '국민은행'), ('input[id$=RefundHolder]', '김영희'), ('input[id$=RefundAccount]', '12345678901')]: setv(s, v)
    page.mouse.move(0, 0); bx = cb.bbox(page, ['.modal-box'])
    cb.save(page.screenshot(clip={'x': max(0, bx['x'] - 40), 'y': max(0, bx['y'] - 40), 'width': bx['w'] + 80, 'height': bx['h'] + 80}), 'order-cancel-transfer-' + device)
    # 부분환불(계좌이체·픽업): 총환불금액 직접 입력
    page.evaluate("document.querySelector('#retailSupplierCrModalRoot input[type=radio][value=partial]').click()")
    setv('input[id$=TotalRefundAmount]', '30000'); page.wait_for_timeout(300)
    page.mouse.move(0, 0); bx = cb.bbox(page, ['.modal-box'])
    cb.save(page.screenshot(clip={'x': max(0, bx['x'] - 40), 'y': max(0, bx['y'] - 40), 'width': bx['w'] + 80, 'height': bx['h'] + 80}), 'order-cancel-partial-' + device)
    page.evaluate(CLOSE)
    state('RO20260918004', paymentStatus='결제완료', paidAt='26.09.18 15:00'); popup('RO20260918004', '취소', 'order-cancel-paid')
    state('RO20260918002'); popup('RO20260918002', '취소', 'order-cancel-unpaid')
    # 부분환불(카드·배달): 상품환불금액 + 배달비 포함
    state('RO20260919103')
    popup('RO20260919103', '취소', 'order-cancel-partial-card', """() => {
      const r = document.querySelector('#retailSupplierCrModalRoot');
      r.querySelector('input[type=radio][value=partial]').click();
      const e = r.querySelector('input[id$=ProductRefundAmount]'); e.value = '20000'; e.dispatchEvent(new Event('input', {bubbles: true})); }""")
    # 입력 오류: 카드결제 픽업 주문, 부분환불 0원 + 반환 예금주 비움
    state('RO20260919101')
    popup('RO20260919101', '취소', 'order-cancel-error', """() => {
      const r = document.querySelector('#retailSupplierCrModalRoot');
      r.querySelector('input[type=radio][value=partial]').click();
      for (const [sel, v] of [['input[id$=TotalRefundAmount]', '0'], ['input[id$=ReturnHolder]', '']]) { const e = r.querySelector(sel); e.disabled = false; e.value = v; e.dispatchEvent(new Event('input', {bubbles: true})); } }""")
    # 구매자 요청: 승인 / 반려 (계좌이체 취소요청 주문)
    state('RO20260919001'); popup('RO20260919001', '취소', 'order-cancel-request')
    popup('RO20260919001', '취소', 'order-cancel-reject', "() => document.querySelector('#retailSupplierCrModalRoot input[name=retailSupplierCrDecision][value=취소반려]').click()")
    # 노쇼후보: 픽업가능종료일이 지난 계좌이체 픽업대기 주문
    state('RO20260918002', paymentStatus='결제완료', paidAt='26.09.18 12:00', processStatus='픽업대기', pickupEndDate='2026-09-10')
    popup('RO20260918002', '취소', 'order-cancel-noshow')
    # 완료 후 직권 반품: 같은 주문을 픽업완료로
    state('RO20260918002', processStatus='픽업완료', pickupEndDate='2026-09-30')
    popup('RO20260918002', '반품', 'order-return')
    # 정산 후 카드결제 취소 처리 직후 토스트
    state('RO20260916104')
    page.evaluate("openRetailSupplierCrModal('RO20260916104','취소')"); page.wait_for_timeout(400)
    page.evaluate("document.querySelector('#retailSupplierCrModalSubmitBtn').click()"); page.wait_for_timeout(500)
    page.mouse.move(0, 0)
    t = cb.bbox(page, ['.bulk-toast', '.toast', '[class*=toast]'])
    print('toast', t)
    if t['w'] > 0:
        vw = page.viewport_size['width']
        if vw < 800: x, w = 0, vw
        else: x, w = max(0, t['x'] - 80), t['w'] + 160
        cb.save(page.screenshot(clip={'x': x, 'y': max(0, t['y'] - 70), 'width': w, 'height': t['h'] + 140}), 'order-cancel-settled-toast-' + device)
    ctx.close()

if __name__ == '__main__':
    with sync_playwright() as p:
        b = p.chromium.launch()
        for d in ('pc', 'mobile'): run(d, b)
        b.close()
