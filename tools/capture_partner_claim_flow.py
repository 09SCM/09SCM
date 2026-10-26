# 이용가이드 소매 > 주문목록 > 주문 상세 보기 > "취소·반품 처리 흐름에 따라" 3케이스 캡처(요청 → 반려 → 승인, 취소 주문으로 촬영하고 설명은 취소·반품 공통)
# (mock/partner.html -> assets/img/partner/order-detail-{claim,reject,approved}-{sec,bar}-*.webp, order-detail-done-bar-*.webp)
# 사용: python3 tools/capture_partner_claim_flow.py   (ONLY=이름,이름 으로 일부만 저장)
# 기준: 3케이스 모두 같은 주문(픽업·계좌이체·환불계좌 있음)으로 촬영해 입력값이 모두 보이게 한다. 영역은 픽업정보·결제정보·취소·반품 정보.
# 목업 파일은 수정하지 않고 캡처 중 메모리 상의 주문 데이터만 바꾼다.
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
import capture_partner_case_blocks as cb

SECS = ['픽업정보', '결제정보', '취소·반품 정보']
NO = 'RO20260919001'

def run(device, b):
    pc = device == 'pc'
    ctx = b.new_context(viewport={'width': 1440 if pc else 440, 'height': 1500 if pc else 1200}, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page(); cb.login(page)
    if pc: page.add_style_tag(content=cb.PC_CSS)

    def state(**v):
        page.evaluate("""([no, v]) => { const o = RETAIL_ORDER_LIST.find(x => x.orderNo === no); Object.assign(o, v);
          currentCat = 'retail'; currentRetailOrderDetailNo = no; currentItem = 'retail-order-detail'; renderAll(); window.scrollTo(0, 0); }""", [NO, v])
        page.wait_for_timeout(500); page.mouse.move(0, 0)
        cb.fit_height(page, 1500 if pc else 700)

    state(paymentStatus='결제완료')
    cb.sec_shot(page, None, 'order-detail-claim-sec-' + device, SECS); cb.bar_shot(page, 'order-detail-claim-bar-' + device)
    state(cancelReturnStatus='취소반려', processStatus='주문접수', cancelReturnResolvedAt='26.09.19 19:00',
          cancelReturnSellerNote='픽업 가능 기간이 남아 있어 취소를 반려합니다.')
    cb.sec_shot(page, None, 'order-detail-reject-sec-' + device, SECS); cb.bar_shot(page, 'order-detail-reject-bar-' + device)
    state(cancelReturnStatus='취소승인', processStatus=None, paymentStatus='결제취소', cancelReturnResolvedAt='26.09.19 19:30',
          cancelReturnSellerNote='고객 요청에 따라 취소를 승인합니다.', refundType='full', totalRefundAmount=8000, cancelReturnStockRestored=True)
    cb.sec_shot(page, None, 'order-detail-approved-sec-' + device, SECS); cb.bar_shot(page, 'order-detail-done-bar-' + device)

    # 정산 후 카드결제 취소 → 환불대기 (결제정보 + 취소·반품 정보, 안내 배너·반환 예금주 포함)
    page.evaluate("""(no) => { currentCat = 'retail'; currentRetailOrderDetailNo = no; currentItem = 'retail-order-detail'; renderAll(); window.scrollTo(0, 0); }""", 'RO20260916105')
    page.wait_for_timeout(500); page.mouse.move(0, 0); cb.fit_height(page, 1500 if pc else 700)
    cb.sec_shot(page, None, 'order-detail-refundwait-sec-' + device, ['결제정보', '취소·반품 정보'])
    ctx.close()

if __name__ == '__main__':
    with sync_playwright() as p:
        b = p.chromium.launch()
        for d in ('pc', 'mobile'): run(d, b)
        b.close()
