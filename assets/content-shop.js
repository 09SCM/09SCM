// 09SCM 소매몰 이용가이드 — 화면별 본문
// 키는 nav-shop.js의 leaf id. 값이 없는 섹션은 화면에 나타나지 않는다.
window.GUIDE_CONTENT = window.GUIDE_CONTENT || {};

var ADMIN_GUIDE_LOGIN = 'partner.html#start-login';
var ADMIN_GUIDE = 'partner.html#';

var SHOT_DIMS = {
  'browse-main': [2880, 1800, 880, 1800],
  'browse-store': [2880, 228, 880, 542],
  'browse-today': [2880, 1158, 880, 1530],
  'browse-empty': [2880, 1800, 880, 1800],
  'browse-common': [2880, 2094, 880, 2226],
  'browse-search': [2880, 402, 880, 346],
  'browse-menu': [2880, 1800, 880, 1800],
  'browse-login': [2880, 264, 880, 312],
  'list-all': [2880, 1800, 880, 1800],
  'list-category': [2880, 1800, 880, 1800],
  'list-pickup': [2880, 1800, 880, 1800],
  'list-delivery': [2880, 1800, 880, 1800],
  'list-search': [2880, 1800, 880, 1800],
  'list-empty': [2880, 1800, 880, 1800],
  'detail-main': [2880, 3960, 880, 4516],
  'detail-soldout': [2880, 1450, 880, 1426],
  'detail-notfound': [2880, 1800, 880, 1800],
  'detail-pickup': [2880, 1440, 880, 1370],
  'detail-info': [2880, 1558, 880, 908],
  'browse-footer': [2880, 298, 880, 616],
  'cart-main': [2880, 1904, 880, 2512],
  'cart-delivery': [2880, 1456, 880, 1716],
  'cart-change': [2880, 1800, 880, 1800],
  'cart-change-toast': [852, 190],
  'cart-soldout-toast': [2880, 960, 880, 960],
  'check-history-nomatch-toast': [2880, 960, 880, 960],
  'check-toast-cancel-card': [602, 190],
  'check-toast-cancel-request': [518, 190],
  'check-toast-cancel-wait': [454, 190],
  'check-toast-return': [518, 190],
  'detail-cart-toast': [2880, 960, 880, 960],
  'login-done': [2880, 960, 880, 960],
  'order-input-toast': [2880, 960, 880, 960],
  'mypage-address-error-toast': [2880, 960, 880, 960],
  'mypage-address-main': [2880, 1800, 880, 2358],
  'mypage-address-saved-toast': [2880, 960, 880, 960],
  'mypage-info-code': [2328, 744, 880, 720],
  'mypage-info-error-toast': [2880, 960, 880, 960],
  'mypage-info-main': [2880, 2668, 880, 3428],
  'mypage-info-saved-toast': [2880, 960, 880, 960],
  'mypage-withdraw-blocked': [2880, 1842, 880, 2404],
  'mypage-withdraw-done-toast': [2880, 960, 880, 960],
  'mypage-withdraw-main': [2880, 1800, 880, 2278],
  'order-recheck-toast': [2880, 960, 880, 960],
  'reset-done': [2880, 960, 880, 960],
  'store-copy-toast': [2880, 960, 880, 960],
  'cart-nowindow': [2880, 1510, 880, 1792],
  'cart-soldout': [2880, 1816, 880, 2152],
  'check-alert-settled': [480, 178],
  'check-btn-card': [2328, 490, 880, 874],
  'check-btn-detail': [2328, 490, 880, 874],
  'check-btn-none': [2328, 490, 880, 874],
  'check-btn-rejected': [2328, 500, 880, 884],
  'check-btn-request': [2328, 490, 880, 874],
  'check-btn-return': [2328, 490, 880, 874],
  'check-btn-wait': [2328, 490, 880, 930],
  'check-detail-delivery': [2880, 2938, 880, 4328],
  'check-detail-main': [2880, 3530, 880, 5132],
  'check-detail-request': [2328, 458, 880, 768],
  'check-history-chat': [2880, 1800, 880, 1800],
  'check-history-empty': [2880, 1800, 880, 1800],
  'check-history-main': [2880, 1800, 880, 1800],
  'check-modal-cancel': [1184, 964, 880, 1800],
  'check-modal-done': [1184, 1684, 880, 1800],
  'check-modal-pending': [1184, 1376, 880, 1800],
  'check-modal-request': [1184, 1866, 880, 2120],
  'check-modal-return-transfer': [1184, 1866, 880, 2120],
  'check-modal-return': [1184, 1268, 880, 1800],
  'check-modal-wait': [1184, 964, 880, 1800],
  'check-quick-active': [2880, 1800, 880, 1800],
  'check-quick-complete': [2880, 1800, 880, 1800],
  'check-quick-empty': [2880, 1800, 880, 1930],
  'check-quick-main': [2880, 1800, 880, 1864],
  'check-quick-none': [2880, 1800, 880, 1864],
  'cart-empty': [2880, 1136, 880, 1026],
  'order-main': [2880, 3862, 880, 5256],
  'order-nowindow': [2880, 1800, 880, 1864],
  'order-delivery': [2880, 1594, 880, 1706],
  'order-transfer': [2880, 614, 880, 888],
  'order-delivery-none': [2880, 1342, 880, 1322],
  'order-delivery-other': [2880, 1416, 880, 1554],
  'done-main': [2880, 3278, 880, 4052],
  'done-transfer': [2880, 3454, 880, 4228],
  'done-delivery': [2880, 3192, 880, 3998],
  'franchise-biz-ok': [1536, 307, 880, 307],
  'franchise-corp': [1536, 786, 880, 961],
  'franchise-done': [2880, 1800, 880, 1800],
  'franchise-error': [2880, 960, 880, 960],
  'franchise-id-ok': [1536, 343, 880, 379],
  'franchise-phone-verified': [1536, 482, 880, 482],
  'franchise-terms': [2880, 1800, 880, 1800],
  'reset-error': [2880, 960, 880, 960],
  'reset-sent': [1024, 1046, null],
  'reset-step2': [2880, 1800, 880, 1800],
  'reset-verified': [1024, 1046, null],
  'signup-alias-ok': [1336, 307, 880, 307],
  'signup-done': [2880, 1800, 880, 1800],
  'signup-done-plain': [2880, 1800, 880, 1800],
  'signup-error': [2880, 960, 880, 960],
  'signup-phone-dup': [1336, 626, 880, 730],
  'signup-phone-ok': [1336, 626, 880, 730],
  'signup-phone-sent': [1336, 626, 880, 730],
  'signup-phone-verified': [1336, 626, 880, 730],
  'signup-terms': [2880, 1800, 880, 1800]
};
// 케이스 캡처 쌍(PC+모바일). 이미지 파일명은 assets/img/shop/{name}-pc|mobile.webp
function pair(name, alt) {
  var d = SHOT_DIMS[name], out = [{ device: 'pc', src: '../assets/img/shop/' + name + '-pc.webp', alt: alt + ' PC 화면', ratio: d[0] / d[1] }];
  if (d.length > 2 && d[2]) out.push({ device: 'mobile', src: '../assets/img/shop/' + name + '-mobile.webp', alt: alt + ' 모바일 화면', ratio: d[2] / d[3] });
  return out;
}

// 채팅주문 일러스트(모바일 전용)
var CHAT_DIMS = { 'chat-ok': 724, 'chat-partial': 854, 'chat-fail': 1008, 'chat-limit': 1008 };
function chatShot(name, alt) {
  return [{ device: 'mobile', src: '../assets/img/shop/' + name + '-mobile.webp', alt: alt, ratio: 880 / CHAT_DIMS[name] }];
}

window.GUIDE_CONTENT['start-intro'] = {
  shots: [
    { device: 'pc', src: '../assets/img/shop/intro-pc.webp', alt: '09SCM 소매몰 메인 PC 화면', ratio: 1440 / 900 },
    { device: 'mobile', src: '../assets/img/shop/intro-mobile.webp', alt: '09SCM 소매몰 메인 모바일 화면', ratio: 440 / 900 }
  ],
  shotCaption: '09SCM 소매몰 메인 화면 (PC / 모바일)',
  sections: [
    { id: 'sec1', label: '09SCM 소매몰이란', html:
      '<p>본사와 가맹점이 각자 운영하는 공동구매 쇼핑몰이에요. 소매몰마다 주소가 따로 있고, 상품을 골라 주문한 뒤 정해진 날짜에 직접 픽업하거나 배달받을 수 있어요.</p>' },

    { id: 'sec2', label: '이런 분이 사용해요', html:
      '<ul>' +
        '<li><b>회원:</b> 휴대폰번호로 가입해 상품을 주문하고, 주문내역을 확인하고, 취소·반품을 요청해요.</li>' +
        '<li><b>로그인하지 않은 분:</b> 상품을 둘러볼 수 있어요. 주문할 때는 로그인이 필요해요. 회원주문 코드로는 로그인 없이 주문 현황을 조회할 수 있어요.</li>' +
        '<li><b>판매자:</b> 소매몰을 운영하는 본사와 가맹점이에요. [관리자 로그인]으로 관리자에 들어가 상품과 주문을 관리해요. 가맹점이 되려면 본사 소매몰에서 <a href="#start-login/member-franchise">가맹점 가입 신청</a>을 해요.</li>' +
      '</ul>' },

    { id: 'sec3', label: '할 수 있는 일', html:
      '<ul>' +
        '<li><a href="#browse-main"><b>둘러보기</b></a> 카테고리, 검색, 픽업·배달 상품 목록에서 상품을 찾고 상품상세에서 가격과 수령 조건을 확인해요.</li>' +
        '<li><a href="#order-cart"><b>주문하기</b></a> 장바구니에 담거나 바로 주문해서 결제까지 해요.</li>' +
        '<li><a href="#order-pay/pay-chat"><b>채팅주문</b></a> 오픈채팅방에 정해진 형식으로 메시지를 보내서 주문해요.</li>' +
        '<li><a href="#check-history"><b>주문조회</b></a> 주문내역과 주문상세를 확인하고 취소·반품을 요청해요. <a href="#check-quick">간편 주문 조회</a>는 로그인 없이 써요.</li>' +
        '<li><a href="#mypage-info"><b>마이페이지</b></a> 내정보에서 회원정보를 관리하고, 배달지관리에서 대표 배달지를 관리하며, 회원탈퇴를 신청해요. 주문내역은 주문조회에서 확인해요.</li>' +
      '</ul>' },

    { id: 'sec4', label: '주문 방식과 수령·결제', html:
      '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
        '<tr><td>링크주문</td><td>소매몰에서 상품을 골라 장바구니·주문서로 직접 주문하는 방식</td></tr>' +
        '<tr><td>채팅주문</td><td>오픈채팅방에 정해진 형식으로 메시지를 보내 주문하는 방식 (회원주문 코드와 채팅주문 닉네임을 등록한 회원만 이용 가능, 항상 픽업·현장결제)</td></tr>' +
        '<tr><td>픽업</td><td>정해진 픽업가능일에 소매몰의 픽업 장소에서 직접 받는 방식</td></tr>' +
        '<tr><td>배달</td><td>등록한 주소로 받는 방식 (배달비 별도, 카드결제만 가능)</td></tr>' +
        '<tr><td>결제수단</td><td>픽업은 카드결제·계좌이체·현장결제, 배달은 카드결제</td></tr>' +
      '</tbody></table></div>' },

    { id: 'sec5', label: '시작부터 주문까지', html:
      '<ol>' +
        '<li><b>가입</b> 휴대폰번호로 회원가입해요. <a href="#start-login">회원가입·로그인</a></li>' +
        '<li><b>로그인</b> 휴대폰번호와 비밀번호로 로그인해요.</li>' +
        '<li><b>상품 고르기</b> 둘러보기에서 상품을 찾아 장바구니에 담거나 바로 주문해요.</li>' +
        '<li><b>주문·결제</b> 수령방식과 결제수단을 고르고 주문해요.</li>' +
        '<li><b>수령·확인</b> 픽업가능일에 맞춰 픽업하거나 배달받고, 주문내역에서 진행 상태를 확인해요.</li>' +
      '</ol>' },

    { id: 'sec6', label: '소매몰을 이용할 수 없을 때', html:
      '<ul>' +
        '<li><b>판매자의 이용상태:</b> 소매몰을 운영하는 가맹점이 이용대기·이용제한·이용불가 상태이면 소매몰 대신 안내 화면이 나와요. 새 주문은 받지 않고, 회원주문 코드로 주문 현황만 조회할 수 있어요. <a href="#start-gate">대문화면</a></li>' +
        '<li><b>회원의 이용상태:</b> 이용제한 회원은 로그인과 신규 주문을 할 수 없어요. 자세한 내용은 판매자에게 문의해 주세요.</li>' +
      '</ul>' }
  ]
};

