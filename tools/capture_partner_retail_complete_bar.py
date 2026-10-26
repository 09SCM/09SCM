# 소매 주문 상세 — 픽업·배달 완료된 주문의 하단 바 캡처 (mock/partner.html -> assets/img/partner/order-detail-complete-bar-*.webp)
# 사용: python3 tools/capture_partner_retail_complete_bar.py   / 목업은 수정하지 않는다.
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
import capture_partner_case_blocks as cb

def run(device, b):
    pc = device == 'pc'
    ctx = b.new_context(viewport={'width': 1440 if pc else 440, 'height': 1500 if pc else 1200}, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page(); cb.login(page)
    if pc: page.add_style_tag(content=cb.PC_CSS)
    page.evaluate("(no) => { currentCat = 'retail'; currentRetailOrderDetailNo = no; currentItem = 'retail-order-detail'; renderAll(); window.scrollTo(0, 0); }", 'RO20260918001')
    page.wait_for_timeout(500); page.mouse.move(0, 0)
    cb.fit_height(page, 1500 if pc else 700)
    cb.bar_shot(page, 'order-detail-complete-bar-' + device)
    ctx.close()

with sync_playwright() as p:
    b = p.chromium.launch()
    for d in ('pc', 'mobile'): run(d, b)
    b.close()
