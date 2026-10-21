# 도매 반품요청 입력 오류 화면 캡처 (계좌이체 주문, 메모리 상의 결제수단만 변경 — 목업 파일은 수정하지 않음)
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
import capture_partner_case_blocks as cb

def run(device, b):
    pc = device == 'pc'
    ctx = b.new_context(viewport={'width': 1440 if pc else 440, 'height': 1500 if pc else 1200}, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page(); cb.login(page)
    page.evaluate("() => { ORDER_LIST.find(x => x.orderNo === 'WO20260916011').paymentMethod = 'transfer'; currentCat = 'wholesale'; currentItem = 'wholesale-order-status'; renderAll(); }")
    page.wait_for_timeout(500)
    if pc: page.add_style_tag(content=cb.PC_CSS)
    page.evaluate("document.querySelector('[data-cr-open=WO20260916011]').click()")
    page.evaluate("document.getElementById('crModalSubmitBtn').click()")
    page.wait_for_timeout(300)
    b0 = cb.bbox(page, ['.modal-box'])
    clip = {'x': max(0, b0['x'] - 40), 'y': max(0, b0['y'] - 40), 'width': b0['w'] + 80, 'height': b0['h'] + 80}
    cb.save(page.screenshot(clip=clip), 'wh-pop-returnreq-error-' + device)
    ctx.close()

with sync_playwright() as p:
    b = p.chromium.launch()
    for d in ('pc', 'mobile'): run(d, b)
    b.close()