window.GUIDE_CONTENT['start-login'] = {
  screens: [
    {
      id: 'member-login',
      label: '로그인하기',
      shots: [
        { device: 'pc', src: '../assets/img/shop/login-pc.webp', alt: '09SCM 로그인 PC 화면', ratio: 1440 / 900 },
        { device: 'mobile', src: '../assets/img/shop/login-mobile.webp', alt: '09SCM 로그인 모바일 화면', ratio: 440 / 900 }
      ],
      shotCaption: '09SCM 로그인 화면 (PC / 모바일)',
      overview:
        '<p>가입한 휴대폰번호와 비밀번호로 로그인해요. 로그인하면 주문, 주문내역, 내정보를 쓸 수 있어요.</p>' +
        '<ul>' +
          '<li>처음이라면 [회원가입]을, 비밀번호가 기억나지 않으면 [비밀번호 재설정]을 눌러요.</li>' +
          '<li>로그인하지 않아도 상품은 둘러볼 수 있어요. 주문하려고 하면 로그인 안내가 나와요.</li>' +
          '<li>판매자(본사·가맹점)는 [관리자 로그인]으로 관리자에 들어가요. 위치는 <a href="#start-login/member-franchise">가맹점 가입 신청하기</a>에서, 사용 방법은 <a href="' + ADMIN_GUIDE_LOGIN + '">09SCM 관리자 이용가이드</a>에서 확인해요.</li>' +
        '</ul>',
      steps:
        '<h3>로그인 정보</h3>' +
        '<p>가입한 휴대폰번호가 회원 아이디예요.</p>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>휴대폰번호</td><td>가입할 때 인증한 휴대폰번호 (숫자 11자리)</td></tr>' +
          '<tr><td>비밀번호</td><td>가입할 때 정한 비밀번호 (입력값은 가려지며 [보기]를 누르면 확인 가능)</td></tr>' +
          '<tr><td>로그인 상태 유지</td><td>체크하면 로그인 상태를 유지하는 선택 항목</td></tr>' +
        '</tbody></table></div>' +
        '<p>[로그인]을 누르면 소매몰 메인으로 이동해요. 주문하려다 로그인 화면으로 왔다면 로그인한 뒤 주문서로 돌아가요.</p>' +

        '<h3>화면 아래 링크</h3>' +
        '<p>[회원가입]은 <a href="#start-login/member-signup">회원가입하기</a>로, [비밀번호 재설정]은 <a href="#start-login/member-reset">비밀번호 재설정하기</a>로 이동해요.</p>',
      cases: [
        {
          title: '로그인하면',
          shots: pair('login-done', '09SCM 로그인 완료 안내'),
          shotCaption: '09SCM 로그인 완료 안내 화면 (PC / 모바일)',
          html: '<p>&quot;로그인되었습니다.&quot; 안내가 잠깐 나온 뒤 소매몰 메인으로 이동해요. 주문하려다 로그인 화면으로 왔다면 주문서로 돌아가요.</p>'
        },
        {
          title: '휴대폰번호 형식이 맞지 않으면',
          html: '<p>휴대폰번호가 010-0000-0000 형식의 숫자 11자리가 아니면 입력란에 형식 안내가 나오고 로그인되지 않아요.</p>'
        },
        {
          title: '이용제한 회원이면',
          html:
            '<p>이용제한 회원은 로그인과 신규 주문(링크주문·채팅주문)을 할 수 없어요. 채팅주문을 보내면 &quot;현재 이용이 제한되어 주문이 접수되지 않았습니다. 자세한 사항은 판매자에게 문의해주세요.&quot; 안내가 와요.</p>'
        },
        {
          title: '소매몰을 이용할 수 없으면',
          html: '<p>소매몰을 운영하는 가맹점이 이용대기·이용제한·이용불가 상태이면 로그인 화면 대신 <a href="#start-gate">대문화면</a>이 나와요.</p>'
        }
      ],
      trouble:
        '<h3>휴대폰번호를 입력했는데 로그인이 안 돼요</h3>' +
        '<p>휴대폰번호는 010-0000-0000 형식의 숫자 11자리로 입력해요. 형식이 맞지 않으면 입력란에 형식 안내가 나와요.</p>' +
        '<h3>비밀번호가 기억나지 않아요</h3>' +
        '<p>[비밀번호 재설정]에서 휴대폰번호를 인증하고 새 비밀번호를 정해요.</p>' +
        '<h3>이용제한이라서 로그인할 수 없어요</h3>' +
        '<p>이용제한은 판매자가 설정해요. 자세한 내용은 판매자에게 문의해 주세요.</p>'
    },

    {
      id: 'member-signup',
      label: '회원가입하기',
      shots: [
        { device: 'pc', src: '../assets/img/shop/signup-pc.webp', alt: '09SCM 회원가입 PC 화면', ratio: 2880 / 3728 },
        { device: 'mobile', src: '../assets/img/shop/signup-mobile.webp', alt: '09SCM 회원가입 모바일 화면', ratio: 880 / 3878 }
      ],
      shotCaption: '09SCM 회원가입 화면 (PC / 모바일)',
      overview:
        '<p>휴대폰번호로 가입해요. 가입한 휴대폰번호가 회원 아이디가 되고, 항목명 옆에 *가 붙은 항목은 꼭 입력해야 해요.</p>' +
        '<ol>' +
          '<li>휴대폰번호 인증</li>' +
          '<li>로그인 정보</li>' +
          '<li>회원정보</li>' +
          '<li>대표 배달지 등록 (선택)</li>' +
          '<li>약관 동의</li>' +
        '</ol>' +
        '<p>가입이 끝나면 로그인된 상태로 <a href="#start-login/member-signup-done">가입 완료</a> 화면이 나와요.</p>',
      steps:
        '<h3>01 휴대폰번호 인증</h3>' +
        '<p>[중복확인]을 통과해야 [인증번호 발송]을 누를 수 있어요.</p>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>휴대폰번호 *</td><td>회원 아이디로 쓰는 휴대폰번호 (숫자 11자리, 이미 가입된 번호는 사용 불가)</td></tr>' +
          '<tr><td>인증번호 *</td><td>발송된 숫자 6자리 인증번호 (유효시간 3분, [확인]으로 인증 완료)</td></tr>' +
        '</tbody></table></div>' +

        '<h3>02 로그인 정보</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>비밀번호 *</td><td>로그인에 쓰는 비밀번호 (영문·숫자 조합 8자 이상)</td></tr>' +
          '<tr><td>비밀번호 확인 *</td><td>위에서 입력한 비밀번호와 같은 값</td></tr>' +
        '</tbody></table></div>' +

        '<h3>03 회원정보</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>주문자명 *</td><td>주문할 때 주문자 정보로 쓰이는 이름</td></tr>' +
          '<tr><td>이메일 *</td><td>회원 이메일</td></tr>' +
          '<tr><td>회원주문 코드 *</td><td>주문 확인과 현장 수령에 사용하는 숫자 4자리 코드 (소매몰 안에서 중복 불가, [중복 확인]을 통과해야 가입 가능)</td></tr>' +
          '<tr><td>채팅주문 닉네임</td><td>회원이 오픈채팅방에서 쓰는 닉네임 (선택, 등록하지 않으면 채팅주문 이용 불가)</td></tr>' +
        '</tbody></table></div>' +

        '<h3>04 대표 배달지 등록 (선택)</h3>' +
        '<p>입력한 주소는 마이페이지의 <a href="#mypage-address">대표 배달지</a>로 저장돼요. 픽업만 이용한다면 입력하지 않아도 돼요.</p>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>배달지명</td><td>배달지를 구분하는 이름 (예: 집)</td></tr>' +
          '<tr><td>배달 주소</td><td>배달받을 주소</td></tr>' +
        '</tbody></table></div>' +

        '<h3>05 약관 동의</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>전체 동의</td><td>아래 약관을 한 번에 선택</td></tr>' +
          '<tr><td>이용약관 동의 *</td><td>소매몰 이용약관 동의 ([보기]로 본문 확인)</td></tr>' +
          '<tr><td>개인정보처리방침 동의 *</td><td>개인정보처리방침 동의 ([보기]로 본문 확인)</td></tr>' +
        '</tbody></table></div>' +
        '<p>모든 필수 항목을 입력하고 [회원가입 완료]를 누르면 가입이 끝나고 <a href="#start-login/member-signup-done">가입 완료</a> 화면으로 이동해요. 이미 회원이라면 아래 [로그인]으로 이동해요.</p>',
      cases: [
        {
          group: '입력 단계에 따라',
          rows: [
            {
              title: '이미 가입된 휴대폰번호이면',
              shots: pair('signup-phone-dup', '09SCM 회원가입 이미 가입된 번호'),
              shotCaption: '09SCM 회원가입 이미 가입된 번호 화면 (PC / 모바일)',
              html: '<ul><li>안내: &quot;이미 가입된 휴대폰번호입니다.&quot;</li><li>[인증번호 발송]: 누를 수 없음</li><li>이어서: 다른 번호로 [중복확인] 또는 로그인</li></ul>'
            },
            {
              title: '사용할 수 있는 휴대폰번호이면',
              shots: pair('signup-phone-ok', '09SCM 회원가입 사용 가능한 번호'),
              shotCaption: '09SCM 회원가입 사용 가능한 번호 화면 (PC / 모바일)',
              html: '<ul><li>안내: &quot;사용 가능한 휴대폰번호입니다.&quot;</li><li>[인증번호 발송]: 누를 수 있음</li><li>번호 변경: [중복확인]부터 다시 진행</li></ul>'
            },
            {
              title: '인증번호를 발송하면',
              shots: pair('signup-phone-sent', '09SCM 회원가입 인증번호 발송'),
              shotCaption: '09SCM 회원가입 인증번호 발송 화면 (PC / 모바일)',
              html: '<ul><li>안내: &quot;인증번호가 발송되었습니다. 유효시간 03:00&quot;</li><li>이어서: 받은 숫자 6자리 입력 후 [확인]</li></ul>'
            },
            {
              title: '인증번호를 확인하면',
              shots: pair('signup-phone-verified', '09SCM 회원가입 휴대폰번호 인증 완료'),
              shotCaption: '09SCM 회원가입 휴대폰번호 인증 완료 화면 (PC / 모바일)',
              html: '<ul><li>안내: &quot;휴대폰번호 인증이 완료되었습니다.&quot;</li><li>인증번호 재입력: 인증 해제</li></ul>'
            },
            {
              title: '사용할 수 있는 회원주문 코드이면',
              shots: pair('signup-alias-ok', '09SCM 회원가입 사용 가능한 회원주문 코드'),
              shotCaption: '09SCM 회원가입 사용 가능한 회원주문 코드 화면 (PC / 모바일)',
              html: '<ul><li>안내: &quot;사용할 수 있는 회원주문 코드입니다.&quot;</li><li>코드 변경: [중복 확인] 재진행</li></ul>'
            }
          ]
        },
        {
          title: '약관 [보기]를 누르면',
          shots: pair('signup-terms', '09SCM 회원가입 약관'),
          shotCaption: '09SCM 회원가입 약관 보기 화면 (PC / 모바일)',
          html: '<p>소매몰의 이용약관 또는 개인정보처리방침 화면으로 이동해요. 두 화면은 구성이 같고 제목과 본문만 달라요.</p>'
        },
        {
          title: '입력이 맞지 않으면',
          shots: pair('signup-error', '09SCM 회원가입 입력 오류'),
          shotCaption: '09SCM 회원가입 입력 오류 화면 (PC / 모바일)',
          html:
            '<p>맞지 않는 부분이 있으면 화면 아래에 안내가 잠시 나타나요. 필수 항목이 비어 있으면 입력란에 안내가 먼저 나와요. 나오는 안내 문구는 아래와 같아요.</p>' +
            '<div class="table-wrap"><table><thead><tr><th>상황</th><th>안내 문구</th></tr></thead><tbody>' +
              '<tr><td>11자리가 아닌 번호로 [중복확인]을 누름</td><td>&quot;휴대폰번호 11자리를 입력해 주세요.&quot;</td></tr>' +
              '<tr><td>[중복확인] 없이 [인증번호 발송]을 누름</td><td>&quot;휴대폰번호 중복확인을 먼저 완료해 주세요.&quot;</td></tr>' +
              '<tr><td>인증번호 발송 없이 [확인]을 누름</td><td>&quot;인증번호를 먼저 발송해 주세요.&quot;</td></tr>' +
              '<tr><td>6자리가 아닌 인증번호로 [확인]을 누름</td><td>&quot;인증번호 6자리를 입력해 주세요.&quot;</td></tr>' +
              '<tr><td>4자리가 아닌 코드로 [중복 확인]을 누름</td><td>&quot;회원주문 코드 숫자 4자리를 입력해 주세요.&quot;</td></tr>' +
              '<tr><td>같은 소매몰의 다른 회원이 쓰는 코드로 [중복 확인]을 누름</td><td>&quot;이미 사용 중인 회원주문 코드입니다.&quot;</td></tr>' +
              '<tr><td>휴대폰번호 중복확인 없이 [회원가입 완료]를 누름</td><td>&quot;휴대폰번호 중복확인을 완료해 주세요.&quot;</td></tr>' +
              '<tr><td>휴대폰번호 인증 없이 [회원가입 완료]를 누름</td><td>&quot;휴대폰번호 인증을 완료해 주세요.&quot;</td></tr>' +
              '<tr><td>회원주문 코드 중복 확인 없이 [회원가입 완료]를 누름</td><td>&quot;회원주문 코드 중복 확인을 완료해 주세요.&quot;</td></tr>' +
              '<tr><td>비밀번호와 비밀번호 확인이 다름</td><td>&quot;비밀번호가 일치하지 않습니다.&quot;</td></tr>' +
            '</tbody></table></div>'
        },
        {
          title: '탈퇴한 뒤 다시 가입하면',
          html: '<p>같은 휴대폰번호로 다시 가입할 수 있어요. 새 회원으로 가입하며 이전 주문과는 연결되지 않아요.</p>'
        }
      ],
      trouble:
        '<h3>[인증번호 발송]을 누를 수 없어요</h3>' +
        '<p>[중복확인]을 먼저 통과해야 해요. 이미 가입된 번호이면 &quot;이미 가입된 휴대폰번호입니다.&quot; 안내가 나와요.</p>' +
        '<h3>회원주문 코드를 쓸 수 없다고 나와요</h3>' +
        '<p>같은 소매몰의 다른 회원이 쓰는 코드이면 &quot;이미 사용 중인 회원주문 코드입니다.&quot; 안내가 나와요. 다른 숫자 4자리로 [중복 확인]을 다시 해요.</p>' +
        '<h3>[회원가입 완료]를 눌러도 가입되지 않아요</h3>' +
        '<p>휴대폰번호 중복확인, 휴대폰번호 인증, 회원주문 코드 중복 확인을 모두 마쳐야 해요. 비밀번호와 비밀번호 확인이 같은지, 필수 약관에 동의했는지도 확인해요.</p>'
    },

    {
      id: 'member-signup-done',
      label: '가입 완료 확인하기',
      shots: pair('signup-done', '09SCM 회원가입 완료'),
      shotCaption: '09SCM 회원가입 완료 화면 (PC / 모바일)',
      overview:
        '<p>회원가입을 마치면 로그인된 상태로 나오는 화면이에요. 가입한 회원주문 코드와 채팅주문 닉네임을 확인해요.</p>' +
        '<ul>' +
          '<li>[회원가입 완료]를 누르면 <a href="#start-login/member-signup">회원가입하기</a>에서 이 화면으로 이동해요.</li>' +
          '<li>이 화면에서 바로 소매몰을 이용할 수 있어요.</li>' +
        '</ul>',
      steps:
        '<h3>회원정보</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>회원주문 코드</td><td>가입할 때 정한 숫자 4자리 코드</td></tr>' +
          '<tr><td>채팅주문 닉네임</td><td>가입할 때 입력한 채팅주문 닉네임 (입력하지 않았다면 나타나지 않음)</td></tr>' +
        '</tbody></table></div>' +
        '<p>회원주문 코드와 채팅주문 닉네임으로 채팅에서도 주문할 수 있다는 안내가 나와요. 이용 방법은 판매자에게 문의해요. [메인으로]를 누르면 소매몰 메인으로 이동해요.</p>',
      cases: [
        {
          title: '닉네임을 입력하지 않고 가입했으면',
          shots: pair('signup-done-plain', '09SCM 회원가입 완료 닉네임 미입력'),
          shotCaption: '09SCM 회원가입 완료 닉네임 미입력 화면 (PC / 모바일)',
          html:
            '<ul>' +
              '<li>회원주문 코드만 나와요.</li>' +
              '<li>회원주문 코드를 간편 주문 조회에 쓸 수 있다는 안내가 나와요.</li>' +
            '</ul>'
        }
      ]
    },

    {
      id: 'member-reset',
      label: '비밀번호 재설정하기',
      shots: [
        { device: 'pc', src: '../assets/img/shop/reset-pc.webp', alt: '09SCM 비밀번호 재설정 PC 화면', ratio: 1440 / 900 },
        { device: 'mobile', src: '../assets/img/shop/reset-mobile.webp', alt: '09SCM 비밀번호 재설정 모바일 화면', ratio: 440 / 900 }
      ],
      shotCaption: '09SCM 비밀번호 재설정 화면 (PC / 모바일)',
      overview:
        '<p>비밀번호가 기억나지 않을 때 가입한 휴대폰번호로 본인 인증을 하고 새 비밀번호를 정해요. 로그인 화면의 [비밀번호 재설정]으로 들어와요.</p>',
      steps:
        '<h3>휴대폰번호 인증</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>휴대폰번호</td><td>가입한 휴대폰번호 ([인증번호 발송]으로 인증번호 받기)</td></tr>' +
          '<tr><td>인증번호</td><td>발송된 숫자 6자리 인증번호 ([확인]으로 인증 완료)</td></tr>' +
        '</tbody></table></div>' +
        '<p>인증이 끝나면 [다음]이 켜지고, 누르면 새 비밀번호 설정으로 넘어가요.</p>' +

        '<h3>새 비밀번호 설정</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>새 비밀번호</td><td>앞으로 쓸 비밀번호 (영문·숫자 조합 8자 이상)</td></tr>' +
          '<tr><td>새 비밀번호 확인</td><td>새 비밀번호와 같은 값</td></tr>' +
        '</tbody></table></div>' +
        '<p>[비밀번호 변경 완료]를 누르면 &quot;비밀번호가 변경되었습니다.&quot; 안내가 나온 뒤 로그인 화면으로 이동해요. 새 비밀번호로 로그인해요. 재설정하지 않으려면 [로그인으로 돌아가기]를 눌러요.</p>',
      cases: [
        {
          title: '인증번호를 발송하면',
          shots: pair('reset-sent', '09SCM 비밀번호 재설정 인증번호 발송'),
          shotCaption: '09SCM 비밀번호 재설정 인증번호 발송 화면',
          html: '<p>&quot;인증번호가 발송되었습니다. 유효시간 03:00&quot; 안내가 나와요. [다음]은 아직 누를 수 없어요.</p>'
        },
        {
          title: '인증번호를 확인하면',
          shots: pair('reset-verified', '09SCM 비밀번호 재설정 인증 완료'),
          shotCaption: '09SCM 비밀번호 재설정 인증 완료 화면',
          html: '<p>&quot;휴대폰번호 인증이 완료되었습니다.&quot; 안내가 나오고 [다음]을 누를 수 있어요.</p>'
        },
        {
          title: '[다음]을 누르면',
          shots: pair('reset-step2', '09SCM 새 비밀번호 설정'),
          shotCaption: '09SCM 새 비밀번호 설정 화면 (PC / 모바일)',
          html: '<p>새 비밀번호와 새 비밀번호 확인을 입력하는 화면으로 바뀌어요. 입력한 뒤 [비밀번호 변경 완료]를 눌러요.</p>'
        },
        {
          title: '비밀번호를 변경하면',
          shots: pair('reset-done', '09SCM 비밀번호 변경 완료 안내'),
          shotCaption: '09SCM 비밀번호 변경 완료 안내 화면 (PC / 모바일)',
          html: '<p>&quot;비밀번호가 변경되었습니다.&quot; 안내가 잠깐 나온 뒤 로그인 화면으로 이동해요. 새 비밀번호로 로그인해요.</p>'
        },
        {
          title: '입력이 맞지 않으면',
          shots: pair('reset-error', '09SCM 비밀번호 재설정 입력 오류'),
          shotCaption: '09SCM 비밀번호 재설정 입력 오류 화면 (PC / 모바일)',
          html:
            '<p>맞지 않는 부분이 있으면 화면 아래에 안내가 잠시 나타나요. 나오는 안내 문구는 아래와 같아요.</p>' +
            '<div class="table-wrap"><table><thead><tr><th>상황</th><th>안내 문구</th></tr></thead><tbody>' +
              '<tr><td>11자리가 아닌 번호로 [인증번호 발송]을 누름</td><td>&quot;휴대폰번호 11자리를 입력해 주세요.&quot;</td></tr>' +
              '<tr><td>6자리가 아닌 인증번호로 [확인]을 누름</td><td>&quot;인증번호 6자리를 입력해 주세요.&quot;</td></tr>' +
              '<tr><td>새 비밀번호와 새 비밀번호 확인이 다름</td><td>&quot;비밀번호가 일치하지 않습니다.&quot;</td></tr>' +
            '</tbody></table></div>'
        }
      ],
      trouble:
        '<h3>[다음]을 누를 수 없어요</h3>' +
        '<p>인증번호 입력 후 [확인]까지 눌러야 켜져요. 휴대폰번호가 11자리가 아니면 인증번호를 보낼 수 없어요.</p>' +
        '<h3>비밀번호가 일치하지 않는다고 나와요</h3>' +
        '<p>새 비밀번호와 새 비밀번호 확인에 같은 값을 입력해요.</p>'
    },

    {
      id: 'member-franchise',
      label: '가맹점 가입 신청하기',
      shots: [
        { device: 'pc', src: '../assets/img/shop/franchise-pc.webp', alt: '09SCM 가맹점 가입 신청 PC 화면', ratio: 2880 / 4048 },
        { device: 'mobile', src: '../assets/img/shop/franchise-mobile.webp', alt: '09SCM 가맹점 가입 신청 모바일 화면', ratio: 880 / 4570 }
      ],
      shotCaption: '09SCM 가맹점 가입 신청 화면 (PC / 모바일)',
      overview:
        '<p>소매몰을 운영할 가맹점이 신청하는 화면이에요. 신청하면 소속 본사의 승인을 기다리는 가맹점 계정(이용대기)이 바로 만들어져요.</p>' +
        '<ul>' +
          '<li>본사 소매몰에서만 들어올 수 있어요. 들어오는 위치는 아래 &quot;가맹점 가입 신청하기로 들어오려면&quot;에서 확인해요.</li>' +
          '<li>소속 본사와 월 이용료는 화면 위쪽 안내에서 확인해요.</li>' +
          '<li>본사가 신청 내용을 확인한 뒤 입력한 휴대폰번호로 승인 결과를 안내해요.</li>' +
        '</ul>',
      steps:
        '<h3>가입 안내</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>소속 본사</td><td>가입 신청을 확인하고 승인하는 본사</td></tr>' +
          '<tr><td>월 이용료</td><td>가맹점이 본사에 내는 월 이용료</td></tr>' +
        '</tbody></table></div>' +

        '<h3>01 회원정보</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>이름 *</td><td>가입 신청자 이름</td></tr>' +
          '<tr><td>이메일 *</td><td>가입 신청자 이메일</td></tr>' +
          '<tr><td>아이디 *</td><td>관리자 로그인과 소매몰 주소(아이디.09scm.com)에 쓰는 아이디 (영문 소문자로 시작하는 영문·숫자 조합 3~20자, [중복 확인] 필요, 승인 후 변경 불가)</td></tr>' +
          '<tr><td>비밀번호 *</td><td>관리자 로그인에 쓰는 비밀번호 (영문·숫자 조합 8자 이상)</td></tr>' +
          '<tr><td>비밀번호 확인 *</td><td>위에서 입력한 비밀번호와 같은 값</td></tr>' +
          '<tr><td>휴대폰번호 *</td><td>승인 결과를 안내받는 휴대폰번호 ([인증번호 발송]으로 인증번호 받기)</td></tr>' +
          '<tr><td>인증번호 *</td><td>발송된 숫자 6자리 인증번호 (유효시간 3분, [인증하기]로 인증 완료)</td></tr>' +
        '</tbody></table></div>' +

        '<h3>02 사업자 정보</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>사업자 유형 *</td><td>개인사업자, 법인사업자 중 선택</td></tr>' +
          '<tr><td>상호명/법인명 *</td><td>사업자등록증에 적힌 상호명 또는 법인명</td></tr>' +
          '<tr><td>대표자명 *</td><td>사업자등록증에 적힌 대표자명</td></tr>' +
          '<tr><td>사업자등록번호 *</td><td>숫자 10자리 ([사업자 인증]으로 인증 완료)</td></tr>' +
          '<tr><td>법인등록번호 *</td><td>법인사업자를 선택했을 때만 나타나는 항목 (숫자 13자리)</td></tr>' +
          '<tr><td>업태</td><td>사업자의 업태 (선택)</td></tr>' +
          '<tr><td>업종</td><td>사업자의 업종 (선택)</td></tr>' +
          '<tr><td>사업장 주소 *</td><td>[주소 찾기]로 우편번호와 기본주소를 입력하고 상세주소는 직접 입력</td></tr>' +
        '</tbody></table></div>' +

        '<h3>03 서비스 이용 및 약관 동의</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>전체 동의</td><td>아래 약관을 한 번에 선택</td></tr>' +
          '<tr><td>이용약관 동의 *</td><td>서비스 이용약관 동의 ([보기]로 본문 확인)</td></tr>' +
          '<tr><td>개인정보처리방침 동의 *</td><td>개인정보처리방침 동의 ([보기]로 본문 확인)</td></tr>' +
          '<tr><td>마케팅정보 수신동의</td><td>마케팅 정보 수신 동의 (선택, [보기]로 본문 확인)</td></tr>' +
        '</tbody></table></div>' +
        '<p>[가입 신청]을 누르면 신청이 접수돼요. [취소]를 누르면 신청하지 않고 소매몰 메인으로 돌아가요.</p>',
      cases: [
        {
          title: '가맹점 가입 신청하기로 들어오려면',
          html: '<p>소매몰 맨 위 유틸리티바의 [가맹점 가입신청]이나 카테고리 메뉴 맨 아래의 [가맹점 가입신청 →]을 눌러요. 위치는 <a href="#browse-main/main-common">공통 영역 보기</a>에서 확인해요.</p>' +
            '<p>[가맹점 가입신청]은 본사 소매몰에만 보여요. 가맹점 소매몰에는 보이지 않아요.</p>'
        },
        {
          group: '입력 단계에 따라',
          rows: [
            {
              title: '아이디 중복 확인을 통과하면',
              shots: pair('franchise-id-ok', '09SCM 가맹점 가입 신청 사용 가능한 아이디'),
              shotCaption: '09SCM 가맹점 가입 신청 사용 가능한 아이디 화면 (PC / 모바일)',
              html: '<ul><li>안내: 사용할 수 있는 아이디라는 안내</li><li>아이디 변경: [중복 확인] 재진행</li></ul>'
            },
            {
              title: '휴대폰번호 인증을 마치면',
              shots: pair('franchise-phone-verified', '09SCM 가맹점 가입 신청 휴대폰번호 인증 완료'),
              shotCaption: '09SCM 가맹점 가입 신청 휴대폰번호 인증 완료 화면 (PC / 모바일)',
              html: '<ul><li>안내: 인증이 완료되었다는 안내</li></ul>'
            },
            {
              title: '사업자등록번호를 인증하면',
              shots: pair('franchise-biz-ok', '09SCM 가맹점 가입 신청 사업자 인증 완료'),
              shotCaption: '09SCM 가맹점 가입 신청 사업자 인증 완료 화면 (PC / 모바일)',
              html: '<ul><li>안내: 사업자등록번호 아래에 인증이 완료되었다는 안내</li></ul>'
            },
            {
              title: '법인사업자를 선택하면',
              shots: pair('franchise-corp', '09SCM 가맹점 가입 신청 법인사업자'),
              shotCaption: '09SCM 가맹점 가입 신청 법인사업자 화면 (PC / 모바일)',
              html: '<ul><li>법인등록번호: 입력란 표시 (숫자 13자리)</li></ul>'
            }
          ]
        },
        {
          title: '약관 [보기]를 누르면',
          shots: pair('franchise-terms', '09SCM 가맹점 가입 신청 약관'),
          shotCaption: '09SCM 가맹점 가입 신청 약관 팝업 화면 (PC / 모바일)',
          html:
            '<p>약관 본문이 팝업으로 열려요. 이용약관, 개인정보처리방침, 마케팅정보 수신동의 팝업은 구성이 같고 제목과 본문만 달라요.</p>' +
            '<ul>' +
              '<li>× 또는 [확인]을 누르거나 팝업 밖을 누르면 닫혀요.</li>' +
              '<li>모바일에서는 팝업이 화면 아래에 붙어 열려요.</li>' +
            '</ul>'
        },
        {
          title: '입력이 맞지 않으면',
          shots: pair('franchise-error', '09SCM 가맹점 가입 신청 입력 오류'),
          shotCaption: '09SCM 가맹점 가입 신청 입력 오류 화면 (PC / 모바일)',
          html:
            '<p>맞지 않는 부분이 있으면 화면 아래에 안내가 잠시 나타나요. 필수 항목이 비어 있으면 입력란 안내가 먼저 나와요. 나오는 안내 문구는 아래와 같아요.</p>' +
            '<div class="table-wrap"><table><thead><tr><th>상황</th><th>안내 문구</th></tr></thead><tbody>' +
              '<tr><td>아이디 형식에 맞지 않는 값으로 [중복 확인]을 누름</td><td>&quot;영문 소문자로 시작하는 영문·숫자 조합 3~20자로 입력해 주세요.&quot;</td></tr>' +
              '<tr><td>아이디 중복 확인 없이 [가입 신청]을 누름</td><td>&quot;아이디 중복 확인을 완료해 주세요.&quot;</td></tr>' +
              '<tr><td>비밀번호와 비밀번호 확인이 다름</td><td>&quot;비밀번호가 일치하지 않습니다.&quot;</td></tr>' +
              '<tr><td>11자리가 아닌 번호로 [인증번호 발송]을 누름</td><td>&quot;휴대폰번호 11자리를 입력해 주세요.&quot;</td></tr>' +
              '<tr><td>6자리가 아닌 인증번호로 [인증하기]를 누름</td><td>&quot;인증번호 6자리를 입력해 주세요.&quot;</td></tr>' +
              '<tr><td>휴대폰번호 인증 없이 [가입 신청]을 누름</td><td>&quot;휴대폰번호 인증을 완료해 주세요.&quot;</td></tr>' +
              '<tr><td>10자리가 아닌 번호로 [사업자 인증]을 누름</td><td>&quot;사업자등록번호 10자리를 입력해 주세요.&quot;</td></tr>' +
              '<tr><td>사업자등록번호 인증 없이 [가입 신청]을 누름</td><td>&quot;사업자등록번호 인증을 완료해 주세요.&quot;</td></tr>' +
            '</tbody></table></div>'
        },
        {
          title: '신청이 접수되면',
          shots: pair('franchise-done', '09SCM 가맹점 가입 신청 완료'),
          shotCaption: '09SCM 가맹점 가입 신청 완료 팝업 화면 (PC / 모바일)',
          html:
            '<p>&quot;가입 신청이 접수되었습니다.&quot; 안내가 팝업으로 나와요.</p>' +
            '<ul>' +
              '<li>[메인화면 복귀]를 누르면 소매몰 메인으로 이동해요.</li>' +
              '<li>[09SCM 솔루션 소개 홈페이지 이동]을 누르면 09SCM 솔루션 소개 홈페이지로 이동해요.</li>' +
            '</ul>'
        },
        {
          title: '가맹점 가입을 신청하면',
          html:
            '<p>신청하면 계정이 바로 만들어져 이용대기 상태로 관리자에 로그인할 수 있어요. 이용대기 동안에는 시스템관리 메뉴만 쓸 수 있고, 온라인 결제 시스템(PayApp) 연동과 정기결제 카드 등록을 준비해요. 본사가 이용승인하면 모든 메뉴를 쓸 수 있어요.</p>' +
            '<p>이용대기 동안 소매몰에는 <a href="#start-gate">대문화면</a>이 나와요. 자세한 내용은 <a href="' + ADMIN_GUIDE_LOGIN + '">09SCM 관리자 이용가이드</a>에서 확인해요.</p>'
        }
      ],
      trouble:
        '<h3>[가입 신청]을 눌러도 접수되지 않아요</h3>' +
        '<p>아이디 중복 확인, 휴대폰번호 인증, 사업자등록번호 인증을 모두 마쳐야 해요. 마치지 않으면 &quot;아이디 중복 확인을 완료해 주세요.&quot; 같은 안내가 나와요. 비밀번호와 비밀번호 확인이 같은지, 필수 약관에 동의했는지도 확인해요.</p>' +
        '<h3>가입 신청하기가 보이지 않아요</h3>' +
        '<p>[가맹점 가입신청]은 본사 소매몰에만 보여요. 본사 소매몰에서 들어와요.</p>' +
        '<h3>아이디를 입력할 수 없어요</h3>' +
        '<p>아이디는 영문 소문자로 시작하는 영문·숫자 조합 3~20자예요. 영문 소문자와 숫자 외의 글자는 입력되지 않아요.</p>'
    }
  ]
};

