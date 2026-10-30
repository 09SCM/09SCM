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
    # 도입신청 입력 영역 4개 (섹션 크롭, 16px 여백). 고정 헤더가 크롭에 겹치지 않게 숨긴다
    page.add_style_tag(content='header{display:none!important}')
    for i, name in enumerate(['home-apply-s1-pc', 'home-apply-s2-pc', 'home-apply-s3-pc', 'home-apply-s4-pc']):
        crop(page, page.locator('form.application-form section.form-section').nth(i), name)
    # 접수 완료 팝업: 필수 항목을 채우고 제출
    page.fill('input[placeholder*="영문 소문자로 시작"]', 'hqtest01')
    page.fill('input[placeholder="이름 입력"]', '홍길동')
    page.fill('input[placeholder="010-1234-5678"]', '01012345678')
    page.get_by_role('button', name='인증번호 발송').click()
    page.fill('input[aria-label="인증번호"]', '123456')
    page.fill('input[placeholder="name@example.com"]', 'hq@example.com')
    page.fill('input[placeholder="본사명 입력"]', '테스트 본사')
    page.fill('input[placeholder="대표자명 입력"]', '홍길동')
    page.locator('form.application-form section.form-section').nth(1).locator('input[placeholder="123-45-67890"]').fill('1234567890')
    page.get_by_role('button', name='주소찾기').click()
    page.fill('input[placeholder="상세주소 입력"]', '101호')
    page.locator('.agreement-all input').check()
    page.get_by_role('button', name='솔루션 도입신청').click(); page.wait_for_timeout(500)
    page.evaluate("document.querySelectorAll('.modal-backdrop').forEach(b => { b.style.background = '#fff'; b.style.backdropFilter = 'none'; })")
    crop(page, page.locator('.modal-backdrop .modal').last, 'home-apply-done-pc')
    # 푸터에서 이동하는 약관 페이지 (PC 1440x900 뷰포트)
    for path, name in [('/terms/', 'home-terms-pc'), ('/privacy/', 'home-privacy-pc')]:
        page.goto(BASE + path); page.wait_for_timeout(1000)
        page.add_style_tag(content='nextjs-portal{display:none!important}')
        save(page.screenshot(), name)
    page.locator('footer.site-footer').scroll_into_view_if_needed(); page.wait_for_timeout(300)
    page.evaluate('window.scrollTo(0, document.body.scrollHeight)'); page.wait_for_timeout(300)
    crop(page, page.locator('footer.site-footer'), 'home-footer-pc', margin=0)
    b.close()
