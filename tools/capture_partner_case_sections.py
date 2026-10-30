# 이용가이드 "한 섹션만 달라지는 케이스" 섹션 크롭 캡처 (mock/partner.html -> assets/img/partner/*.webp)
# 사용: python3 tools/capture_partner_case_sections.py   (ONLY=이름,이름 으로 일부만 저장)
# 규격: 섹션 크롭은 상하좌우 16px 여백(모바일은 화면 폭 전체), PC는 LNB 제외 1440 폭, 2배 해상도. 계정: bonsa1(본사)
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

def go_menu(page, top, label):
    page.evaluate("""([a, b]) => {
      const find = t => [...document.querySelectorAll('a,button,li,div,span')].find(e => e.children.length === 0 && e.textContent.trim() === t);
      find(a).click();
      setTimeout(() => { find(b).click(); }, 100);
    }""", [top, label])
    page.wait_for_timeout(700)

def fit_height(page, minh=700, maxh=4200):
    page.set_viewport_size({'width': page.viewport_size['width'], 'height': 600}); page.wait_for_timeout(200)
    h = page.evaluate("Math.ceil(Math.max(document.documentElement.scrollHeight, document.body.scrollHeight))")
    page.set_viewport_size({'width': page.viewport_size['width'], 'height': max(minh, min(maxh, h))})
    page.wait_for_timeout(300)

def shot(page, name, exprs, keep_hover=False):
    """exprs: 각 항목이 요소(또는 요소 배열)를 돌려주는 JS 식. 모두 포함하는 영역을 한 번의 호출로 계산해 여백을 두고 자른다."""
    page.wait_for_timeout(400)
    b = page.evaluate("""(exprs) => {
      let x1 = 1e9, y1 = 1e9, x2 = 0, y2 = 0, n = 0;
      exprs.forEach(src => { let v = eval(src); if (!v) return; (Array.isArray(v) ? v : [v]).forEach(el => {
        const r = el.getBoundingClientRect(); if (!r.width) return; n++;
        x1 = Math.min(x1, r.left + scrollX); y1 = Math.min(y1, r.top + scrollY);
        x2 = Math.max(x2, r.right + scrollX); y2 = Math.max(y2, r.bottom + scrollY); }); });
      return {x: x1, y: y1, w: x2 - x1, h: y2 - y1, n: n}; }""", exprs)
    if b['n'] == 0: raise SystemExit('영역을 찾지 못했습니다: ' + name)
    vw = page.viewport_size['width']
    if not keep_hover: page.mouse.move(0, 0)
    page.wait_for_timeout(200)
    if vw < 800: x, w = 0, vw
    else: x = max(0, b['x'] - PAD); w = min(b['w'] + PAD * 2, vw - x)
    y = max(0, b['y'] - PAD)
    save(page.screenshot(clip={'x': x, 'y': y, 'width': w, 'height': b['h'] + PAD * 2}, full_page=True), name)

# 제목(.form-section-title)으로 영역 찾기 / 라벨로 입력 칸 찾기
SEC = lambda t: "[...document.querySelectorAll('.form-section')].filter(s => { const h = s.querySelector('.form-section-title'); return h && h.innerText.trim() === %r; })" % t
FIELD = lambda t: "[...document.querySelectorAll('.form-field')].find(f => { const l = f.querySelector('label'); return l && l.innerText.replace('*', '').trim() === %r; })" % t