window.GUIDE_CONTENT['start-gate'] = {
  shots: [
    { device: 'pc', src: '../assets/img/shop/gate-pc.webp', alt: '09SCM 대문 PC 화면', ratio: 1440 / 900 },
    { device: 'mobile', src: '../assets/img/shop/gate-mobile.webp', alt: '09SCM 대문 모바일 화면', ratio: 440 / 900 }
  ],
  shotCaption: '09SCM 대문 화면 (PC / 모바일)',
  overview:
    '<p>소매몰을 운영하는 가맹점이 이용대기·이용제한·이용불가 상태일 때 소매몰 대신 나오는 안내 화면이에요. 새 주문은 받지 않고, 회원주문 코드로 주문 현황만 조회할 수 있어요.</p>' +
    '<ul>' +
      '<li>상품 둘러보기, 장바구니, 주문, 로그인은 쓸 수 없어요.</li>' +
      '<li>이용제한 상태에서는 판매자가 이미 접수된 주문을 계속 처리해요. 그래서 조회한 주문의 상태가 바뀔 수 있어요.</li>' +
    '</ul>',
  steps:
    '<h3>조회하기</h3>' +
    '<ol>' +
      '<li>회원주문 코드 숫자 4자리를 입력해요. 가입할 때 정한 코드예요.</li>' +
      '<li>[조회]를 누르면 코드에 해당하는 회원의 주문이 아래에 나와요.</li>' +
    '</ol>' +
    '<h3>조회 결과</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr>' +
      '</thead><tbody><tr><td>회원주문 코드</td><td>가입할 때 정한 숫자 4자리 코드</td></tr>' +
      '<tr><td>채팅주문 닉네임</td><td>조회한 회원이 등록한 채팅주문 닉네임 (등록하지 않았다면 -)</td></tr>' +
      '<tr><td>진행 중 주문</td><td>수령이 끝나지 않았거나 취소·반품이 요청 중인 주문의 건수와 목록</td></tr>' +
      '<tr><td>완료된 주문</td><td>픽업완료·배달완료되었거나 취소·반품이 승인된 주문의 건수와 목록</td></tr>' +
      '</tbody></table></div>' +
    '<h3>주문 카드</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>주문일</td><td>주문한 날짜</td></tr>' +
      '<tr><td>주문번호</td><td>주문마다 부여되는 번호</td></tr>' +
      '<tr><td>수령방식</td><td>[픽업] 또는 [배달]</td></tr>' +
      '<tr><td>공통 픽업가능일</td><td>픽업 주문에만 표시되는, 주문할 상품들의 픽업가능일이 모두 겹치는 기간</td></tr>' +
      '<tr><td>주문상품</td><td>주문한 상품명과 수량</td></tr>' +
      '<tr><td>처리상태</td><td>주문의 진행 단계 (취소·반품이 요청 중이거나 승인된 주문은 -)</td></tr>' +
      '<tr><td>결제상태</td><td>[결제대기], [결제완료], [결제취소], [환불대기] 중 현재 상태</td></tr>' +
      '<tr><td>취소·반품</td><td>취소·반품 이력이 있는 주문의 현재 상태 (이력이 없으면 표시하지 않음)</td></tr>' +
      '<tr><td>결제금액</td><td>상품금액과 배달비를 더한 최종 결제금액</td></tr>' +
      '</tbody></table></div>',
  cases: [
    {
      title: '회원주문 코드를 조회하면',
      shots: [
        { device: 'pc', src: '../assets/img/shop/gate-result-pc.webp', alt: '09SCM 대문 조회 결과 PC 화면', ratio: 1440 / 900 },
        { device: 'mobile', src: '../assets/img/shop/gate-result-mobile.webp', alt: '09SCM 대문 조회 결과 모바일 화면', ratio: 440 / 900 }
      ],
      shotCaption: '09SCM 대문 조회 결과 화면 (PC / 모바일)',
      html:
        '<p>진행 중 주문 탭이 먼저 열리고, 최근 주문이 위에 나와요. 탭의 숫자는 각 목록의 주문 건수예요.</p>'
    },
    {
      title: '완료된 주문을 보려면',
      shots: [
        { device: 'pc', src: '../assets/img/shop/gate-complete-pc.webp', alt: '09SCM 대문 완료된 주문 PC 화면', ratio: 1440 / 900 },
        { device: 'mobile', src: '../assets/img/shop/gate-complete-mobile.webp', alt: '09SCM 대문 완료된 주문 모바일 화면', ratio: 440 / 900 }
      ],
      shotCaption: '09SCM 대문 완료된 주문 화면 (PC / 모바일)',
      html:
        '<p>[완료된 주문] 탭을 누르면 픽업완료·배달완료되었거나 취소·반품이 승인된 주문이 나와요.</p>'
    },
    {
      title: '조회한 회원의 주문이 없으면',
      shots: [
        { device: 'pc', src: '../assets/img/shop/gate-empty-pc.webp', alt: '09SCM 대문 주문 없음 PC 화면', ratio: 1440 / 900 },
        { device: 'mobile', src: '../assets/img/shop/gate-empty-mobile.webp', alt: '09SCM 대문 주문 없음 모바일 화면', ratio: 440 / 900 }
      ],
      shotCaption: '09SCM 대문 주문 없음 화면 (PC / 모바일)',
      html:
        '<p>해당 탭에 주문이 없으면 &quot;진행 중인 주문이 없습니다.&quot;(완료된 주문 탭은 &quot;완료된 주문이 없습니다.&quot;)가 나와요.</p>'
    },
    {
      title: '일치하는 회원주문 코드가 없으면',
      shots: [
        { device: 'pc', src: '../assets/img/shop/gate-none-pc.webp', alt: '09SCM 대문 일치하는 회원주문 코드 없음 PC 화면', ratio: 1440 / 900 },
        { device: 'mobile', src: '../assets/img/shop/gate-none-mobile.webp', alt: '09SCM 대문 일치하는 회원주문 코드 없음 모바일 화면', ratio: 440 / 900 }
      ],
      shotCaption: '09SCM 대문 일치하는 회원주문 코드 없음 화면 (PC / 모바일)',
      html:
        '<p>&quot;일치하는 회원주문 코드가 없습니다.&quot;가 나와요. 코드를 다시 확인해서 입력해요.</p>'
    }
  ],
  trouble:
    '<h3>회원주문 코드를 몰라요</h3>' +
    '<p>회원주문 코드는 회원가입할 때 정한 숫자 4자리예요. 기억나지 않으면 판매자에게 문의해 주세요.</p>' +
    '<h3>주문 상세나 취소 버튼이 보이지 않아요</h3>' +
    '<p>대문화면에서는 주문 현황만 조회할 수 있어요. 소매몰 이용이 다시 열리면 주문내역에서 주문 상세와 취소·반품을 이용해요.</p>' +
    '<h3>쇼핑몰은 언제 다시 열려요</h3>' +
    '<p>판매자의 이용상태가 바뀌어야 열려요. 판매자에게 문의해 주세요.</p>'
};

window.GUIDE_CONTENT['start-terms'] = {
  sections: [
    { id: 'sec1', label: '계정과 화면', html:
      '<div class="table-wrap"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody>' +
        '<tr><td>소매몰</td><td>본사와 가맹점이 각자 운영하는 공동구매 쇼핑몰</td></tr>' +
        '<tr><td>판매자</td><td>소매몰을 운영하는 본사 또는 가맹점</td></tr>' +
        '<tr><td>회원</td><td>휴대폰번호로 소매몰에 가입한 손님 (휴대폰번호가 회원 아이디)</td></tr>' +
        '<tr><td>회원 이용상태</td><td>정상, 이용제한 (이용제한 회원은 로그인과 신규 주문 불가, 판매자가 설정)</td></tr>' +
        '<tr><td>대문화면</td><td>소매몰을 운영하는 가맹점이 이용대기·이용제한·이용불가 상태일 때 소매몰 대신 나오는 안내 화면 (새 주문 불가, 간편 주문 조회 가능)</td></tr>' +
        '<tr><td>간편 주문 조회</td><td>회원주문 코드 4자리로 로그인 없이 주문 현황을 조회하는 기능</td></tr>' +
        '<tr><td>대표 배달지</td><td>주문서에서 불러와 쓰는 배달 주소 (회원당 1건, 선택 등록)</td></tr>' +
      '</tbody></table></div>' },

    { id: 'sec2', label: '주문과 결제', html:
      '<div class="table-wrap"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody>' +
        '<tr><td>주문경로</td><td>주문이 들어온 방법<br><b>링크주문</b> 소매몰에서 직접 하는 주문<br><b>채팅주문</b> 오픈채팅방에 정해진 형식으로 메시지를 보내 하는 주문</td></tr>' +
        '<tr><td>수령방식</td><td>주문한 상품을 받는 방법: [픽업], [배달]</td></tr>' +
        '<tr><td>픽업가능일</td><td>상품을 픽업할 수 있는 날짜 또는 기간 (상품마다 다름)</td></tr>' +
        '<tr><td>공통 픽업가능일</td><td>한 주문에 담긴 상품들의 픽업가능일이 모두 겹치는 기간 (주문할 때 정해지고 이후 상품 설정이 바뀌어도 접수된 주문은 바뀌지 않으며, 배달 주문에는 없음)</td></tr>' +
        '<tr><td>배달비</td><td>배달 주문에만 붙는 비용 (상품금액과 별도)</td></tr>' +
        '<tr><td>결제수단</td><td>[카드결제], [계좌이체], [현장결제] (현장결제는 픽업할 때 결제하는 방식, 배달은 카드결제만 가능)</td></tr>' +
        '<tr><td>결제상태</td><td>[결제대기], [결제완료], [결제취소], [환불대기]</td></tr>' +
        '<tr><td>환불대기</td><td>페이앱 정산이 끝난 카드결제 주문의 취소·반품이 승인되었으나 판매자의 환불이 끝나지 않은 결제상태 (환불이 끝나면 결제취소로 바뀜)</td></tr>' +
        '<tr><td>처리상태</td><td>픽업: 주문접수 → 픽업대기 → 픽업완료<br>배달: 주문접수 → 배달대기 → 배달중 → 배달완료<br>취소·반품이 요청 중이거나 승인된 주문은 -로 표시</td></tr>' +
        '<tr><td>주문 취소</td><td>주문접수 단계의 카드결제·결제대기 주문을 판매자 승인 없이 바로 취소하는 것 (페이앱 정산이 끝난 카드결제 주문은 제외)</td></tr>' +
        '<tr><td>취소 요청</td><td>계좌이체·현장결제로 결제가 끝난 주문접수 건의 취소를 판매자에게 요청하는 것 (판매자 확인 후 취소)</td></tr>' +
        '<tr><td>반품 요청</td><td>픽업완료·배달완료 후 7일 이내 주문의 반품을 판매자에게 요청하는 것 (판매자 확인 후 처리)</td></tr>' +
        '<tr><td>취소·반품 상태</td><td>취소요청, 반품요청이 들어오면 승인 또는 반려: 취소승인, 반품승인, 취소반려, 반품반려 (반려되면 요청 이전 상태로 돌아감)</td></tr>' +
        '<tr><td>환불정보</td><td>계좌이체 주문의 취소·반품을 요청할 때 입력하는 환불받을 계좌 (은행, 계좌번호, 예금주)</td></tr>' +
      '</tbody></table></div>' },

    { id: 'sec3', label: '채팅주문', html:
      '<div class="table-wrap"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody>' +
        '<tr><td>채팅주문</td><td>오픈채팅방에 정해진 형식으로 메시지를 보내 주문하는 방식 (항상 픽업·현장결제)</td></tr>' +
        '<tr><td>오픈채팅방</td><td>판매자가 채팅주문을 받는 채팅방</td></tr>' +
        '<tr><td>회원주문 코드</td><td>가입할 때 정한 회원 확인용 숫자 4자리 코드 (같은 소매몰 안에서 중복 불가, 간편 주문 조회에도 사용)</td></tr>' +
        '<tr><td>채팅주문 닉네임</td><td>회원이 오픈채팅방에서 쓰는 닉네임 (회원주문 코드와 함께 확인하며, 등록하지 않으면 채팅주문 이용 불가)</td></tr>' +
      '</tbody></table></div>' },

    { id: 'sec4', label: '상품', html:
      '<div class="table-wrap"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody>' +
        '<tr><td>품절</td><td>재고가 없어 주문할 수 없는 상품 (상품목록에는 보이고 상품상세에서 구매 불가)</td></tr>' +
        '<tr><td>소비자가</td><td>상품의 정상 가격 (취소선으로 표시)</td></tr>' +
        '<tr><td>할인가 · 할인율</td><td>할인이 적용된 가격과 소비자가 대비 할인된 비율</td></tr>' +
        '<tr><td>판매가</td><td>실제로 결제되는 개당 가격 (할인가가 있으면 할인가, 없으면 소비자가)</td></tr>' +
        '<tr><td>1회 최대구매수량</td><td>한 번에 주문할 수 있는 최대 수량</td></tr>' +
      '</tbody></table></div>' }
  ]
};

