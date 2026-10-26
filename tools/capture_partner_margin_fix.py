# 이용가이드 크롭 캡처 여백 보정(상하좌우 16px, 모바일은 화면 폭 전체) — PC·모바일 쌍
#   소매: order-list-{noshow,rows-claim,rows-process}, product-list-rows, member-empty, settings-pickup, chat-guide
#   도매: wh-cart-empty, wh-list-help, wh-orders-rows-{action,claim}
#   가맹점 상세: fr-d-{error,corp,payapp-unlinked,payapp-linked,fee-custom,pay-reg,pay-none}
# 사용: python3 tools/capture_partner_margin_fix.py   (ONLY=이름,이름 으로 일부만 저장 / 이름은 -pc,-mobile 제외한 접두)
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
import capture_partner_case_sections as C
import capture_partner_system as S
import capture_partner_franchise as F

ONLY = set(os.environ.get('ONLY', '').split(',')) - {''}
C.ONLY = set()   # 저장 이름 필터는 이 스크립트의 want()로만 처리
def want(n): return not ONLY or n in ONLY
_orig_save = C.save
Q = lambda sel, i=0: "document.querySelectorAll(%r)[%d]" % (sel, i)

def page_for(b, device, w=None, h=None):
    pc = device == 'pc'
    ctx = b.new_context(viewport={'width': w or (1440 if pc else 440), 'height': h or (1500 if pc else 1200)}, device_scale_factor=2, locale='ko-KR')
    page = ctx.new_page(); C.login(page)
    if pc: page.add_style_tag(content=C.PC_CSS)
    return ctx, page

def hide_around(page, sel):
    """sel 요소 앞뒤의 형제 요소를 가려 크롭 여백(16px)에 다른 UI 테두리가 비치지 않게 한다(레이아웃은 유지)"""
    page.evaluate("""(sel) => { let el = document.querySelector(sel);
      while (el && el !== document.body) {
        for (let s = el.previousElementSibling; s; s = s.previousElementSibling) s.style.visibility = 'hidden';
        for (let s = el.nextElementSibling; s; s = s.nextElementSibling) s.style.visibility = 'hidden';
        el = el.parentElement; } }""", sel)

def rows_crop(page, device, name, key, keys, hide):
    """keys에 해당하는 행(카드)만 남기고 hide 컬럼을 숨긴 뒤 표(머리글 포함)를 여백 16px로 크롭"""
    page.evaluate("""([kl, keys, hide, pc]) => {
      const t = document.querySelector('.tpl-table');
      const ths = [...t.querySelectorAll('thead th')];
      const idx = kl2 => ths.findIndex(h => h.innerText.trim() === kl2);
      t.querySelectorAll('tbody tr').forEach(tr => {
        const td = tr.querySelector('td[data-label="' + kl + '"]') || tr.children[idx(kl)];
        const ok = td && keys.some(k => td.innerText.trim() === k);
        tr.style.display = ok ? '' : 'none'; tr.dataset.keep = ok ? '1' : '';
        if (!ok) return;
        hide.forEach(h => { const c = tr.querySelector('td[data-label="' + h + '"]') || (idx(h) >= 0 ? tr.children[idx(h)] : null); if (c) c.style.display = 'none'; });
        if (!pc) tr.style.marginBottom = '12px';
      });
      hide.forEach(h => { const i = idx(h); if (i >= 0) ths[i].style.display = 'none'; });
      if (pc) { t.style.width = '1100px'; t.style.tableLayout = 'auto'; const w = document.querySelector('.table-wrap'); if (w) w.style.overflow = 'visible'; }
    }""", [key, keys, hide, device == 'pc'])
    hide_around(page, '.tpl-table'); page.wait_for_timeout(300)
    C.shot(page, name + '-' + device, ["document.querySelector('.tpl-table')" if device == 'pc' else "[...document.querySelectorAll('.tpl-table tbody tr')].filter(r => r.dataset.keep)"])

