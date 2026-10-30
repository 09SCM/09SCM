# 회원관리 > 회원정보 상세 이용가이드 캡처 (mock/partner.html -> assets/img/partner/member-{detail,memo,phone,error,usage}-{pc,mobile}.webp)
# 사용: python3 tools/capture_partner_member.py
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

def open_detail(page, w):
    page.goto(URL); page.wait_for_timeout(400)
    page.fill('#loginIdInput', 'bonsa1'); page.fill('#loginPwInput', 'a1234')
    page.click('#loginSubmitBtn'); page.wait_for_timeout(800)
    if w > 860:
        page.add_style_tag(content=':root{--lnb-w:0px!important}.lnb{display:none!important}')

def go_member_detail(page, w):
    # LNB가 숨겨진 PC에서는 JS 클릭으로 이동한다
    page.evaluate("""() => {
      const click = t => [...document.querySelectorAll('a,button,li,div,span')].find(e => e.children.length === 0 && e.textContent.trim() === t);
      click('소매관리') && click('소매관리').click();
      click('회원관리') && click('회원관리').click();
    }""")
    page.wait_for_timeout(500)
    page.locator('tr', has_text='홍길동').locator('[data-member-detail]').first.click(); page.wait_for_timeout(500)

def fit_shot(page, w, name, h=None):
    height = h or page.evaluate('document.documentElement.scrollHeight')
    page.set_viewport_size({'width': w, 'height': height}); page.wait_for_timeout(300)
    save(page.screenshot(), name)

def phone_flow(page):
    page.click('#memberPhoneChangeStartBtn'); page.wait_for_timeout(200)
    page.fill('#newMemberPhone', '01099990000')
    page.click('#memberPhoneDupCheckBtn'); page.wait_for_timeout(200)
    page.click('#memberPhoneAuthSendBtn2'); page.wait_for_timeout(200)
    page.fill('#memberPhoneAuthCode2', '123456')
    page.click('#memberPhoneAuthConfirmBtn2'); page.wait_for_timeout(300)

with sync_playwright() as p:
    b = p.chromium.launch()
    for label, w in (('pc', 1440), ('mobile', 440)):
        def fresh():
            ctx = b.new_context(viewport={'width': w, 'height': 900}, device_scale_factor=2)
            page = ctx.new_page()
            open_detail(page, w); go_member_detail(page, w)
            return ctx, page
        # 회원정보 상세
        ctx, page = fresh(); fit_shot(page, w, 'member-detail-' + label); ctx.close()
        # 내부메모
        ctx, page = fresh()
        page.click('[data-member-detail-tab="memo"]'); page.wait_for_timeout(300)
        fit_shot(page, w, 'member-memo-' + label, 700); ctx.close()
        # 휴대폰번호 변경·저장 오류·하단 바(이용상태 변경)는 섹션 크롭으로 tools/capture_partner_case_sections.py 에서 촬영한다
    b.close()