window.GUIDE_CONTENT['browse-main'] = {
  screens: [
    {
      id: 'main-home',
      label: '메인화면 보기',
      shots: pair('browse-main', '09SCM 소매몰 메인'),
      shotCaption: '09SCM 소매몰 메인 화면 (PC / 모바일)',
      overview:
        '<p>소매몰에 들어오면 처음 보이는 화면이에요. 판매자의 매장 정보와 지금 살 수 있는 상품을 한 번에 볼 수 있고, 로그인하지 않아도 볼 수 있어요.</p>' +
        '<ul>' +
          '<li>상품 카드를 누르면 <a href="#browse-detail">상품상세</a>로, 각 영역의 [보기 →]를 누르면 <a href="#browse-list">상품목록</a>으로 이동해요.</li>' +
          '<li>헤더, 카테고리 메뉴, [주문 조회] 버튼, 푸터는 모든 화면에 똑같이 나와요. <a href="#browse-main/main-common">공통 영역 보기</a></li>' +
        '</ul>',
      steps:
        '<h3>매장정보</h3>' +
        '<p>판매자가 입력한 매장 정보를 보여줘요. 처음에는 가입할 때 입력한 정보가 들어가요.</p>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>상호</td><td>소매설정의 상호명 (처음에는 가입할 때 입력한 상호명, 소매몰 이름과는 별개의 값)</td></tr>' +
          '<tr><td>픽업 주소</td><td>소매설정의 픽업주소 (우편번호·기본주소·상세주소를 이어서 표시, 처음에는 가입할 때 입력한 사업장 주소)</td></tr>' +
          '<tr><td>문의 전화</td><td>소매설정의 문의전화 (처음에는 비어 있고, 입력하지 않으면 이 항목은 보이지 않음)</td></tr>' +
          '<tr><td>영업시간</td><td>소매설정의 영업시간 (처음에는 비어 있고, 입력하지 않으면 이 항목은 보이지 않음)</td></tr>' +
          '<tr><td>계좌이체</td><td>판매자 회원정보의 계좌정보 (은행, 계좌번호, 예금주 순서로 표시, [복사]를 누르면 계좌 정보를 복사)</td></tr>' +
        '</tbody></table></div>' +
        '<p>판매자는 관리자의 <a href="' + ADMIN_GUIDE + 'retail-settings">소매설정</a>에서 이 값을 바꿔요. 계좌정보는 <a href="' + ADMIN_GUIDE + 'system-member">회원정보</a>에서 바꿔요.</p>' +

        '<h3>상품 영역</h3>' +
        '<p>상품은 세 영역으로 나뉘어 있어요. 소매몰에 노출 중인 상품만 보여요.</p>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>오늘 픽업 가능 상품</td><td>오늘 픽업할 수 있는 판매중 상품 (최대 4개, 픽업가능종료일이 가까운 순, 같으면 최근 등록한 순, [픽업상품 보기 →]를 누르면 오늘 픽업 가능 상품 목록으로 이동)</td></tr>' +
          '<tr><td>배달 가능 상품</td><td>배달을 받을 수 있는 판매중 상품 (최대 4개, 최근 등록한 순, [배달상품 보기 →]를 누르면 배달 가능 상품 목록으로 이동)</td></tr>' +
          '<tr><td>메인 상품</td><td>판매자가 메인상품진열에서 고른 상품 (고른 순서 그대로, 품절 상품도 품절로 표시, [전체상품 보기 →]를 누르면 전체상품 목록으로 이동)</td></tr>' +
        '</tbody></table></div>' +
        '<p>세 영역 모두 해당하는 상품이 없으면 영역 자체가 보이지 않아요. 판매자는 관리자의 <a href="' + ADMIN_GUIDE + 'retail-product-display">메인상품진열</a>에서 메인 상품을 정해요.</p>' +

        '<h3>상품 카드</h3>' +
        '<p>세 영역의 상품 카드는 모두 같은 모습이에요. 카드를 누르면 상품상세로 이동하며, PC에서는 마우스를 올리면 &quot;상품 상세보기 →&quot;가 보여요.</p>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>상품 이미지</td><td>상품 대표 이미지 (품절이면 이미지 위에 [품절] 표시)</td></tr>' +
          '<tr><td>수령방식</td><td>상품이 지원하는 [픽업], [배달] 표시</td></tr>' +
          '<tr><td>픽업가능일</td><td>상품을 픽업할 수 있는 날짜 또는 기간 (픽업이 가능한 상품만 표시)</td></tr>' +
          '<tr><td>카테고리</td><td>상품의 소매 카테고리 (1차 &gt; 2차)</td></tr>' +
          '<tr><td>상품명</td><td>판매 중인 상품의 이름</td></tr>' +
          '<tr><td>가격</td><td>할인가가 있으면 할인가와 할인율, 소비자가(취소선)를 표시하고 없으면 소비자가만 표시</td></tr>' +
        '</tbody></table></div>',
      cases: [
        {
          title: '매장정보의 [복사]를 누르면',
          shots: pair('store-copy-toast', '09SCM 소매몰 계좌 복사 안내'),
          shotCaption: '09SCM 소매몰 계좌 복사 안내 화면 (PC / 모바일)',
          html: '<p>표시된 계좌정보가 복사되고 &quot;계좌이체 계좌를 복사했습니다.&quot; 안내가 잠깐 나와요. 복사하지 못하면 &quot;입금계좌: ○○…&quot;처럼 계좌정보를 안내로 보여줘요.</p>'
        },
        {
          title: '세 영역에 보여줄 상품이 하나도 없으면',
          shots: pair('browse-empty', '09SCM 소매몰 메인 상품이 없는'),
          shotCaption: '09SCM 소매몰 메인 상품이 없는 화면 (PC / 모바일)',
          html:
            '<p>세 영역이 모두 보이지 않고 "지금 소개할 상품이 없습니다." 안내와 [전체상품 보기] 버튼이 나와요. [전체상품 보기]를 누르면 전체상품 목록으로 이동해요.</p>'
        },
        {
          title: '메인상품진열에 상품이 없으면',
          html:
            '<p>메인 상품 영역만 보이지 않아요. 오늘 픽업 가능 상품과 배달 가능 상품은 해당하는 상품이 있으면 그대로 나와요.</p>'
        }
      ],
      trouble:
        '<h3>메인에서 상품이 보이지 않아요</h3>' +
        '<p>메인 상품에는 판매자가 메인상품진열에 추가한 상품만 보여요. 추가한 상품이 없으면 메인 상품 영역이 보이지 않아요. 픽업 기간이 끝났거나 재고가 없어 노출이 해제된 상품은 진열에서도 빠져요. <a href="#browse-list">상품목록</a>의 전체상품에서는 노출 중인 상품을 모두 볼 수 있어요.</p>' +
        '<h3>오늘 픽업 가능 상품 영역이 보이지 않아요</h3>' +
        '<p>오늘 픽업할 수 있는 판매중 상품이 없으면 영역이 나오지 않아요. 다른 날짜에 픽업할 수 있는 상품은 <a href="#browse-list">상품목록</a>의 픽업가능일 선택에서 확인해요.</p>' +
        '<h3>배달 가능 상품 영역이 보이지 않아요</h3>' +
        '<p>배달을 받을 수 있는 판매중 상품이 없으면 영역이 나오지 않아요. 판매자가 상품의 수령방식에 배달을 포함하면 나타나요.</p>'
    },

    {
      id: 'main-common',
      label: '공통 영역 보기',
      shots: pair('browse-common', '09SCM 소매몰 공통 영역'),
      shotCaption: '09SCM 소매몰 공통 영역 화면 (PC / 모바일)',
      overview:
        '<p>메인화면뿐 아니라 소매몰의 모든 화면에 똑같이 나오는 영역이에요. 위쪽의 유틸리티바와 헤더, 카테고리 메뉴, 화면에 떠 있는 [주문 조회] 버튼, 아래쪽 푸터로 이루어져요.</p>' +
        '<ul>' +
          '<li>PC에서는 헤더에 카테고리, 검색, 로그인, 장바구니, 마이페이지가 모두 나와요. 모바일에서는 헤더에 메뉴 아이콘과 돋보기만 나오고, 로그인·장바구니·마이페이지는 카테고리 메뉴 안에 있어요.</li>' +
        '</ul>',
      steps:
        '<h3>유틸리티바</h3>' +
        '<p>화면 맨 위의 검은 띠예요.</p>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>안내 문구</td><td>&quot;동네에서 함께 사는 즐거움&quot; (판매자가 바꿀 수 없는 고정 문구)</td></tr>' +
          '<tr><td>가맹점 가입신청</td><td>가맹점 가입 신청 화면으로 이동 (본사 소매몰에만 표시, 가맹점 소매몰에는 보이지 않음, <a href="#start-login/member-franchise">가맹점 가입 신청하기</a>)</td></tr>' +
          '<tr><td>관리자 로그인</td><td>판매자가 쓰는 관리자 로그인 화면으로 이동 (새 창으로 열림, <a href="' + ADMIN_GUIDE_LOGIN + '">09SCM 관리자 이용가이드</a>)</td></tr>' +
        '</tbody></table></div>' +

        '<h3>헤더</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>카테고리</td><td>누르면 카테고리 메뉴가 열림 (모바일은 메뉴 아이콘)</td></tr>' +
          '<tr><td>검색</td><td>누르면 상품 검색창이 열림 (모바일은 오른쪽의 돋보기 아이콘)</td></tr>' +
          '<tr><td>소매몰 이름</td><td>소매설정의 소매몰명 (처음에는 가입할 때 입력한 상호명, 소매몰로고를 등록하면 이름 대신 로고 이미지가 표시되며, 누르면 메인화면으로 이동)</td></tr>' +
          '<tr><td>로그인</td><td>로그인 화면으로 이동 (로그인한 상태에서는 [로그아웃])</td></tr>' +
          '<tr><td>장바구니</td><td>장바구니로 이동 (담은 품목 수를 숫자로 표시, 같은 상품이라도 수령방식이 다르면 별도 품목)</td></tr>' +
          '<tr><td>마이페이지</td><td>주문내역으로 이동 (로그인하지 않았다면 로그인 안내 후 로그인 화면으로 이동)</td></tr>' +
        '</tbody></table></div>' +
        '<p>소매몰명은 브라우저 탭 제목과 카카오톡 등으로 링크를 공유할 때 보이는 이름에도 쓰여요. 링크를 공유할 때 보이는 이미지는 소매설정의 공유 이미지이고, 등록하지 않으면 기본 이미지가 나와요. 판매자는 관리자의 <a href="' + ADMIN_GUIDE + 'retail-settings">소매설정</a>에서 소매몰명, 소매몰로고, 공유 이미지를 바꿔요.</p>' +

        '<h3>상품 검색창</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>상품 검색</td><td>찾을 상품의 이름이나 카테고리 이름 입력 (대소문자 구분 없음)</td></tr>' +
          '<tr><td>[검색]</td><td>입력한 단어로 검색한 결과를 <a href="#browse-list">상품목록</a>에 표시</td></tr>' +
          '<tr><td>[닫기]</td><td>검색창을 닫음 (PC에서만 표시, 모바일은 돋보기가 바뀐 ×로 닫음)</td></tr>' +
        '</tbody></table></div>' +

        '<h3>카테고리 메뉴</h3>' +
        '<p>왼쪽에서 열리는 메뉴예요. 메뉴 바깥이나 ×를 누르면 닫혀요.</p>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>로그인 · 장바구니 · 마이페이지</td><td>헤더와 같은 메뉴 (모바일에서는 헤더 대신 여기서 이용)</td></tr>' +
          '<tr><td>픽업상품</td><td>오늘 픽업 가능 상품 목록으로 이동</td></tr>' +
          '<tr><td>배달상품</td><td>배달 가능 상품 목록으로 이동</td></tr>' +
          '<tr><td>전체상품</td><td>노출 중인 모든 상품의 목록으로 이동</td></tr>' +
          '<tr><td>1차·2차 카테고리</td><td>판매자가 상품카테고리에 등록한 카테고리 (관리자에서 정한 순서 그대로 표시, 누르면 해당 카테고리의 상품목록으로 이동)</td></tr>' +
          '<tr><td>관리자 로그인 · 가맹점 가입신청</td><td>유틸리티바와 같은 링크 (메뉴 맨 아래, 가맹점 가입신청은 본사 소매몰에만 표시)</td></tr>' +
        '</tbody></table></div>' +
        '<p>판매자는 관리자의 <a href="' + ADMIN_GUIDE + 'retail-product-category">상품카테고리</a>에서 카테고리를 추가하고 순서를 바꿔요.</p>' +

        '<h3>[주문 조회] 버튼</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>[주문 조회]</td><td>회원주문 코드로 로그인 없이 주문 현황을 확인하는 <a href="#check-quick">간편 주문 조회</a>로 이동</td></tr>' +
          '<tr><td>표시 위치</td><td>PC는 화면 오른쪽 아래에 떠 있는 버튼, 모바일은 화면 맨 아래 가로 띠 [간편 주문조회 →] (스크롤해도 따라 다님, 간편 주문 조회 화면에서는 보이지 않음)</td></tr>' +
        '</tbody></table></div>' +

        '<h3>푸터</h3>' +
        '<p>화면 맨 아래의 사업자 정보예요.</p>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>상호명</td><td>판매자 회원정보 사업자정보의 상호명 (매장정보의 상호와 다를 수 있음)</td></tr>' +
          '<tr><td>대표자명</td><td>판매자 회원정보 사업자정보의 대표자명</td></tr>' +
          '<tr><td>사업자등록번호</td><td>판매자 회원정보 사업자정보의 사업자등록번호</td></tr>' +
          '<tr><td>통신판매업 신고번호</td><td>소매설정에 입력한 통신판매업 신고번호 (입력하지 않으면 항목 이름까지 보이지 않음)</td></tr>' +
          '<tr><td>사업장주소</td><td>판매자 회원정보 사업자정보의 사업장 주소</td></tr>' +
          '<tr><td>이용약관 · 개인정보처리방침</td><td>소매설정의 이용약관·개인정보처리방침 내용 (누르면 해당 내용 화면으로 이동)</td></tr>' +
          '<tr><td>09SCM 안내</td><td>&quot;동네에서 함께 사는 즐거움 - 09SCM&quot; 문구와 [09SCM 솔루션 소개 →] (고정 안내이며 누르면 09SCM 소개 페이지가 새 창으로 열림)</td></tr>' +
        '</tbody></table></div>',
      cases: [
        {
          title: '검색창을 열면',
          shots: pair('browse-search', '09SCM 소매몰 검색창을 연'),
          shotCaption: '09SCM 소매몰 검색창을 연 화면 (PC / 모바일)',
          html: '<p>헤더 바로 아래에 검색창이 열려요. 검색어를 입력하고 [검색]을 누르면 검색 결과가 나와요.</p>'
        },
        {
          title: '카테고리 메뉴를 열면',
          shots: pair('browse-menu', '09SCM 소매몰 카테고리 메뉴를 연'),
          shotCaption: '09SCM 소매몰 카테고리 메뉴 화면 (PC / 모바일)',
          html: '<p>화면 왼쪽에서 메뉴가 열리고 나머지 화면은 어둡게 보여요. 메뉴가 열려 있는 동안에는 뒤 화면을 스크롤할 수 없어요.</p>'
        },
        {
          title: '로그인한 상태이면',
          shots: pair('browse-login', '09SCM 소매몰 로그인한'),
          shotCaption: '09SCM 소매몰 로그인한 화면 (PC / 모바일)',
          html: '<p>[로그인]이 [로그아웃]으로 바뀌어요. 모바일에서는 카테고리 메뉴 맨 위에서 바뀐 모습을 볼 수 있어요. [로그아웃]을 누르면 로그아웃하고 메인화면으로 이동해요.</p>'
        },
        {
          title: '화면 맨 아래로 내리면',
          shots: pair('browse-footer', '09SCM 소매몰 푸터'),
          shotCaption: '09SCM 소매몰 푸터 화면 (PC / 모바일)',
          html: '<p>사업자 정보와 이용약관, 개인정보처리방침이 나와요.</p>'
        }
      ],
      trouble:
        '<h3>원하는 카테고리가 메뉴에 없어요</h3>' +
        '<p>판매자가 상품카테고리에 등록한 카테고리만 나와요. 카테고리가 필요하면 판매자에게 문의해 주세요.</p>' +
        '<h3>[주문 조회] 버튼이 보이지 않아요</h3>' +
        '<p>간편 주문 조회 화면에서는 이미 그 화면에 있으므로 버튼이 보이지 않아요. 다른 화면으로 이동하면 다시 나타나요.</p>' +
        '<h3>푸터에 통신판매업 신고번호가 없어요</h3>' +
        '<p>판매자가 소매설정에 입력하지 않으면 항목 이름까지 보이지 않아요. 자세한 내용은 판매자에게 문의해 주세요.</p>'
    }
  ]
};

window.GUIDE_CONTENT['browse-list'] = {
  shots: pair('list-all', '09SCM 소매몰 상품목록'),
  shotCaption: '09SCM 소매몰 상품목록 화면 (PC / 모바일)',
  overview:
    '<p>상품을 목록으로 보는 화면이에요. 전체상품, 카테고리, 픽업, 배달, 검색 결과를 모두 이 화면 하나에서 보여주고, 어떤 메뉴로 들어왔는지에 따라 제목과 보이는 상품만 달라져요. 소매몰에 노출 중인 상품만 보여요.</p>' +
    '<ul>' +
      '<li>상품 카드를 누르면 <a href="#browse-detail">상품상세</a>로 이동해요. 카드 구성은 <a href="#browse-main">메인화면</a>의 상품 카드와 같아요.</li>' +
      '<li>판매중 상품이 앞에, 품절 상품이 뒤에 나와요. 같은 상태 안에서는 최근 등록한 상품이 먼저 나와요.</li>' +
    '</ul>',
  steps:
    '<h3>들어오는 방법</h3>' +
    '<p>들어온 경로에 따라 제목과 보이는 상품이 달라져요.</p>' +
    '<div class="table-wrap"><table><thead><tr><th>진입</th><th>제목</th><th>보이는 상품</th></tr></thead><tbody>' +
      '<tr><td>전체상품</td><td>전체상품</td><td>노출 중인 모든 상품 (메인화면의 [전체상품 보기 →], 카테고리 메뉴의 [전체상품])</td></tr>' +
      '<tr><td>카테고리</td><td>선택한 카테고리 이름 (2차를 고르면 2차, 1차를 고르면 1차)</td><td>해당 카테고리의 상품 (1차를 고르면 하위 2차 카테고리의 상품과 2차가 없는 상품도 포함)</td></tr>' +
      '<tr><td>픽업</td><td>MM/DD 픽업 가능 상품</td><td>선택한 날짜에 픽업할 수 있는 상품 (메인화면의 [픽업상품 보기 →], 카테고리 메뉴의 [픽업상품])</td></tr>' +
      '<tr><td>배달</td><td>배달 가능 상품</td><td>배달을 받을 수 있는 상품 (메인화면의 [배달상품 보기 →], 카테고리 메뉴의 [배달상품])</td></tr>' +
      '<tr><td>검색</td><td>‘검색어’ 검색결과</td><td>상품명이나 카테고리 이름에 검색어가 들어 있는 상품</td></tr>' +
    '</tbody></table></div>' +

    '<h3>화면 구성</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>제목</td><td>들어온 경로에 맞는 제목 (위 표 참고)</td></tr>' +
      '<tr><td>총 개수</td><td>조건에 맞는 상품의 개수 (예: 총 12개)</td></tr>' +
      '<tr><td>픽업가능일 선택</td><td>픽업으로 들어왔을 때만 표시 (오늘부터 7일, 처음에는 오늘 날짜가 선택됨)</td></tr>' +
      '<tr><td>상품 카드</td><td>상품 이미지(품절이면 [품절] 표시), 수령방식, 픽업가능일, 카테고리, 상품명, 가격 (누르면 상품상세로 이동)</td></tr>' +
    '</tbody></table></div>',
  cases: [
    {
      title: '카테고리를 선택하면',
      shots: pair('list-category', '09SCM 소매몰 카테고리 상품목록'),
      shotCaption: '09SCM 소매몰 카테고리 상품목록 화면 (PC / 모바일)',
      html:
        '<p>카테고리 이름이 제목으로 나오고 그 카테고리의 상품만 보여요. 카테고리는 <a href="#browse-main/main-common">카테고리 메뉴</a>에서 골라요.</p>'
    },
    {
      title: '픽업상품을 선택하면',
      shots: pair('list-pickup', '09SCM 소매몰 픽업 가능 상품목록'),
      shotCaption: '09SCM 소매몰 픽업 가능 상품목록 화면 (PC / 모바일)',
      html:
        '<p>오늘 날짜가 선택된 상태로 열려요. 위쪽 날짜 버튼(오늘부터 7일)을 누르면 그날 픽업할 수 있는 상품으로 바뀌고, 제목의 날짜도 함께 바뀌어요.</p>'
    },
    {
      title: '배달상품을 선택하면',
      shots: pair('list-delivery', '09SCM 소매몰 배달 가능 상품목록'),
      shotCaption: '09SCM 소매몰 배달 가능 상품목록 화면 (PC / 모바일)',
      html:
        '<p>배달을 받을 수 있는 상품만 보여요. 픽업과 배달을 모두 지원하는 상품도 함께 나와요.</p>'
    },
    {
      title: '상품을 검색하면',
      shots: pair('list-search', '09SCM 소매몰 검색 결과'),
      shotCaption: '09SCM 소매몰 검색 결과 화면 (PC / 모바일)',
      html:
        '<p>입력한 검색어가 제목에 나오고, 상품명이나 카테고리 이름에 검색어가 들어 있는 상품이 보여요. 대소문자는 구분하지 않아요. 검색창은 <a href="#browse-main/main-common">상품 검색창</a>에서 열어요.</p>'
    },
    {
      title: '조건에 맞는 상품이 없으면',
      shots: pair('list-empty', '09SCM 소매몰 조건에 맞는 상품이 없는'),
      shotCaption: '09SCM 소매몰 조건에 맞는 상품이 없는 화면 (PC / 모바일)',
      html:
        '<p>&quot;조건에 맞는 상품이 없습니다.&quot; 안내와 [전체상품 보기] 버튼이 나와요. 버튼을 누르면 전체상품 목록으로 이동해요.</p>'
    }
  ],
  trouble:
    '<h3>찾는 상품이 목록에 없어요</h3>' +
    '<p>소매몰에 노출 중인 상품만 보여요. 판매자가 노출을 해제했거나 판매가 끝난 상품은 나오지 않으니 판매자에게 문의해 주세요.</p>' +
    '<h3>날짜를 바꾸니 상품이 사라져요</h3>' +
    '<p>상품마다 픽업할 수 있는 날짜가 달라요. 픽업 목록에는 선택한 날짜에 픽업할 수 있는 상품만 보여요.</p>' +
    '<h3>품절 상품이 맨 뒤에 있어요</h3>' +
    '<p>판매중 상품을 먼저 보여주고 품절 상품은 뒤에 모아서 보여줘요.</p>'
};

