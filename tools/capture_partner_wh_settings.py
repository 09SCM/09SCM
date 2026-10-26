# 도매설정 이용가이드 캡처 (mock/partner.html -> assets/img/partner/wh-set-*.webp) — 목업 파일은 수정하지 않음
# 사용: python3 tools/capture_partner_wh_settings.py   (ONLY=이름,이름 으로 일부만 저장)
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
import capture_partner_case_blocks as cb

def run(device, b):
    pc = device == 'pc'
    W, H = (1440, 1500) if pc else (440, 1200)
    ctx = b.new_context(viewport={'width': W, 'height': H}, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page(); cb.login(page)
    if pc: page.add_style_tag(content=cb.PC_CSS)

    def open_settings():
        page.evaluate("() => { const m = document.getElementById('regionAddModalRoot'); if (m) m.remove(); }")
        page.evaluate("() => { currentCat = 'wholesale'; currentItem = 'wholesale-settings'; renderAll(); window.scrollTo(0, 0); }")
        page.wait_for_timeout(500); page.mouse.move(0, 0)
        page.set_viewport_size({'width': W, 'height': H}); page.wait_for_timeout(200)

    def sec(title, name):
        cb.sec_shot(page, None, name + '-' + device, [title])

    # 대표 화면(전체)
    open_settings(); cb.fit_height(page, 600 if pc else 700)
    cb.save(page.screenshot(), 'wh-set-main-' + device)

    # 구매자부담 선택 -> 수수료율 입력칸
    open_settings()
    page.check('input[name="cardFeeBearer"][value="buyer"]'); page.wait_for_timeout(200)
    sec('결제수수료 설정', 'wh-set-fee-buyer')
    # 수수료율 오류
    page.fill('#cardFeeRateInput', '100'); page.click('#saveFeeBtn'); page.wait_for_timeout(300)
    sec('결제수수료 설정', 'wh-set-fee-error')

    # 착불 선택 -> 금액칸 숨김
    open_settings()
    page.check('input[name="shippingMethod"][value="cod"]'); page.wait_for_timeout(200)
    sec('배송방식 설정', 'wh-set-ship-cod')
    # 기본배송비 오류
    open_settings()
    page.fill('#shippingFeeAmountInput', '-1'); page.click('#saveShippingBtn'); page.wait_for_timeout(300)
    sec('배송방식 설정', 'wh-set-ship-error')

    # 지역 추가 팝업
    def modal(name):
        b0 = cb.bbox(page, ['.modal-box'])
        clip = {'x': max(0, b0['x'] - 40), 'y': max(0, b0['y'] - 40), 'width': b0['w'] + 80, 'height': b0['h'] + 80}
        cb.save(page.screenshot(clip=clip), name + '-' + device)
    open_settings()
    page.click('#setRegionAddBtn'); page.wait_for_timeout(300)
    page.select_option('#regionSidoSelect', '경기'); page.wait_for_timeout(200)
    opts = page.evaluate("[...document.querySelectorAll('#regionSigunguSelect option')].map(o=>o.value)")
    print(device, 'sigungu', opts)
    page.select_option('#regionSigunguSelect', index=1); page.wait_for_timeout(200)
    modal('wh-set-region-pop')
    # 이미 등록된 지역
    page.select_option('#regionSigunguSelect', '수원시 팔달구') if '수원시 팔달구' in opts else None
    page.click('#regionAddConfirmBtn'); page.wait_for_timeout(300)
    modal('wh-set-region-error')

    # 등록 50곳 -> [지역 추가] 비활성 (메모리에서만 지역 49곳 채움)
    open_settings()
    page.evaluate("""() => {
      const def = sellerDefaultRegion(MY_SELLER_NAME), all = [];
      Object.keys(REGION_MASTER).forEach(sd => REGION_MASTER[sd].forEach(g => { const l = sd + ' ' + g; if (l !== def) all.push(l); }));
      WHOLESALE_SETTINGS.supplyRegions = all.slice(0, 49); renderWholesaleSettingsPage(); window.scrollTo(0, 0); }""")
    page.wait_for_timeout(400)
    print(device, page.inner_text('#setRegionCount'), page.is_disabled('#setRegionAddBtn'))
    sec('공급범위(우리지역) 설정', 'wh-set-region-full')
    ctx.close()

with sync_playwright() as p:
    b = p.chromium.launch()
    for d in ('pc', 'mobile'): run(d, b)
    b.close()
