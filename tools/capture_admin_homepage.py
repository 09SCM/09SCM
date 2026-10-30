# 통합관리자 소개의 "09SCM 홈페이지" 섹션 캡처 (09SCM-Homepage 목업 로컬 서버 -> assets/img/admin/*.webp)
# 사용: (홈페이지 목업을 http://localhost:3111 에서 실행한 뒤) python3 tools/capture_admin_homepage.py
import io, os
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'assets', 'img', 'admin')
BASE = 'http://localhost:3111'
M = 16

def save(png, name):
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    print(name, im.size)

def crop(page, locator, name, margin=M):
    locator.scroll_into_view_if_needed(); page.wait_for_timeout(300)
    box = locator.bounding_box()
    vp = page.viewport_size
    save(page.screenshot(full_page=True, clip={'x': max(box['x'] - margin, 0), 'y': max(box['y'] + page.evaluate('window.scrollY') - margin, 0),
                               'width': min(box['width'] + margin * 2, vp['width']), 'height': box['height'] + margin * 2}), name)

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={'width': 1440, 'height': 900}, device_scale_factor=2)
    page = ctx.new_page()
    page.goto(BASE + '/'); page.wait_for_timeout(1200)
    page.add_style_tag(content='nextjs-portal{display:none!important}')
    save(page.screenshot(), 'home-main-pc')
    page.goto(BASE + '/apply/'); page.wait_for_timeout(1200)
    page.add_style_tag(content='nextjs-portal{display:none!important}')
    save(page.screenshot(), 'home-apply-pc')
    sec = page.locator('section', has=page.locator('h2', has_text='솔루션 이용 및 약관 동의')).last
    crop(page, sec, 'home-apply-terms-pc')
    page.locator('footer.site-footer').scroll_into_view_if_needed(); page.wait_for_timeout(300)
    page.evaluate('window.scrollTo(0, document.body.scrollHeight)'); page.wait_for_timeout(300)
    crop(page, page.locator('footer.site-footer'), 'home-footer-pc', margin=0)
    b.close()
