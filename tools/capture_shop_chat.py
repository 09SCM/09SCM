# 채팅주문 설명용 메신저풍 일러스트 생성 (특정 메신저의 실제 화면이 아닌 일반적인 채팅 UI)
import os, sys
from playwright.sync_api import sync_playwright
from PIL import Image

OUT = os.path.join(os.path.dirname(__file__), '..', 'assets', 'img', 'shop')
SEL = 'user'

CSS = '''
*{box-sizing:border-box;margin:0;padding:0}
body{width:440px;background:#B9CCDD;font-family:'Noto Sans KR','Noto Sans CJK KR','Malgun Gothic',sans-serif;color:#1b1b1b}
.top{height:56px;background:#B9CCDD;display:flex;align-items:center;padding:0 16px;gap:12px;border-bottom:1px solid rgba(0,0,0,.06)}
.top b{font-size:16px}.top small{font-size:12px;color:#4a5a68;margin-left:2px}
.back{font-size:20px;color:#333}
.body{padding:16px 14px 20px;display:flex;flex-direction:column;gap:10px}
.date{align-self:center;background:rgba(80,100,120,.35);color:#fff;font-size:11px;padding:4px 12px;border-radius:12px;margin:2px 0}
.row{display:flex;gap:8px;align-items:flex-start}
.row.me{justify-content:flex-end}
.av{width:36px;height:36px;border-radius:14px;background:#8aa3b8;flex:none;display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;font-weight:700}
.name{font-size:12px;color:#33414d;margin-bottom:4px}
.bub{max-width:272px;padding:9px 12px;border-radius:4px 14px 14px 14px;background:#fff;font-size:14px;line-height:1.55;white-space:pre-line}
.me .bub{background:#FEE500;border-radius:14px 4px 14px 14px}
.time{font-size:10px;color:#4a5a68;align-self:flex-end;margin:0 2px}
.input{height:56px;background:#fff;display:flex;align-items:center;gap:10px;padding:0 14px;border-top:1px solid #e6e6e6}
.input span{flex:1;height:36px;border-radius:18px;background:#f2f2f2;color:#999;font-size:13px;display:flex;align-items:center;padding:0 14px}
'''

def me(text, t):
    return f'<div class="row me"><span class="time">{t}</span><div class="bub">{text}</div></div>'

def bot(text, t):
    return f'<div class="row"><div class="av">안</div><div><div class="name">주문 안내</div><div style="display:flex;gap:6px"><div class="bub">{text}</div><span class="time">{t}</span></div></div></div>'

def page(items):
    return f'''<html><head><meta charset="utf-8"><style>{CSS}</style></head><body>
<div class="top"><span class="back">‹</span><b>온마을 공동구매 주문방</b><small>오픈채팅</small></div>
<div class="body">{''.join(items)}</div>
<div class="input"><span>메시지 입력</span></div></body></html>'''

N = '산책러'
SCENES = {
 'chat-ok': [
   '<div class="date">2026년 10월 28일</div>',
   me('햇사과 2개, 레몬 1개 7942', '오후 2:05'),
   bot(f'[10.28 14:05] {N} 7942 님, 아래 상품 주문이 접수되었습니다.\n- 햇사과 2개\n- 레몬 1개', '오후 2:05'),
 ],
 'chat-partial': [
   '<div class="date">2026년 10월 28일</div>',
   me('햇사과 2개\n하겐다즈 1개\n7942', '오후 2:10'),
   bot(f'[10.28 14:10] {N} 7942 님, 아래 상품만 주문이 접수되었습니다.\n- 햇사과 2개\n다음 상품은 접수되지 않았습니다.\n- 하겐다즈: 재고 부족', '오후 2:10'),
 ],
 'chat-fail': [
   '<div class="date">2026년 10월 28일</div>',
   me('하겐다즈 1개 7942', '오후 2:15'),
   bot(f'[10.28 14:15] {N} 7942 님, 하겐다즈 주문이 재고 부족으로 접수되지 않았습니다.', '오후 2:15'),
   me('하겐다즈 8개 7942', '오후 2:16'),
   bot(f'[10.28 14:16] {N} 7942 님, 하겐다즈는 1회 최대 5개까지 구매 가능해 주문이 접수되지 않았습니다.', '오후 2:16'),
 ],
 'chat-limit': [
   '<div class="date">2026년 10월 28일</div>',
   me('햇사과 2개 7942', '오후 2:20'),
   bot(f'[10.28 14:20] {N} 7942 님, 현재 이용이 제한되어 주문이 접수되지 않았습니다. 자세한 사항은 판매자에게 문의해주세요.', '오후 2:20'),
   me('햇사과 2개 7942', '오후 2:31'),
   bot(f'[10.28 14:31] {N} 7942 님, 현재 닉네임이 등록되지 않아 주문이 접수되지 않았습니다. 소매몰에서 닉네임을 등록해주세요.', '오후 2:31'),
 ],
}

with sync_playwright() as p:
    b = p.chromium.launch()
    dims = {}
    for name, items in SCENES.items():
        pg = b.new_page(viewport={'width': 440, 'height': 100}, device_scale_factor=2)
        pg.set_content(page(items)); pg.wait_for_timeout(300)
        h = pg.evaluate('Math.ceil(document.body.getBoundingClientRect().height)')
        pg.set_viewport_size({'width': 440, 'height': h})
        png = os.path.join(OUT, name + '-mobile.png')
        pg.screenshot(path=png, full_page=True)
        im = Image.open(png); im.save(os.path.join(OUT, name + '-mobile.webp'), 'WEBP', quality=88); os.remove(png)
        dims[name] = im.size
        pg.close()
    b.close()
print(dims)
