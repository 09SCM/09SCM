# 소매관리 > 상품관리 이용가이드 대표 화면·출처별 안내 캡처 (mock/partner.html -> assets/img/partner/*.webp)
# 사용: python3 tools/capture_partner_product_screens.py   (ONLY=이름,이름 으로 일부만 저장)
# 규격: PC 1440 폭(LNB 제외, 하단 고정바 전체 폭) / 모바일 440 폭, 2배 해상도. 목록은 PC 1440×1500·모바일 440×1200, 등록·수정은 화면 전체 높이.
# 섹션 크롭은 상하좌우 16px 여백(모바일은 화면 폭 전체). 계정: bonsa1(본사)
import io, os
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(ROOT, 'mock', 'partner.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'partner')
PC_CSS = '.lnb{display:none!important}:root{--lnb-w:0px!important}.market-buybar{left:0!important}'
ONLY = set(os.environ.get('ONLY', '').split(',')) - {''}
PAD = 16

def save(png, name):
    if ONLY and name not in ONLY: return
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    print(name, im.size)

def login(page):
    page.goto(URL); page.wait_for_timeout(400)
    page.fill('#loginIdInput', 'bonsa1'); page.fill('#loginPwInput', 'a1234')
    page.click('#loginSubmitBtn'); page.mouse.move(0, 0); page.wait_for_timeout(800)

def go_product_list(page):
    page.evaluate("""() => {
      const find = t => [...document.querySelectorAll('a,button,li,div,span')].find(e => e.children.length === 0 && e.textContent.trim() === t);
      find('소매관리').click();
      setTimeout(() => { find('상품관리').click(); }, 100);
    }""")
    page.wait_for_timeout(700)

def fit_height(page, minh):
    page.set_viewport_size({'width': page.viewport_size['width'], 'height': 600}); page.wait_for_timeout(200)
    h = page.evaluate("Math.ceil(Math.max(document.documentElement.scrollHeight, document.body.scrollHeight))")
    page.set_viewport_size({'width': page.viewport_size['width'], 'height': max(minh, min(4800, h))})
    page.wait_for_timeout(300)

def clip(page, name, exprs):
    page.wait_for_timeout(300)
    b = page.evaluate("""(exprs) => {
      let x1 = 1e9, y1 = 1e9, x2 = 0, y2 = 0, n = 0;
      exprs.forEach(src => { let v = eval(src); if (!v) return; (Array.isArray(v) ? v : [v]).forEach(el => {
        const r = el.getBoundingClientRect(); if (!r.width) return; n++;
        x1 = Math.min(x1, r.left + scrollX); y1 = Math.min(y1, r.top + scrollY);
        x2 = Math.max(x2, r.right + scrollX); y2 = Math.max(y2, r.bottom + scrollY); }); });
      return {x: x1, y: y1, w: x2 - x1, h: y2 - y1, n: n}; }""", exprs)
    if b['n'] == 0: raise SystemExit('영역을 찾지 못했습니다: ' + name)
    vw = page.viewport_size['width']; page.mouse.move(0, 0)
    if vw < 800: x, w = 0, vw
    else: x = max(0, b['x'] - PAD); w = min(b['w'] + PAD * 2, vw - x)
    y = max(0, b['y'] - PAD)
    save(page.screenshot(clip={'x': x, 'y': y, 'width': w, 'height': b['h'] + PAD * 2}, full_page=True), name)

FIELD = lambda t: "[...document.querySelectorAll('.form-field')].find(f => { const l = f.querySelector('label'); return l && l.innerText.replace('*', '').trim() === %r; })" % t

def open_register(page, code):
    go_product_list(page)
    page.evaluate("(c) => [...document.querySelectorAll('[data-retail-register]')].find(b => b.dataset.code === c).click()", code)
    page.wait_for_timeout(600)

def run(device, b):
    pc = device == 'pc'; sfx = '-' + device
    vp = {'width': 1440 if pc else 440, 'height': 1500 if pc else 1200}
    ctx = b.new_context(viewport=vp, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page(); login(page)
    if pc: page.add_style_tag(content=PC_CSS)
    # 상품목록(대표 화면)
    go_product_list(page); page.mouse.move(0, 0); page.wait_for_timeout(300)
    save(page.screenshot(), 'product-list' + sfx)
    # 소매정보 등록(대표 화면: 도매주문상품, 화면 전체 높이)
    page.set_viewport_size(vp); open_register(page, 'P0305'); fit_height(page, 1500 if pc else 700); page.mouse.move(0, 0)
    save(page.screenshot(), 'product-register' + sfx)
    # 소매정보 등록 > 상품출처에 따라 안내가 달라지면 (소매정보 등록 제목~안내 배너~상품코드)
    for code, name in (('P0422', 'product-register-source-own'), ('P0305', 'product-register-source-purchase')):
        page.set_viewport_size(vp); open_register(page, code); fit_height(page, 1500 if pc else 700)
        clip(page, name + sfx, ["document.querySelector('.back-link')", "document.querySelector('.card-head')", "document.querySelector('.notice-banner')", FIELD('상품코드')])
    # 소매정보 수정(대표 화면: 내도매상품, 화면 전체 높이)
    page.set_viewport_size(vp); go_product_list(page)
    page.evaluate("() => { currentRetailRef = { source: 'own', sourceCode: 'P0232' }; currentItem = 'wholesale-retail-listing-edit'; renderAll(); }")
    page.wait_for_timeout(600); fit_height(page, 1500 if pc else 700); page.mouse.move(0, 0)
    save(page.screenshot(), 'product-edit' + sfx)
    ctx.close()

if __name__ == '__main__':
    with sync_playwright() as p:
        b = p.chromium.launch()
        for d in ('pc', 'mobile'): run(d, b)
        b.close()