window.GUIDE_CONTENT['browse-detail'] = {
  shots: pair('detail-main', '09SCM 소매몰 상품상세'),
  shotCaption: '09SCM 소매몰 상품상세 화면 (PC / 모바일)',
  overview:
    '<p>상품 하나의 자세한 정보를 보고, 수령방식과 수량을 골라 장바구니에 담거나 바로 주문하는 화면이에요. 로그인하지 않아도 볼 수 있어요.</p>' +
    '<ul>' +
      '<li><a href="#browse-main">메인화면</a>이나 <a href="#browse-list">상품목록</a>에서 상품 카드를 누르면 들어와요.</li>' +
      '<li>판매자가 소매정보에 입력한 내용이 그대로 보여요. 입력하지 않은 항목은 보이지 않아요. 판매자는 관리자의 <a href="' + ADMIN_GUIDE + 'retail-product-list">상품목록</a>에서 소매정보를 입력해요.</li>' +
    '</ul>',
  steps:
    '<h3>상품 정보</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>현재 위치</td><td>홈 &gt; 1차 카테고리 &gt; 2차 카테고리 (누르면 해당 화면으로 이동)</td></tr>' +
      '<tr><td>상품 이미지</td><td>소매정보에 등록한 이미지 (첫 번째 이미지가 대표 이미지, 좌우 화살표나 아래 작은 이미지를 눌러 넘겨 보고, 현재 위치를 1 / 3처럼 표시)</td></tr>' +
      '<tr><td>카테고리 · 상품명</td><td>상품의 소매 카테고리(1차 &gt; 2차)와 상품명 (품절이면 상품명 옆에 [품절] 표시)</td></tr>' +
      '<tr><td>가격</td><td>할인가가 있으면 할인가와 할인율, 소비자가(취소선)를 표시하고 없으면 소비자가만 표시</td></tr>' +
      '<tr><td>상품 구성</td><td>소매정보의 상품구성 (입력하지 않으면 이 항목은 보이지 않음)</td></tr>' +
      '<tr><td>1회 최대구매수량</td><td>한 번에 살 수 있는 최대 수량 (입력하지 않으면 제한이 없어 이 항목은 보이지 않고, 판매가능수량까지 살 수 있음)</td></tr>' +
      '<tr><td>원산지 · 소비기한</td><td>소매정보에 입력한 값 (입력하지 않으면 이 항목은 보이지 않음)</td></tr>' +
      '<tr><td>픽업가능일</td><td>상품을 픽업할 수 있는 날짜 또는 기간 (픽업이 가능한 상품만 표시)</td></tr>' +
      '<tr><td>배달비</td><td>배달이 가능한 상품에만 표시되는 소매설정의 기본 배달비 (0원이면 0원으로 표시)</td></tr>' +
    '</tbody></table></div>' +
    '<p>판매자는 관리자의 <a href="' + ADMIN_GUIDE + 'retail-settings">소매설정</a>에서 기본 배달비를 정해요.</p>' +

    '<h3>주문 선택</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>수령방식</td><td>상품이 지원하는 [픽업], [배달] 중 선택 (한 가지만 지원하면 그 방식만 표시)</td></tr>' +
      '<tr><td>수량</td><td>[−], [+]로 조절 (1개부터, 1회 최대구매수량과 판매가능수량 이내)</td></tr>' +
      '<tr><td>총 상품금액</td><td>선택한 수량을 기준으로 계산한 금액 (배달비는 포함하지 않음)</td></tr>' +
      '<tr><td>[장바구니 담기]</td><td>선택한 수령방식과 수량으로 장바구니에 담음 (담으면 &quot;○○ 2개를 픽업 장바구니에 담았습니다.&quot; 안내가 나오고, 같은 상품을 같은 수령방식으로 다시 담으면 수량이 늘어남)</td></tr>' +
      '<tr><td>[바로 주문]</td><td>이 상품만 바로 주문서로 이동 (장바구니에는 담기지 않으며, 장바구니에 담긴 상품에도 영향 없음)</td></tr>' +
    '</tbody></table></div>' +
    '<p>모바일에서는 두 버튼이 화면 아래에 고정되어 스크롤해도 따라 다녀요.</p>' +

    '<h3>상세정보</h3>' +
    '<p>상품 아래에 판매자가 입력한 상세정보가 나와요. 입력하지 않으면 이 영역은 보이지 않아요.</p>',
  cases: [
    {
      title: '품절 상품이면',
      shots: pair('detail-soldout', '09SCM 소매몰 품절 상품상세'),
      shotCaption: '09SCM 소매몰 품절 상품상세 화면 (PC / 모바일)',
      html:
        '<p>상품명 옆에 [품절]이 표시되고 수량 조절과 [장바구니 담기], [바로 주문]이 눌리지 않아요.</p>'
    },
    {
      title: '한 가지 수령방식만 가능한 상품이면',
      shots: pair('detail-pickup', '09SCM 소매몰 픽업 전용 상품상세'),
      shotCaption: '09SCM 소매몰 픽업 전용 상품상세 화면 (PC / 모바일)',
      html:
        '<p>수령방식에 지원하는 방식 하나만 나와요. 픽업만 가능하면 배달비가 보이지 않고, 배달만 가능하면 픽업가능일이 보이지 않아요.</p>'
    },
    {
      title: '상세정보를 입력했으면',
      shots: pair('detail-info', '09SCM 소매몰 상품 상세정보'),
      shotCaption: '09SCM 소매몰 상품 상세정보 화면 (PC / 모바일)',
      html:
        '<p>판매자가 입력한 이미지와 글이 입력한 순서대로 상품 정보 아래에 나와요.</p>'
    },
    {
      title: '장바구니에 담으면',
      shots: pair('detail-cart-toast', '09SCM 소매몰 장바구니 담기 안내'),
      shotCaption: '09SCM 소매몰 장바구니 담기 안내 화면 (PC / 모바일)',
      html:
        '<p>&quot;○○ 2개를 픽업 장바구니에 담았습니다.&quot; 안내가 잠깐 나와요. 배달로 담으면 &quot;배달 장바구니&quot;로 나오고, 헤더의 장바구니 숫자가 바뀌어요. 같은 상품을 같은 수령방식으로 다시 담으면 수량이 늘어나요.</p>'
    },
    {
      title: '로그인하지 않고 주문하려면',
      html:
        '<p>상품 보기와 [장바구니 담기]는 로그인하지 않아도 되지만, [바로 주문]을 누르면 &quot;주문하려면 로그인이 필요합니다.&quot; 안내 후 로그인 화면으로 이동해요. 로그인하면 주문서로 돌아와요. 회원정보가 없을 때의 안내는 <a href="#order-cart">장바구니</a>에서 확인해요.</p>'
    },
    {
      title: '없는 주소로 들어오면',
      shots: pair('detail-notfound', '09SCM 소매몰 없는 주소로 들어온'),
      shotCaption: '09SCM 소매몰 없는 주소로 들어온 화면 (PC / 모바일)',
      html:
        '<p>상품이 삭제되었거나 노출이 해제된 경우, 주소가 잘못된 경우 모두 &quot;요청하신 페이지를 찾을 수 없습니다.&quot; 안내만 나와요.</p>'
    }
  ],
  trouble:
    '<h3>수량을 더 늘릴 수 없어요</h3>' +
    '<p>1회 최대구매수량이나 판매가능수량까지만 살 수 있어요. 더 사려면 판매자에게 문의해 주세요.</p>' +
    '<h3>배달비가 보이지 않아요</h3>' +
    '<p>배달이 가능한 상품에만 배달비가 나와요. 픽업만 가능한 상품에는 배달비가 없어요.</p>' +
    '<h3>상품 구성이나 원산지가 보이지 않아요</h3>' +
    '<p>판매자가 입력하지 않은 항목은 보이지 않아요. 궁금한 내용은 판매자에게 문의해 주세요.</p>'
};

window.GUIDE_CONTENT['order-cart'] = {
  shots: pair('cart-main', '09SCM 소매몰 장바구니'),
  shotCaption: '09SCM 소매몰 장바구니 화면 (PC / 모바일)',
  overview:
    '<p>상품상세에서 [장바구니 담기]로 담은 상품을 모아 확인하고, 주문할 상품을 골라 주문서로 넘어가는 화면이에요.</p>' +
    '<ul>' +
      '<li>헤더의 [장바구니]를 눌러 들어와요. 담은 품목 수는 장바구니 옆 숫자로 보여요.</li>' +
      '<li>상품은 수령방식에 따라 [픽업], [배달] 탭으로 나뉘어요. 픽업과 배달은 한 번에 함께 주문할 수 없고, 탭 하나씩 따로 주문해요.</li>' +
      '<li>장바구니는 로그인하지 않아도 이용할 수 있지만, 주문하려면 로그인이 필요해요. 로그인은 <a href="#start-login">회원가입·로그인</a>에서 확인해요.</li>' +
      '<li>로그인하지 않고 담은 상품은 사용 중인 기기의 브라우저에 저장돼서 다른 기기에서는 보이지 않아요. 로그인한 뒤 담은 상품은 회원 기준으로 저장돼요.</li>' +
    '</ul>',
  steps:
    '<h3>화면 구성</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>총 ○종</td><td>장바구니에 담긴 품목 수 (같은 상품도 수령방식이 다르면 각각 1종, 픽업·배달 합계)</td></tr>' +
      '<tr><td>픽업 / 배달 탭</td><td>수령방식별로 담은 품목을 나눠 보여줌 (탭 옆 숫자는 해당 탭의 품목 수)</td></tr>' +
      '<tr><td>전체선택 · ○개 선택</td><td>현재 탭에서 주문할 수 있는 상품을 모두 선택 (품절 상품은 선택되지 않음), 선택한 상품의 개수 표시</td></tr>' +
      '<tr><td>[선택삭제]</td><td>선택한 상품을 장바구니에서 삭제</td></tr>' +
      '<tr><td>체크박스</td><td>주문할 상품 선택 (품절 상품은 선택할 수 없음)</td></tr>' +
      '<tr><td>상품 이미지</td><td>상품 대표 이미지 (품절이면 이미지 위에 [품절] 표시)</td></tr>' +
      '<tr><td>카테고리 · 상품명</td><td>상품의 소매 카테고리(1차 &gt; 2차)와 상품명 (상품명을 누르면 <a href="#browse-detail">상품상세</a>로 이동)</td></tr>' +
      '<tr><td>가격</td><td>할인가가 있으면 할인가와 할인율, 소비자가(취소선)를 표시하고 없으면 소비자가만 표시</td></tr>' +
      '<tr><td>수령방식 · 픽업가능일</td><td>담을 때 선택한 [픽업] 또는 [배달], 픽업 상품은 상품별 픽업가능일</td></tr>' +
      '<tr><td>[변경]</td><td>상품의 수령방식 변경 (픽업·배달을 모두 지원하는 상품에만 표시)</td></tr>' +
      '<tr><td>수량</td><td>[−], [+]로 조절 (1개부터, 1회 최대구매수량과 판매가능수량 이내)</td></tr>' +
      '<tr><td>상품별 금액</td><td>상품 가격 × 수량</td></tr>' +
      '<tr><td>[삭제]</td><td>그 상품만 장바구니에서 삭제</td></tr>' +
    '</tbody></table></div>' +

    '<h3>금액 확인</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>선택상품 금액</td><td>체크한 상품의 금액 합계</td></tr>' +
      '<tr><td>배달비</td><td>[배달] 탭에만 표시되는 소매설정의 기본 배달비 (0원이면 0원으로 표시)</td></tr>' +
      '<tr><td>총 주문금액</td><td>현재 탭에서 주문할 수 있는 상품 전체의 금액 합계 (배달 탭은 배달비 포함)</td></tr>' +
      '<tr><td>공통 픽업가능일</td><td>[픽업] 탭에만 표시되는, 주문할 상품들의 픽업가능일이 모두 겹치는 기간</td></tr>' +
    '</tbody></table></div>' +

    '<h3>주문하기</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>[선택상품 주문]</td><td>체크한 상품만 <a href="#order-pay">주문서</a>로 이동 (선택한 상품이 없으면 눌리지 않음)</td></tr>' +
      '<tr><td>[전체주문]</td><td>현재 탭에서 주문할 수 있는 상품 전체를 주문서로 이동</td></tr>' +
    '</tbody></table></div>' +
    '<p>장바구니와 주문서에는 현재 판매가가 표시되고, 주문이 접수되는 시점의 판매가로 확정돼요.</p>' +
    '<p>판매자가 정한 배달비는 소매설정의 기본 배달비이며, 판매자는 관리자의 <a href="' + ADMIN_GUIDE + 'retail-settings">소매설정</a>에서 정해요.</p>',
  cases: [
    {
      group: '장바구니 구성에 따라',
      rows: [
        {
          title: '배달 탭에서 주문하면',
          shots: pair('cart-delivery', '09SCM 소매몰 배달 장바구니'),
          shotCaption: '09SCM 소매몰 배달 장바구니 화면 (PC / 모바일)',
          html:
            '<ul><li>상품 표시: 수령방식·픽업가능일 대신 [배달]</li><li>금액 영역: 소매설정의 기본 배달비 함께 표시 (0원이면 0원)</li></ul>'
        },
        {
          title: '수령방식을 바꾸고 싶으면',
          blocks: [
            {
              shots: pair('cart-change', '09SCM 소매몰 수령방식 변경'),
              shotCaption: '09SCM 소매몰 수령방식 변경 화면 (PC / 모바일)',
              html:
                '<ul><li>변경 창: 상품의 [변경]을 누르면 열림</li><li>선택: [픽업], [배달] 중 하나를 고르고 [변경]</li><li>결과: 상품이 선택한 수령방식의 탭으로 이동</li><li>같은 상품이 이미 있으면: 수량 합산 (1회 최대구매수량과 판매가능수량 이내)</li></ul>'
            },
            {
              shots: pair('cart-change-toast', '09SCM 소매몰 수령방식 변경 안내'),
              shotCaption: '09SCM 소매몰 수령방식 변경 안내 화면',
              html:
                '<ul><li>안내: &quot;○○을(를) 배달 장바구니로 이동했습니다.&quot;(픽업으로 바꾸면 &quot;픽업 장바구니&quot;)를 잠깐 표시</li></ul>'
            }
          ]
        },
        {
          title: '품절 상품이 담겨 있으면',
          shots: pair('cart-soldout', '09SCM 소매몰 품절 상품이 담긴 장바구니'),
          shotCaption: '09SCM 소매몰 품절 상품이 담긴 장바구니 화면 (PC / 모바일)',
          html:
            '<ul><li>상품 이미지: [품절] 표시</li><li>제한: 선택·수량 조절·주문 불가, 금액과 [전체주문]에서 제외</li><li>정리: 상품의 [삭제]로 장바구니에서 제거</li></ul>'
        },
        {
          title: '공통 픽업가능일이 없으면',
          shots: pair('cart-nowindow', '09SCM 소매몰 공통 픽업가능일 없음'),
          shotCaption: '09SCM 소매몰 공통 픽업가능일 없음 화면 (PC / 모바일)',
          html:
            '<ul><li>조건: 픽업 상품은 픽업가능일이 서로 겹쳐야 한 번에 주문 가능</li><li>표시: 금액 영역에 &quot;공통 픽업가능일이 없습니다. 상품을 나눠 선택해주세요.&quot;</li><li>버튼: [선택상품 주문], [전체주문] 비활성</li><li>주문 방법: 픽업가능일이 겹치는 상품끼리 따로 선택해서 주문</li></ul>'
        },
        {
          title: '장바구니가 비어 있으면',
          shots: pair('cart-empty', '09SCM 소매몰 빈 장바구니'),
          shotCaption: '09SCM 소매몰 빈 장바구니 화면 (PC / 모바일)',
          html:
            '<ul><li>안내: &quot;픽업 장바구니가 비어 있습니다.&quot;(배달 탭은 &quot;배달 장바구니가 비어 있습니다.&quot;)</li><li>버튼: [상품 보러가기], 누르면 <a href="#browse-list">상품목록</a>으로 이동</li></ul>'
        }
      ]
    },
    {
      title: '장바구니를 보는 사이 상품 상태가 바뀌었으면',
      shots: pair('cart-soldout-toast', '09SCM 소매몰 품절 상품 주문 안내'),
      shotCaption: '09SCM 소매몰 품절 상품 주문 안내 화면 (PC / 모바일)',
      html:
        '<p>[선택상품 주문]이나 [전체주문]을 누르면 상품을 한 번 확인해요(상품상세의 [바로구매]도 같아요). 장바구니를 보는 사이 판매자가 상품을 품절로 바꾸거나 픽업가능일을 바꿔서 주문할 수 없게 되면, 주문서로 넘어가지 않고 아래 안내가 나와요. 여러 경우가 겹치면 아래 순서로 하나만 안내돼요.</p>' +
        '<div class="table-wrap"><table><thead><tr><th>순서</th><th>상황</th><th>안내 문구</th></tr></thead><tbody>' +
          '<tr><td>1</td><td>선택한 상품에 품절이 있음</td><td>&quot;품절 상품은 주문할 수 없습니다. 장바구니를 확인해 주세요.&quot;</td></tr>' +
          '<tr><td>2</td><td>선택한 픽업 상품의 픽업가능일이 겹치지 않음</td><td>&quot;선택한 상품의 픽업 가능일이 겹치지 않습니다. 상품을 나눠 주문해 주세요.&quot;</td></tr>' +
        '</tbody></table></div>'
    },
    {
      title: '담아 둔 상품이 장바구니에서 사라지면',
      html:
        '<p>아래 경우에는 별도 안내 없이 장바구니를 열 때 목록에서 빠지고, 헤더의 장바구니 숫자에서도 제외돼요.</p>' +
        '<ul>' +
          '<li>판매자가 상품 노출을 중단했거나 상품을 삭제한 경우</li>' +
          '<li>픽업가능일이 지난 경우</li>' +
          '<li>배달도 가능했던 상품이 픽업만 가능해지는 것처럼, 담은 수령방식을 더 이상 지원하지 않게 된 경우 (해당 탭에서만 사라져요)</li>' +
        '</ul>' +
        '<p>다시 주문하려면 <a href="#browse-list">상품목록</a>에서 상품을 확인하고, 보이지 않으면 판매자에게 문의해 주세요.</p>'
    },
    {
      title: '주문하려고 할 때 로그인하지 않았거나 회원정보가 없으면',
      html:
        '<ul>' +
          '<li>로그인하지 않았으면: &quot;주문하려면 로그인이 필요합니다.&quot; 안내 후 로그인 화면으로 이동해요. 로그인하면 주문서로 돌아와요.</li>' +
          '<li>회원정보(이름, 이메일, 회원주문 코드)가 등록되어 있지 않으면: &quot;회원정보를 등록한 뒤 주문할 수 있습니다.&quot; 안내 후 <a href="#mypage-info">내정보</a>로 이동해요.</li>' +
        '</ul>'
    }
  ],
  trouble:
    '<h3>픽업 상품과 배달 상품을 한 번에 주문하고 싶어요</h3>' +
    '<p>수령방식이 다르면 탭마다 따로 주문해야 해요.</p>' +
    '<h3>수량을 더 늘릴 수 없어요</h3>' +
    '<p>1회 최대구매수량이나 판매가능수량까지만 살 수 있어요. 더 사려면 판매자에게 문의해 주세요.</p>'
};

