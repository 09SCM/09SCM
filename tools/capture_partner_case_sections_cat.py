# 이용가이드 소매관리 > 상품카테고리·메인상품진열 케이스 섹션 크롭 캡처 (mock/partner.html -> assets/img/partner/{cat-*,display-*}.webp)
# 사용: python3 tools/capture_partner_case_sections_cat.py   (ONLY=이름,이름 으로 일부만 저장)
# 규격: capture_partner_case_sections.py와 동일(상하좌우 16px 여백, 모바일은 화면 폭 전체, 2배 해상도)
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
import capture_partner_case_sections as C
shot = C.shot
Q = lambda sel, i=0: "document.querySelectorAll(%r)[%d]" % (sel, i)

def run(device, b):
    pc = device == 'pc'; sfx = '-' + device
    ctx = b.new_context(viewport={'width': 1440 if pc else 440, 'height': 1500 if pc else 1200}, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page(); C.login(page)
    if pc: page.add_style_tag(content=C.PC_CSS)
    def open_menu(label):
        page.set_viewport_size({'width': 1440 if pc else 440, 'height': 1500 if pc else 1200})
        C.go_menu(page, '소매관리', label); page.wait_for_timeout(300)
    head_cards = [Q('.card-head'), Q('.col-6.card', 0), Q('.col-6.card', 1)]

    # 연동상품이 있으면: 1차 카테고리 선택 시 [삭제] 비활성
    open_menu('상품카테고리')
    shot(page, 'cat-locked' + sfx, [Q('.col-6.card', 0)])
    # 2차 카테고리가 없으면
    page.evaluate("RETAIL_CATEGORY_TREE.push({id: 'cat_fruit', name: '과일', children: []}); categorySelectedId = 'cat_fruit'; renderAll();"); page.wait_for_timeout(400)
    shot(page, 'cat-nosub' + sfx, head_cards)
    # 카테고리가 아직 없으면
    page.evaluate("RETAIL_CATEGORY_TREE.splice(0); categorySelectedId = null; renderAll();"); page.wait_for_timeout(400)
    shot(page, 'cat-empty' + sfx, head_cards)

    # 메인상품진열: 진열한 상품이 없으면 / 추가할 수 있는 상품이 없으면
    open_menu('메인상품진열')
    page.evaluate("MAIN_DISPLAY_ORDER = []; MAIN_DISPLAY_DRAFT = []; renderAll();"); page.wait_for_timeout(400)
    shot(page, 'display-none' + sfx, head_cards)
    page.evaluate("MAIN_DISPLAY_ORDER = retailMainDisplayCandidateRows().map(r => r.listing.id); MAIN_DISPLAY_DRAFT = MAIN_DISPLAY_ORDER.slice(); renderAll();"); page.wait_for_timeout(400)
    shot(page, 'display-all' + sfx, head_cards)
    ctx.close()

if __name__ == '__main__':
    with sync_playwright() as p:
        b = p.chromium.launch()
        for d in ('pc', 'mobile'): run(d, b)
        b.close()
