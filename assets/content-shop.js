// 09SCM 소매몰 이용가이드 — 화면별 본문
// 키는 nav-shop.js의 leaf id. 값이 없는 섹션은 화면에 나타나지 않는다.
window.GUIDE_CONTENT = window.GUIDE_CONTENT || {};

var ADMIN_GUIDE_LOGIN = 'partner.html#start-login';

var SHOT_DIMS = {
  'franchise-biz-ok': [1424, 323, 880, 323],
  'franchise-corp': [1424, 802, 880, 977],
  'franchise-done': [2880, 1800, 880, 1800],
  'franchise-entry-bar': [2880, 208, null],
  'franchise-entry-menu': [2880, 1800, 880, 1800],
  'franchise-error': [2880, 1280, 880, 1280],
  'franchise-id-ok': [1424, 359, 880, 395],
  'franchise-phone-verified': [1424, 498, 880, 498],
  'franchise-terms': [2880, 1800, 880, 1800],
  'reset-error': [2880, 1200, 880, 1200],
  'reset-sent': [944, 630, 880, 630],
  'reset-step2': [2880, 1800, 880, 1800],
  'reset-verified': [944, 630, 880, 630],
  'signup-alias-ok': [1224, 323, 880, 323],
  'signup-done': [2880, 1800, 880, 1800],
  'signup-done-plain': [2880, 1800, 880, 1800],
  'signup-error': [2880, 1280, 880, 1280],
  'signup-phone-dup': [1224, 642, 880, 746],
  'signup-phone-ok': [1224, 642, 880, 746],
  'signup-phone-sent': [1224, 642, 880, 746],
  'signup-phone-verified': [1224, 642, 880, 746],
  'signup-terms': [2880, 1800, 880, 1800]
};
// 케이스 캡처 쌍(PC+모바일). 이미지 파일명은 assets/img/shop/{name}-pc|mobile.webp
function pair(name, alt) {
  var d = SHOT_DIMS[name], out = [{ device: 'pc', src: '../assets/img/shop/' + name + '-pc.webp', alt: alt + ' PC 화면', ratio: d[0] / d[1] }];
  if (d.length > 2 && d[2]) out.push({ device: 'mobile', src: '../assets/img/shop/' + name + '-mobile.webp', alt: alt + ' 모바일 화면', ratio: d[2] / d[3] });
  return out;
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
        '<li><a href="#order-chat"><b>채팅주문</b></a> 오픈채팅방에 정해진 형식으로 메시지를 보내서 주문해요.</li>' +
        '<li><a href="#check-history"><b>주문조회</b></a> 주문내역과 주문상세를 확인하고 취소·반품을 요청해요. <a href="#check-quick">간편주문조회</a>는 로그인 없이 써요.</li>' +
        '<li><a href="#etc-info"><b>내정보</b></a> 회원정보와 대표 배달지를 관리하고, 회원탈퇴를 신청해요.</li>' +
      '</ul>' },

    { id: 'sec4', label: '주문 방식과 수령·결제', html:
      '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
        '<tr><td>링크주문</td><td>소매몰에서 상품을 골라 장바구니·주문서로 직접 주문하는 방식</td></tr>' +
        '<tr><td>채팅주문</td><td>오픈채팅방에 정해진 형식으로 메시지를 보내 주문하는 방식 (회원주문 코드와 채팅주문 닉네임을 등록한 회원만 이용 가능, 항상 픽업·현장결제)</td></tr>' +
        '<tr><td>픽업</td><td>정해진 픽업 가능일에 소매몰의 픽업 장소에서 직접 받는 방식</td></tr>' +
        '<tr><td>배달</td><td>등록한 주소로 받는 방식 (배달비 별도, 카드결제만 가능)</td></tr>' +
        '<tr><td>결제수단</td><td>픽업은 카드결제·계좌이체·현장결제, 배달은 카드결제</td></tr>' +
      '</tbody></table></div>' },

    { id: 'sec5', label: '시작부터 주문까지', html:
      '<ol>' +
        '<li><b>가입</b> 휴대폰번호로 회원가입해요. <a href="#start-login">회원가입·로그인</a></li>' +
        '<li><b>로그인</b> 휴대폰번호와 비밀번호로 로그인해요.</li>' +
        '<li><b>상품 고르기</b> 둘러보기에서 상품을 찾아 장바구니에 담거나 바로 주문해요.</li>' +
        '<li><b>주문·결제</b> 수령방식과 결제수단을 고르고 주문해요.</li>' +
        '<li><b>수령·확인</b> 픽업 가능일에 맞춰 픽업하거나 배달받고, 주문내역에서 진행 상태를 확인해요.</li>' +
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
          '<tr><td>채팅주문 닉네임</td><td>오픈채팅방에서 쓰는 닉네임 (선택, 등록하지 않으면 채팅주문 이용 불가)</td></tr>' +
        '</tbody></table></div>' +

        '<h3>04 대표 배달지 등록 (선택)</h3>' +
        '<p>입력한 주소는 마이페이지의 대표 배달지로 저장돼요. 픽업만 이용한다면 입력하지 않아도 돼요.</p>' +
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
          title: '이미 가입된 휴대폰번호이면',
          shots: pair('signup-phone-dup', '09SCM 회원가입 이미 가입된 번호'),
          shotCaption: '09SCM 회원가입 이미 가입된 번호 화면 (PC / 모바일)',
          html: '<p>휴대폰번호 아래에 &quot;이미 가입된 휴대폰번호입니다.&quot; 안내가 나오고 [인증번호 발송]을 누를 수 없어요. 다른 번호로 [중복확인]을 다시 하거나, 이미 가입한 번호라면 로그인해요.</p>'
        },
        {
          title: '사용할 수 있는 휴대폰번호이면',
          shots: pair('signup-phone-ok', '09SCM 회원가입 사용 가능한 번호'),
          shotCaption: '09SCM 회원가입 사용 가능한 번호 화면 (PC / 모바일)',
          html: '<p>&quot;사용 가능한 휴대폰번호입니다.&quot; 안내가 나오고 [인증번호 발송]을 누를 수 있어요. 번호를 바꾸면 [중복확인]부터 다시 해요.</p>'
        },
        {
          title: '인증번호를 발송하면',
          shots: pair('signup-phone-sent', '09SCM 회원가입 인증번호 발송'),
          shotCaption: '09SCM 회원가입 인증번호 발송 화면 (PC / 모바일)',
          html: '<p>인증번호 아래에 &quot;인증번호가 발송되었습니다. 유효시간 03:00&quot; 안내가 나와요. 받은 숫자 6자리를 입력하고 [확인]을 눌러요.</p>'
        },
        {
          title: '인증번호를 확인하면',
          shots: pair('signup-phone-verified', '09SCM 회원가입 휴대폰번호 인증 완료'),
          shotCaption: '09SCM 회원가입 휴대폰번호 인증 완료 화면 (PC / 모바일)',
          html: '<p>&quot;휴대폰번호 인증이 완료되었습니다.&quot; 안내가 나와요. 인증번호를 다시 입력하면 인증이 풀려요.</p>'
        },
        {
          title: '사용할 수 있는 회원주문 코드이면',
          shots: pair('signup-alias-ok', '09SCM 회원가입 사용 가능한 회원주문 코드'),
          shotCaption: '09SCM 회원가입 사용 가능한 회원주문 코드 화면 (PC / 모바일)',
          html: '<p>&quot;사용할 수 있는 회원주문 코드입니다.&quot; 안내가 나와요. 코드를 바꾸면 [중복 확인]을 다시 해요.</p>'
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
          shotCaption: '09SCM 비밀번호 재설정 인증번호 발송 화면 (PC / 모바일)',
          html: '<p>&quot;인증번호가 발송되었습니다. 유효시간 03:00&quot; 안내가 나와요. [다음]은 아직 누를 수 없어요.</p>'
        },
        {
          title: '인증번호를 확인하면',
          shots: pair('reset-verified', '09SCM 비밀번호 재설정 인증 완료'),
          shotCaption: '09SCM 비밀번호 재설정 인증 완료 화면 (PC / 모바일)',
          html: '<p>&quot;휴대폰번호 인증이 완료되었습니다.&quot; 안내가 나오고 [다음]을 누를 수 있어요.</p>'
        },
        {
          title: '[다음]을 누르면',
          shots: pair('reset-step2', '09SCM 새 비밀번호 설정'),
          shotCaption: '09SCM 새 비밀번호 설정 화면 (PC / 모바일)',
          html: '<p>새 비밀번호와 새 비밀번호 확인을 입력하는 화면으로 바뀌어요. 입력한 뒤 [비밀번호 변경 완료]를 눌러요.</p>'
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
          blocks: [
            {
              shots: [{ device: 'pc', src: '../assets/img/shop/franchise-entry-bar-pc.webp', alt: '09SCM 소매몰 상단 유틸리티바 PC 화면' }],
              shotCaption: '09SCM 소매몰 상단 유틸리티바 화면 (PC)',
              html: '<p>PC에서는 화면 맨 위 상단 유틸리티바의 [가맹점 가입신청]을 눌러요. 같은 바에 판매자가 관리자로 들어가는 [관리자 로그인]이 있어요. 모바일에는 이 바가 없어요.</p>'
            },
            {
              shots: pair('franchise-entry-menu', '09SCM 소매몰 카테고리 메뉴'),
              shotCaption: '09SCM 소매몰 카테고리 메뉴 화면 (PC / 모바일)',
              html: '<p>PC·모바일 모두 [카테고리]를 눌러 메뉴를 열면 맨 아래에 [관리자 로그인 →]과 [가맹점 가입신청 →]이 있어요. [관리자 로그인 →]은 새 창으로 열려요.</p>'
            }
          ]
        },
        {
          title: '가맹점 소매몰이면',
          html: '<p>[가맹점 가입신청]은 본사 소매몰에만 보여요. 가맹점 소매몰에는 보이지 않아요.</p>'
        },
        {
          title: '아이디 중복 확인을 통과하면',
          shots: pair('franchise-id-ok', '09SCM 가맹점 가입 신청 사용 가능한 아이디'),
          shotCaption: '09SCM 가맹점 가입 신청 사용 가능한 아이디 화면 (PC / 모바일)',
          html: '<p>아이디 아래에 사용할 수 있다는 안내가 나와요. 아이디를 바꾸면 [중복 확인]을 다시 해요.</p>'
        },
        {
          title: '휴대폰번호 인증을 마치면',
          shots: pair('franchise-phone-verified', '09SCM 가맹점 가입 신청 휴대폰번호 인증 완료'),
          shotCaption: '09SCM 가맹점 가입 신청 휴대폰번호 인증 완료 화면 (PC / 모바일)',
          html: '<p>인증이 완료되었다는 안내가 나와요.</p>'
        },
        {
          title: '사업자등록번호를 인증하면',
          shots: pair('franchise-biz-ok', '09SCM 가맹점 가입 신청 사업자 인증 완료'),
          shotCaption: '09SCM 가맹점 가입 신청 사업자 인증 완료 화면 (PC / 모바일)',
          html: '<p>사업자등록번호 아래에 인증이 완료되었다는 안내가 나와요.</p>'
        },
        {
          title: '법인사업자를 선택하면',
          shots: pair('franchise-corp', '09SCM 가맹점 가입 신청 법인사업자'),
          shotCaption: '09SCM 가맹점 가입 신청 법인사업자 화면 (PC / 모바일)',
          html: '<p>법인등록번호 입력란이 나타나요. 숫자 13자리로 입력해요.</p>'
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
          title: '신청한 뒤에는',
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
        '<p>아이디는 영문 소문자로 시작하는 영문·숫자 조합 3~20자예요. 영문 소문자와 숫자 외의 글자는 입력되지 않아요.</p>' +
        '<h3>법인등록번호 입력란이 보이지 않아요</h3>' +
        '<p>사업자 유형에서 법인사업자를 선택하면 나타나요.</p>'
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
    '<h3>간편 주문 조회</h3>' +
    '<p>회원주문 코드 4자리를 입력하고 [조회]를 눌러요.</p>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>회원주문 코드</td><td>가입할 때 정한 숫자 4자리 코드</td></tr>' +
      '<tr><td>채팅주문 닉네임</td><td>조회한 회원이 등록한 채팅주문 닉네임 (등록하지 않았다면 -)</td></tr>' +
      '<tr><td>진행 중 주문</td><td>수령이 끝나지 않았거나 취소·반품이 요청 중인 주문의 건수와 목록</td></tr>' +
      '<tr><td>완료된 주문</td><td>픽업완료·배달완료되었거나 취소·반품이 승인된 주문의 건수와 목록</td></tr>' +
    '</tbody></table></div>' +

    '<h3>주문 정보</h3>' +
    '<p>주문마다 아래 내용이 보여요. 대문화면에서는 주문 현황만 볼 수 있어요.</p>' +
    '<div class="table-wrap"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody>' +
      '<tr><td>주문일 / 주문번호</td><td>주문한 날짜와 주문 식별번호</td></tr>' +
      '<tr><td>수령방식</td><td>픽업, 배달 (픽업이면 픽업 기간도 함께 표시)</td></tr>' +
      '<tr><td>주문상품</td><td>주문한 상품명과 수량</td></tr>' +
      '<tr><td>처리상태</td><td>주문의 진행 단계 (취소·반품이 진행 중이거나 끝난 주문은 -)</td></tr>' +
      '<tr><td>결제상태</td><td>결제대기, 결제완료, 결제취소, 환불대기 중 현재 상태</td></tr>' +
      '<tr><td>취소·반품</td><td>취소·반품 요청의 진행 결과 (이력이 있는 주문에만 표시)</td></tr>' +
      '<tr><td>결제금액</td><td>상품금액과 배달비를 더한 최종 결제금액</td></tr>' +
    '</tbody></table></div>',
  cases: [
    {
      title: '주문 조회 결과',
      shots: [
        { device: 'pc', src: '../assets/img/shop/gate-result-pc.webp', alt: '09SCM 대문 조회 결과 PC 화면', ratio: 1440 / 900 },
        { device: 'mobile', src: '../assets/img/shop/gate-result-mobile.webp', alt: '09SCM 대문 조회 결과 모바일 화면', ratio: 440 / 900 }
      ],
      shotCaption: '09SCM 대문 조회 결과 화면 (PC / 모바일)',
      html:
        '<p>회원주문 코드를 조회하면 회원 정보와 주문 목록이 나와요. 진행 중 주문과 완료된 주문 탭으로 나눠 볼 수 있어요.</p>'
    },
    {
      title: '일치하는 회원주문 코드가 없는 경우',
      html: '<p>&quot;일치하는 회원주문 코드가 없습니다.&quot; 안내가 나와요. 숫자 4자리를 다시 확인해요.</p>'
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
        '<tr><td>수령방식</td><td>주문한 상품을 받는 방법: 픽업, 배달</td></tr>' +
        '<tr><td>픽업 가능일</td><td>상품을 픽업할 수 있는 기간 (상품마다 다름)</td></tr>' +
        '<tr><td>공통 픽업가능일</td><td>한 주문에 담긴 상품들의 픽업 가능일이 겹치는 기간 (주문할 때 정해지고 이후 상품 설정이 바뀌어도 접수된 주문은 바뀌지 않으며, 배달 주문에는 없음)</td></tr>' +
        '<tr><td>배달비</td><td>배달 주문에만 붙는 비용 (상품금액과 별도)</td></tr>' +
        '<tr><td>결제수단</td><td>카드결제, 계좌이체, 현장결제 (현장결제는 픽업할 때 결제하는 방식, 배달은 카드결제만 가능)</td></tr>' +
        '<tr><td>결제상태</td><td>결제대기, 결제완료, 결제취소, 환불대기</td></tr>' +
        '<tr><td>환불대기</td><td>정산이 끝난 카드결제 주문의 취소·반품이 승인되었으나 판매자의 환불이 끝나지 않은 결제상태 (환불이 끝나면 결제취소로 바뀜)</td></tr>' +
        '<tr><td>처리상태</td><td>픽업: 주문접수 → 픽업대기 → 픽업완료<br>배달: 주문접수 → 배달대기 → 배달중 → 배달완료<br>취소·반품이 진행 중이거나 끝난 주문은 -로 표시</td></tr>' +
        '<tr><td>주문 취소</td><td>주문접수 단계의 카드결제·결제대기 주문을 판매자 승인 없이 바로 취소하는 것</td></tr>' +
        '<tr><td>취소 요청</td><td>계좌이체·현장결제로 결제가 끝난 주문접수 건의 취소를 판매자에게 요청하는 것 (판매자 확인 후 취소)</td></tr>' +
        '<tr><td>반품 요청</td><td>픽업완료·배달완료 후 7일 이내 주문의 반품을 판매자에게 요청하는 것 (판매자 확인 후 처리)</td></tr>' +
        '<tr><td>취소·반품 상태</td><td>취소요청, 반품요청이 들어오면 승인 또는 반려: 취소승인, 반품승인, 취소반려, 반품반려 (반려되면 요청 이전 상태로 돌아감)</td></tr>' +
        '<tr><td>환불 계좌</td><td>계좌이체 주문의 취소·반품을 요청할 때 입력하는 환불받을 계좌 (은행, 계좌번호, 예금주)</td></tr>' +
      '</tbody></table></div>' },

    { id: 'sec3', label: '채팅주문', html:
      '<div class="table-wrap"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody>' +
        '<tr><td>채팅주문</td><td>오픈채팅방에 정해진 형식으로 메시지를 보내 주문하는 방식 (항상 픽업·현장결제)</td></tr>' +
        '<tr><td>오픈채팅방</td><td>판매자가 채팅주문을 받는 채팅방</td></tr>' +
        '<tr><td>회원주문 코드</td><td>회원 확인용 숫자 4자리 코드 (같은 소매몰 안에서 중복 불가, 간편 주문 조회에도 사용)</td></tr>' +
        '<tr><td>채팅주문 닉네임</td><td>회원이 오픈채팅방에서 쓰는 닉네임 (회원주문 코드와 함께 확인하며, 등록하지 않은 회원은 채팅주문 이용 불가)</td></tr>' +
      '</tbody></table></div>' },

    { id: 'sec4', label: '상품', html:
      '<div class="table-wrap"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody>' +
        '<tr><td>품절</td><td>재고가 없어 주문할 수 없는 상품 (상품목록에는 보이고 상품상세에서 구매 불가)</td></tr>' +
        '<tr><td>1회 최대구매수량</td><td>한 번에 주문할 수 있는 최대 수량</td></tr>' +
      '</tbody></table></div>' }
  ]
};