window.GUIDE_CONTENT['order-pay'] = {
  screens: [
    {
      id: 'pay-form',
      label: '주문서 작성하기',
      shots: pair('order-main', '09SCM 소매몰 주문서'),
      shotCaption: '09SCM 소매몰 주문서 화면 (PC / 모바일)',
      overview:
        '<p>주문할 상품을 확인하고 주문자 정보, 수령방식, 결제수단을 정해 주문하는 화면이에요. <a href="#order-cart">장바구니</a>의 [선택상품 주문], [전체주문]이나 <a href="#browse-detail">상품상세</a>의 [바로 주문]을 누르면 들어와요.</p>' +
        '<ul>' +
          '<li>장바구니에서 선택한 수령방식으로 정해져서 오기 때문에, 주문서에서는 다른 수령방식을 고를 수 없어요. 상품상세의 [바로 주문]은 상품이 지원하는 수령방식 중에서 골라요.</li>' +
          '<li>로그인한 회원만 주문할 수 있어요.</li>' +
        '</ul>',
      steps:
        '<h3>입력 항목</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>01 주문상품</td><td>주문할 상품과 수량, 금액 (픽업이면 상품별 픽업가능일도 함께 표시)</td></tr>' +
          '<tr><td>02 주문자 정보</td><td>주문자명, 휴대폰번호는 회원정보에서 불러와 채워지며 이번 주문에 한해 수정 가능, 회원주문 코드는 수정 불가 (<a href="#mypage-info">내정보</a>에서 확인)</td></tr>' +
          '<tr><td>03 수령 방식</td><td>[픽업] 또는 [배달]</td></tr>' +
          '<tr><td>04 픽업 정보 / 배달 정보</td><td>수령방식에 따라 달라짐 (아래 표)</td></tr>' +
          '<tr><td>05 결제수단</td><td>수령방식에 따라 선택 가능한 수단이 다름 (아래 표)</td></tr>' +
          '<tr><td>06 주문내용동의</td><td>주문 상품, 수령 방식 및 결제 내용을 확인했다는 동의 (필수)</td></tr>' +
          '<tr><td>결제금액</td><td>상품금액, 배달비(배달만), 최종 결제금액 확인 후 [주문하기]</td></tr>' +
        '</tbody></table></div>' +

        '<h3>수령방식별 입력</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>구분</th><th>픽업</th><th>배달</th></tr></thead><tbody>' +
          '<tr><td>수령 정보</td><td>픽업 장소와 공통 픽업가능일 확인, 픽업 요청사항 입력 (선택)</td><td>배달지 선택 또는 직접 입력, 배달 요청사항 입력 (선택)</td></tr>' +
          '<tr><td>결제수단</td><td>카드결제 · 계좌이체 · 현장결제 중 선택</td><td>카드결제만 가능</td></tr>' +
          '<tr><td>배달비</td><td>없음</td><td>소매설정의 기본 배달비가 결제금액에 추가 (0원이면 0원으로 표시)</td></tr>' +
        '</tbody></table></div>' +

        '<h3>결제수단별 진행</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>결제수단</th><th>설명</th><th>결제상태</th></tr></thead><tbody>' +
          '<tr><td>카드결제</td><td>판매자가 연동한 PG서비스(페이앱)를 호출해 결제</td><td>[결제완료]</td></tr>' +
          '<tr><td>계좌이체</td><td>안내된 입금계좌로 입금하고 입금자명 입력, 판매자가 입금을 확인하면 [결제완료]로 변경</td><td>[결제대기]</td></tr>' +
          '<tr><td>현장결제</td><td>픽업할 때 매장에서 결제</td><td>[결제대기]</td></tr>' +
        '</tbody></table></div>' +
        '<p>[주문하기]를 누르면 상품의 재고와 판매 상태를 최종 확인하고, 문제가 없으면 주문이 접수되어 <a href="#order-pay/pay-done">주문 완료</a> 화면으로 이동해요. 장바구니에서 주문한 상품은 장바구니에서 빠져요.</p>',
      cases: [
        {
          group: '배달·결제수단에 따라',
          rows: [
            {
              title: '배달로 주문하면',
              shots: pair('order-delivery', '09SCM 소매몰 배달 주문서'),
              shotCaption: '09SCM 소매몰 배달 주문서 화면 (PC / 모바일)',
              html:
                '<ul><li>배달지: 배달 정보에서 선택, <a href="#mypage-address">배달지관리</a>에 대표 배달지를 등록했다면 대표 배달지가 선택됨</li><li>배달비: 소매설정의 기본 배달비가 결제금액에 추가된다는 안내 표시</li><li>결제수단: 카드결제만 가능</li><li>[배달지 관리]: 마이페이지의 <a href="#mypage-address">배달지관리</a>로 이동</li></ul>'
            },
            {
              title: '등록한 배달지가 없으면',
              shots: pair('order-delivery-none', '09SCM 소매몰 배달지 없는 주문서'),
              shotCaption: '09SCM 소매몰 배달지가 없는 주문서 화면 (PC / 모바일)',
              html:
                '<ul><li>선택 항목: [집], [다른 주소 입력] 미표시</li><li>안내: &quot;등록된 배달지가 없습니다. 이번 주문에 사용할 주소를 입력해 주세요.&quot;와 배달 주소 입력란만 표시</li><li>주문: 배달지를 등록하지 않아도 주소를 입력하면 가능, 주소를 비워 두면 주문 불가</li></ul>'
            },
            {
              title: '이번 주문에만 다른 주소로 받으려면',
              shots: pair('order-delivery-other', '09SCM 소매몰 다른 주소 입력 주문서'),
              shotCaption: '09SCM 소매몰 다른 주소 입력 주문서 화면 (PC / 모바일)',
              html:
                '<ul><li>[다른 주소 입력] 선택: 배달 주소 입력란 표시</li><li>입력한 주소: 이번 주문에만 사용, 대표 배달지는 변경되지 않음</li></ul>'
            },
            {
              title: '계좌이체를 선택하면',
              shots: pair('order-transfer', '09SCM 소매몰 계좌이체 입력'),
              shotCaption: '09SCM 소매몰 계좌이체 입력 화면 (PC / 모바일)',
              html:
                '<ul><li>표시: 입금계좌, 입금자명 입력란</li><li>입력: 입금자명 필수</li><li>처리: 주문 후 안내된 계좌로 입금하면 판매자가 확인한 뒤 결제완료로 변경</li></ul>'
            }
          ]
        }
,
        {
      title: '입력 내용이 맞지 않으면',
      shots: pair('order-input-toast', '09SCM 소매몰 주문서 입력 오류'),
      shotCaption: '09SCM 소매몰 주문서 입력 오류 화면 (PC / 모바일)',
      html:
        '<div class="table-wrap"><table><thead><tr><th>상황</th><th>안내 문구</th></tr></thead><tbody><tr><td>주문자명·휴대폰번호(11자리)·회원주문 코드가 비어 있음</td><td>&quot;주문자 정보를 확인해 주세요.&quot;</td></tr><tr><td>배달 주문에서 배달 주소가 비어 있음</td><td>&quot;배달 주소를 입력해 주세요.&quot;</td></tr><tr><td>계좌이체에서 입금자명이 비어 있음</td><td>&quot;입금자명을 입력해 주세요.&quot;</td></tr><tr><td>주문내용동의에 체크하지 않음</td><td>&quot;주문내용동의가 필요합니다.&quot;</td></tr></tbody></table></div>'
    },
        {
          title: '주문서를 열었는데 공통 픽업가능일이 없으면',
          shots: pair('order-nowindow', '09SCM 소매몰 공통 픽업가능일 없는 주문서'),
          shotCaption: '09SCM 소매몰 공통 픽업가능일 없는 주문서 화면 (PC / 모바일)',
          html:
            '<p>주문서 링크로 바로 들어왔을 때 나오는 화면이에요(장바구니에서 넘어올 때는 장바구니에서 먼저 막혀요). 픽업 상품들의 공통 픽업가능일이 없으면 주문서 대신 &quot;상품들의 픽업 가능일이 겹치지 않습니다.&quot;와 [장바구니로 돌아가기]가 나와요. 입력 항목은 나오지 않으므로 장바구니에서 상품을 나눠 다시 주문해요.</p>'
        }
,
        {
          title: '주문하는 사이 상품 상태가 바뀌었으면',
          shots: pair('order-recheck-toast', '09SCM 소매몰 주문 시 품절 상품 안내'),
          shotCaption: '09SCM 소매몰 주문 시 품절 상품 안내 화면 (PC / 모바일)',
          html:
            '<p>장바구니나 주문서를 보는 동안 다른 주문으로 재고가 줄거나 판매자가 상품을 품절·노출 중단할 수 있어서, [주문하기]를 누를 때 상품을 한 번 더 확인해요. 하나라도 주문할 수 없으면 주문과 결제가 진행되지 않고, 입력한 내용은 그대로 남아 있어요. 여러 경우가 겹치면 아래 순서로 하나만 안내돼요.</p>' +
            '<div class="table-wrap"><table><thead><tr><th>순서</th><th>상황</th><th>안내 문구</th></tr></thead><tbody>' +
              '<tr><td>1</td><td>품절된 상품이 있음</td><td>&quot;품절상품이 존재합니다.&quot;</td></tr>' +
              '<tr><td>2</td><td>노출이 중단되었거나 삭제되었거나 담은 수령방식을 더 이상 지원하지 않는 상품이 있음</td><td>&quot;구매불가 상품이 존재합니다.&quot;</td></tr>' +
              '<tr><td>3</td><td>주문 수량이 남은 수량보다 많은 상품이 있음</td><td>&quot;재고가 부족한 상품이 있습니다.&quot;</td></tr>' +
              '<tr><td>4</td><td>주문 수량이 1회 최대구매수량을 넘는 상품이 있음</td><td>&quot;1회 최대구매수량을 초과한 상품이 있습니다.&quot;</td></tr>' +
              '<tr><td>5</td><td>픽업 상품의 픽업가능일이 겹치지 않음</td><td>&quot;선택한 상품의 픽업 가능일이 겹치지 않습니다. 상품을 나눠 주문해 주세요.&quot;</td></tr>' +
            '</tbody></table></div>' +
            '<p>해당 상품을 장바구니에서 확인해 삭제하거나 수량을 줄인 뒤 다시 주문해요.</p>'
        }
      ],
      trouble:
        '<h3>주문서가 열리지 않고 로그인이나 회원정보 안내가 나와요</h3>' +
        '<p>주문은 로그인한 회원만, 이름·이메일·회원주문 코드가 모두 등록된 회원만 할 수 있어요. 로그인하면 주문서로 돌아오고, 회원정보는 <a href="#mypage-info">내정보</a>에서 등록해 주세요.</p>' +
        '<h3>수령방식을 바꿀 수 없어요</h3>' +
        '<p>장바구니에서 선택한 수령방식으로 고정돼요. 바꾸려면 장바구니에서 상품의 [변경]으로 수령방식을 바꾼 뒤 다시 주문해요.</p>' +
        '<h3>주문한 뒤 취소하고 싶어요</h3>' +
        '<p>주문이 접수된 이후에는 <a href="#check-history">주문내역</a>에서 취소할 수 있어요.</p>'
    },

    {
      id: 'pay-done',
      label: '주문 완료 확인하기',
      shots: pair('done-main', '09SCM 소매몰 주문 완료'),
      shotCaption: '09SCM 소매몰 주문 완료 화면 (PC / 모바일)',
      overview:
        '<p>주문이 접수된 뒤 나오는 화면이에요. 주문번호와 주문일시, 주문한 내용을 한 번에 확인해요.</p>',
      steps:
        '<h3>화면 구성</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>결제상태</td><td>체크 표시 위에 [결제완료](카드결제) 또는 [결제대기](계좌이체·현장결제)로 표시</td></tr>' +
          '<tr><td>주문번호 · 주문일시</td><td>주문이 접수된 번호와 시각</td></tr>' +
          '<tr><td>주문상품</td><td>상품, 수량, 금액 (픽업이면 상품별 픽업가능일)</td></tr>' +
          '<tr><td>주문자 정보</td><td>주문자명, 휴대폰번호, 회원주문 코드</td></tr>' +
          '<tr><td>픽업 정보 / 배달 정보</td><td>픽업이면 픽업 장소, 공통 픽업가능일, 요청사항 / 배달이면 배달지, 요청사항</td></tr>' +
          '<tr><td>결제 정보</td><td>결제수단 (계좌이체이면 입금계좌, 입금자명도 표시)</td></tr>' +
          '<tr><td>결제금액</td><td>상품금액, 배달비(배달만), 최종 결제금액</td></tr>' +
          '<tr><td>[주문내역 보기]</td><td><a href="#check-history">주문내역</a>으로 이동</td></tr>' +
          '<tr><td>[쇼핑 계속하기]</td><td><a href="#browse-list">상품목록</a>으로 이동</td></tr>' +
        '</tbody></table></div>' +
        '<p>주문이 접수된 뒤의 처리 단계와 취소는 <a href="#check-history">주문내역</a>에서 확인해요.</p>',
      cases: [
        {
          title: '계좌이체로 주문했으면',
          shots: pair('done-transfer', '09SCM 소매몰 계좌이체 주문 완료'),
          shotCaption: '09SCM 소매몰 계좌이체 주문 완료 화면 (PC / 모바일)',
          html:
            '<p>결제상태가 [결제대기]로 나오고 결제 정보에 입금계좌와 입금자명이 표시돼요. 안내된 계좌로 입금하면 판매자가 확인한 뒤 결제완료로 바꿔요.</p>'
        },
        {
          title: '배달로 주문했으면',
          shots: pair('done-delivery', '09SCM 소매몰 배달 주문 완료'),
          shotCaption: '09SCM 소매몰 배달 주문 완료 화면 (PC / 모바일)',
          html:
            '<p>픽업 정보 대신 배달 정보(배달지, 요청사항)가 나오고, 결제금액에 배달비가 함께 표시돼요. 배달은 카드결제만 가능해서 결제상태는 [결제완료]예요.</p>'
        }
      ],
      trouble:
        '<h3>주문 내용을 나중에 다시 보고 싶어요</h3>' +
        '<p><a href="#check-history">주문내역</a>과 <a href="#check-detail">주문상세</a>에서 확인할 수 있어요.</p>' +
        '<h3>[결제대기]인데 괜찮은가요</h3>' +
        '<p>계좌이체는 판매자가 입금을 확인하면, 현장결제는 픽업할 때 결제하면 결제완료로 바뀌어요.</p>'
    },

    {
      id: 'pay-chat',
      label: '채팅으로 주문하기',
      shots: chatShot('chat-ok', '채팅으로 주문하는 예시'),
      shotCaption: '채팅으로 주문하고 접수 안내를 받는 예시',
      overview:
        '<p>소매몰 화면을 거치지 않고, 판매자가 운영하는 오픈채팅방에 정해진 형식으로 메시지를 보내 주문하는 방법이에요. 채팅방에서는 접수만 받고, 주문 확인과 취소는 소매몰에서 해요.</p>' +
        '<ul>' +
          '<li>회원주문 코드와 채팅주문 닉네임을 등록한 회원만 이용할 수 있어요.</li>' +
          '<li>항상 <b>픽업</b>과 <b>현장결제</b>로 접수돼요. 배달이나 카드결제·계좌이체는 선택할 수 없어요.</li>' +
          '<li>판매자가 채팅주문을 허용한 상품만 주문할 수 있어요. 배달만 가능한 상품은 채팅주문이 되지 않아요.</li>' +
          '<li>소매몰의 주문서와 달리, 채팅주문은 상품마다 따로 주문이 접수돼요.</li>' +
        '</ul>',
      steps:
        '<h3>주문 전에 준비할 것</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>회원주문 코드</td><td>가입할 때 정한 숫자 4자리 코드 (<a href="#start-login/member-signup">회원가입하기</a>, <a href="#mypage-info">내정보</a>에서 확인)</td></tr>' +
          '<tr><td>채팅주문 닉네임</td><td>회원이 오픈채팅방에서 쓰는 닉네임과 똑같이 등록해야 함 (등록하지 않으면 채팅주문 이용 불가)</td></tr>' +
          '<tr><td>오픈채팅방</td><td>판매자가 안내한 오픈채팅방에 입장 (입장 방법은 판매자에게 문의)</td></tr>' +
          '<tr><td>채팅주문상품명</td><td>채팅에서 쓰는 상품 이름 (소매몰의 상품명과 다를 수 있으니 판매자의 안내를 확인)</td></tr>' +
        '</tbody></table></div>' +

        '<h3>주문 방법</h3>' +
        '<ol>' +
          '<li>오픈채팅방에 아래 형식으로 메시지를 보내요.<br /><b>상품명 수량, 상품명 수량, … 회원주문 코드 4자리</b><br />예) 햇사과 2개, 레몬 1개 7942</li>' +
          '<li>상품은 쉼표(,)로 구분하거나 줄을 바꿔서 나열해도 돼요. 마지막에는 항상 회원주문 코드 4자리를 붙여요.</li>' +
          '<li>채팅방에 오는 접수 안내를 확인해요.</li>' +
        '</ol>' +

        '<h3>이렇게 접수돼요</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>주문 단위</td><td>메시지에 상품이 여러 개여도 상품마다 따로 주문(주문번호) 접수, 한 메시지 안에서 같은 상품은 수량을 합쳐 1건으로 접수 (메시지를 나눠 보내면 각각 접수, 예: 햇사과 1개와 햇사과 2개를 따로 보내면 2건)</td></tr>' +
          '<tr><td>수령방식 · 결제</td><td>픽업 · 현장결제 (결제상태는 결제대기, 처리상태는 주문접수)</td></tr>' +
          '<tr><td>금액</td><td>소매몰에 표시된 판매가 기준</td></tr>' +
          '<tr><td>픽업</td><td>상품별 픽업가능일 안에 매장에서 픽업하고 결제</td></tr>' +
          '<tr><td>알림</td><td>접수 안내는 채팅방으로 전달, 접수완료 알림톡은 미발송, 이후 단계(결제확인·픽업대기·픽업완료 등) 알림톡은 발송</td></tr>' +
        '</tbody></table></div>' +

        '<h3>접수 후 확인과 취소</h3>' +
        '<p>채팅으로 접수된 주문도 소매몰 <a href="#check-history">주문내역</a>에서 똑같이 조회해요. 취소하려면 채팅방이 아니라 소매몰 <a href="#check-history">주문내역</a>에서 해야 해요.</p>' +
        '<p>채팅주문 접수 기준과 판매자 처리 방법은 <a href="' + ADMIN_GUIDE + 'retail-order-chat">09SCM 관리자 이용가이드의 채팅주문설정</a>에서 확인할 수 있어요.</p>',
      cases: [
        {
          title: '여러 상품이 모두 접수되면',
          shots: chatShot('chat-ok', '채팅주문 정상 접수'),
          shotCaption: '채팅주문 정상 접수 예시',
          html:
            '<p>&quot;아래 상품 주문이 접수되었습니다.&quot;와 함께 접수된 상품과 수량이 나와요. 상품이 하나뿐이면 &quot;○○ 2개 주문이 접수되었습니다.&quot;로 와요.</p>'
        },
        {
          title: '일부 상품만 접수되면',
          shots: chatShot('chat-partial', '채팅주문 일부 접수'),
          shotCaption: '채팅주문 일부 접수 예시',
          html:
            '<p>접수할 수 있는 상품만 주문으로 접수되고, 접수되지 않은 상품은 사유와 함께 안내돼요. 접수되지 않은 상품은 다시 주문해야 해요.</p>'
        },
        {
          title: '재고가 부족하거나 구매수량을 넘으면',
          shots: chatShot('chat-fail', '채팅주문 재고 부족·구매수량 초과'),
          shotCaption: '채팅주문 재고 부족·구매수량 초과 예시',
          html:
            '<p>주문이 접수되지 않고 사유가 안내돼요. 1회 최대구매수량을 넘으면 &quot;1회 최대 ○개까지 구매 가능해&quot;라는 안내가 오니, 수량을 줄여서 다시 보내요.</p>'
        },
        {
          title: '이용이 제한되었거나 닉네임이 등록되지 않았으면',
          shots: chatShot('chat-limit', '채팅주문 이용제한·닉네임 미등록'),
          shotCaption: '채팅주문 이용제한·닉네임 미등록 예시',
          html:
            '<p>이용제한 회원은 &quot;현재 이용이 제한되어 주문이 접수되지 않았습니다. 자세한 사항은 판매자에게 문의해주세요.&quot;가, 닉네임이 없는 회원은 &quot;현재 닉네임이 등록되지 않아 주문이 접수되지 않았습니다. 소매몰에서 닉네임을 등록해주세요.&quot;가 와요. 닉네임은 <a href="#mypage-info">내정보</a>에서 등록해요. 이용제한이면서 닉네임도 없으면 이용제한 안내만 와요.</p>'
        },
        {
          title: '안내가 오지 않으면',
          html:
            '<ul>' +
              '<li>코드가 틀렸거나, 코드는 맞지만 채팅방 닉네임이 등록한 닉네임과 다르면 안내 없이 판매자 확인을 기다려요. 판매자가 확인해서 접수하면 접수 안내가 와요.</li>' +
              '<li>정해진 형식이 아니거나 채팅주문상품명과 맞지 않는 메시지에는 아무 안내도 오지 않아요.</li>' +
            '</ul>' +
            '<p>두 경우 모두 한동안 안내가 없으면 판매자에게 문의해요.</p>'
        }
      ],
      trouble:
        '<h3>메시지를 보냈는데 아무 반응이 없어요</h3>' +
        '<p>상품명이 채팅주문상품명과 같은지, 마지막에 회원주문 코드 4자리를 붙였는지 확인해요. 형식에 맞지 않으면 반응이 없어요.</p>' +
        '<h3>채팅으로 주문을 취소하고 싶어요</h3>' +
        '<p>채팅방에서는 취소할 수 없어요. 소매몰 <a href="#check-history">주문내역</a>에서 취소해 주세요.</p>' +
        '<h3>닉네임을 바꿨어요</h3>' +
        '<p>오픈채팅방에서 쓰는 닉네임을 바꿨다면 <a href="#mypage-info">내정보</a>의 채팅주문 닉네임도 같은 값으로 맞춰야 해요.</p>'
    }
  ]
};