def run(device, b):
    pc = device == 'pc'
    ctx = b.new_context(viewport={'width': 1440 if pc else 440, 'height': 1500 if pc else 1200}, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page(); login(page)
    if pc: page.add_style_tag(content=PC_CSS)
    def reset(): page.set_viewport_size({'width': 1440 if pc else 440, 'height': 1500 if pc else 1200})
    sfx = '-' + device

    # ---- 소매 > 주문목록 > 주문 상세 보기 > 배달 주문이면 (주문상품~결제정보, 상단 제목 영역 제외) ----
    page.evaluate("(no) => { currentCat = 'retail'; currentRetailOrderDetailNo = no; currentItem = 'retail-order-detail'; renderAll(); window.scrollTo(0, 0); }", 'RO20260917003')
    page.wait_for_timeout(500); fit_height(page, 1500 if pc else 700)
    shot(page, 'order-detail-delivery' + sfx, [SEC(t) for t in ('주문상품', '주문정보', '주문자정보', '배달정보', '결제정보')])

    # ---- 소매 > 상품목록 > 소매정보 등록하기 > 입력에 맞지 않는 내용이 있으면 ----
    reset(); go_menu(page, '소매관리', '상품관리')
    page.evaluate("[...document.querySelectorAll('[data-retail-register]')].find(b => b.dataset.code === 'P0305').click()"); page.wait_for_timeout(600)
    page.click('#rtlSaveBtn'); page.wait_for_timeout(400); fit_height(page, 1500 if pc else 700)
    shot(page, 'product-register-error' + sfx, ["document.querySelector('.back-link')", "document.querySelector('.card-head')", "document.getElementById('retailFormErrorBanner')"])

    # ---- 소매 > 상품목록 > 수정하기 > 판매가능수량을 0으로 입력하면 / 내소매상품의 보유수량을 0으로 입력하면 ----
    for src, code, field, val, name in (('own', 'P0232', 'rtlAvailableQty', '0', 'product-case-avail0'), ('retail', 'P0001', 'rtlHoldingQty', '0', 'product-case-retail0')):
        reset(); go_menu(page, '소매관리', '상품관리')
        page.evaluate("([s, c]) => { currentRetailRef = { source: s, sourceCode: c }; currentItem = 'wholesale-retail-listing-edit'; renderAll(); }", [src, code])
        page.wait_for_timeout(600)
        page.fill('#' + field, val); page.evaluate("(id) => { const e = document.getElementById(id); e.dispatchEvent(new Event('input', {bubbles: true})); e.dispatchEvent(new Event('change', {bubbles: true})); e.blur(); }", field)
        page.wait_for_timeout(400); fit_height(page, 1500 if pc else 700)
        shot(page, name + sfx, [FIELD('소매판매상태'), FIELD('소매노출여부'), FIELD('보유수량'), FIELD('판매가능수량')])

    # ---- 소매 > 채팅주문설정 > 매칭 실패 건 처리 > 조건에 맞는 건이 없으면 ----
    reset(); go_menu(page, '소매관리', '채팅주문설정')
    page.fill('#chatUnmatchedSearchInput', 'zzzz'); page.click('#chatUnmatchedSearchBtn'); page.wait_for_timeout(500)
    fit_height(page, 1500 if pc else 700)
    shot(page, 'chat-empty' + sfx, [SEC('매칭 실패 건')])

    # ---- 소매 > 회원관리 > 회원 목록 > 탈퇴회원 탭을 보면 (탭~목록 앞 3건) ----
    reset(); go_menu(page, '소매관리', '회원관리')
    page.click('[data-retail-member-tab="withdrawn"]'); page.wait_for_timeout(500); fit_height(page, 1500 if pc else 700)
    shot(page, 'member-withdrawn' + sfx, ["document.querySelector('[data-retail-member-tab]').parentElement", "[...document.querySelectorAll('.tpl-table tbody tr')].slice(0, 3)"])

    # ---- 소매 > 회원관리 > 회원정보 상세 > 저장이 막히면 / 휴대폰번호를 바꿀 때 ----
    def member_detail():
        reset(); go_menu(page, '소매관리', '회원관리')
        page.evaluate("document.querySelector('[data-retail-member-tab]:not([data-retail-member-tab=withdrawn])') && document.querySelector('[data-retail-member-tab]:not([data-retail-member-tab=withdrawn])').click()"); page.wait_for_timeout(300)
        page.locator('tr', has_text='홍길동').locator('[data-member-detail]').first.click(); page.wait_for_timeout(500)
    member_detail()
    page.fill('#memberNameInput', ''); page.click('#memberBasicSaveBtn'); page.wait_for_timeout(300); fit_height(page, 1500 if pc else 700)
    shot(page, 'member-error' + sfx, [SEC('기본정보')])
    member_detail()
    page.click('#memberPhoneChangeStartBtn'); page.wait_for_timeout(200)
    page.fill('#newMemberPhone', '01099990000'); page.click('#memberPhoneDupCheckBtn'); page.wait_for_timeout(200)
    page.click('#memberPhoneAuthSendBtn2'); page.wait_for_timeout(200)
    page.fill('#memberPhoneAuthCode2', '123456'); page.click('#memberPhoneAuthConfirmBtn2'); page.wait_for_timeout(300); fit_height(page, 1500 if pc else 700)
    shot(page, 'member-phone' + sfx, [SEC('휴대폰번호')])

    # ---- 소매 > 소매설정 > 기본정보 > 필수 항목을 비우면 ----
    reset(); go_menu(page, '소매관리', '소매설정')
    page.fill('#rbMallName', ''); page.fill('#rbMallDisplayName', ''); page.click('#rbSaveBtn'); page.wait_for_timeout(400); fit_height(page, 1500 if pc else 700)
    shot(page, 'settings-error' + sfx, [SEC('상호정보'), SEC('픽업주소'), SEC('소매몰정보')])
    # ---- 소매 > 회원관리 > 회원정보 상세 > 하단 고정 바(이용상태 변경·탈퇴 처리), 위쪽 28px 여백 ----
    member_detail(); page.set_viewport_size({'width': 1440 if pc else 440, 'height': 1000}); page.wait_for_timeout(300)
    page.check('input[name="memberUsageStatus"][value="이용제한"]'); page.mouse.move(0, 0); page.wait_for_timeout(300)
    r = page.evaluate("(() => { const r = document.querySelector('.market-buybar').getBoundingClientRect(); return {y: r.top, h: r.height}; })()")
    save(page.screenshot(clip={'x': 0, 'y': r['y'] - 28, 'width': page.viewport_size['width'], 'height': r['h'] + 28}), 'member-usage' + sfx)
    ctx.close()

if __name__ == '__main__':
    with sync_playwright() as p:
        b = p.chromium.launch()
        for d in ('pc', 'mobile'): run(d, b)
        b.close()
