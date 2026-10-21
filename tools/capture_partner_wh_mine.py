# 내 도매상품 이용가이드 캡처 (mock/partner.html -> assets/img/partner/wh-mine-*.webp) — 목업 파일은 수정하지 않음
# 사용: python3 tools/capture_partner_wh_mine.py   (ONLY=이름,이름 으로 일부만 저장)
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

    def go(item, code=None, fit=True):
        page.evaluate("""([item, code]) => {
          const m = document.getElementById('regionAddModalRoot'); if (m) m.remove();
          currentCat = 'wholesale'; if (code) currentProductCode = code;
          currentItem = item; renderAll(); window.scrollTo(0, 0); }""", [item, code])
        page.wait_for_timeout(500); page.mouse.move(0, 0)
        page.set_viewport_size({'width': W, 'height': H}); page.wait_for_timeout(200)
        if fit: cb.fit_height(page, 1500 if pc else 700, 6000)

    def tag(sel, tid, closest='.form-field'):
        page.evaluate("([s, t, c]) => { const e = document.querySelector(s); (c ? e.closest(c) : e).id = t; }", [sel, tid, closest])

    def top_shot(name, last_sel):
        """화면 맨 위(← 뒤로가기 링크)부터 last_sel 요소 끝까지"""
        tag('.back-link', 'c-top', None)
        cb.sec_shot(page, ['#c-top', last_sel], name + '-' + device)

    def modal(name):
        b0 = cb.bbox(page, ['.modal-box'])
        clip = {'x': max(0, b0['x'] - 40), 'y': max(0, b0['y'] - 40), 'width': b0['w'] + 80, 'height': b0['h'] + 80}
        cb.save(page.screenshot(clip=clip), name)

    # ---- 목록 ----
    go('wholesale-product-mylist', fit=False)   # 목록은 화면 고정 크기(PC 1440×1500, 모바일 440×1200)
    cb.save(page.screenshot(), 'wh-mine-list-' + device)

    # ---- 등록 ----
    go('wholesale-product-register')
    cb.save(page.screenshot(), 'wh-mine-reg-' + device)
    page.select_option('#regScope', '우리지역'); page.wait_for_timeout(300)
    tag('#regScope', 'c-scope')
    cb.sec_shot(page, ['#c-scope', '#regRegionField'], 'wh-mine-reg-region-' + device)
    go('wholesale-product-register')
    page.fill('#regStock', '100')
    page.check('#regRetailToggle'); page.wait_for_timeout(200)
    page.fill('#regRetailQty', '30'); page.wait_for_timeout(200)
    cb.fit_height(page, 1500 if pc else 700, 6000)   # 영역이 펼쳐진 뒤 하단 고정바가 크롭 영역을 가리지 않도록 화면 높이 재조정
    cb.sec_shot(page, ['#retailSection'], 'wh-mine-reg-retail-' + device)
    go('wholesale-product-register')
    page.click('#regSaveBtn'); page.wait_for_timeout(300)
    page.evaluate("window.scrollTo(0, 0)")
    top_shot('wh-mine-reg-error', '#formErrorBanner')

    # ---- 상세 (P0232: 소매몰 노출 중) ----
    go('wholesale-product-detail', 'P0232')
    cb.save(page.screenshot(), 'wh-mine-detail-' + device)
    tag('.detail-meta', 'c-meta', None)
    tag('.back-link', 'c-top', None)
    cb.sec_shot(page, ['#c-top', '.notice-banner', '#c-meta'], 'wh-mine-detail-banner-' + device)

    go('wholesale-product-detail', 'P0230')   # 우리지역 상품
    page.evaluate("[...document.querySelectorAll('.detail-item')].find(e => e.querySelector('.detail-label').textContent.trim() === '공급범위').id = 'c-scope-d'")
    cb.sec_shot(page, ['#c-scope-d'], 'wh-mine-detail-scope-' + device)

    # ---- 수정 ----
    go('wholesale-product-edit', 'P0232')
    cb.save(page.screenshot(), 'wh-mine-edit-' + device)
    page.fill('#editStock', '10'); page.click('#editSaveBtn'); page.wait_for_timeout(300)
    page.evaluate("window.scrollTo(0, 0)")
    top_shot('wh-mine-edit-stockerr', '#formErrorBanner')
    go('wholesale-product-edit', 'P0230')   # 보유수량 0
    tag('#editSaleStatus', 'c-sale'); tag('#editStock', 'c-stock')
    cb.sec_shot(page, ['#c-sale', '#c-stock'], 'wh-mine-edit-lock-' + device)

    # ---- 삭제 (팝업은 PC·모바일 차이가 없어 PC만) ----
    if pc:
        go('wholesale-product-mylist')
        page.click('[data-product-delete="P0232"]'); page.wait_for_timeout(300)
        modal('wh-mine-del-one-pc')
        page.evaluate("document.querySelector('.modal-box button').click()")   # 취소
        page.wait_for_timeout(200)
        go('wholesale-product-mylist')
        page.click('#productBulkDeleteBtn'); page.wait_for_timeout(300)
        modal('wh-mine-del-none-pc')
        page.evaluate("[...document.querySelectorAll('.modal-box button')].pop().click()"); page.wait_for_timeout(200)
        go('wholesale-product-mylist')
        for c in ('P0232', 'P0231'): page.check('[data-product-check="%s"]' % c)
        page.click('#productBulkDeleteBtn'); page.wait_for_timeout(300)
        modal('wh-mine-del-bulk-pc')
    ctx.close()

with sync_playwright() as p:
    b = p.chromium.launch()
    for d in ('pc', 'mobile'): run(d, b)
    b.close()
