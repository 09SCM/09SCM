# 통합관리자 소개·공통 영역·대시보드 데이터 없음 케이스 캡처 (mock/admin.html -> assets/img/admin/*.webp)
# 통합관리자는 PC 1장만 촬영한다(이용가이드 디자인시스템 9-2절). 섹션 크롭은 상하좌우 16px 여백을 둔다.
# 사용: python3 tools/capture_admin_intro.py
import io, os
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(ROOT, 'mock', 'admin.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'admin')
ID, PW = 'admin', 'admin1234'
M = 16
TOPBAR_H = 61
LNB_W = 232

def save(png, name):
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)
    print(name, im.size)

def logged_in(b, h=900):
    ctx = b.new_context(viewport={'width': 1440, 'height': h}, device_scale_factor=2)
    page = ctx.new_page(); page.goto(URL); page.wait_for_timeout(500)
    page.fill('#loginId', ID); page.fill('#loginPw', PW)
    page.evaluate("document.getElementById('loginCaptcha').value = captchaCode")
    page.click('#loginSubmit'); page.wait_for_timeout(900)
    return ctx, page

def crop(page, locator, name, margin=M):
    box = locator.bounding_box()
    save(page.screenshot(clip={'x': max(box['x'] - margin, 0), 'y': max(box['y'] - margin, 0),
                               'width': box['width'] + margin * 2, 'height': box['height'] + margin * 2}), name)

with sync_playwright() as p:
    b = p.chromium.launch()
    # 1) 소개 대표 화면: 로그인 직후 1440x900 (LNB 포함)
    ctx, page = logged_in(b)
    save(page.screenshot(), 'intro-pc')
    # 2) 공통 영역: 헤더(화면 맨 위 전체 폭) / LNB 전체
    page.add_style_tag(content='#contentWrapper{visibility:hidden!important}')
    save(page.screenshot(clip={'x': 880, 'y': 0, 'width': 560, 'height': TOPBAR_H + M}), 'common-header-pc')
    ctx.close()
    ctx, page = logged_in(b, 620)
    page.add_style_tag(content='#contentWrapper{visibility:hidden!important}')
    save(page.screenshot(clip={'x': 0, 'y': 0, 'width': LNB_W + M, 'height': 620}), 'common-lnb-pc')
    fb = page.locator('.lnb-footer').bounding_box()
    save(page.screenshot(clip={'x': 0, 'y': fb['y'] - M, 'width': LNB_W + M, 'height': 620 - (fb['y'] - M)}), 'common-logout-pc')
    ctx.close()
    # 3) 대시보드 데이터 없음 케이스 (목업 데이터를 비운 상태로 다시 그린다)
    ctx, page = logged_in(b, 1500)
    page.evaluate("HQ_LIST.forEach(h => { if (h.status === '승인대기') h.status = '승인불가'; }); renderAll();")
    page.wait_for_timeout(300)
    crop(page, page.locator('.dash-page .col-6.card', has_text='승인 대기 본사').first, 'dash-empty-wait-pc')
    ctx.close()
    ctx, page = logged_in(b, 1500)
    page.evaluate("window.salesBuckets = function () { return []; }; renderAll();")
    page.wait_for_timeout(300)
    crop(page, page.locator('.dash-page .grid12').nth(1), 'dash-empty-pay-pc')
    ctx.close()
    ctx, page = logged_in(b, 1500)
    page.evaluate("HQ_LIST.forEach(h => { if (h.status === '운영중' || h.status === '운영제한') h.status = '승인불가'; }); FRANCHISE_LIST.forEach(f => { if (f.status === '이용승인' || f.status === '이용제한') f.status = '이용대기'; }); renderAll();")
    page.wait_for_timeout(300)
    crop(page, page.locator('.dash-page .col-6.card', has_text='운영 현황').first, 'dash-empty-ops-pc')
    ctx.close()
    b.close()
