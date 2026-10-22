# 이미지 업로드 안내(업로더 아래 인라인) 캡처 — product-register-imgerr-{pc,mobile}(소매정보 등록), wh-mine-reg-imgerr-{pc,mobile}(도매상품 등록). 목업 미수정(안내는 목업의 imageUploaderError로 표시)
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
import capture_partner_case_sections as cs

MSG = 'JPG, PNG, WEBP 이미지 파일만 등록할 수 있습니다.'

def shoot(page, name, pc):
    page.evaluate("""(msg) => { const r = document.querySelector('[data-img-uploader]'); imageUploaderError(r, msg);
      r.closest('.form-field').id = 'c-img'; }""", MSG)
    cs.fit_height(page, 1500 if pc else 700)
    cs.shot(page, name, ["document.getElementById('c-img')"])

def run(device, b):
    pc = device == 'pc'
    ctx = b.new_context(viewport={'width': 1440 if pc else 440, 'height': 1500 if pc else 1200}, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page(); cs.login(page)
    if pc: page.add_style_tag(content=cs.PC_CSS)
    cs.go_menu(page, '소매관리', '상품관리')
    page.evaluate("[...document.querySelectorAll('[data-retail-register]')].find(b => b.dataset.code === 'P0305').click()"); page.wait_for_timeout(600)
    shoot(page, 'product-register-imgerr-' + device, pc)
    page.evaluate("currentCat = 'wholesale'; currentItem = 'wholesale-product-register'; renderAll(); window.scrollTo(0, 0)"); page.wait_for_timeout(600)
    shoot(page, 'wh-mine-reg-imgerr-' + device, pc)
    ctx.close()

if __name__ == '__main__':
    with sync_playwright() as p:
        b = p.chromium.launch()
        for d in ('pc', 'mobile'): run(d, b)
        b.close()