window.GUIDE_CONTENT['check-quick'] = {
  shots: pair('check-quick-main', '09SCM 소매몰 간편 주문 조회'),
  shotCaption: '09SCM 소매몰 간편 주문 조회 화면 (PC / 모바일)',
  overview:
    '<p>회원주문 코드 4자리로 로그인 없이 내 주문 현황을 확인하는 화면이에요.</p>' +
    '<ul>' +
      '<li>화면 오른쪽 아래 [주문 조회] 버튼(모바일은 화면 아래 띠)을 눌러 들어와요. 이 화면에서는 버튼이 보이지 않아요.</li>' +
      '<li>소매몰이 이용대기·이용제한·이용불가 상태일 때도 <a href="#start-gate">대문화면</a>에서 같은 방법으로 조회할 수 있어요.</li>' +
      '<li>조회는 로그인 없이 되지만, 주문 상세를 보거나 취소·반품을 요청하려면 로그인해야 해요.</li>' +
    '</ul>',
  steps:
    '<h3>조회하기</h3>' +
    '<ol>' +
      '<li>회원주문 코드 숫자 4자리를 입력해요. 회원주문 코드는 <a href="#mypage-info">내정보</a>에서 확인해요.</li>' +
      '<li>[조회]를 누르면 코드에 해당하는 회원의 주문이 아래에 나와요.</li>' +
    '</ol>' +
    '<h3>조회 결과</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>회원주문 코드</td><td>가입할 때 정한 숫자 4자리 코드</td></tr>' +
      '<tr><td>채팅주문 닉네임</td><td>조회한 회원이 등록한 채팅주문 닉네임 (등록하지 않았다면 -)</td></tr>' +
      '<tr><td>진행 중 주문</td><td>수령이 끝나지 않았거나 취소·반품이 요청 중인 주문의 건수와 목록</td></tr>' +
      '<tr><td>완료된 주문</td><td>픽업완료·배달완료되었거나 취소·반품이 승인된 주문의 건수와 목록</td></tr>' +
    '</tbody></table></div>' +
    '<h3>주문 카드</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>주문일</td><td>주문한 날짜</td></tr>' +
      '<tr><td>주문번호</td><td>주문마다 부여되는 번호</td></tr>' +
      '<tr><td>수령방식</td><td>[픽업] 또는 [배달]</td></tr>' +
      '<tr><td>공통 픽업가능일</td><td>픽업 주문에만 표시되는, 주문할 상품들의 픽업가능일이 모두 겹치는 기간</td></tr>' +
      '<tr><td>주문상품</td><td>주문한 상품명과 수량</td></tr>' +
      '<tr><td>처리상태</td><td>주문의 진행 단계 (취소·반품이 요청 중이거나 승인된 주문은 -)</td></tr>' +
      '<tr><td>결제상태</td><td>[결제대기], [결제완료], [결제취소], [환불대기] 중 현재 상태</td></tr>' +
      '<tr><td>취소·반품</td><td>취소·반품 이력이 있는 주문의 현재 상태 (이력이 없으면 표시하지 않음)</td></tr>' +
      '<tr><td>결제금액</td><td>상품금액과 배달비를 더한 최종 결제금액</td></tr>' +
      '<tr><td>버튼</td><td>주문 상태에 맞는 취소·반품 버튼과 [주문 상세] (버튼이 나오는 조건은 <a href="#check-history/history-list">주문내역 보기</a>와 같음)</td></tr>' +
      '</tbody></table></div>',
  cases: [
    {
      title: '회원주문 코드를 조회하면',
      shots: pair('check-quick-active', '09SCM 소매몰 간편 주문 조회 진행 중 주문'),
      shotCaption: '09SCM 소매몰 간편 주문 조회 진행 중 주문 화면 (PC / 모바일)',
      html:
        '<p>진행 중 주문 탭이 먼저 열리고, 최근 주문이 위에 나와요. 탭의 숫자는 각 목록의 주문 건수예요.</p>'
    },
    {
      title: '완료된 주문을 보려면',
      shots: pair('check-quick-complete', '09SCM 소매몰 간편 주문 조회 완료된 주문'),
      shotCaption: '09SCM 소매몰 간편 주문 조회 완료된 주문 화면 (PC / 모바일)',
      html:
        '<p>[완료된 주문] 탭을 누르면 픽업완료·배달완료되었거나 취소·반품이 승인된 주문이 나와요.</p>'
    },
    {
      title: '일치하는 회원주문 코드가 없으면',
      shots: pair('check-quick-none', '09SCM 소매몰 일치하는 회원주문 코드 없음'),
      shotCaption: '09SCM 소매몰 일치하는 회원주문 코드 없음 화면 (PC / 모바일)',
      html:
        '<p>&quot;일치하는 회원주문 코드가 없습니다.&quot;가 나와요. 코드를 다시 확인해서 입력해요.</p>'
    },
    {
      title: '조회한 회원의 주문이 없으면',
      shots: pair('check-quick-empty', '09SCM 소매몰 간편 주문 조회 주문 없음'),
      shotCaption: '09SCM 소매몰 간편 주문 조회 주문 없음 화면 (PC / 모바일)',
      html:
        '<p>해당 탭에 주문이 없으면 &quot;진행 중인 주문이 없습니다.&quot;(완료된 주문 탭은 &quot;완료된 주문이 없습니다.&quot;)가 나와요.</p>'
    },
    {
      title: '주문 상세나 취소·반품 버튼을 누르면',
      html:
        '<p>로그인하지 않았다면 &quot;로그인 후 이용할 수 있습니다.&quot; 안내 후 로그인 화면으로 이동해요. 주문한 회원의 휴대폰번호로 로그인하면 누른 버튼의 화면으로 이어져요. 로그인은 <a href="#start-login">회원가입·로그인</a>에서 확인해요.</p>'
    }
  ],
  trouble:
    '<h3>일치하는 회원주문 코드가 없다고 나와요</h3>' +
    '<p>가입할 때 정한 숫자 4자리를 입력했는지 확인해요. 코드는 로그인 후 <a href="#mypage-info">내정보</a>에서 확인할 수 있어요.</p>' +
    '<h3>주문 상세를 눌렀더니 로그인 화면이 나와요</h3>' +
    '<p>간편 주문 조회는 로그인 없이 주문 현황만 보여줘요. 주문 상세와 취소·반품은 주문한 회원의 로그인이 필요해요.</p>' +
    '<h3>주문이 어느 탭에 있는지 모르겠어요</h3>' +
    '<p>픽업완료·배달완료되었거나 취소·반품이 승인된 주문은 [완료된 주문] 탭에 나와요. 취소·반품이 요청 중이면 진행 중 주문에 남아 있어요.</p>'
};

window.GUIDE_CONTENT['check-history'] = {
  screens: [
    {
      id: 'history-list',
      label: '주문내역 보기',
      shots: pair('check-history-main', '09SCM 소매몰 주문내역'),
      shotCaption: '09SCM 소매몰 주문내역 화면 (PC / 모바일)',
      overview:
        '<p>내가 한 주문을 목록으로 보고, 주문 상태에 맞는 취소·반품 버튼을 눌러 요청하는 화면이에요. 로그인한 회원 본인의 주문만 나와요.</p>' +
        '<ul>' +
          '<li>헤더의 [마이페이지]에서 들어와요.</li>' +
          '<li>링크주문과 <a href="#order-pay/pay-chat">채팅주문</a>이 모두 나와요. 채팅주문은 상품마다 따로 접수돼서 주문도 상품별로 나뉘어요.</li>' +
          '<li>취소·반품 요청 창의 입력 항목은 <a href="#check-history/history-cancel">취소·반품 요청하기</a>에서 확인해요.</li>' +
        '</ul>',
      steps:
        '<h3>조회 조건</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>주문경로 탭</td><td>[전체], [링크주문], [채팅주문] 중 선택</td></tr>' +
          '<tr><td>조회 기간</td><td>1개월, 3개월, 6개월 중 선택</td></tr>' +
          '<tr><td>처리상태</td><td>주문상태(주문접수·픽업대기·픽업완료·배달대기·배달중·배달완료)와 취소·반품상태(취소요청·취소승인·취소반려·반품요청·반품승인·반품반려) 중 선택</td></tr>' +
          '<tr><td>[조회]</td><td>선택한 조회 기간과 처리상태로 목록 조회</td></tr>' +
          '<tr><td>총 ○건</td><td>조건에 맞는 주문의 건수</td></tr>' +
        '</tbody></table></div>' +

        '<h3>주문 카드</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>주문일</td><td>주문한 날짜</td></tr>' +
          '<tr><td>공통 픽업가능일</td><td>픽업 주문에만 표시되는, 주문할 상품들의 픽업가능일이 모두 겹치는 기간</td></tr>' +
          '<tr><td>주문번호</td><td>주문마다 부여되는 번호</td></tr>' +
          '<tr><td>상품 이미지</td><td>상품 대표 이미지 (주문한 상품 중 첫 번째 상품만 표시)</td></tr>' +
          '<tr><td>주문상품</td><td>주문한 상품 종류 수와 상품명, 수량 (이미지와 함께 누르면 주문상세로 이동)</td></tr>' +
          '<tr><td>픽업가능일</td><td>픽업 주문에만 표시되는 상품별 픽업가능일</td></tr>' +
          '<tr><td>주문경로</td><td>[링크주문] 또는 [채팅주문]</td></tr>' +
          '<tr><td>수령방식</td><td>[픽업] 또는 [배달]</td></tr>' +
          '<tr><td>처리상태</td><td>주문의 진행 단계 (취소·반품이 요청 중이거나 승인된 주문은 -)</td></tr>' +
          '<tr><td>결제수단</td><td>[카드결제], [계좌이체], [현장결제] 중 주문할 때 선택한 방식</td></tr>' +
          '<tr><td>결제상태</td><td>[결제대기], [결제완료], [결제취소], [환불대기] 중 현재 상태</td></tr>' +
          '<tr><td>결제금액</td><td>상품금액과 배달비를 더한 최종 결제금액</td></tr>' +
          '<tr><td>취소·반품</td><td>취소·반품 이력이 있는 주문의 현재 상태 (이력이 없으면 -)</td></tr>' +
          '<tr><td>버튼</td><td>주문 상태에 맞는 취소·반품 버튼과 [주문 상세]</td></tr>' +
          '</tbody></table></div>',
      cases: [

        {
          title: '채팅주문만 보려면',
          shots: pair('check-history-chat', '09SCM 소매몰 주문내역 채팅주문'),
          shotCaption: '09SCM 소매몰 주문내역 채팅주문 화면 (PC / 모바일)',
          html:
            '<p>[채팅주문] 탭을 누르면 채팅으로 접수된 주문만 나와요. 총 건수도 함께 바뀌어요.</p>'
        },
        {
          title: '주문한 내역이 없으면',
          shots: pair('check-history-empty', '09SCM 소매몰 주문내역 없음'),
          shotCaption: '09SCM 소매몰 주문내역 없음 화면 (PC / 모바일)',
          html:
            '<p>&quot;주문내역이 없습니다.&quot;가 나와요.</p>'
        },
        {
          title: '조회 조건에 맞는 주문이 없으면',
          shots: pair('check-history-nomatch-toast', '09SCM 소매몰 조건에 맞는 주문 없음 안내'),
          shotCaption: '09SCM 소매몰 조건에 맞는 주문 없음 안내 화면 (PC / 모바일)',
          html:
            '<p>선택한 조건에 맞는 주문이 없으면 &quot;조건에 맞는 주문이 없습니다.&quot; 안내가 잠깐 나오고 목록이 비어 총 0건으로 바뀌어요.</p>'
        },
        {
          group: '주문 상태에 따른 버튼',
          rows: [
            {
              title: '카드결제·주문접수 상태이면',
              shots: pair('check-btn-card', '09SCM 소매몰 주문 취소 버튼'),
              shotCaption: '09SCM 소매몰 주문 취소 버튼 (PC / 모바일)',
              html:
                '<ul><li>버튼: [주문 취소]</li><li>처리: 판매자 승인 없이 바로 취소 (정산이 끝난 주문은 취소되지 않음)</li></ul>'
            },
            {
              title: '결제대기·주문접수 상태이면',
              shots: pair('check-btn-wait', '09SCM 소매몰 결제대기 주문 취소 버튼'),
              shotCaption: '09SCM 소매몰 결제대기 주문 취소 버튼 (PC / 모바일)',
              html:
                '<ul><li>대상: 계좌이체·현장결제 주문</li><li>버튼: [주문 취소]</li><li>처리: 판매자 승인 없이 바로 취소</li></ul>'
            },
            {
              title: '결제완료·주문접수 상태이면',
              shots: pair('check-btn-request', '09SCM 소매몰 취소 요청 버튼'),
              shotCaption: '09SCM 소매몰 취소 요청 버튼 (PC / 모바일)',
              html:
                '<ul><li>대상: 계좌이체·현장결제 주문</li><li>버튼: [취소 요청]</li><li>처리: 판매자가 확인한 뒤 승인 또는 반려</li></ul>'
            },
            {
              title: '픽업완료·배달완료 후 7일 이내이면',
              shots: pair('check-btn-return', '09SCM 소매몰 반품 요청 버튼'),
              shotCaption: '09SCM 소매몰 반품 요청 버튼 (PC / 모바일)',
              html:
                '<ul><li>버튼: [반품 요청]</li><li>기한: 픽업완료·배달완료 일시로부터 7일 이내, 지나면 버튼이 보이지 않음</li><li>처리: 판매자가 확인한 뒤 승인 또는 반려</li></ul>'
            },
            {
              title: '픽업대기·배달대기·배달중 상태이면',
              shots: pair('check-btn-none', '09SCM 소매몰 취소 버튼 없는 주문'),
              shotCaption: '09SCM 소매몰 취소 버튼 없는 주문 (PC / 모바일)',
              html:
                '<ul><li>버튼: [주문 상세]만 표시</li><li>취소: 소비자가 할 수 없고 판매자에게 문의</li></ul>'
            },
            {
              title: '취소·반품을 요청했으면',
              shots: pair('check-btn-detail', '09SCM 소매몰 취소 요청 중인 주문'),
              shotCaption: '09SCM 소매몰 취소 요청 중인 주문 (PC / 모바일)',
              html:
                '<ul><li>버튼: [취소·반품 상세]로 바뀜</li><li>처리상태: -</li><li>취소·반품: 요청 상태 표시</li></ul>'
            },
            {
              title: '요청이 반려되었으면',
              shots: pair('check-btn-rejected', '09SCM 소매몰 취소 반려된 주문'),
              shotCaption: '09SCM 소매몰 취소 반려된 주문 (PC / 모바일)',
              html:
                '<ul><li>처리상태: 요청 전 상태로 복귀</li><li>취소·반품: [취소반려] 등 반려 상태 표시</li><li>버튼: [취소·반품 상세], 이력이 있어 다시 요청할 수 없음</li></ul>'
            }
          ]
        },
      ],
      trouble:
        '<h3>취소 버튼이 보이지 않아요</h3>' +
        '<p>주문접수 상태에서만 취소할 수 있어요. 상품 준비가 시작되었다면 판매자에게 문의해 주세요. 이미 취소·반품을 요청한 주문은 [취소·반품 상세]만 보여요.</p>' +
        '<h3>반품 요청 버튼이 사라졌어요</h3>' +
        '<p>픽업완료·배달완료 일시로부터 7일이 지나면 보이지 않아요. 기한이 지났다면 판매자에게 문의해 주세요.</p>' +
        '<h3>주문을 취소했는데 결제가 환불되지 않았어요</h3>' +
        '<p>카드결제 주문은 취소하면 결제도 함께 취소돼요. 다만 정산이 끝난 카드결제 주문은 취소되지 않으니 판매자에게 문의해 주세요. 계좌이체 주문은 판매자가 환불을 처리하므로 [취소·반품 상세]에서 처리 상태를 확인해 주세요.</p>'
    },

    {
      id: 'history-cancel',
      label: '취소·반품 요청하기',
      shots: pair('check-modal-request', '09SCM 소매몰 취소 요청'),
      shotCaption: '09SCM 소매몰 취소 요청 화면 (PC / 모바일)',
      overview:
        '<p>주문 상태에 따라 바로 취소하거나, 판매자에게 취소·반품을 요청하는 창이에요. 주문내역 목록과 <a href="#check-detail">주문상세</a> 어디에서 눌러도 같은 창이 열려요.</p>' +
        '<ul>' +
          '<li>어떤 버튼이 나오는지는 <a href="#check-history/history-list">주문내역 보기</a>의 주문 상태에 따른 버튼에서 확인해요.</li>' +
          '<li>바로 취소하는 주문은 확인만 하고, 판매자에게 요청하는 주문은 요청 사유를 입력해요.</li>' +
          '<li>한 주문의 일부 상품만 취소·반품할 수는 없어요.</li>' +
        '</ul>',
      steps:
        '<ol>' +
          '<li><b>주문 고르기</b> 주문내역이나 주문상세에서 [주문 취소], [취소 요청], [반품 요청]을 눌러요.</li>' +
          '<li><b>내용 확인하고 입력하기</b> 창이 열리면 아래 항목을 확인하고 입력해요. 이름 옆에 *가 붙은 항목은 꼭 입력해야 해요.</li>' +
          '<li><b>요청하기</b> 아래쪽 버튼을 누르면 접수돼요. 바로 취소하는 주문은 그 자리에서 취소되고, 판매자에게 요청한 주문은 취소·반품 상태가 [취소요청] 또는 [반품요청]으로 바뀌어요.</li>' +
        '</ol>' +
        '<h3>입력 항목</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
          '<tr><td>주문상품</td><td>요청할 주문의 주문번호와 상품명 (여러 종류이면 &quot;○○ 외 N개&quot;, 아래에 주문 수량의 합계를 &quot;총 ○개 상품&quot;으로 표시)</td></tr>' +
          '<tr><td>요청 사유 *</td><td>취소·반품이 필요한 이유를 직접 입력 (바로 취소하는 주문은 입력 없음)</td></tr>' +
          '<tr><td>결제금액</td><td>상품금액과 배달비를 더한 최종 결제금액</td></tr>' +
          '<tr><td>결제방식</td><td>[카드결제], [계좌이체], [현장결제] 중 주문할 때 선택한 방식</td></tr>' +
          '<tr><td>환불정보 *</td><td>환불받을 은행·계좌번호·예금주 (계좌이체 주문만 입력)</td></tr>' +
          '<tr><td>안내 문구</td><td>주문 상태에 따라 달라지는 처리 안내</td></tr>' +
        '</tbody></table></div>' +
        '<p>요청한 뒤의 처리 결과는 [취소·반품 상세]에서 확인해요. 판매자가 반려하면 주문은 요청 전 단계로 돌아가고, 이력이 남아 다시 요청할 수 없어요.</p>',
      cases: [
        {
          group: '바로 취소할 때',
          rows: [
            {
              title: '정산 전 카드결제 주문을 취소할 때',
              blocks: [
                {
                  shots: pair('check-modal-cancel', '09SCM 소매몰 주문 취소 확인'),
                  shotCaption: '09SCM 소매몰 주문 취소 확인 화면 (PC / 모바일)',
                  html:
                  '<ul><li>요청 사유: 입력 없음</li><li>안내: &quot;주문과 카드결제가 즉시 취소됩니다.&quot;</li><li>요청 후: &quot;주문과 카드결제가 취소되었습니다.&quot; 안내, 결제상태 [결제취소]</li></ul>'
                },
                {
                  shots: pair('check-toast-cancel-card', '09SCM 소매몰 카드결제 주문 취소 완료 안내'),
                  shotCaption: '09SCM 소매몰 카드결제 주문 취소 완료 안내 화면'
                }
              ]
            },
            {
              title: '정산 후 카드결제 주문을 취소할 때',
              shots: pair('check-alert-settled', '09SCM 소매몰 정산 후 카드결제 주문 취소 실패 안내'),
              shotCaption: '09SCM 소매몰 정산 후 카드결제 주문 취소 실패 안내 화면',
              html:
                '<ul><li>안내: &quot;주문을 취소하지 못했습니다. 판매자에게 문의해주세요.&quot;</li><li>주문: 기존 상태 유지</li><li>이어서: 판매자가 직권으로 취소 처리</li></ul>'
            },
            {
              title: '결제대기 주문을 취소할 때',
              blocks: [
                {
                  shots: pair('check-modal-wait', '09SCM 소매몰 결제대기 주문 취소 확인'),
                  shotCaption: '09SCM 소매몰 결제대기 주문 취소 확인 화면 (PC / 모바일)',
                  html:
                  '<ul><li>대상: 계좌이체·현장결제 주문</li><li>요청 사유: 입력 없음</li><li>안내: &quot;결제대기 주문이므로 주문이 즉시 취소됩니다.&quot;</li><li>요청 후: &quot;주문이 취소되었습니다.&quot; 안내, 결제상태 [결제취소]</li></ul>'
                },
                {
                  shots: pair('check-toast-cancel-wait', '09SCM 소매몰 결제대기 주문 취소 완료 안내'),
                  shotCaption: '09SCM 소매몰 결제대기 주문 취소 완료 안내 화면'
                }
              ]
            }
          ]
        },
        {
          group: '판매자에게 요청할 때',
          rows: [
            {
              title: '계좌이체·현장결제 주문의 취소를 요청할 때',
              blocks: [
                {
                  shots: pair('check-modal-request', '09SCM 소매몰 취소 요청'),
                  shotCaption: '09SCM 소매몰 취소 요청 화면 (PC / 모바일)',
                  html:
                  '<ul><li>대상: 결제상태가 [결제완료]인 주문</li><li>요청 사유: 입력 (필수)</li><li>환불정보: 계좌이체 주문만 입력 (현장결제는 입력 없음)</li><li>안내: &quot;판매자 확인 후 주문이 취소됩니다.&quot;</li><li>요청 후: &quot;취소 요청이 접수되었습니다.&quot; 안내, 취소·반품 [취소요청]</li></ul>'
                },
                {
                  shots: pair('check-toast-cancel-request', '09SCM 소매몰 취소 요청 접수 안내'),
                  shotCaption: '09SCM 소매몰 취소 요청 접수 안내 화면'
                }
              ]
            },
            {
              title: '카드결제·현장결제 주문의 반품을 요청할 때',
              blocks: [
                {
                  shots: pair('check-modal-return', '09SCM 소매몰 반품 요청'),
                  shotCaption: '09SCM 소매몰 반품 요청 화면 (PC / 모바일)',
                  html:
                  '<ul><li>요청 사유: 입력 (필수)</li><li>환불정보: 입력 없음</li><li>안내: &quot;판매자 확인 후 반품이 처리됩니다.&quot;</li><li>요청 후: &quot;반품 요청이 접수되었습니다.&quot; 안내, 취소·반품 [반품요청]</li></ul>'
                },
                {
                  shots: pair('check-toast-return', '09SCM 소매몰 반품 요청 접수 안내'),
                  shotCaption: '09SCM 소매몰 반품 요청 접수 안내 화면'
                }
              ]
            },
            {
              title: '계좌이체 주문의 반품을 요청할 때',
              shots: pair('check-modal-return-transfer', '09SCM 소매몰 계좌이체 주문 반품 요청'),
              shotCaption: '09SCM 소매몰 계좌이체 주문 반품 요청 화면 (PC / 모바일)',
              html:
                '<ul><li>요청 사유: 입력 (필수)</li><li>환불정보: 은행·계좌번호·예금주 입력 (필수)</li><li>안내: &quot;판매자 확인 후 반품이 처리됩니다.&quot;</li></ul>'
            }
          ]
        },
        {
          group: '요청 내용을 확인할 때',
          rows: [
            {
              title: '처리 중인 요청을 확인할 때',
              shots: pair('check-modal-pending', '09SCM 소매몰 취소·반품 상세 요청 중'),
              shotCaption: '09SCM 소매몰 취소·반품 상세 요청 중 화면 (PC / 모바일)',
              html:
                '<ul><li>표시: 취소·반품상태, 처리주체, 결제수단, 결제상태, 요청일시, 요청 사유</li><li>환불정보: 입력한 경우 은행·계좌번호·예금주 표시</li></ul>'
            },
            {
              title: '처리가 끝난 요청을 확인할 때',
              shots: pair('check-modal-done', '09SCM 소매몰 취소·반품 상세 처리 완료'),
              shotCaption: '09SCM 소매몰 취소·반품 상세 처리 완료 화면 (PC / 모바일)',
              html:
                '<ul><li>추가 표시: 처리일시, 판매자 메모(판매자가 남긴 처리 사유)</li><li>승인된 경우: 환불구분과 환불금액도 표시</li></ul>'
            }
          ]
        }
      ],
      trouble:
        '<h3>요청 사유를 입력하지 않으면 요청되지 않아요</h3>' +
        '<p>판매자에게 요청하는 취소·반품은 요청 사유가 필수예요. 계좌이체 주문은 환불정보도 모두 입력해야 해요.</p>' +
        '<h3>일부 상품만 취소하고 싶어요</h3>' +
        '<p>취소·반품은 주문 단위로만 할 수 있어요. 일부 상품만 필요하면 판매자에게 문의해 주세요.</p>' +
        '<h3>요청을 취소하고 싶어요</h3>' +
        '<p>접수된 요청은 소매몰에서 되돌릴 수 없어요. 판매자에게 문의해 주세요.</p>'
    }
  ]
};

