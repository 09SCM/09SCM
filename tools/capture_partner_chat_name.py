# 소매정보 등록하기 > 채팅주문상품명을 입력할 때 캡처 (mock/partner.html -> assets/img/partner/product-chatname-{pc,mobile}.webp) — 목업 미수정
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
import capture_partner_case_sections as cs

def run(device, b):
    pc = device == 'pc'
    ctx = b.new_context(viewport={'width': 1440 if pc else 440, 'height': 1500 if pc else 1200}, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page(); cs.login(page)
    if pc: page.add_style_tag(content=cs.PC_CSS)
    cs.go_menu(page, '소매관리', '상품관리')
    page.evaluate("[...document.querySelectorAll('[data-retail-register]')].find(b => b.dataset.code === 'P0305').click()"); page.wait_for_timeout(600)
    page.check('#rtlChatOrderEnabled'); page.wait_for_timeout(200)
    page.fill('#rtlChatOrderName', '못난이사과'); page.click('#rtlChatOrderDupCheckBtn'); page.wait_for_timeout(300)
    print(device, page.inner_text('#rtlChatOrderDupResult'))
    cs.fit_height(page, 1500 if pc else 700)
    cs.shot(page, 'product-chatname-' + device, ["document.querySelector('input[name=\"rtlSalesMethod\"]').closest('.form-field')", "document.getElementById('rtlChatOrderBlock')", "document.getElementById('rtlChatOrderNameField')"])
    ctx.close()

if __name__ == '__main__':
    with sync_playwright() as p:
        b = p.chromium.launch()
        for d in ('pc', 'mobile'): run(d, b)
        b.close()