def run(device, b):
    pc = device == 'pc'; sfx = '-' + device
    # ---- 소매 주문목록·상품목록 행 크롭 ----
    ORDER_HIDE = ['주문일시', '주문자', '회원주문 코드', '주문경로', '합계금액']
    ctx, page = page_for(b, device, 1760 if pc else None)   # 컬럼 수가 많아 PC 표가 1440을 넘으므로 넓은 뷰포트 사용
    C.go_menu(page, '소매관리', '상품관리')
    if want('product-list-rows'):
        rows_crop(page, device, 'product-list-rows', '상품코드', ['P0232', 'P0305', 'P0001', 'P0230', 'P0227'], ['소비자가/할인가', '소매판매상태', '소매노출여부', '채팅주문여부', '등록일시', '수정일시'])
    for name, keys in (('order-list-rows-process', ['RO20260919103', 'RO20260919102', 'RO20260919101', 'RO20260917003', 'RO20260916001', 'RO20260918003']),
                       ('order-list-rows-claim', ['RO20260919002', 'RO20260916105', 'RO20260919001', 'RO20260915001', 'RO20260913001']),
                       ('order-list-noshow', ['RO20260918003', 'RO20260916101'])):
        if not want(name): continue
        page.evaluate("currentItem = 'retail-order-list'; renderAll()"); page.wait_for_timeout(600)
        rows_crop(page, device, name, '주문번호', keys, ORDER_HIDE)
    ctx.close()

    # ---- 소매 회원 목록(조건에 맞는 회원이 없으면): 표 머리글~빈 안내 ----
    if want('member-empty'):
        ctx, page = page_for(b, device); C.go_menu(page, '소매관리', '회원관리')
        page.fill('.fb-search .search-input', 'zzzz'); page.click('.fb-search button'); page.wait_for_timeout(500)
        hide_around(page, '.table-wrap'); C.shot(page, 'member-empty' + sfx, [Q('.table-wrap')]); ctx.close()

    # ---- 소매설정 > 수령방식(픽업만) ----
    if want('settings-pickup'):
        ctx, page = page_for(b, device); C.go_menu(page, '소매관리', '소매설정')
        page.check('input[name="rbSalesMethod"][value="pickup"]'); page.wait_for_timeout(300)
        C.shot(page, 'settings-pickup' + sfx, [C.SEC('수령방식')]); ctx.close()

    # ---- 채팅주문설정 > 채팅주문 안내 ----
    if want('chat-guide'):
        ctx, page = page_for(b, device); C.go_menu(page, '소매관리', '채팅주문설정')
        C.shot(page, 'chat-guide' + sfx, [Q('.chat-guide-box')]); ctx.close()

    # ---- 도매: 장바구니 비어 있음 / 공급범위 안내 / 주문내역 행 ----
    class W:   # capture_partner_wholesale.py는 import 시 바로 실행되므로 필요한 도우미만 복제
        @staticmethod
        def go_menu(pg, label):
            pg.evaluate("""(m) => { const find = t => [...document.querySelectorAll('a,button,li,div,span')].find(e => e.children.length === 0 && e.textContent.trim() === t);
              find('도매관리').click(); setTimeout(() => { find(m).click(); }, 100); }""", label); pg.wait_for_timeout(700)
        @staticmethod
        def goto_item(pg, item):
            pg.evaluate("(item) => { currentItem = item; renderAll(); }", item)
        @staticmethod
        def keep_cards(pg, kl, keys, hide):
            pg.evaluate("""([kl, keys, hide]) => { document.querySelectorAll('.tpl-table tbody tr').forEach(tr => {
              const td = tr.querySelector('td[data-label="' + kl + '"]'); const ok = td && keys.some(k => td.innerText.trim() === k);
              tr.style.display = ok ? '' : 'none'; if (!ok) return;
              hide.forEach(h => { const t = tr.querySelector('td[data-label="' + h + '"]'); if (t) t.style.display = 'none'; });
              tr.style.marginBottom = '12px'; tr.classList.add('rows-keep'); }); }""", [kl, keys, hide]); pg.wait_for_timeout(300)
    if want('wh-cart-empty'):
        ctx, page = page_for(b, device); W.go_menu(page, '도매상품 주문하기')
        page.evaluate("CART.splice(0)"); W.goto_item(page, 'wholesale-cart'); page.wait_for_timeout(400)
        C.shot(page, 'wh-cart-empty' + sfx, [Q('.grid12 > .card', 0), Q('.grid12 > .card', 1)]); ctx.close()
    if want('wh-list-help'):
        ctx, page = page_for(b, device); W.go_menu(page, '도매상품 주문하기')
        if pc: page.hover('.help-tip')
        else: page.click('.help-tip')
        page.wait_for_timeout(300)
        page.add_style_tag(content='.market-grid{visibility:hidden!important}')
        C.shot(page, 'wh-list-help' + sfx, [Q('.filter-bar'), Q('.help-pop')], keep_hover=True); ctx.close()
    for name, orders in (('wh-orders-rows-action', ['WO20260919014', 'WO20260912015', 'WO20260919016', 'WO20260912021', 'WO20260916011', 'WO20260910008']),
                         ('wh-orders-rows-claim', ['WO20260911009', 'WO20260909010', 'WO20260906006', 'WO20260918007'])):
        if not want(name): continue
        ctx, page = page_for(b, device); W.go_menu(page, '주문내역'); page.wait_for_timeout(300)
        if pc:
            page.evaluate("""(nos) => {
              document.querySelectorAll('tbody tr').forEach(tr => { tr.style.display = nos.includes(tr.children[0].innerText.trim()) ? '' : 'none'; });
              document.querySelectorAll('.tpl-table tr').forEach(tr => { [...tr.children].forEach((td, i) => { if ([1, 2, 3, 8].includes(i)) td.style.display = 'none'; }); });
              const t = document.querySelector('.tpl-table'); t.style.width = '860px'; t.style.tableLayout = 'auto';
              document.querySelector('.table-wrap').style.overflow = 'visible'; }""", orders)
            hide_around(page, '.tpl-table'); C.shot(page, name + sfx, ["document.querySelector('.tpl-table')"])
        else:
            W.keep_cards(page, '주문번호', orders, ['주문일시', '공급자', '상품정보', '합계금액'])
            hide_around(page, '.tpl-table'); C.shot(page, name + sfx, ["[...document.querySelectorAll('.rows-keep')]"])
        ctx.close()

    # ---- 가맹점 상세 케이스 7건 ----
    BETWEEN = lambda a, z: "(() => { const H = t => [...document.querySelectorAll('h2,h3')].find(e => e.textContent.trim() === t); const s1 = H(%r).closest('.form-section'), s2 = H(%r).closest('.form-section'); return [s1, s2.previousElementSibling || s1]; })()" % (a, z)
    for name, prep, mode, clip, pcsize, mosize in F.TAB_STEPS:
        if not name.startswith(('fr-d-error', 'fr-d-corp', 'fr-d-payapp', 'fr-d-fee-custom', 'fr-d-pay-')) or not want(name): continue
        w, h = pcsize if pc else mosize
        ctx, page = S.new_page(b, w, h, 'bonsa'); F.goto_franchise(page, '가맹점 목록'); prep(page, device); page.wait_for_timeout(300)
        if mode == 'between':
            exprs = [BETWEEN(clip[0], clip[1]) + '[0]', BETWEEN(clip[0], clip[1]) + '[1]']
        else:
            exprs = ['(%s)()[0]' % clip, '(%s)()[1]' % clip]
        C.shot(page, name + sfx, exprs); ctx.close()

if __name__ == '__main__':
    with sync_playwright() as p:
        b = p.chromium.launch()
        for d in ('pc', 'mobile'): run(d, b)
        b.close()