window.GUIDE_CONTENT['check-detail'] = {
  shots: pair('check-detail-main', '09SCM 소매몰 주문상세'),
  shotCaption: '09SCM 소매몰 주문상세 화면 (PC / 모바일)',
  overview:
    '<p>주문 하나의 상품, 수령 정보, 결제 정보를 자세히 확인하는 화면이에요.</p>' +
    '<ul>' +
      '<li><a href="#check-history">주문내역</a>이나 <a href="#check-quick">간편 주문 조회</a>에서 [주문 상세]나 주문상품을 눌러 들어와요.</li>' +
      '<li>로그인한 회원 본인의 주문만 볼 수 있어요. 로그인하지 않았다면 &quot;로그인 후 이용할 수 있습니다.&quot; 안내 후 로그인 화면으로 이동해요.</li>' +
      '<li>주문 상태에 맞는 취소·반품 버튼은 <a href="#check-history/history-list">주문내역 보기</a>와 같은 조건으로 화면 아래에 나와요.</li>' +
    '</ul>',
  steps:
    '<h3>주문 요약</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>주문일시 · 주문번호</td><td>주문한 날짜와 시각, 주문번호</td></tr>' +
      '<tr><td>수령방식</td><td>[픽업] 또는 [배달]</td></tr>' +
      '<tr><td>처리상태</td><td>주문의 진행 단계 (취소·반품이 요청 중이거나 승인된 주문은 -)</td></tr>' +
      '<tr><td>결제상태</td><td>[결제대기], [결제완료], [결제취소], [환불대기] 중 현재 상태</td></tr>' +
      '<tr><td>취소·반품상태</td><td>취소·반품 이력이 있는 주문에만 표시되는 현재 상태</td></tr>' +
    '</tbody></table></div>' +

    '<h3>주문상품</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>상품 이미지 · 카테고리 · 상품명</td><td>상품 대표 이미지와 소매 카테고리(1차 &gt; 2차), 상품명 (이미지나 상품명을 누르면 <a href="#browse-detail">상품상세</a>로 이동)</td></tr>' +
      '<tr><td>수량 · 개당 금액</td><td>주문한 수량과 주문이 접수된 시점의 개당 판매가</td></tr>' +
      '<tr><td>픽업가능일</td><td>픽업 주문에만 표시되는 상품별 픽업가능일</td></tr>' +
      '<tr><td>상품금액</td><td>개당 금액 × 수량</td></tr>' +
    '</tbody></table></div>' +

    '<h3>주문자 정보</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>주문경로</td><td>[링크주문] 또는 [채팅주문]</td></tr>' +
      '<tr><td>주문자명 · 휴대폰번호</td><td>주문서에서 입력한 값</td></tr>' +
      '<tr><td>회원주문 코드</td><td>가입할 때 정한 숫자 4자리 코드</td></tr>' +
      '<tr><td>채팅주문 닉네임</td><td>채팅주문에만 표시되는, 회원이 오픈채팅방에서 쓰는 닉네임</td></tr>' +
    '</tbody></table></div>' +

    '<h3>픽업·배달 정보</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>픽업 장소</td><td>픽업 주문에만 표시되는 판매자의 상호와 픽업 주소</td></tr>' +
      '<tr><td>공통 픽업가능일</td><td>픽업 주문에만 표시되는, 주문할 상품들의 픽업가능일이 모두 겹치는 기간</td></tr>' +
      '<tr><td>배달지</td><td>배달 주문에만 표시되는 배달지 이름과 주소</td></tr>' +
      '<tr><td>요청사항</td><td>주문할 때 입력한 픽업 또는 배달 요청사항</td></tr>' +
    '</tbody></table></div>' +

    '<h3>결제 정보</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>결제수단</td><td>[카드결제], [계좌이체], [현장결제] 중 주문할 때 선택한 방식</td></tr>' +
      '<tr><td>결제상태</td><td>[결제대기], [결제완료], [결제취소], [환불대기] 중 현재 상태</td></tr>' +
      '<tr><td>입금계좌</td><td>계좌이체 주문에만 표시되는 판매자 입금계좌</td></tr>' +
      '<tr><td>상품금액 · 배달비 · 최종 결제금액</td><td>주문상품별 상품금액의 합계, 배달 주문의 배달비, 상품금액과 배달비를 더한 최종 결제금액</td></tr>' +
    '</tbody></table></div>' +
    '<p>화면 맨 아래의 [목록으로]를 누르면 <a href="#check-history">주문내역</a>으로 돌아가요.</p>',
  cases: [
    {
      title: '배달로 주문했으면',
      shots: pair('check-detail-delivery', '09SCM 소매몰 배달 주문상세'),
      shotCaption: '09SCM 소매몰 배달 주문상세 화면 (PC / 모바일)',
      html:
        '<ul><li>픽업·배달 정보: 픽업 장소와 공통 픽업가능일 대신 배달지 표시</li><li>주문상품: 픽업가능일 없음</li><li>결제 정보: 배달비 포함</li></ul>'
    },
    {
      title: '취소·반품 이력이 있으면',
      shots: pair('check-detail-request', '09SCM 소매몰 취소·반품 상태가 있는 주문상세'),
      shotCaption: '09SCM 소매몰 취소·반품 상태가 있는 주문상세 화면 (PC / 모바일)',
      html:
        '<ul><li>주문 요약: 취소·반품상태 표시, 처리상태 -</li><li>버튼: [취소·반품 상세]로 요청 내용과 처리 결과 확인</li></ul>'
    }
  ],
  trouble:
    '<h3>주문 상세가 열리지 않고 로그인 화면이 나와요</h3>' +
    '<p>주문 상세는 주문한 회원의 로그인이 필요해요. 주문한 휴대폰번호로 로그인하면 해당 주문으로 이어져요.</p>' +
    '<h3>입금계좌가 보이지 않아요</h3>' +
    '<p>입금계좌는 계좌이체로 주문한 경우에만 표시돼요.</p>'
};


window.GUIDE_CONTENT['mypage-info'] = {
  shots: pair('mypage-info-main', '09SCM 소매몰 내정보'),
  shotCaption: '09SCM 소매몰 내정보 화면 (PC / 모바일)',
  overview:
    '<p>주문에 쓰는 회원정보를 확인하고 고치는 화면이에요. 로그인한 회원만 쓸 수 있어요.</p>' +
    '<ul>' +
      '<li>마이페이지 메뉴에서 [내정보]를 눌러 들어와요. 헤더의 [마이페이지]는 <a href="#check-history">주문내역</a>으로 먼저 이동해요.</li>' +
      '<li>로그인하지 않았다면 &quot;로그인이 필요합니다.&quot; 안내 후 로그인 화면으로 이동하고, 로그인하면 이 화면으로 돌아와요.</li>' +
      '<li>판매자는 같은 정보를 관리자의 <a href="' + ADMIN_GUIDE + 'retail-member">회원관리</a>에서 확인해요.</li>' +
    '</ul>',
  steps:
    '<h3>기본정보</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>이름 *</td><td>주문자명으로 쓰이는 이름 (비워 둘 수 없음)</td></tr>' +
      '<tr><td>이메일 *</td><td>회원 이메일 (비워 둘 수 없음)</td></tr>' +
      '<tr><td>휴대폰번호</td><td>회원 아이디로 쓰이는 번호 (직접 바꿀 수 없고, 바꾸려면 판매자에게 문의)</td></tr>' +
    '</tbody></table></div>' +

    '<h3>회원 주문정보</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>회원주문 코드 *</td><td>숫자 4자리 코드 (같은 소매몰의 다른 회원과 겹치면 안 되며, 바꾸려면 [중복 확인]을 통과해야 함)</td></tr>' +
      '<tr><td>채팅주문 닉네임</td><td>오픈채팅방에서 쓰는 닉네임 (선택 항목이며, 등록하지 않으면 <a href="#order-pay/pay-chat">채팅주문</a>을 쓸 수 없음)</td></tr>' +
    '</tbody></table></div>' +

    '<h3>비밀번호</h3>' +
    '<p>[비밀번호 변경]을 누르면 <a href="#start-login/member-reset">비밀번호 재설정하기</a> 화면으로 이동해요. 이 화면에서 직접 입력하지는 않아요.</p>' +

    '<h3>저장</h3>' +
    '<p>[저장]을 누르면 이름, 이메일, 회원주문 코드, 채팅주문 닉네임을 한꺼번에 저장해요. 저장한 값은 다음 주문부터 <a href="#order-pay">주문서</a>에 불러와요. 이미 한 주문의 주문자 정보는 바뀌지 않아요.</p>',
  cases: [
    {
      title: '회원주문 코드를 바꾸려면',
      shots: pair('mypage-info-code', '09SCM 소매몰 회원주문 코드 중복 확인'),
      shotCaption: '09SCM 소매몰 회원주문 코드 중복 확인 화면 (PC / 모바일)',
      html:
        '<ol>' +
          '<li>새 코드를 숫자 4자리로 입력해요.</li>' +
          '<li>[중복 확인]을 눌러요. 쓸 수 있는 코드이면 입력란 아래에 &quot;사용할 수 있는 회원주문 코드입니다.&quot;가 나와요.</li>' +
          '<li>[저장]을 눌러요. 확인한 뒤 코드를 다시 바꾸면 [중복 확인]을 다시 해야 해요.</li>' +
        '</ol>' +
        '<p>진행 중인 주문이 있어도 바꿀 수 있고, 바꿔도 주문 내역은 그대로 이어져요. 바꾼 코드는 <a href="#check-quick">간편 주문 조회</a>와 채팅주문에서 바로 써요.</p>'
    },
    {
      title: '저장하면',
      shots: pair('mypage-info-saved-toast', '09SCM 소매몰 회원정보 저장 안내'),
      shotCaption: '09SCM 소매몰 회원정보 저장 안내 화면 (PC / 모바일)',
      html:
        '<p>&quot;회원정보가 저장되었습니다.&quot; 안내가 잠깐 나와요.</p>'
    },
    {
      title: '입력이 맞지 않으면',
      shots: pair('mypage-info-error-toast', '09SCM 소매몰 내정보 입력 오류'),
      shotCaption: '09SCM 소매몰 내정보 입력 오류 화면 (PC / 모바일)',
      html:
        '<p>이름, 이메일, 회원주문 코드가 비어 있으면 저장되지 않고 입력란에 안내가 나와요. 그 밖에 맞지 않는 부분이 있으면 화면 아래에 안내가 잠시 나타나요. 나오는 안내 문구는 아래와 같아요.</p>' +
        '<div class="table-wrap"><table><thead><tr><th>상황</th><th>안내 문구</th></tr></thead><tbody>' +
          '<tr><td>4자리가 아닌 코드로 [중복 확인]을 누름</td><td>&quot;회원주문 코드 숫자 4자리를 입력해 주세요.&quot;</td></tr>' +
          '<tr><td>같은 소매몰의 다른 회원이 쓰는 코드로 [중복 확인]을 누름</td><td>&quot;이미 사용 중인 회원주문 코드입니다.&quot;</td></tr>' +
          '<tr><td>코드를 바꾸고 [중복 확인] 없이 [저장]을 누름</td><td>&quot;회원주문 코드 중복 확인을 완료해 주세요.&quot;</td></tr>' +
        '</tbody></table></div>'
    }
  ],
  trouble:
    '<h3>휴대폰번호를 바꾸고 싶어요</h3>' +
    '<p>휴대폰번호는 회원 아이디라서 이 화면에서 바꿀 수 없어요. 판매자에게 문의하면 본인확인을 거쳐 바꿔 줘요.</p>' +
    '<h3>채팅주문이 되지 않아요</h3>' +
    '<p>채팅주문 닉네임을 등록해야 채팅주문을 쓸 수 있어요. 오픈채팅방에서 쓰는 닉네임과 같은 값으로 등록해 주세요.</p>' +
    '<h3>회원주문 코드가 이미 사용 중이라고 나와요</h3>' +
    '<p>같은 소매몰의 다른 회원이 쓰는 코드예요. 다른 숫자 4자리로 [중복 확인]을 해 주세요.</p>'
};

window.GUIDE_CONTENT['mypage-address'] = {
  shots: pair('mypage-address-main', '09SCM 소매몰 배달지관리'),
  shotCaption: '09SCM 소매몰 배달지관리 화면 (PC / 모바일)',
  overview:
    '<p>주문서의 배달 정보에서 불러올 대표 배달지를 관리하는 화면이에요. 로그인한 회원만 쓸 수 있어요.</p>' +
    '<ul>' +
      '<li>마이페이지 메뉴에서 [배달지관리]를 눌러 들어와요.</li>' +
      '<li>대표 배달지는 1건만 둘 수 있어요. <a href="#start-login/member-signup">회원가입</a>에서 입력한 배달지가 여기에 저장돼요.</li>' +
      '<li>배달로 주문하면 <a href="#order-pay">주문서</a>에서 대표 배달지가 선택된 상태로 열려요. 이번 주문에만 다른 주소로 받을 수도 있어요.</li>' +
    '</ul>',
  steps:
    '<h3>대표 배달지</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>배달지명</td><td>배달지를 구분하는 이름 (예: 집, 입력하지 않으면 &quot;대표 배달지&quot;로 저장)</td></tr>' +
      '<tr><td>배달 주소 *</td><td>배달받을 주소 (비워 둘 수 없음)</td></tr>' +
      '<tr><td>배달 요청사항</td><td>배달할 때 전달할 내용 (예: 문 앞에 놓아주세요.)</td></tr>' +
    '</tbody></table></div>' +
    '<p>[저장]을 누르면 세 항목을 함께 저장해요. 대표 배달지를 바꿔도 이미 접수된 주문의 배달지는 바뀌지 않아요.</p>',
  cases: [
    {
      title: '저장하면',
      shots: pair('mypage-address-saved-toast', '09SCM 소매몰 대표 배달지 저장 안내'),
      shotCaption: '09SCM 소매몰 대표 배달지 저장 안내 화면 (PC / 모바일)',
      html:
        '<p>&quot;대표 배달지가 저장되었습니다.&quot; 안내가 잠깐 나와요.</p>'
    },
    {
      title: '입력이 맞지 않으면',
      shots: pair('mypage-address-error-toast', '09SCM 소매몰 배달지관리 입력 오류'),
      shotCaption: '09SCM 소매몰 배달지관리 입력 오류 화면 (PC / 모바일)',
      html:
        '<p>맞지 않는 부분이 있으면 화면 아래에 안내가 잠시 나타나요. 나오는 안내 문구는 아래와 같아요.</p>' +
        '<div class="table-wrap"><table><thead><tr><th>상황</th><th>안내 문구</th></tr></thead><tbody>' +
          '<tr><td>배달 주소를 비우고 [저장]을 누름</td><td>&quot;배달 주소를 입력해 주세요.&quot;</td></tr>' +
        '</tbody></table></div>'
    }
  ],
  trouble:
    '<h3>배달지를 여러 개 등록하고 싶어요</h3>' +
    '<p>대표 배달지는 1건만 저장할 수 있어요. 다른 곳으로 받고 싶을 때는 주문서에서 이번 주문에만 다른 주소를 입력해요.</p>' +
    '<h3>주문서에 배달지가 선택되어 있지 않아요</h3>' +
    '<p>대표 배달지를 저장하지 않았다면 주문서에서 배달 주소를 직접 입력해야 해요. 이 화면에서 저장하면 다음 주문부터 불러와요.</p>'
};

window.GUIDE_CONTENT['mypage-withdraw'] = {
  shots: pair('mypage-withdraw-main', '09SCM 소매몰 회원탈퇴'),
  shotCaption: '09SCM 소매몰 회원탈퇴 화면 (PC / 모바일)',
  overview:
    '<p>회원이 직접 탈퇴하는 화면이에요. 탈퇴하면 되돌릴 수 없으니 안내를 꼭 읽어 주세요. 로그인한 회원만 쓸 수 있어요.</p>' +
    '<ul>' +
      '<li>마이페이지 메뉴 맨 아래의 [회원탈퇴]를 눌러 들어와요.</li>' +
      '<li>진행 중인 주문이 있으면 탈퇴할 수 없어요.</li>' +
    '</ul>',
  steps:
    '<ol>' +
      '<li><b>안내 확인하기</b> 탈퇴 전에 알아둘 내용을 읽어요.</li>' +
      '<li><b>비밀번호 입력하기</b> 가입할 때 정한 비밀번호를 입력해요.</li>' +
      '<li><b>확인 체크하기</b> &quot;회원탈퇴 안내 내용을 확인했습니다.&quot;에 체크해요.</li>' +
      '<li><b>탈퇴하기</b> [회원탈퇴]를 누르면 탈퇴가 끝나고 소매몰 메인으로 이동해요.</li>' +
    '</ol>' +
    '<h3>탈퇴 전에 알아두세요</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>로그인과 이용</td><td>현재 계정으로 로그인, 회원 서비스 이용 불가</td></tr>' +
      '<tr><td>주문·결제 기록</td><td>관련 법령에서 정한 기간 동안 보관될 수 있음</td></tr>' +
      '<tr><td>진행 중인 주문</td><td>픽업완료·배달완료가 아니고 취소가 승인되지 않은 주문 (취소·반품 요청 중인 주문 포함), 처리가 끝난 뒤 탈퇴 가능</td></tr>' +
      '<tr><td>다시 가입하기</td><td>같은 휴대폰번호로 재가입 가능 (새 회원으로 가입되며 이전 회원정보·주문은 이어지지 않음)</td></tr>' +
    '</tbody></table></div>',
  cases: [
    {
      title: '진행 중인 주문이 있으면',
      shots: pair('mypage-withdraw-blocked', '09SCM 소매몰 진행 중인 주문이 있는 회원탈퇴'),
      shotCaption: '09SCM 소매몰 진행 중인 주문이 있는 회원탈퇴 화면 (PC / 모바일)',
      html:
        '<ul>' +
          '<li>안내: &quot;진행 중인 주문 ○건이 있어 현재 회원탈퇴할 수 없습니다.&quot;</li>' +
          '<li>비밀번호 입력란, 확인 체크, [회원탈퇴] 버튼이 눌리지 않아요.</li>' +
          '<li>이어서: <a href="#check-history">주문내역</a>에서 주문을 확인하고, 처리가 끝나거나 취소가 승인된 뒤에 다시 시도해요.</li>' +
        '</ul>'
    },
    {
      title: '탈퇴하면',
      shots: pair('mypage-withdraw-done-toast', '09SCM 소매몰 회원탈퇴 완료 안내'),
      shotCaption: '09SCM 소매몰 회원탈퇴 완료 안내 화면 (PC / 모바일)',
      html:
        '<p>&quot;회원탈퇴가 완료되었습니다.&quot; 안내가 잠깐 나온 뒤 로그아웃되어 소매몰 메인으로 이동해요.</p>'
    }
  ],
  trouble:
    '<h3>[회원탈퇴] 버튼이 눌리지 않아요</h3>' +
    '<p>진행 중인 주문이 있으면 탈퇴할 수 없어요. 화면에 표시된 건수만큼의 주문이 끝나야 해요. 주문 상태는 <a href="#check-history">주문내역</a>에서 확인하고, 취소가 필요하면 주문내역에서 요청해 주세요.</p>' +
    '<h3>비밀번호가 일치하지 않는다고 나와요</h3>' +
    '<p>입력한 비밀번호가 가입할 때 정한 비밀번호와 다르면 &quot;비밀번호가 일치하지 않습니다.&quot; 안내가 나오고 탈퇴되지 않아요. 비밀번호가 기억나지 않으면 <a href="#start-login/member-reset">비밀번호 재설정</a>으로 새 비밀번호를 만든 뒤 다시 시도해 주세요.</p>' +
    '<h3>탈퇴한 뒤 같은 번호로 다시 가입하고 싶어요</h3>' +
    '<p>다시 가입할 수 있어요. 새 회원으로 가입되므로 회원주문 코드와 배달지는 다시 등록하고, 이전 주문은 이어서 볼 수 없어요.</p>'
};
