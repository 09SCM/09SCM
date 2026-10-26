# 이용가이드 소매관리 > 주문목록 > 주문목록 보기 대표 화면 (mock/partner.html -> assets/img/partner/order-list-{pc,mobile}.webp)
# 사용: python3 tools/capture_partner_order_list.py
# 규격: PC 1440×1500(LNB 제외), 모바일 440×1200, 2배 해상도
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
import capture_partner_case_blocks as cb

def run(device, b):
    pc = device == 'pc'
    ctx = b.new_context(viewport={'width': 1440 if pc else 440, 'height': 1500 if pc else 1200}, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page(); cb.login(page)
    if pc: page.add_style_tag(content=cb.PC_CSS)
    cb.go_menu(page, '소매관리', '주문목록')
    page.evaluate("window.scrollTo(0, 0)"); page.mouse.move(0, 0); page.wait_for_timeout(500)
    cb.save(page.screenshot(), 'order-list-' + device)
    ctx.close()

if __name__ == '__main__':
    with sync_playwright() as p:
        b = p.chromium.launch()
        for d in ('pc', 'mobile'): run(d, b)
        b.close()
