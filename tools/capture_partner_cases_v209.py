# 이용가이드 v209 케이스 보강 캡처: 소매 주문 상세(승인·결제대기 취소·반려), 도매 주문 상세(반려)·배송확정(결제대기)
# (mock/partner.html -> assets/img/partner/*.webp)
# 사용: python3 tools/capture_partner_cases_v209.py   (ONLY=이름,이름 으로 일부만 저장)
# 규격: 섹션 크롭 16px 여백(모바일은 화면 폭 전체), 하단 바 크롭 위쪽 28px 여백, 2배 해상도
# 목업 파일은 수정하지 않고, 목업 시드에 없는 상태는 캡처 중 메모리 상의 데이터만 바꿔 만든다.
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
import capture_partner_case_blocks as cb

PC_CSS = cb.PC_CSS

def tag_section(page, title, sid):
    idx = page.evaluate("(t) => [...document.querySelectorAll('.form-section')].findIndex(s => s.querySelector('.form-section-title').innerText.trim() === t)", title)
    if idx < 0: raise SystemExit('섹션 없음: ' + title)
    page.evaluate("([i, id]) => { document.querySelectorAll('.form-section')[i].id = id; }", [idx, sid])

def run(device, b):
    pc = device == 'pc'
    ctx = b.new_context(viewport={'width': 1440 if pc else 440, 'height': 1500 if pc else 1200}, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page(); cb.login(page)
    if pc: page.add_style_tag(content=PC_CSS)

    def retail_detail(no):
        page.evaluate("(no) => { currentCat = 'retail'; currentRetailOrderDetailNo = no; currentItem = 'retail-order-detail'; renderAll(); window.scrollTo(0, 0); }", no)
        page.wait_for_timeout(500); page.mouse.move(0, 0)
        cb.fit_height(page, 1500 if pc else 700)

    # 소매 ① 취소·반품이 승인된 주문 (공급자 직권 취소승인)
    retail_detail('RO20260914001')
    cb.sec_shot(page, None, 'order-detail-approved-sec-' + device, ['취소·반품 정보'])
    # 소매 ③ 결제대기 주문이 취소된 경우 (구매자 즉시취소) — 시드에 없어 메모리에서만 상태를 만든다
    page.evaluate("""() => {
      const o = RETAIL_ORDER_LIST.find(x => x.orderNo === 'RO20260919102');
      Object.assign(o, {paymentStatus: '결제취소', processStatus: null, cancelReturnStatus: '취소승인', cancelReturnPrevStatus: '주문접수',
        cancelReturnInitiator: 'buyer', cancelReturnReason: null, cancelReturnRequestedAt: '26.09.19 16:00', cancelReturnResolvedAt: '26.09.19 16:00',
        cancelReturnSellerNote: null, cancelReturnStockRestored: true}); }""")
    retail_detail('RO20260919102')
    cb.sec_shot(page, None, 'order-detail-unpaid-cancel-sec-' + device, ['결제정보', '취소·반품 정보'])
    # 소매 ④ 취소·반품이 반려된 주문 (반품반려 → 배달완료 복귀)
    retail_detail('RO20260913001')
    cb.sec_shot(page, None, 'order-detail-reject-sec-' + device, ['배달정보', '결제정보', '취소·반품 정보'])
    cb.bar_shot(page, 'order-detail-reject-bar-' + device)

    # 도매 ④ 취소·반품이 반려된 주문 (반품반려, 배송중)
    page.evaluate("() => { currentOrderDetailNo = 'WO20260913020'; currentOrderDetailFrom = 'wholesale-order-status'; currentItem = 'wholesale-order-detail'; renderAll(); window.scrollTo(0,0); }")
    page.wait_for_timeout(500); page.mouse.move(0, 0)
    if not pc: cb.fit_height(page, 1200)
    tag_section(page, '취소·반품 정보', 'sec-cr')
    cb.sec_shot(page, ['#sec-cr'], 'wh-od-claim-reject-' + device)

    # 도매 C 결제대기 주문 배송확정 팝업 (PC만) — 배송중 + 결제대기 상태를 메모리에서만 만든다
    if pc:
        page.evaluate("""() => {
          const o = ORDER_LIST.find(x => x.orderNo === 'WO20260916011');
          Object.assign(o, {paymentMethod: 'transfer', paymentStatus: '결제대기', paidAt: null, depositorName: '김영희'}); currentItem = 'wholesale-order-status'; renderAll(); }""")
        page.wait_for_timeout(500)
        page.evaluate("document.querySelector('[data-delivery-confirm=WO20260916011]').click()")
        page.wait_for_timeout(300)
        bx = cb.bbox(page, ['.modal-box'])
        clip = {'x': max(0, bx['x'] - 40), 'y': max(0, bx['y'] - 40), 'width': bx['w'] + 80, 'height': bx['h'] + 80}
        cb.save(page.screenshot(clip=clip), 'wh-pop-confirm-unpaid-pc')
    ctx.close()

if __name__ == '__main__':
    with sync_playwright() as p:
        b = p.chromium.launch()
        for d in ('pc', 'mobile'): run(d, b)
        b.close()
