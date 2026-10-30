# 통합관리자 거래/매출 현황 화면 캡처 (mock/admin.html -> assets/img/admin/trade-*.webp)
# 통합관리자는 PC 1장만 촬영한다(이용가이드 디자인시스템 9-2절). 현황 화면은 전체 높이, 목록은 1440x900, 섹션 크롭은 16px 여백.
# 사용: python3 tools/capture_admin_trade.py
import io, os, sys
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(ROOT, 'mock', 'admin.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'admin')
ID, PW = 'admin', 'admin1234'
M = 16

def save(png, name):
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    print(name, im.size)

def login(b, h=900):
    ctx = b.new_context(viewport={'width': 1440, 'height': h}, device_scale_factor=2)
    page = ctx.new_page(); page.goto(URL); page.wait_for_timeout(500)
    page.fill('#loginId', ID); page.fill('#loginPw', PW)
    page.evaluate("document.getElementById('loginCaptcha').value = captchaCode")
    page.click('#loginSubmit'); page.wait_for_timeout(900)
    return ctx, page

def open_trade(page):
    page.get_by_text('거래/매출 현황', exact=True).first.click(); page.wait_for_timeout(500)

def tab(page, key):
    page.click(f'[data-sales-tab={key}]'); page.wait_for_timeout(400)

def hide_lnb(page):
    page.add_style_tag(content='.lnb{display:none!important} .bottom-bar{left:0!important}'); page.wait_for_timeout(300)

def full(page, name):
    h = page.evaluate('Math.max(document.documentElement.scrollHeight, 900)')
    page.set_viewport_size({'width': 1440, 'height': h}); page.wait_for_timeout(300)
    save(page.screenshot(), name)

def view900(page, name):
    page.set_viewport_size({'width': 1440, 'height': 900}); page.wait_for_timeout(300)
    save(page.screenshot(), name)

def hide(page, sel):
    page.evaluate("(s) => document.querySelectorAll(s).forEach(e => e.style.visibility = 'hidden')", sel)

def crop(page, loc, name, margin=M):
    box = loc.bounding_box()
    save(page.screenshot(clip={'x': max(box['x'] - margin, 0), 'y': max(box['y'] - margin, 0),
                               'width': box['width'] + margin * 2, 'height': box['height'] + margin * 2}), name)

def crop_between(page, top_loc, bottom_loc, container_loc, name, margin=M):
    t = top_loc.bounding_box(); bt = bottom_loc.bounding_box(); c = container_loc.bounding_box()
    x0, y0 = max(c['x'] - margin, 0), max(t['y'] - margin, 0)
    save(page.screenshot(clip={'x': x0, 'y': y0, 'width': c['width'] + margin * 2, 'height': bt['y'] + bt['height'] + margin - y0}), name)

# 인자 없이 실행하면 전체 촬영, 'zero'를 주면 거래 없음 케이스만 촬영한다(전체 재촬영 시 집계 시각이 바뀌므로 추가분만 따로 촬영).
ONLY = sys.argv[1] if len(sys.argv) > 1 else None

if ONLY is None:
    with sync_playwright() as p:
        b = p.chromium.launch()

        # 전체 현황 (현황 화면: 전체 높이)
        ctx, page = login(b); open_trade(page); hide_lnb(page)
        full(page, 'trade-all-pc')
        ctx.close()

        # 조회기간 입력 오류 (시작일 비움)
        ctx, page = login(b); open_trade(page)
        page.click('[data-sales-preset=기간]'); page.wait_for_timeout(300)
        page.fill('#salesFrom', ''); page.dispatch_event('#salesFrom', 'change')
        page.click('#salesApplyBtn'); page.wait_for_timeout(400)
        hide_lnb(page)
        hide(page, '.card-head, .tabs, .sales-body, .sales-base')
        crop(page, page.locator('.sales-filter'), 'trade-all-error-pc')
        ctx.close()

        # 본사별 현황: 목록(1440x900) / 검색 결과 없음 / 선택 후
        ctx, page = login(b); open_trade(page); tab(page, 'hq'); hide_lnb(page)
        view900(page, 'trade-hq-list-pc')
        ctx.close()

        ctx, page = login(b); open_trade(page); tab(page, 'hq')
        page.fill('#salesSearchInput', '없는상호'); page.click('#salesSearchBtn'); page.wait_for_timeout(400)
        hide_lnb(page)
        hide(page, '.card-head, .sales-filter, .tabs, .sales-base')
        crop_between(page, page.locator('.filter-bar').last, page.locator('.sales-empty'), page.locator('.sales-body'), 'trade-hq-empty-pc')
        ctx.close()

        ctx, page = login(b); open_trade(page); tab(page, 'hq')
        page.locator('[data-sales-view]').first.click(); page.wait_for_timeout(400); hide_lnb(page)
        full(page, 'trade-hq-detail-pc')
        ctx.close()

        # 가맹점별 현황
        ctx, page = login(b); open_trade(page); tab(page, 'franchise'); hide_lnb(page)
        view900(page, 'trade-fr-list-pc')
        ctx.close()

        ctx, page = login(b); open_trade(page); tab(page, 'franchise')
        page.fill('#salesSearchInput', '없는상호'); page.click('#salesSearchBtn'); page.wait_for_timeout(400)
        hide_lnb(page)
        hide(page, '.card-head, .sales-filter, .tabs, .sales-base')
        crop_between(page, page.locator('.filter-bar').last, page.locator('.sales-empty'), page.locator('.sales-body'), 'trade-fr-empty-pc')
        ctx.close()

        ctx, page = login(b); open_trade(page); tab(page, 'franchise')
        page.locator('[data-sales-view]').first.click(); page.wait_for_timeout(400); hide_lnb(page)
        full(page, 'trade-fr-detail-pc')
        ctx.close()
        b.close()


if ONLY in (None, 'zero'):
    with sync_playwright() as p:
        b = p.chromium.launch()

        def zero_shot(page, name):
            # 거래가 없을 때 달라지는 요약 카드 영역만 자른다(주변 UI는 가린다)
            hide_lnb(page)
            hide(page, '.card-head, .sales-filter, .tabs, .sales-base, .sales-selected, .sales-hint, .sales-chart-head, .sales-legend, .sales-chart-scroll, .table-scroll')
            crop(page, page.locator('.stat-grid'), name)

        # 본사: 프레시메이트, 조회기간 오늘, 거래유형 도매
        ctx, page = login(b); open_trade(page); tab(page, 'hq')
        page.click('[data-sales-preset=오늘]'); page.select_option('#salesType', '도매'); page.click('#salesApplyBtn'); page.wait_for_timeout(300)
        page.locator('tr', has_text='프레시메이트').locator('[data-sales-view]').click(); page.wait_for_timeout(400)
        zero_shot(page, 'trade-hq-zero-pc')
        ctx.close()

        # 가맹점: 위즈청과 센텀점, 이번달
        ctx, page = login(b); open_trade(page); tab(page, 'franchise')
        page.locator('tr', has_text='위즈청과 센텀점').locator('[data-sales-view]').click(); page.wait_for_timeout(400)
        zero_shot(page, 'trade-fr-zero-pc')
        ctx.close()
        b.close()
