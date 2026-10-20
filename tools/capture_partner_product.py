# 소매관리 > 상품관리 > 도매상품전환 이용가이드 캡처 (mock/partner.html -> assets/img/partner/product-convert-{pc,mobile}.webp)
# 사용: python3 tools/capture_partner_product.py
# 규격: PC 1440×1500(LNB 제외, 하단 고정바 전체 폭), 모바일 440×1840(화면 전체 높이, 고정바가 맨 아래), 2배 해상도
import io, os
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(ROOT, 'mock', 'partner.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'partner')

def save(png, name):
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    print(name, im.size)

def open_convert(page):
    page.goto(URL); page.wait_for_timeout(500)
    page.fill('#loginIdInput', 'bonsa'); page.fill('#loginPwInput', 'a1234')
    page.click('#loginSubmitBtn'); page.wait_for_timeout(800)
    page.evaluate("""() => {
      const find = t => [...document.querySelectorAll('a,button,li,div,span')].find(e => e.children.length === 0 && e.textContent.trim() === t);
      find('소매관리').click();
      setTimeout(() => { const m = find('상품관리'); m && m.click(); }, 100);
    }""")
    page.wait_for_timeout(700)
    # 내소매상품(수제 딸기잼 250g)의 [도매상품전환]
    page.evaluate("""() => {
      const b = [...document.querySelectorAll('[data-retail-convert]')];
      const t = b.find(x => x.closest('tr') && x.closest('tr').innerText.includes('딸기잼')) || b[0];
      t.click();
    }""")
    page.wait_for_timeout(600)

with sync_playwright() as p:
    b = p.chromium.launch()
    for label, vp in (('pc', {'width': 1440, 'height': 1500}), ('mobile', {'width': 440, 'height': 1840})):
        ctx = b.new_context(viewport=vp, device_scale_factor=2)
        page = ctx.new_page()
        open_convert(page)
        if label == 'pc':
            page.add_style_tag(content='.lnb{display:none!important}.market-buybar{left:0!important}')
            page.wait_for_timeout(200)
        save(page.screenshot(), 'product-convert-' + label)
        ctx.close()
    b.close()
