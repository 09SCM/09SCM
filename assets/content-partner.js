// 본사·가맹점 관리자 이용가이드 — 화면별 본문
// 키는 nav-partner.js의 leaf id. 값이 없는 섹션은 화면에 나타나지 않는다.
window.GUIDE_CONTENT = window.GUIDE_CONTENT || {};

var HOME_APPLY = 'https://zero-scm-homepage-mockup.csb62929.chatgpt.site/apply';
var FRANCHISE_APPLY = 'https://superbeanchoi.github.io/09SCM-Shop/index.html?view=franchise-signup';

window.GUIDE_CONTENT['start-intro'] = {
  shots: [
    { device: 'pc', src: '../assets/img/partner/intro-pc.webp', alt: '09SCM 관리자 대시보드 화면' }
  ],
  shotCaption: '09SCM 대시보드 화면',
  sections: [
    { id: 'sec1', label: "09SCM 관리자란", html:
      "<p>본사와 가맹점이 각자의 계정으로 소매몰을 운영하고, 도소매 거래와 매출을 한곳에서 관리하는 관리자예요.</p>" },
    { id: 'sec2', label: "이런 분이 사용해요", html:
      "<ul><li><b>본사:</b> 소속 가맹점을 관리하고, 소매몰과 도매 거래를 함께 운영해요.</li><li><b>가맹점:</b> 본사에 소속되어 자신의 소매몰을 운영하고, 도매 상품을 주문하거나 공급해요.</li></ul>" },
    { id: 'sec3', label: "할 수 있는 일", html:
      "<ul><li><a href=\"#dashboard-ops\"><b>대시보드</b></a> 처리해야 할 주문, 매출 흐름, 공지를 한눈에 확인해요.</li><li><a href=\"#retail-product-list\"><b>소매관리</b></a> 소매몰에서 판매할 상품과 주문, 회원, 매출을 관리해요.</li><li><a href=\"#wholesale-shop\"><b>도매관리</b></a> 소속 본사나 다른 공급자의 도매 상품을 주문하거나, 내 상품을 도매로 공급해요.</li><li><a href=\"#franchise-list\"><b>가맹점관리</b></a> 본사만 쓰는 메뉴예요. 가맹점 목록, 이용료, 통합 매출, 공지사항을 관리해요.</li><li><a href=\"#system-member\"><b>시스템관리</b></a> 내 회원정보, 이용료, 알림설정, 공지사항을 관리해요.</li></ul>" },
    { id: 'sec4', label: "시작부터 운영까지", html:
      "<ol><li><b>신청</b> 본사는 <a href=\"https://zero-scm-homepage-mockup.csb62929.chatgpt.site/apply\" target=\"_blank\" rel=\"noopener noreferrer\">도입신청</a>, 가맹점은 <a href=\"https://superbeanchoi.github.io/09SCM-Shop/index.html?view=franchise-signup\" target=\"_blank\" rel=\"noopener noreferrer\">가입신청</a>을 통해 신청할 수 있어요.</li><li><b>승인</b> 본사는 09SCM 운영자가 가입 내용을 확인하고 승인을 마치면 서비스를 이용할 수 있어요. 가맹점은 가입 신청 시 계정이 바로 만들어지고, 본사가 검토한 뒤 이용을 승인하면 정상적으로 이용할 수 있어요.</li><li><b>로그인</b> 아이디와 비밀번호로 로그인할 수 있어요. <a href=\"#start-login\">가입신청·로그인</a></li><li><b>사전 준비</b> 가맹점은 이용승인 전에 온라인 결제 시스템(PayApp) 연동이 완료되어야 해요. 정기결제 카드 등록도 이 단계에서 함께 준비해요.</li><li><b>운영 시작</b> 이용승인이 되면 소매몰과 도소매 기능을 정상적으로 사용할 수 있어요.</li></ol>" },
    { id: 'sec5', label: "계정에 따라 메뉴가 달라요", html:
      "<p>본사인지 가맹점인지, 가맹점은 도매공급권한이 있는지에 따라 보이는 메뉴가 달라요.</p>" +
      "<div class=\"table-wrap\"><table class=\"wide\"><thead><tr><th>메뉴</th><th class=\"c\">본사</th><th class=\"c\">가맹점<br>(도매공급권한 있음)</th><th class=\"c\">가맹점<br>(도매공급권한 없음)</th></tr></thead><tbody><tr><td>대시보드</td><td class=\"c\">○</td><td class=\"c\">○</td><td class=\"c\">○</td></tr><tr><td>대시보드의 도매 판매 영역</td><td class=\"c\">○</td><td class=\"c\">○</td><td class=\"c\">×</td></tr><tr><td>소매관리</td><td class=\"c\">○</td><td class=\"c\">○</td><td class=\"c\">○</td></tr><tr><td>소매관리 &gt; 상품목록의 [도매상품전환] 버튼</td><td class=\"c\">○</td><td class=\"c\">○</td><td class=\"c\">×</td></tr><tr><td>도매관리 &gt; 도매상품 주문하기, 주문내역</td><td class=\"c\">○</td><td class=\"c\">○</td><td class=\"c\">○</td></tr><tr><td>도매관리 &gt; 내 도매상품, 주문접수관리, 도매매출조회, 도매설정</td><td class=\"c\">○</td><td class=\"c\">○</td><td class=\"c\">×</td></tr><tr><td>가맹점관리</td><td class=\"c\">○</td><td class=\"c\">×</td><td class=\"c\">×</td></tr><tr><td>시스템관리 &gt; 회원정보, 알림설정, 공지사항</td><td class=\"c\">○</td><td class=\"c\">○</td><td class=\"c\">○</td></tr><tr><td>시스템관리 &gt; 이용료관리</td><td class=\"c\">×</td><td class=\"c\">○</td><td class=\"c\">○</td></tr></tbody></table></div>" +
      "<p>본사는 도매공급권한을 항상 가지고 있어요. 가맹점의 도매공급권한은 본사가 정해요.</p>" +
      "<p>가맹점은 이용상태에 따라서도 보이는 메뉴가 달라져요. 자세한 내용은 <a href=\"#start-login\">가입신청·로그인</a>에서 확인해주세요.</p>" }
  ]
};

window.GUIDE_CONTENT['start-login'] = {
  shots: [
    { device: 'pc', src: '../assets/img/partner/login-pc.webp', alt: '09SCM 관리자 로그인 화면' }
  ],
  shotCaption: '09SCM 로그인 화면',
  overview:
    '<p>본사는 도입신청, 가맹점은 가입신청을 한 뒤 승인 완료된 아이디와 비밀번호로 로그인할 수 있어요.</p>' +
    '<div class="link-row">' +
      '<a href="' + HOME_APPLY + '" target="_blank" rel="noopener noreferrer">본사 도입신청</a>' +
      '<a href="' + FRANCHISE_APPLY + '" target="_blank" rel="noopener noreferrer">가맹점 가입신청</a>' +
    '</div>',
  steps:
    '<ol>' +
      '<li><b>신청하기</b> 본사는 도입신청, 가맹점은 가입신청을 해주세요.</li>' +
      '<li><b>가입승인받기</b> 본사는 09SCM에서, 가맹점은 신청한 본사에서 별도 프로세스에 따라 승인 절차를 거쳐요. 승인 절차가 완료된 계정은 정상적으로 서비스를 이용할 수 있어요.</li>' +
      '<li><b>로그인하기</b> 승인 완료된 신청자는 다시 관리자에 접속해서 로그인을 진행해주세요.</li>' +
      '<li><b>서비스 이용하기</b> 로그인을 완료하면 대시보드에 접속할 수 있어요. 이용대기 상태의 가맹점 계정은 시스템관리 메뉴만 볼 수 있어요.</li>' +
    '</ol>',
  cases:
    '<h3>본사와 가맹점</h3>' +
    '<p>회원 유형에 따라 사용 가능한 메뉴가 달라요. 자세한 내용은 <a href="#start-intro">09SCM 관리자 소개</a>에서 확인해주세요.</p>' +
    '<p>로그인하면 화면 오른쪽 상단에 회원 유형(본사/가맹점), 상호명, 아이디가 표시돼요. 지금 어떤 계정으로 들어와 있는지 여기서 확인해요.</p>' +

    '<h3>이용상태</h3>' +
    '<p>이용상태는 가맹점 계정에 적용돼요.</p>' +
    '<div class="table-wrap"><table class="wide">' +
      '<thead><tr><th>이용상태</th><th>로그인</th><th>이렇게 달라져요</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>이용대기</td><td>가능</td><td>시스템관리만 조회할 수 있어요. 결제 시스템 연동, 정기결제 카드 등록처럼 이용을 시작하기 전에 필요한 준비를 할 수 있어요. 소매몰은 접근제한 화면이 보이고, 주문을 받을 수 없어요.</td></tr>' +
        '<tr><td>이용승인</td><td>가능</td><td>모든 메뉴를 정상적으로 사용할 수 있어요.</td></tr>' +
        '<tr><td>이용제한</td><td>가능</td><td>모든 메뉴가 보이지만, 신규 주문 및 상품 등록이 제한돼요. 새 도매 주문([주문하기], [바로구매]), 도매상품 등록, 소매상품·소매정보 등록, [도매상품전환]을 할 수 없어요. 이미 진행 중인 주문은 계속 처리할 수 있어요. 소매몰도 새 주문을 받을 수 없고, 화면 맨 위에 안내 문구가 계속 표시돼요.</td></tr>' +
        '<tr><td>이용불가</td><td>불가</td><td>로그인할 수 없어요. 이용불가 해제는 소속 본사만 가능하며 해당 본사에 문의해야 해요.</td></tr>' +
      '</tbody></table></div>'
};

window.GUIDE_CONTENT['start-terms'] = {
  sections: [
    { id: 'sec1', label: "계정과 상태", html:
      "<div class=\"table-wrap\"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody><tr><td>본사</td><td>09SCM을 도입해 소속 가맹점을 관리하는 계정이에요.</td></tr><tr><td>가맹점</td><td>본사에 소속된 계정이에요.</td></tr><tr><td>소매몰</td><td>본사와 가맹점이 각자 운영하는 고객용 쇼핑 사이트예요.</td></tr><tr><td>소매몰 회원</td><td>소매몰에서 주문하는 손님이에요. 관리자 계정과는 달라요.</td></tr><tr><td>공급자 / 구매자</td><td>도매 거래에서 상품을 파는 계정 / 사는 계정이에요. 본사와 가맹점 모두 될 수 있어요.</td></tr><tr><td>이용상태</td><td>가맹점 계정의 이용 단계예요. 이용대기, 이용승인, 이용제한, 이용불가가 있어요. <a href=\"#start-login\">가입신청·로그인</a>에서 자세히 확인해주세요.</td></tr><tr><td>도매공급권한</td><td>도매 상품을 등록해 공급할 수 있는 권한이에요. 보유 / 미보유로 나뉘고, 이용상태와 별개로 본사가 정해요.</td></tr><tr><td>이용료·정기결제</td><td>이용료는 가맹점이 본사에 내는 월 이용료예요. 정기결제는 등록한 카드로 이용료가 매월 자동으로 결제되는 방식이에요.</td></tr><tr><td>접근제한 화면</td><td>이용대기·이용제한·이용불가 가맹점의 소매몰에서 보이는 안내 화면이에요. 이 화면이 보이는 동안은 새 주문을 받을 수 없어요.</td></tr></tbody></table></div>" },
    { id: 'sec2', label: "주문과 결제", html:
      "<div class=\"table-wrap\"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody><tr><td>주문경로</td><td>주문이 들어온 방법이에요. <b>링크주문</b>은 소매몰에서 직접 하는 주문이고, 여러 상품을 한 주문으로 묶을 수 있어요. <b>채팅주문</b>은 오픈채팅방에 정해진 형식으로 메시지를 보내면 자동으로 접수되는 주문이에요. 채팅주문은 항상 픽업·현장결제이고, 상품마다 따로 주문이 만들어져요. 접수된 뒤의 처리는 두 경로가 같아요.</td></tr><tr><td>수령방식</td><td>소매 주문을 받는 방법이에요. 픽업, 배달이 있어요. 배달은 카드결제만 가능하고 항상 선결제예요.</td></tr><tr><td>결제수단</td><td>카드결제, 계좌이체, 현장결제가 있어요. 현장결제는 픽업할 때 결제하는 방식이라 주문이 들어올 때는 항상 결제대기예요.</td></tr><tr><td>결제상태</td><td>결제대기, 결제완료, 결제취소 3가지예요.</td></tr><tr><td>처리상태 (소매)</td><td>픽업은 주문접수 → 픽업대기 → 픽업완료, 배달은 주문접수 → 배달대기 → 배달중 → 배달완료 순서로 바뀌어요.</td></tr><tr><td>처리상태 (도매)</td><td>주문접수 → 배송대기 → 배송중 → 배송확정 순서로 바뀌어요.</td></tr><tr><td>취소·반품 상태</td><td>취소요청, 반품요청이 들어오면 승인하거나 반려해요. 취소승인, 반품승인, 취소반려, 반품반려가 있어요.</td></tr><tr><td>공통 픽업가능기간</td><td>한 주문에 담긴 상품들의 픽업가능기간이 겹치는 기간이에요. 주문할 때 주문에 저장되어, 나중에 상품 설정을 바꿔도 이미 들어온 주문은 달라지지 않아요. 배달 주문에는 나타나지 않아요.</td></tr><tr><td>노쇼후보</td><td>픽업 주문 중 공통 픽업가능기간이 지났는데 아직 픽업완료가 되지 않은 건이에요. 기간 종료일 다음날부터 노쇼후보로 표시돼요. 실제 노쇼 여부는 판매자가 확인하고, [취소처리]에서 처리 주체를 노쇼처리로 선택해 처리해요. 노쇼로 처리한 건은 회원정보의 노쇼 이력에서 확인할 수 있어요.</td></tr><tr><td>환불구분</td><td>전체환불, 부분환불이 있어요. 결제대기 상태에서 취소한 주문은 환불할 금액이 없어서 환불되지 않아요.</td></tr></tbody></table></div>" },
    { id: 'sec3', label: "채팅주문", html:
      "<div class=\"table-wrap\"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody><tr><td>채팅주문상품명</td><td>채팅으로 주문받을 때 쓰는 상품의 짧은 이름이에요. 소매몰에 보이는 정식 상품명과 별개이고, 현재 판매 중이면서 소매몰에 노출 중인 상품 사이에서는 같은 이름을 쓸 수 없어요.</td></tr><tr><td>회원주문 코드</td><td>회원을 확인하는 숫자 4자리 코드예요. 중복으로 사용할 수 없어요.</td></tr><tr><td>채팅주문 닉네임</td><td>회원이 오픈채팅방에서 쓰는 닉네임이에요. 회원주문 코드와 함께 대조해 본인인지 확인해요. 등록하지 않은 회원은 채팅주문을 이용할 수 없어요.</td></tr><tr><td>매칭 실패 건</td><td>회원주문 코드나 닉네임이 맞지 않아 자동으로 접수되지 못한 채팅 메시지예요. 목록에 쌓이고, 판매자가 확인해서 직접 매칭하거나 삭제해요.</td></tr></tbody></table></div>" },
    { id: 'sec4', label: "상품과 수량", html:
      "<div class=\"table-wrap\"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody><tr><td>상품코드</td><td>상품마다 붙는 번호로, 알파벳 뒤에 숫자가 붙어요. (예: P0231) 도매·소매 구분 없이 하나의 번호 체계를 함께 써요.</td></tr><tr><td>상품출처</td><td>내 상품이 어디서 왔는지를 나타내요. 내도매상품(내가 등록한 도매상품), 도매주문상품(도매로 주문해 받은 상품), 내소매상품(소매몰용으로 직접 등록한 상품)이 있어요.</td></tr><tr><td>소매정보</td><td>소매몰에서 판매하기 위해 소매몰마다 따로 설정하는 정보예요. 한 소매몰 안에서 같은 상품코드에는 소매정보를 1개만 만들 수 있어요.</td></tr><tr><td>보유수량</td><td>내가 가지고 있는 전체 수량이에요. 내도매상품은 도매상품에 등록한 수량, 도매주문상품은 배송확정된 구매 수량, 내소매상품은 등록할 때 입력한 수량이에요. 주문이 들어오거나 취소·반품 승인 때 수량을 되돌리면 함께 바뀌어요.</td></tr><tr><td>판매가능수량</td><td>보유수량 중 소매몰에서 팔도록 정한 수량이에요. 보유수량보다 많이 설정할 수 없어요.</td></tr><tr><td>도매 가용재고</td><td>도매로 판매할 수 있는 수량이에요. (보유수량 - 소매몰에 배정한 판매가능수량) 소매몰에 배정한 수량은 도매로 주문받을 수 없어요.</td></tr><tr><td>주문가능수량</td><td>도매에서 구매자가 한 번에 주문할 수 있는 최대 수량이에요. 도매 가용재고와 같아요.</td></tr><tr><td>판매상태</td><td>판매중, 품절이 있어요. 품절 상품은 주문이 불가능해요.</td></tr><tr><td>노출여부</td><td>노출, 미노출이 있어요. 미노출 상품은 상품 목록에 노출되지 않아요.</td></tr></tbody></table></div>" },
    { id: 'sec5', label: "매출", html:
      "<div class=\"table-wrap\"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody><tr><td>결제총액</td><td>결제가 완료된 금액의 합계예요.</td></tr><tr><td>취소·환불액</td><td>취소·반품이 승인되어 돌려준 금액의 합계예요.</td></tr><tr><td>매출액</td><td>결제총액에서 취소·환불액을 뺀 금액이에요. 취소·환불이 더 크면 마이너스가 될 수 있어요.</td></tr></tbody></table></div>" +
      "<p>매출은 화면을 열거나 새로고침한 시점의 값을 한국 시간 기준으로 보여줘요. 이용료로 받은 금액(이용료 수납액)은 매출액에 포함되지 않아요.</p>" },
    { id: 'sec6', label: "PayApp", html:
      "<div class=\"table-wrap\"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody><tr><td>PayApp</td><td>온라인 결제를 처리하는 외부 서비스예요. 정산과 수수료 정보는 PayApp 계정 관리자 페이지에서 별도로 확인해주세요.</td></tr><tr><td>PayApp 연동정보</td><td>판매자 아이디, 연동 KEY, 연동 VALUE예요. 연동여부에 따라 연동완료, 미연동으로 표시돼요.</td></tr></tbody></table></div>" }
  ]
};

window.GUIDE_CONTENT['dashboard-ops'] = {
  shots: [
    { device: 'pc', src: '../assets/img/partner/dashboard-pc.webp', alt: '09SCM 대시보드 PC 화면', ratio: 1440 / 1500 },
    { device: 'mobile', src: '../assets/img/partner/dashboard-mobile.webp', alt: '09SCM 대시보드 모바일 화면', ratio: 440 / 1200 }
  ],
  shotCaption: '09SCM 대시보드 화면 (PC / 모바일)',
  overview:
    '<p>로그인하면 처음 보이는 화면이에요. 지금 처리할 주문, 매출 흐름, 공지사항, 이번주 잘 팔린 상품을 한 화면에서 확인해요.</p>' +
    '<ul>' +
      '<li><b>처리 필요</b> 지금 처리를 기다리는 주문 건수예요.</li>' +
      '<li><b>매출추이</b> 이번주·이번달 매출을 차트로 보여줘요.</li>' +
      '<li><b>공지사항</b> 최근 등록된 최대 5건의 공지를 보여줘요.</li>' +
      '<li><b>이번주 판매현황</b> 이번주 많이 팔린 상품 순위예요.</li>' +
      '<li><b>알림센터</b> 시스템에서 발생한 알림은 화면 오른쪽 위 벨 버튼에서 모아서 볼 수 있어요.</li>' +
    '</ul>',
  steps:
    '<h3>처리 필요</h3>' +
    '<p>지금 처리를 기다리는 주문 건수예요. 소매 판매·도매 판매 항목을 누르면 해당 주문 목록의 알맞은 탭으로 이동해요.</p>' +
    '<div class="table-wrap"><table class="wide">' +
      '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>도소매 판매 > 주문접수</td><td>접수된 도소매 주문 중 [주문접수] 처리상태 건수</td></tr>' +
        '<tr><td>도소매 판매 > 취소·반품요청</td><td>접수된 도소매 취소·반품 요청 중 아직 처리하지 않은 건수</td></tr>' +
        '<tr><td>소매 판매 > 픽업·배달 대기 / 배달중</td><td>접수된 소매 주문 중 [배달대기]·[픽업대기] 및 [배달중] 처리상태별 건수</td></tr>' +
        '<tr><td>도매 판매 > 배송대기 / 배송중</td><td>내가 공급자인 도매 주문의 처리상태별 건수</td></tr>' +
        '<tr><td>도매 구매 > 주문접수 / 배송대기 / 배송중</td><td>내가 구매자인 도매 주문의 처리상태별 건수</td></tr>' +
        '<tr><td>도매 구매 > 취소·반품요청</td><td>내가 구매자인 도매 취소·반품 요청 중 아직 처리되지 않은 건수</td></tr>' +
        '<tr><td>결제대기</td><td>도소매 주문 중 결제가 아직 완료되지 않은 건수</td></tr>' +
      '</tbody></table></div>' +
    '<p>[주문목록보기]를 누르면 해당 섹션별 전체 주문 목록으로 이동해요.</p>' +

    '<h3>매출추이</h3>' +
    '<div class="table-wrap"><table class="wide">' +
      '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>매출액</td><td>결제총액(선택한 기간에 결제가 완료된 금액 합계) − 취소·환불액(선택한 기간에 취소·반품이 승인된 금액 합계)</td></tr>' +
        '<tr><td>결제 건수</td><td>선택한 기간에 결제가 완료된 주문 수</td></tr>' +
        '<tr><td>차트</td><td>이번주는 요일별, 이번달은 주별 매출액 표시</td></tr>' +
      '</tbody></table></div>' +

    '<h3>공지사항</h3>' +
    '<div class="table-wrap"><table class="wide">' +
      '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>태그</td><td>공지를 쓴 곳 (09SCM 또는 우리본사)</td></tr>' +
        '<tr><td>제목</td><td>공지 제목 (누르면 공지 상세로 이동)</td></tr>' +
        '<tr><td>날짜</td><td>공지를 등록한 날짜</td></tr>' +
      '</tbody></table></div>' +
    '<p>[전체보기]를 누르면 시스템관리 > 공지사항 목록으로 이동해요.</p>' +

    '<h3>이번주 판매현황</h3>' +
    '<p>이번주(월~일)에 결제가 완료된 주문을 상품별로 모아 판매금액이 큰 5개 상품을 보여줘요. 취소·반품이 승인된 주문은 빠져요.</p>' +
    '<div class="table-wrap"><table class="wide">' +
      '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>순위</td><td>판매금액이 큰 순서</td></tr>' +
        '<tr><td>상품명</td><td>판매된 상품 이름</td></tr>' +
        '<tr><td>주문건수</td><td>해당 상품이 들어 있는 주문의 수</td></tr>' +
        '<tr><td>판매금액</td><td>상품 단가 × 판매 수량의 합계 (배송비와 배달비는 포함되지 않음)</td></tr>' +
      '</tbody></table></div>',
  cases:
    '<h3>도매공급권한에 따라 달라져요</h3>' +
    '<p>도매 판매는 내가 공급자인 주문, 도매 구매는 내가 구매자인 주문이에요.</p>' +
    '<div class="table-wrap"><table class="wide">' +
      '<thead><tr><th>영역</th><th>도매공급권한 있음(본사 포함)</th><th>도매공급권한 없음</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>처리 필요 > 소매 판매</td><td>○</td><td>○</td></tr>' +
        '<tr><td>처리 필요 > 도매 판매</td><td>○</td><td>×</td></tr>' +
        '<tr><td>처리 필요 > 도매 구매</td><td>○</td><td>○</td></tr>' +
        '<tr><td>매출추이·이번주 판매현황의 도매 탭</td><td>○</td><td>×</td></tr>' +
      '</tbody></table></div>' +

    '<h3>이용상태에 따라 달라져요</h3>' +
    '<p>이용대기 상태의 가맹점에는 대시보드가 보이지 않고 시스템관리만 쓸 수 있어요. 자세한 내용은 <a href="#start-login">가입신청·로그인</a>에서 확인해요.</p>'
};

// ---- 소매관리 > 상품관리 (상품목록 / 상품카테고리 / 메인상품진열) ----
window.GUIDE_CONTENT['retail-product-list'] = {
  "screens": [
    {
      "id": "list-view",
      "label": "상품 목록 보기",
      "shots": [
        {
          "device": "pc",
          "src": "../assets/img/partner/product-list-pc.webp",
          "alt": "09SCM 상품목록 PC 화면",
          "ratio": 0.96
        },
        {
          "device": "mobile",
          "src": "../assets/img/partner/product-list-mobile.webp",
          "alt": "09SCM 상품목록 모바일 화면",
          "ratio": 0.3667
        }
      ],
      "shotCaption": "09SCM 상품목록 화면 (PC / 모바일)",
      "overview": "<p>내 소매몰에서 판매할 상품을 한곳에서 보고 관리하는 화면이에요. 소매몰에 상품을 올리려면 먼저 상품마다 <b>소매정보</b>(소매몰에서 보일 이름, 가격, 수령방식 등)를 등록해야 해요. 등록하지 않은 상품은 소매몰에 보이지 않아요.</p><p>한 소매몰 안에서 같은 상품코드에는 소매정보를 1개만 만들 수 있어요. 소매정보는 본사와 가맹점이 각자의 소매몰마다 따로 설정해요.</p><h3>상품출처</h3><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>내도매상품</td><td>도매관리에 직접 등록한 도매상품 (소매정보 등록: 목록의 [소매정보등록] 또는 도매상품 등록 시 함께 등록)</td></tr><tr><td>도매주문상품</td><td>다른 공급자에게 도매로 주문해 배송확정까지 끝난 상품 (소매정보 등록: 목록의 [소매정보등록])</td></tr><tr><td>내소매상품</td><td>도매와 상관없이 소매몰에서만 판매하려고 직접 등록한 상품 (소매정보 등록: [+ 소매상품등록]으로 새로 등록)</td></tr></tbody></table></div><p>상품코드는 도매와 소매가 같은 번호 체계를 함께 써요. 용어는 <a href=\"#start-terms\">용어집</a>에서 확인해주세요.</p>",
      "steps": "<h3>상품 찾기</h3><p>목록 위쪽에서 상품을 검색하고 조건별로 걸러낼 수 있어요.</p><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>검색</td><td>상품코드 또는 상품명으로 검색 (영문 대소문자 구분 없음)</td></tr><tr><td>필터</td><td>상품출처, 소매판매상태, 소매노출여부, 채팅주문여부, 1차·2차 카테고리 선택</td></tr><tr><td>보유수량 있는 상품만 보기</td><td>보유수량이 0인 상품을 제외하고 표시</td></tr><tr><td>탭</td><td>전체, 소매등록(소매정보를 등록한 상품), 소매미등록(소매정보를 등록하지 않은 상품) 구분</td></tr><tr><td>정렬</td><td>최근등록순, 최근수정순, 보유수량 적은순 중 선택</td></tr></tbody></table></div><p>목록은 한 페이지에 20건씩 보여줘요.</p><h3>목록에서 보이는 정보</h3><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>이미지</td><td>소매정보에 등록한 대표이미지</td></tr><tr><td>상품코드</td><td>도매와 소매가 함께 쓰는 상품 고유 코드</td></tr><tr><td>상품명</td><td>소매몰에 보이는 상품 이름</td></tr><tr><td>카테고리</td><td>소매 카테고리 (소매정보 등록 전에는 &quot;-&quot;)</td></tr><tr><td>상품출처</td><td>내도매상품, 도매주문상품, 내소매상품 구분</td></tr><tr><td>소비자가/할인가</td><td>소매몰에서 소비자에게 보여주는 가격</td></tr><tr><td>보유수량</td><td>내가 보유한 전체 수량</td></tr><tr><td>판매가능수량</td><td>보유수량 중 소매몰에서 판매하도록 정한 수량 (소매몰 주문이 들어올 때마다 주문 수량만큼 감소)</td></tr><tr><td>소매판매상태</td><td>[판매중], [품절] 구분 (품절 상품은 소매몰에서 주문 불가)</td></tr><tr><td>소매노출여부</td><td>[노출], [미노출] 구분 (미노출 상품은 소매몰 상품 목록에 표시되지 않음)</td></tr><tr><td>채팅주문여부</td><td>채팅주문을 허용한 상품에 &quot;채팅주문&quot; 표시</td></tr><tr><td>등록일시</td><td>소매정보를 등록한 일시</td></tr><tr><td>수정일시</td><td>소매정보를 마지막으로 수정한 일시</td></tr><tr><td>관리</td><td>행마다 상태에 따라 노출되는 버튼</td></tr></tbody></table></div>",
      "cases": [
        {
          "title": "행마다 보이는 버튼이 달라져요",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/product-list-rows-pc.webp",
              "alt": "09SCM 상품목록 행 버튼 PC 화면",
              "ratio": 3.0212
            }
          ],
          "shotCaption": "09SCM 상품목록 행 버튼 화면 (PC)",
          "html": "<div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>소매정보가 없는 상품</td><td>[소매정보등록]</td></tr><tr><td>소매정보가 있는 상품</td><td>[상세보기] [수정] [삭제]</td></tr><tr><td>소매정보가 있는 내소매상품</td><td>[도매상품전환] [상세보기] [수정] [삭제]</td></tr><tr><td>보유수량이 0이고 소매정보가 있는 내도매상품·도매주문상품</td><td>[상세보기] [삭제] (수정 불가)</td></tr></tbody></table></div><p>보유수량이 0이고 소매정보가 없는 상품은 소매정보를 등록할 수 없어서 버튼이 보이지 않아요. [도매상품전환]은 도매공급권한이 있는 계정에만 보이고, 보유수량이 있는 내소매상품에만 나타나요.</p>"
        },
        {
          "title": "수량은 이렇게 움직여요",
          "html": "<ul><li>소매몰에서 주문이 접수되면 판매가능수량과 보유수량이 주문 수량만큼 함께 줄어요.</li><li>소매 주문을 취소·반품 승인할 때 수량을 되돌릴지는 <a href=\"#retail-order-list\">주문목록</a>에서 선택해요.</li><li>내도매상품은 도매몰에서 주문이 접수되면 보유수량만 줄어요. 보유수량은 이미 소매에 배정한 판매가능수량보다 적게 고칠 수 없어요.</li><li>도매주문상품은 같은 상품을 다시 주문해 배송확정되면 보유수량이 더해져요. 이때 이미 등록한 소매정보의 내용은 바뀌지 않고 수량만 늘어요.</li></ul>"
        },
        {
          "title": "이용상태에 따라 달라져요",
          "html": "<p>이용제한 상태에서는 소매상품·소매정보 등록과 [도매상품전환]을 할 수 없어요. 자세한 내용은 <a href=\"#start-login\">가입신청·로그인</a>에서 확인해주세요.</p>"
        },
        {
          "title": "도매공급권한에 따라 달라져요",
          "html": "<p>[도매상품전환] 버튼은 도매공급권한이 있는 계정(본사 포함)에만 보여요. 권한이 없는 가맹점에는 보이지 않아요.</p>"
        }
      ]
    },
    {
      "id": "register",
      "label": "소매정보 등록하기",
      "shots": [
        {
          "device": "pc",
          "src": "../assets/img/partner/product-register-pc.webp",
          "alt": "09SCM 소매정보등록 PC 화면",
          "ratio": 0.8834
        },
        {
          "device": "mobile",
          "src": "../assets/img/partner/product-register-mobile.webp",
          "alt": "09SCM 소매정보등록 모바일 화면",
          "ratio": 0.1953
        }
      ],
      "shotCaption": "09SCM 소매정보등록 화면 (PC / 모바일)",
      "overview": "<p>소매정보가 없는 상품을 소매몰에서 판매할 수 있도록, 소매몰에서 보일 정보를 등록하는 화면이에요. 목록에서 소매미등록 상품 행의 [소매정보등록]을 누르면 열려요. 도매주문상품은 가장 최근에 배송확정된 구매분의 상품정보가 미리 채워져 있어요.</p>",
      "steps": "<ol><li><b>등록할 상품 고르기</b> 소매미등록 상품 행에서 [소매정보등록]을 눌러요.</li><li><b>정보 입력하기</b> 아래 표의 항목을 입력해요. 이름 옆에 *가 붙은 항목은 꼭 입력해야 해요.</li><li><b>저장하기</b> [저장]을 누르면 소매정보가 만들어져요. 입력한 판매가능수량이 0이면 품절, 0보다 크면 판매중으로 등록돼요.</li></ol><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>상품이미지*</td><td>소매몰에 보일 상품 사진 (2장 이상 10장 이하, JPG·PNG·WEBP, 한 장당 5MB 이하, 첫 번째 이미지가 대표이미지)</td></tr><tr><td>소매카테고리 1차*</td><td>내가 만든 소매 카테고리 중 선택 (카테고리가 없으면 <a href=\"#retail-product-category\">상품카테고리</a>에서 먼저 등록)</td></tr><tr><td>소매카테고리 2차</td><td>선택한 1차 카테고리 아래의 2차 카테고리 선택 (선택 입력)</td></tr><tr><td>소매상품명*</td><td>소매몰에 보일 상품 이름</td></tr><tr><td>소비자가*</td><td>소비자에게 보여줄 판매가 (1원 이상의 정수)</td></tr><tr><td>할인가</td><td>소비자가에서 할인한 판매가 (선택 입력, 1원 이상의 정수, 소비자가 이하, 할인율은 자동 계산)</td></tr><tr><td>소매노출여부</td><td>소매몰에 상품을 보일지 선택</td></tr><tr><td>판매가능수량*</td><td>소매몰에서 판매할 수량 (보유수량 이하)</td></tr><tr><td>수령방식</td><td>픽업, 배달, 픽업+배달 중 선택 (기본값은 소매설정의 기본 수령방식, 상품마다 변경 가능)</td></tr><tr><td>픽업가능 시작일*</td><td>픽업을 받을 수 있는 첫 날짜 (수령방식에 픽업이 포함될 때 입력)</td></tr><tr><td>픽업가능 종료일*</td><td>픽업을 받을 수 있는 마지막 날짜 (수령방식에 픽업이 포함될 때 입력, 시작일보다 빠를 수 없고 오늘 이후만 입력 가능, 수정 시에는 종료일을 바꾸는 경우에 한해 오늘 이후 검증)</td></tr><tr><td>채팅주문 허용</td><td>채팅주문 가능 여부 (켜면 채팅주문상품명 입력 필요)</td></tr><tr><td>채팅주문상품명*</td><td>채팅주문에서 쓰는 짧은 상품 이름 (소매상품명과 별도, 입력 후 [중복확인] 필요)</td></tr><tr><td>상품구성</td><td>상품에 포함된 구성 안내 (선택 입력)</td></tr><tr><td>1회 최대구매수량</td><td>한 번에 주문할 수 있는 최대 수량 (선택 입력)</td></tr><tr><td>원산지</td><td>상품의 원산지 (선택 입력)</td></tr><tr><td>소비기한</td><td>상품의 소비기한 안내 (선택 입력, 날짜 대신 &quot;수령 후 7일&quot;처럼 자유롭게 입력)</td></tr><tr><td>상세정보</td><td>상품 상세 설명 (선택 입력)</td></tr></tbody></table></div>",
      "cases": [
        {
          "title": "입력에 맞지 않는 내용이 있어요",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/product-register-error-pc.webp",
              "alt": "09SCM 소매정보등록 입력 오류 PC 화면",
              "ratio": 0.8122
            },
            {
              "device": "mobile",
              "src": "../assets/img/partner/product-register-error-mobile.webp",
              "alt": "09SCM 소매정보등록 입력 오류 모바일 화면",
              "ratio": 0.1836
            }
          ],
          "shotCaption": "09SCM 소매정보등록 입력 오류 화면 (PC / 모바일)",
          "html": "<p>입력에 맞지 않는 내용이 있으면 저장되지 않고, 화면 위쪽에 고쳐야 할 항목이 모두 나와요.</p>"
        }
      ]
    },
    {
      "id": "direct",
      "label": "소매상품 직접 등록하기",
      "shots": [
        {
          "device": "pc",
          "src": "../assets/img/partner/product-direct-pc.webp",
          "alt": "09SCM 소매상품등록 PC 화면",
          "ratio": 0.9296
        },
        {
          "device": "mobile",
          "src": "../assets/img/partner/product-direct-mobile.webp",
          "alt": "09SCM 소매상품등록 모바일 화면",
          "ratio": 0.2172
        }
      ],
      "shotCaption": "09SCM 소매상품등록 화면 (PC / 모바일)",
      "overview": "<p>도매와 상관없이 소매몰에서만 팔 상품은 목록의 [+ 소매상품등록]으로 등록해요. 이렇게 등록한 상품은 내소매상품이 돼요.</p>",
      "steps": "<p>입력 항목은 <a href=\"#retail-product-list/register\">소매정보 등록하기</a>와 같고, 판매가능수량 대신 <b>보유수량</b>을 입력해요. 내소매상품은 보유수량이 곧 판매가능수량이에요.</p>"
    },
    {
      "id": "detail",
      "label": "상세보기",
      "shots": [
        {
          "device": "pc",
          "src": "../assets/img/partner/product-detail-pc.webp",
          "alt": "09SCM 소매정보 상세 PC 화면",
          "ratio": 0.96
        },
        {
          "device": "mobile",
          "src": "../assets/img/partner/product-detail-mobile.webp",
          "alt": "09SCM 소매정보 상세 모바일 화면",
          "ratio": 0.2599
        }
      ],
      "shotCaption": "09SCM 소매정보 상세 화면 (PC / 모바일)",
      "overview": "<p>목록에서 [상세보기]를 누르면 등록한 소매정보를 조회 전용 화면으로 확인해요. 고치려면 [수정]으로 이동해요.</p>",
      "cases": [
        {
          "title": "보유수량이 0이면 조회만 가능해요",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/product-detail-soldout-pc.webp",
              "alt": "09SCM 소매정보 상세(보유수량 0) PC 화면",
              "ratio": 0.96
            },
            {
              "device": "mobile",
              "src": "../assets/img/partner/product-detail-soldout-mobile.webp",
              "alt": "09SCM 소매정보 상세(보유수량 0) 모바일 화면",
              "ratio": 0.2667
            }
          ],
          "shotCaption": "09SCM 소매정보 상세(보유수량 0) 화면 (PC / 모바일)",
          "html": "<p>보유수량이 0인 내도매상품·도매주문상품은 품절·미노출로 고정되고, 화면 전체가 조회만 가능해요. 삭제만 할 수 있어요. 도매 재고가 다시 생기거나 같은 상품을 다시 주문해 배송확정되면 잠금이 풀려요.</p>"
        }
      ]
    },
    {
      "id": "edit",
      "label": "수정하기",
      "shots": [
        {
          "device": "pc",
          "src": "../assets/img/partner/product-edit-pc.webp",
          "alt": "09SCM 소매정보 수정 PC 화면",
          "ratio": 0.793
        },
        {
          "device": "mobile",
          "src": "../assets/img/partner/product-edit-mobile.webp",
          "alt": "09SCM 소매정보 수정 모바일 화면",
          "ratio": 0.1746
        }
      ],
      "shotCaption": "09SCM 소매정보 수정 화면 (PC / 모바일)",
      "overview": "<p>[수정]에서 등록한 소매정보를 고쳐요. 입력 항목은 <a href=\"#retail-product-list/register\">소매정보 등록하기</a>와 같고, 수정 화면에서는 소매판매상태도 고를 수 있어요.</p>",
      "cases": [
        {
          "title": "판매상태와 노출여부가 잠기는 경우",
          "html": "<p>수량이나 기간 조건에 따라 소매판매상태와 소매노출여부가 자동으로 정해지고 잠겨요. 잠기지 않은 나머지 항목은 계속 고칠 수 있어요.</p><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>보유수량이 0 (내도매상품·도매주문상품)</td><td>품절·미노출로 고정, 화면 전체 조회만 가능, 삭제만 가능 (도매 재고가 다시 생기거나 같은 상품을 다시 주문해 배송확정되면 잠금 해제)</td></tr><tr><td>보유수량이 0 (내소매상품)</td><td>소매판매상태·소매노출여부만 품절·미노출로 잠김 (수정 화면에서 보유수량을 다시 입력하면 잠금 해제)</td></tr><tr><td>판매가능수량이 0 (보유수량은 있음)</td><td>소매판매상태가 품절로 바뀌고 잠김 (수정 화면에서 판매가능수량을 다시 올리면 잠금 해제)</td></tr><tr><td>픽업가능종료일 경과 (수령방식에 픽업 포함)</td><td>소매노출여부가 미노출로 잠김, 판매상태와 나머지 항목은 수정 가능 (픽업가능 종료일을 오늘 이후로 고치면 잠금 해제, 수령방식이 배달뿐이면 해당 없음)</td></tr></tbody></table></div><p>잠금이 풀려도 소매판매상태와 소매노출여부는 자동으로 판매중, 노출로 바뀌지 않아요. 직접 바꿔주세요. 소매 주문이 취소·반품되어 판매가능수량이 되돌아와도 판매상태는 그대로예요.</p>"
        },
        {
          "title": "판매가능수량을 0으로 입력하면",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/product-case-avail0-pc.webp",
              "alt": "09SCM 소매정보 수정(판매가능수량 0) PC 화면",
              "ratio": 0.7826
            },
            {
              "device": "mobile",
              "src": "../assets/img/partner/product-case-avail0-mobile.webp",
              "alt": "09SCM 소매정보 수정(판매가능수량 0) 모바일 화면",
              "ratio": 0.173
            }
          ],
          "shotCaption": "09SCM 소매정보 수정(판매가능수량 0) 화면 (PC / 모바일)",
          "html": "<p>소매판매상태가 품절로 바뀌고 잠겨요.</p>"
        },
        {
          "title": "내소매상품의 보유수량을 0으로 입력하면",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/product-case-retail0-pc.webp",
              "alt": "09SCM 소매정보 수정(내소매상품 보유수량 0) PC 화면",
              "ratio": 0.8706
            },
            {
              "device": "mobile",
              "src": "../assets/img/partner/product-case-retail0-mobile.webp",
              "alt": "09SCM 소매정보 수정(내소매상품 보유수량 0) 모바일 화면",
              "ratio": 0.1912
            }
          ],
          "shotCaption": "09SCM 소매정보 수정(내소매상품 보유수량 0) 화면 (PC / 모바일)",
          "html": "<p>소매판매상태와 소매노출여부가 품절·미노출로 잠겨요.</p>"
        }
      ]
    },
    {
      "id": "convert",
      "label": "도매상품으로 전환하기",
      "shots": [
        {
          "device": "pc",
          "src": "../assets/img/partner/product-convert-pc.webp",
          "alt": "09SCM 도매상품전환 PC 화면",
          "ratio": 0.96
        },
        {
          "device": "mobile",
          "src": "../assets/img/partner/product-convert-mobile.webp",
          "alt": "09SCM 도매상품전환 모바일 화면",
          "ratio": 0.2391
        }
      ],
      "shotCaption": "09SCM 도매상품전환 화면 (PC / 모바일)",
      "overview": "<p>내소매상품을 다른 가맹점에도 공급하고 싶다면 [도매상품전환]을 눌러요.</p>",
      "steps": "<p>도매 정보(도매카테고리, 도매상품명, 공급범위, 공급가, 공급단위, 도매노출여부, 보유수량, 판매가능수량 등)를 입력하고 [전환하기]를 누르면 돼요.</p><ul><li>전환하면 내소매상품으로 되돌릴 수 없어요.</li><li>소비자가, 수령방식 같은 기존 소매정보와 상품코드는 그대로 유지돼요.</li><li>공급가에는 기존 소비자가가 참고값으로 채워져요. 실제 공급가에 맞게 고쳐주세요.</li><li>전환이 끝나면 상품출처가 내도매상품으로 바뀌고 도매관리 &gt; <a href=\"#wholesale-mine\">내 도매상품</a>으로 이동해요.</li></ul>"
    },
    {
      "id": "delete",
      "label": "삭제하기",
      "shots": [
        {
          "device": "pc",
          "src": "../assets/img/partner/product-delete-confirm-pc.webp",
          "alt": "09SCM 삭제 확인 PC 화면",
          "ratio": 0.96
        },
        {
          "device": "mobile",
          "src": "../assets/img/partner/product-delete-confirm-mobile.webp",
          "alt": "09SCM 삭제 확인 모바일 화면",
          "ratio": 0.3667
        }
      ],
      "shotCaption": "09SCM 삭제 확인 화면 (PC / 모바일)",
      "overview": "<p>소매정보가 있는 행의 [삭제]를 누르거나, 여러 건을 체크한 뒤 [일괄삭제]를 눌러요. 체크박스 선택은 현재 페이지에서만 유지되고, 다른 페이지로 넘어가면 해제돼요. 선택 없이 [일괄삭제]를 누르면 &quot;삭제할 상품을 선택해주세요.&quot; 안내가 나와요.</p>",
      "steps": "<div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>내도매상품, 도매주문상품</td><td>소매정보만 삭제 (소매몰에서 사라지고 원래 도매상품과 주문 이력은 유지, 목록에 [소매정보등록] 다시 노출)</td></tr><tr><td>내소매상품</td><td>상품 자체가 삭제되어 목록에서 사라짐</td></tr></tbody></table></div><p>진행 중인 주문이 있어도 삭제할 수 있어요. 삭제하기 전 확인 창에서 &quot;삭제 시 도매·소매 주문 처리 중 혼선이 생길 수 있습니다.&quot;와 &quot;삭제한 데이터는 복구할 수 없습니다.&quot; 안내를 보여줘요. 이미 들어온 주문은 주문 당시 정보 그대로 남아서 계속 처리할 수 있어요. 소매몰에서 보이던 상품 페이지만 사라져요.</p>"
    }
  ]
};

window.GUIDE_CONTENT['retail-product-category'] = {
  shots: [
    { device: 'pc', src: '../assets/img/partner/product-category-pc.webp', alt: '09SCM 상품카테고리 PC 화면', ratio: 1440 / 1500 },
    { device: 'mobile', src: '../assets/img/partner/product-category-mobile.webp', alt: '09SCM 상품카테고리 모바일 화면', ratio: 440 / 1200 }
  ],
  shotCaption: '09SCM 상품카테고리 화면 (PC / 모바일)',
  overview:
    '<p>소매몰 상품을 나누는 소매 카테고리를 만들고 관리하는 화면이에요. 카테고리는 1차와 2차 두 단계로 나눠요.</p>' +
    '<ul>' +
      '<li>소매 카테고리는 내 계정에서 직접 만들고 관리해요. 새로 시작한 가맹점은 카테고리가 하나도 없는 상태로 시작해요.</li>' +
      '<li>도매 카테고리와는 서로 분리되어 있어요. 이름이 같아도 연결되거나 함께 바뀌지 않아요. 도매 카테고리는 모든 계정이 같은 것을 쓰고, 고칠 수 없어요.</li>' +
      '<li>소매정보를 등록할 때 소매 카테고리 1차는 꼭 골라야 해요. 카테고리를 먼저 만들어두면 편해요.</li>' +
    '</ul>',
  steps:
    '<h3>카테고리 보기</h3>' +
    '<p>왼쪽에서 1차 카테고리를 누르면 오른쪽에 그 아래 2차 카테고리가 나와요. 각 카테고리 옆에는 <b>연동상품 N</b>이 표시돼요. 그 카테고리를 소매 카테고리로 정한 소매정보의 개수예요. 1차 카테고리의 연동상품 수는 아래 2차 카테고리의 합계예요.</p>' +

    '<h3>추가하기</h3>' +
    '<ol>' +
      '<li><b>추가 누르기</b> 1차 또는 2차 영역의 [+ 추가]를 눌러요. 2차 카테고리는 먼저 1차 카테고리를 선택해야 추가할 수 있어요.</li>' +
      '<li><b>이름 입력하기</b> 카테고리명을 입력해요. 비어 있으면 저장되지 않아요.</li>' +
      '<li><b>저장하기</b> [저장]을 누르면 목록에 추가돼요.</li>' +
    '</ol>' +

    '<h3>수정하기</h3>' +
    '<p>[수정]을 누르면 카테고리명을 고칠 수 있어요. [저장]으로 반영하거나 [취소]로 되돌려요.</p>' +

    '<h3>삭제하기</h3>' +
    '<ul>' +
      '<li>연동상품이 1건 이상인 카테고리는 [삭제]를 누를 수 없어요. 해당 상품들의 소매 카테고리를 먼저 다른 카테고리로 바꿔주세요.</li>' +
      '<li>삭제할 때는 확인 창이 나와요. 하위 2차 카테고리가 있는 1차 카테고리를 삭제하면 2차 카테고리도 함께 삭제된다는 안내가 보여요.</li>' +
      '<li>삭제한 카테고리는 복구할 수 없어요.</li>' +
    '</ul>' +

    '<h3>순서 바꾸기</h3>' +
    '<p>카테고리 왼쪽의 핸들을 잡고 끌어서 순서를 바꿔요. 1차끼리, 같은 1차 안의 2차끼리 바꿀 수 있어요. 바꾼 순서는 바로 반영되고, 소매정보 등록·수정 화면과 상품목록 필터의 카테고리 순서에도 그대로 쓰여요.</p>',
  cases:
    '<h3>아직 카테고리가 없어요</h3>' +
    '<p>1차 카테고리가 하나도 없으면 &quot;1차 카테고리를 먼저 등록해주세요.&quot;가 나와요. 1차 카테고리를 선택했는데 아래 2차 카테고리가 없으면 &quot;등록된 2차 카테고리가 없습니다.&quot;가 나와요.</p>' +

    '<h3>소매정보를 아직 등록하지 않은 상품이에요</h3>' +
    '<p>소매정보를 등록하기 전에는 소매 카테고리가 없는 상태라서, <a href="#retail-product-list">상품목록</a>의 카테고리가 &quot;-&quot;로 보이고 카테고리 필터 결과에도 나오지 않아요. 도매상품의 카테고리가 소매 카테고리로 자동 적용되지 않아요.</p>'
};

window.GUIDE_CONTENT['retail-product-display'] = {
  shots: [
    { device: 'pc', src: '../assets/img/partner/product-display-pc.webp', alt: '09SCM 메인상품진열 PC 화면', ratio: 1440 / 1500 },
    { device: 'mobile', src: '../assets/img/partner/product-display-mobile.webp', alt: '09SCM 메인상품진열 모바일 화면', ratio: 440 / 1200 }
  ],
  shotCaption: '09SCM 메인상품진열 화면 (PC / 모바일)',
  overview:
    '<p>소매몰 메인 화면에 보여줄 상품을 고르고, 보이는 순서를 정하는 화면이에요. 왼쪽 <b>전체 소매상품</b>에서 상품을 골라 오른쪽 <b>메인상품</b>으로 옮겨요.</p>' +
    '<p>소매몰에 노출 중인 상품만 목록에 나와요. 소매정보가 없거나 미노출인 상품은 나오지 않아요.</p>',
  steps:
    '<h3>상품 진열하기</h3>' +
    '<ol>' +
      '<li><b>상품 고르기</b> 전체 소매상품에서 진열할 상품의 [추가 →]를 눌러요.</li>' +
      '<li><b>순서 정하기</b> 메인상품 목록에서 상품 왼쪽 핸들을 잡고 끌어서 순서를 바꿔요. 위에 있는 상품이 소매몰 메인 화면에서 먼저 보여요.</li>' +
      '<li><b>저장하기</b> [저장]을 눌러야 소매몰에 반영돼요. 저장하지 않고 화면을 벗어나면 추가·제외·순서 변경이 모두 반영되지 않아요.</li>' +
    '</ol>' +

    '<h3>진열에서 빼기</h3>' +
    '<p>메인상품 목록에서 상품의 [← 제외]를 누르고 [저장]해요.</p>',
  cases:
    '<h3>진열 중인 상품이 미노출이 되면 자동으로 빠져요</h3>' +
    '<p>노출여부를 직접 미노출로 바꾸거나, 보유수량이 0이 되거나, 픽업가능 종료일이 지나서 미노출이 되면 진열에서 자동으로 빠져요. 다시 노출해도 진열에는 돌아오지 않아요. 직접 다시 추가해주세요. 소매정보나 상품을 삭제했을 때도 진열에서 빠져요.</p>' +

    '<h3>품절 상품은 어떻게 되나요</h3>' +
    '<p>품절이어도 소매몰에 노출 중이라면 목록에 나오고, 진열도 품절 상태로 유지돼요. 보유수량이 0이어서 미노출로 잠긴 상품은 목록에 나오지 않아요.</p>'
};

window.GUIDE_CONTENT['retail-order-list'] = {
  "screens": [
    {
      "id": "list-view",
      "label": "주문 목록 보기",
      "shots": [
        {
          "device": "pc",
          "src": "../assets/img/partner/order-list-pc.webp",
          "alt": "09SCM 주문목록 PC 화면",
          "ratio": 0.96
        },
        {
          "device": "mobile",
          "src": "../assets/img/partner/order-list-mobile.webp",
          "alt": "09SCM 주문목록 모바일 화면",
          "ratio": 0.3667
        }
      ],
      "shotCaption": "09SCM 주문목록 화면 (PC / 모바일)",
      "overview": "<p>소매몰에서 들어온 주문을 한곳에서 확인하고 처리하는 화면이에요. 링크주문과 채팅주문이 모두 이곳에 모이고, 접수된 뒤의 처리 방법은 두 경우 모두 같아요.</p><p>소매 주문은 내가 판매자이고 구매자는 소매몰 회원이라서, 도매관리처럼 구매자 화면과 공급자 화면이 나뉘지 않아요.</p><h3>수령방식별 처리 단계</h3><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>픽업 주문</td><td>주문접수 → 픽업대기 → 픽업완료</td></tr><tr><td>배달 주문</td><td>주문접수 → 배달대기 → 배달중 → 배달완료</td></tr></tbody></table></div><p>처리상태는 다음 단계 버튼으로 한 단계씩만 진행해요. 단계를 건너뛸 수 없어요. 처리 방법은 <a href=\"#retail-order-list/status\">처리상태 바꾸기</a>에서 확인해주세요.</p><p>주문이 접수되면 상품의 판매가능수량이 주문 수량만큼 바로 줄어요. 취소·반품을 승인할 때 수량을 되돌릴지는 <a href=\"#retail-order-list/cancel-return\">취소·반품 처리하기</a>에서 선택해요.</p>",
      "steps": "<h3>주문 찾기</h3><p>목록 위쪽에서 주문을 검색하고 조건별로 걸러낼 수 있어요.</p><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>필터</td><td>주문경로(링크주문, 채팅주문), 수령방식(픽업, 배달), 결제수단(카드결제, 계좌이체, 현장결제), 기간(주문일시 기준) 선택</td></tr><tr><td>검색</td><td>주문번호, 주문자명, 회원주문 코드, 상품명으로 검색 (영문 대소문자 구분 없음, 주문 상품 중 하나라도 일치하면 조회)</td></tr><tr><td>처리 탭</td><td>전체, 주문접수, 픽업·배달대기, 배달중, 픽업·배달완료, 취소·반품요청, 취소·반품승인 구분 (탭마다 건수 표시)</td></tr><tr><td>결제 탭</td><td>전체, 결제대기, 결제완료, 결제취소, 반려(취소반려·반품반려) 구분 (처리 탭을 고른 상태에서 함께 적용)</td></tr></tbody></table></div><p>목록은 한 페이지에 20건씩 보여줘요.</p><h3>목록에서 보이는 정보</h3><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>주문번호</td><td>주문마다 부여되는 번호</td></tr><tr><td>주문일시</td><td>주문이 접수된 일시</td></tr><tr><td>주문자</td><td>주문한 회원의 이름</td></tr><tr><td>회원주문 코드</td><td>회원을 구분하는 숫자 4자리 코드</td></tr><tr><td>상품정보</td><td>주문 상품 이름 (여러 상품이면 &quot;○○ 외 N건&quot;)</td></tr><tr><td>주문경로</td><td>링크주문, 채팅주문 구분</td></tr><tr><td>수령방식</td><td>픽업, 배달 구분</td></tr><tr><td>결제수단</td><td>카드결제, 계좌이체, 현장결제 구분</td></tr><tr><td>결제상태</td><td>[결제대기], [결제완료], [결제취소] 구분 (결제취소 주문은 전체환불·부분환불을 함께 표시)</td></tr><tr><td>처리상태</td><td>현재 처리 단계 (취소·반품이 진행 중이거나 끝난 주문은 &quot;-&quot;)</td></tr><tr><td>취소·반품</td><td>취소요청, 반품요청, 취소승인, 반품승인, 취소반려, 반품반려 중 현재 상태</td></tr><tr><td>합계금액</td><td>상품금액과 배달비를 더한 총 결제금액 (배달비는 배달 주문에만 해당)</td></tr><tr><td>관리</td><td>주문 상태에 따라 노출되는 버튼</td></tr></tbody></table></div><h3>여러 주문 한 번에 처리하기</h3><p>목록에서 주문을 체크하고 처리를 고른 뒤 [일괄변경]을 누르면 선택한 주문을 한꺼번에 다음 단계로 진행해요. 현재 페이지에서 선택한 주문만 대상이고, 페이지를 옮기면 선택이 풀려요.</p><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>픽업대기</td><td>픽업 주문 중 처리상태가 주문접수인 주문</td></tr><tr><td>배달대기</td><td>배달 주문 중 처리상태가 주문접수인 주문</td></tr><tr><td>배달중</td><td>배달 주문 중 처리상태가 배달대기인 주문</td></tr></tbody></table></div><p>조건에 맞지 않는 주문은 변경 없이 제외돼요. 완료 처리, 취소·반품 처리, 결제확인은 일괄변경으로 할 수 없고 주문마다 처리해요.</p>",
      "cases": [
        {
          "title": "처리상태에 따라 보이는 버튼이 달라져요",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-list-rows-process-pc.webp",
              "alt": "09SCM 주문목록 처리 버튼 PC 화면",
              "ratio": 1.2629
            }
          ],
          "shotCaption": "09SCM 주문목록 처리 버튼 화면 (PC)",
          "html": "<div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>픽업 · 주문접수</td><td>[픽업대기] [취소처리] [상세보기] (결제대기인 계좌이체 주문은 [결제확인]도 표시)</td></tr><tr><td>픽업 · 픽업대기</td><td>[픽업완료] [취소처리] [상세보기] [되돌리기] (결제대기 주문은 [결제·픽업완료])</td></tr><tr><td>배달 · 주문접수</td><td>[배달대기] [취소처리] [상세보기]</td></tr><tr><td>배달 · 배달대기</td><td>[배달중] [취소처리] [상세보기] [되돌리기]</td></tr><tr><td>배달 · 배달중</td><td>[배달완료] [취소처리] [상세보기] [되돌리기]</td></tr><tr><td>픽업완료 · 배달완료</td><td>[반품처리] [상세보기]</td></tr></tbody></table></div><p>목록의 [결제확인]은 주문접수 단계의 계좌이체 주문에만 보여요. 현장결제 주문과 픽업대기 단계의 결제대기 주문은 주문 상세에서 처리해요.</p>"
        },
        {
          "title": "취소·반품이 있는 주문은 이렇게 보여요",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-list-rows-claim-pc.webp",
              "alt": "09SCM 주문목록 취소·반품 PC 화면",
              "ratio": 2.8871
            }
          ],
          "shotCaption": "09SCM 주문목록 취소·반품 화면 (PC)",
          "html": "<div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>취소요청 · 반품요청</td><td>처리상태는 &quot;-&quot;로 비워지고 [취소처리] 또는 [반품처리]에서 승인·반려를 선택</td></tr><tr><td>취소승인 · 반품승인</td><td>처리가 끝난 주문, [상세보기]만 표시 (결제상태는 [결제취소]로 바뀌고 환불구분을 함께 표시)</td></tr><tr><td>취소반려 · 반품반려</td><td>처리상태가 요청 이전 상태로 돌아가 정상 처리 흐름에 다시 포함</td></tr><tr><td>구매자 즉시취소</td><td>소매몰 주문내역에서 구매자가 주문접수 단계의 카드결제·결제대기 주문을 직접 취소한 경우, 판매자 승인 없이 취소승인으로 처리</td></tr></tbody></table></div>"
        },
        {
          "title": "노쇼후보로 표시되는 주문",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-list-noshow-pc.webp",
              "alt": "09SCM 주문목록 노쇼후보 PC 화면",
              "ratio": 3.1161
            }
          ],
          "shotCaption": "09SCM 주문목록 노쇼후보 화면 (PC)",
          "html": "<p>픽업 주문 중 처리상태가 주문접수 또는 픽업대기인데 공통 픽업가능기간(주문한 상품들의 픽업가능기간이 겹치는 기간)이 지난 주문은 처리상태 아래에 <b>노쇼후보</b>가 표시돼요. 종료일 다음날 00:00에 판단하고, 소매몰 운영 계정으로 시스템 알림이 한 번 가요.</p><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>표시 방식</td><td>처리상태 값이 바뀌는 것이 아니라 경고 문구만 추가 (주문이 자동으로 취소되지 않음)</td></tr><tr><td>계속 처리</td><td>다음 단계 버튼으로 정상 처리를 이어갈 수 있음 (픽업완료가 되면 표시 해제)</td></tr><tr><td>노쇼 처리</td><td>실제 노쇼인지 확인한 뒤 [취소처리]에서 처리 주체를 노쇼처리로 선택</td></tr><tr><td>배달 주문</td><td>공통 픽업가능기간이 없어 해당 없음</td></tr></tbody></table></div><p>노쇼 처리 방법은 <a href=\"#retail-order-list/cancel-return\">취소·반품 처리하기</a>에서 확인해주세요.</p>"
        },
        {
          "title": "주문을 고르지 않고 [일괄변경]을 누르면",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-bulk-none-pc.webp",
              "alt": "09SCM 일괄변경 주문 미선택 안내 PC 화면",
              "ratio": 2.5208
            }
          ],
          "shotCaption": "09SCM 일괄변경 안내 화면 (PC)",
          "html": "<p>&quot;일괄 변경할 주문을 선택해주세요.&quot; 안내가 나와요.</p>"
        },
        {
          "title": "처리를 고르지 않고 [일괄변경]을 누르면",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-bulk-noopt-pc.webp",
              "alt": "09SCM 일괄변경 처리 미선택 안내 PC 화면",
              "ratio": 2.5208
            }
          ],
          "shotCaption": "09SCM 일괄변경 안내 화면 (PC)",
          "html": "<p>주문은 골랐지만 처리를 고르지 않으면 &quot;변경할 처리 상태를 선택해주세요.&quot; 안내가 나와요.</p>"
        },
        {
          "title": "선택한 주문이 모두 변경 가능하면",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-bulk-all-pc.webp",
              "alt": "09SCM 일괄변경 전체 변경 안내 PC 화면",
              "ratio": 2.0167
            }
          ],
          "shotCaption": "09SCM 일괄변경 안내 화면 (PC)",
          "html": "<p>선택한 건수와 처리를 보여주고 [진행]을 누르면 모두 변경돼요. 고객 알림톡이 설정된 경우 알림톡이 발송될 수 있어요. 처리가 끝나면 선택이 풀리고 처리 건수를 알려줘요.</p>"
        },
        {
          "title": "선택한 주문 중 일부만 변경 가능하면",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-bulk-part-pc.webp",
              "alt": "09SCM 일괄변경 일부 변경 안내 PC 화면",
              "ratio": 2.0167
            }
          ],
          "shotCaption": "09SCM 일괄변경 안내 화면 (PC)",
          "html": "<p>&quot;선택한 2건 중 1건만 처리됩니다&quot;처럼 변경 가능한 건수만 알려줘요. [진행]을 누르면 조건에 맞는 주문만 변경하고 나머지는 그대로 둬요.</p>"
        },
        {
          "title": "선택한 주문을 하나도 변경할 수 없으면",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-bulk-fail-pc.webp",
              "alt": "09SCM 일괄변경 변경 불가 안내 PC 화면",
              "ratio": 2.5208
            }
          ],
          "shotCaption": "09SCM 일괄변경 안내 화면 (PC)",
          "html": "<p>&quot;선택한 주문은 처리할 수 없습니다.&quot; 안내가 나오고 아무것도 변경되지 않아요.</p>"
        }
      ],
      "trouble": "<h3>[결제확인]이 목록에 안 보여요</h3><p>목록에서는 주문접수 단계의 계좌이체 주문에만 보여요. 현장결제 주문과 픽업대기 단계의 결제대기 주문은 주문 상세에서 결제확인 또는 [결제·픽업완료]로 처리해요.</p><h3>일괄변경으로 완료 처리나 취소 처리가 안 돼요</h3><p>완료 처리와 취소·반품 처리는 확인과 입력이 필요해서 주문마다 처리해야 해요.</p><h3>처리상태가 &quot;-&quot;로 보여요</h3><p>취소·반품이 진행 중이거나 끝난 주문이에요. 취소·반품 상태는 취소·반품 열에서 확인해요.</p>"
    },
    {
      "id": "detail",
      "label": "주문 상세 보기",
      "shots": [
        {
          "device": "pc",
          "src": "../assets/img/partner/order-detail-pc.webp",
          "alt": "09SCM 주문상세 PC 화면",
          "ratio": 0.96
        },
        {
          "device": "mobile",
          "src": "../assets/img/partner/order-detail-mobile.webp",
          "alt": "09SCM 주문상세 모바일 화면",
          "ratio": 0.2269
        }
      ],
      "shotCaption": "09SCM 주문상세 화면 (PC / 모바일)",
      "overview": "<p>주문 한 건의 상품, 주문자, 수령 정보, 결제 정보를 모두 확인하고 처리하는 화면이에요. 목록에서 [상세보기]를 누르면 열려요.</p><p>처리 버튼은 화면 아래에 고정된 영역에 있고, 목록과 같은 조건으로 보여요. 상세에서는 [결제확인]도 처리할 수 있어요.</p>",
      "steps": "<h3>주문상품</h3><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>상품명</td><td>주문한 상품 이름</td></tr><tr><td>픽업가능기간</td><td>상품별 픽업 가능 기간 (픽업 주문만 표시)</td></tr><tr><td>구매가</td><td>주문 당시 상품 가격</td></tr><tr><td>수량</td><td>주문한 수량</td></tr><tr><td>소계</td><td>구매가 × 수량</td></tr></tbody></table></div><h3>주문정보</h3><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>주문번호 · 주문일시</td><td>주문 번호와 접수 일시</td></tr><tr><td>주문경로</td><td>링크주문, 채팅주문 구분</td></tr><tr><td>수령방식</td><td>픽업, 배달 구분</td></tr></tbody></table></div><h3>주문자정보</h3><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>주문자명 · 휴대폰번호 · 채팅주문 닉네임</td><td>주문한 시점의 정보</td></tr><tr><td>회원주문 코드</td><td>회원을 구분하는 숫자 4자리 코드</td></tr></tbody></table></div><p>이후에 회원정보를 고쳐도 이미 접수된 주문의 주문자명, 휴대폰번호, 닉네임은 바뀌지 않아요. 회원주문 코드와 닉네임은 링크주문 주문자에게도 똑같이 표시돼요.</p><h3>픽업정보 · 배달정보</h3><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>처리상태</td><td>현재 처리 단계와 처리 일시 (노쇼후보 주문은 단계 옆에 함께 표시, 완료 주문은 반품요청 가능 기한도 함께 표시, 취소·반품이 진행 중이거나 끝난 주문은 표시하지 않음)</td></tr><tr><td>공통 픽업가능기간</td><td>주문한 상품들의 픽업가능기간이 겹치는 기간 (픽업 주문만)</td></tr><tr><td>배달지</td><td>주문할 때 구매자가 입력한 배달지 (배달 주문만)</td></tr><tr><td>요청사항</td><td>주문할 때 구매자가 남긴 요청</td></tr></tbody></table></div><p>수령방식에 따라 제목과 항목이 달라져요. 배달지와 요청사항은 주문할 때 입력한 값이라서, 이후 회원이 배송지를 바꾸거나 지워도 이미 접수된 주문에는 영향이 없어요.</p><h3>결제정보</h3><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>결제상태</td><td>[결제대기], [결제완료]와 결제 일시 (결제취소는 환불구분, 취소 일시, 결제완료 일시를 함께 표시)</td></tr><tr><td>결제수단</td><td>카드결제, 계좌이체, 현장결제</td></tr><tr><td>입금자명</td><td>계좌이체 주문에만 표시</td></tr><tr><td>상품금액</td><td>주문 상품 소계의 합계</td></tr><tr><td>배달비</td><td>배달 주문에만 표시 (0원이어도 표시)</td></tr><tr><td>총 결제금액</td><td>상품금액과 배달비를 더한 금액</td></tr></tbody></table></div><h3>취소·반품 정보</h3><p>취소·반품 이력이 있는 주문에만 보이는 조회 전용 영역이에요.</p><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>처리상태</td><td>현재 상태와 해당 일시 (최근 1건)</td></tr><tr><td>처리 주체</td><td>구매자 요청, 공급자 직권, 노쇼 처리, 구매자 즉시취소 구분</td></tr><tr><td>환불구분 · 총환불금액</td><td>승인으로 확정된 주문에만 표시</td></tr><tr><td>환불은행 · 예금주 · 환불계좌번호</td><td>계좌이체로 결제한 이력이 있는 주문에만 표시</td></tr><tr><td>구매자 요청 사유</td><td>구매자가 취소·반품을 요청하며 입력한 사유 (구매자 요청 건만 표시)</td></tr><tr><td>공급자 처리 사유</td><td>판매자가 처리하며 입력한 사유 (입력한 건만 표시)</td></tr></tbody></table></div>",
      "cases": [
        {
          "title": "배달 주문은 배달정보와 배달비가 보여요",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-detail-delivery-pc.webp",
              "alt": "09SCM 배달 주문상세 PC 화면",
              "ratio": 0.96
            },
            {
              "device": "mobile",
              "src": "../assets/img/partner/order-detail-delivery-mobile.webp",
              "alt": "09SCM 배달 주문상세 모바일 화면",
              "ratio": 0.2489
            }
          ],
          "shotCaption": "09SCM 배달 주문상세 화면 (PC / 모바일)",
          "html": "<p>상품 표에 픽업가능기간이 없고, 픽업정보 대신 배달정보와 배달지가 보여요. 결제정보에는 배달비가 따로 표시돼요. 배달 주문은 항상 카드결제이고 결제완료 상태로 접수돼요.</p>"
        },
        {
          "title": "결제대기 주문은 [결제확인]이 보여요",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-detail-unpaid-pc.webp",
              "alt": "09SCM 결제대기 주문상세 PC 화면",
              "ratio": 0.96
            },
            {
              "device": "mobile",
              "src": "../assets/img/partner/order-detail-unpaid-mobile.webp",
              "alt": "09SCM 결제대기 주문상세 모바일 화면",
              "ratio": 0.2202
            }
          ],
          "shotCaption": "09SCM 결제대기 주문상세 화면 (PC / 모바일)",
          "html": "<p>계좌이체 주문이 입금 전이거나 현장결제 주문이면 결제상태가 [결제대기]이고, 아래에 [결제확인]이 보여요.</p><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>[결제확인]</td><td>결제상태만 [결제완료]로 바뀌고 처리상태는 그대로</td></tr><tr><td>완료 처리</td><td>결제대기인 채로 완료하면 결제도 함께 [결제완료]로 바뀜 (버튼 이름은 [결제·픽업완료])</td></tr><tr><td>현장결제</td><td>픽업할 때 결제하는 방식이라 항상 [결제대기]로 접수</td></tr><tr><td>카드결제</td><td>주문과 동시에 [결제완료]로 접수</td></tr></tbody></table></div>"
        },
        {
          "title": "노쇼후보 주문은 안내 문구가 함께 보여요",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-detail-noshow-pc.webp",
              "alt": "09SCM 노쇼후보 주문상세 PC 화면",
              "ratio": 0.96
            },
            {
              "device": "mobile",
              "src": "../assets/img/partner/order-detail-noshow-mobile.webp",
              "alt": "09SCM 노쇼후보 주문상세 모바일 화면",
              "ratio": 0.2389
            }
          ],
          "shotCaption": "09SCM 노쇼후보 주문상세 화면 (PC / 모바일)",
          "html": "<p>픽업정보 위에 공통 픽업가능기간이 지났다는 안내가 보이고, 처리상태 옆에 <b>노쇼후보</b>가 표시돼요. 노쇼인지 확인한 뒤 [취소처리]에서 처리 주체를 노쇼처리로 선택해요. 아직 처리할 수 있는 주문이라 다음 단계 버튼도 그대로 보여요.</p>"
        },
        {
          "title": "취소·반품 요청이 들어온 주문",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-detail-claim-pc.webp",
              "alt": "09SCM 취소요청 주문상세 PC 화면",
              "ratio": 0.8961
            },
            {
              "device": "mobile",
              "src": "../assets/img/partner/order-detail-claim-mobile.webp",
              "alt": "09SCM 취소요청 주문상세 모바일 화면",
              "ratio": 0.1981
            }
          ],
          "shotCaption": "09SCM 취소요청 주문상세 화면 (PC / 모바일)",
          "html": "<p>취소·반품 정보 영역이 나타나고, 구매자가 남긴 요청 사유와 환불계좌를 볼 수 있어요. 처리상태는 &quot;-&quot;로 비워지고 다음단계·되돌리기 버튼 대신 [취소처리] 또는 [반품처리]만 보여요. 요청이 들어온 주문에는 [결제확인]이 보이지 않아요.</p>"
        },
        {
          "title": "처리가 끝난 주문",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-detail-done-pc.webp",
              "alt": "09SCM 처리 완료 주문상세 PC 화면",
              "ratio": 0.96
            },
            {
              "device": "mobile",
              "src": "../assets/img/partner/order-detail-done-mobile.webp",
              "alt": "09SCM 처리 완료 주문상세 모바일 화면",
              "ratio": 0.2101
            }
          ],
          "shotCaption": "09SCM 처리 완료 주문상세 화면 (PC / 모바일)",
          "html": "<p>취소·반품이 승인된 주문은 결제상태가 [결제취소]로 바뀌고, 환불구분과 처리 일시, 결제완료 일시가 함께 표시돼요. 아래에는 &quot;처리 완료된 주문입니다.&quot; 안내만 있고 처리 버튼은 없어요.</p>"
        }
      ]
    },
    {
      "id": "status",
      "label": "처리상태 바꾸기",
      "shots": [
        {
          "device": "pc",
          "src": "../assets/img/partner/order-confirm-pickup-pc.webp",
          "alt": "09SCM 픽업완료 확인 PC 화면",
          "ratio": 2.1228
        }
      ],
      "shotCaption": "09SCM 픽업완료 확인 화면 (PC)",
      "overview": "<p>주문을 다음 단계로 진행하는 방법이에요. 주문목록과 주문 상세에서 같은 버튼으로 처리해요.</p><p>완료 처리(픽업완료·배달완료)는 직전 단계에서만 할 수 있고, 확인 창에서 한 번 더 확인해요.</p>",
      "steps": "<h3>버튼별 동작</h3><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>다음단계 버튼</td><td>[픽업대기], [배달대기], [배달중]을 누르면 확인 창 없이 바로 다음 단계로 진행</td></tr><tr><td>완료 버튼</td><td>[픽업완료], [배달완료]는 직전 단계(픽업대기, 배달중)일 때만 표시, 확인 창에서 [픽업완료] 또는 [배달완료]를 눌러야 처리</td></tr><tr><td>[결제확인]</td><td>결제상태만 [결제완료]로 바꾸고 처리상태는 그대로</td></tr><tr><td>[되돌리기]</td><td>바로 직전 단계로 돌아감 (확인 창 없이 바로 반영)</td></tr><tr><td>[일괄변경]</td><td>목록에서 여러 주문을 한 번에 다음 단계로 진행</td></tr></tbody></table></div><h3>되돌릴 수 있는 단계</h3><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>픽업대기</td><td>주문접수로 돌아감</td></tr><tr><td>배달대기</td><td>주문접수로 돌아감</td></tr><tr><td>배달중</td><td>배달대기로 돌아감</td></tr><tr><td>되돌릴 수 없는 경우</td><td>주문접수 단계, 완료 이후, 취소·반품요청 및 승인 상태</td></tr></tbody></table></div><p>완료한 주문은 [반품처리]만 할 수 있어요. 취소·반품이 진행 중이거나 끝난 주문은 처리상태가 비워져서 다음단계·되돌리기 버튼이 보이지 않아요.</p><h3>완료 후 반품요청 기한</h3><p>픽업완료·배달완료로 처리한 일시부터 7일 이내에만 구매자가 반품을 요청할 수 있어요. 취소·반품 이력이 없는 완료 주문은 <a href=\"#retail-order-list/detail\">주문 상세</a>의 처리상태에서 반품요청 가능 기한을 확인할 수 있어요.</p>",
      "cases": [
        {
          "title": "결제대기 주문을 완료할 때",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-confirm-paypickup-pc.webp",
              "alt": "09SCM 결제·픽업완료 확인 PC 화면",
              "ratio": 1.9055
            }
          ],
          "shotCaption": "09SCM 결제·픽업완료 확인 화면 (PC)",
          "html": "<p>픽업대기 단계에서 결제상태가 [결제대기]인 주문은 완료 버튼 이름이 [결제·픽업완료]로 바뀌어요. 확인 창에 &quot;결제대기 상태인 경우 결제도 함께 완료 처리됩니다.&quot; 안내가 함께 나오고, 처리하면 결제상태도 [결제완료]로 바뀌어요.</p>"
        }
      ]
    },
    {
      "id": "cancel-return",
      "label": "취소·반품 처리하기",
      "shots": [
        {
          "device": "pc",
          "src": "../assets/img/partner/order-cancel-pc.webp",
          "alt": "09SCM 취소처리 PC 화면",
          "ratio": 0.5378
        },
        {
          "device": "mobile",
          "src": "../assets/img/partner/order-cancel-mobile.webp",
          "alt": "09SCM 취소처리 모바일 화면",
          "ratio": 0.428
        }
      ],
      "shotCaption": "09SCM 취소처리 화면 (PC / 모바일)",
      "overview": "<p>주문을 취소하거나 반품을 처리하는 팝업이에요. 주문목록과 주문 상세의 [취소처리], [반품처리]로 열어요.</p><h3>취소·반품이 가능한 때</h3><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>취소처리</td><td>완료(픽업완료·배달완료) 전에는 어느 단계에서든 판매자가 바로 처리 가능</td></tr><tr><td>반품처리</td><td>완료 이후에만 가능 (기한 제한 없음)</td></tr><tr><td>구매자 요청</td><td>구매자는 소매몰 주문내역에서만 요청 (취소요청은 주문접수 단계, 반품요청은 완료 후 7일 이내)</td></tr></tbody></table></div><p>카드결제 주문과 결제대기 주문은 구매자가 주문접수 단계에서 직접 취소하면 판매자 승인 없이 바로 취소돼요. 이 경우 판매자가 처리할 내용은 없어요.</p><h3>처리 주체</h3><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>구매자 요청</td><td>이미 취소요청·반품요청이 들어온 주문 (승인 또는 반려 선택)</td></tr><tr><td>공급자 직권</td><td>요청 없이 판매자가 바로 처리 (제출하면 바로 취소승인·반품승인으로 확정)</td></tr><tr><td>노쇼 처리</td><td>노쇼후보 주문의 취소처리에서 선택</td></tr><tr><td>구매자 즉시취소</td><td>구매자가 소매몰에서 직접 취소 (판매자 처리 없음)</td></tr></tbody></table></div>",
      "steps": "<h3>입력 항목</h3><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>처리 주체 · 수령방식 · 결제수단 · 결제상태</td><td>주문 정보 조회 (노쇼후보 주문은 처리 주체를 공급자 직권취소 또는 노쇼처리 중에서 선택)</td></tr><tr><td>처리 방식</td><td>승인, 반려 선택 (구매자 요청 주문만 표시, 기본값은 승인)</td></tr><tr><td>상품금액 · 배달비 · 총 결제금액</td><td>결제 금액 조회 (배달비는 배달 주문만 표시)</td></tr><tr><td>환불구분</td><td>전체환불, 부분환불 선택 (카드결제는 전체환불로 고정)</td></tr><tr><td>총환불금액</td><td>전체환불은 총 결제금액으로 고정, 부분환불은 직접 입력 (0원 초과 총 결제금액 이하)</td></tr><tr><td>환불은행 · 예금주 · 환불계좌번호</td><td>환불받을 계좌 (계좌이체 주문만, 입력 필수 아님)</td></tr><tr><td>구매자 요청 사유</td><td>구매자가 요청하며 입력한 사유 조회 (구매자 요청 건만 표시)</td></tr><tr><td>공급자 처리 사유</td><td>판매자가 처리하며 남기는 사유 (직접 입력)</td></tr><tr><td>재고 반영</td><td>체크하면 이 주문의 전체 품목 수량만큼 판매가능수량과 보유수량을 되돌림 (기본 체크)</td></tr></tbody></table></div><p>품목별 취소·반품은 아직 제공하지 않아요. 한 주문에 품목이 여러 개여도 주문 전체가 한 번에 처리되고, 재고 반영도 전체 품목에 함께 적용돼요.</p><h3>결제수단별 환불</h3><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>카드결제</td><td>승인하면 PG사를 통해 자동으로 결제취소 (결제취소가 실패하면 승인이 확정되지 않고 요청 상태 그대로 남으니 다시 시도)</td></tr><tr><td>계좌이체</td><td>승인하면 결제취소로 바뀌고 환불은 판매자가 직접 진행 (환불계좌를 입력해두면 구매자 확인에 도움)</td></tr><tr><td>현장결제</td><td>승인하면 결제취소로 바뀌고 현장에서 직접 환불</td></tr></tbody></table></div><p>결제취소는 취소 처리가 확정됐다는 표시예요. 계좌이체와 현장결제는 실제 환불을 판매자가 직접 따로 진행해야 해요.</p><h3>처리하면 이렇게 돼요</h3><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>승인</td><td>취소승인 또는 반품승인으로 확정되고 처리상태가 비워져 취소·반품승인 탭으로 이동, 결제상태는 [결제취소]</td></tr><tr><td>반려</td><td>취소·반품 상태는 반려로 남고 처리상태가 요청 이전 상태로 돌아감</td></tr><tr><td>금액 반영</td><td>승인으로 확정된 총환불금액이 소매매출조회의 취소·환불액에 반영</td></tr></tbody></table></div>",
      "cases": [
        {
          "title": "노쇼후보 주문을 취소할 때",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-cancel-noshow-pc.webp",
              "alt": "09SCM 노쇼처리 PC 화면",
              "ratio": 0.6846
            },
            {
              "device": "mobile",
              "src": "../assets/img/partner/order-cancel-noshow-mobile.webp",
              "alt": "09SCM 노쇼처리 모바일 화면",
              "ratio": 0.5707
            }
          ],
          "shotCaption": "09SCM 노쇼처리 화면 (PC / 모바일)",
          "html": "<p>처리 주체에 공급자 직권취소와 노쇼처리가 나타나고, 기본 선택 없이 반드시 하나를 골라야 해요. 고르기 전에는 처리 버튼이 비활성이에요.</p><div class=\"table-wrap\"><table><thead><tr><th>항목</th><th>설명</th></tr></thead><tbody><tr><td>노쇼처리</td><td>취소승인으로 처리되고 처리 주체가 노쇼 처리로 남아 회원의 노쇼 이력 건수에 집계</td></tr><tr><td>공급자 직권취소</td><td>일반 취소와 같게 공급자 직권으로 처리 (노쇼 이력에 집계되지 않음)</td></tr></tbody></table></div>"
        },
        {
          "title": "결제대기 주문을 취소할 때",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-cancel-unpaid-pc.webp",
              "alt": "09SCM 결제대기 주문 취소 PC 화면",
              "ratio": 0.7527
            },
            {
              "device": "mobile",
              "src": "../assets/img/partner/order-cancel-unpaid-mobile.webp",
              "alt": "09SCM 결제대기 주문 취소 모바일 화면",
              "ratio": 0.5707
            }
          ],
          "shotCaption": "09SCM 결제대기 주문 취소 화면 (PC / 모바일)",
          "html": "<p>결제된 금액이 없어서 금액과 환불 항목 없이 &quot;결제 대기 중인 주문으로 환불은 진행되지 않습니다.&quot; 안내만 나와요. 처리하면 환불 없이 결제상태만 [결제취소]로 바뀌어요. 결제대기 상태로 취소된 주문은 소매매출조회에 집계되지 않아요.</p>"
        },
        {
          "title": "구매자의 취소요청을 처리할 때",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-cancel-request-pc.webp",
              "alt": "09SCM 취소요청 처리 PC 화면",
              "ratio": 0.4155
            },
            {
              "device": "mobile",
              "src": "../assets/img/partner/order-cancel-request-mobile.webp",
              "alt": "09SCM 취소요청 처리 모바일 화면",
              "ratio": 0.3202
            }
          ],
          "shotCaption": "09SCM 취소요청 처리 화면 (PC / 모바일)",
          "html": "<p>처리 방식에서 승인을 고르면 금액, 환불, 재고 반영 항목이 나와요. 구매자가 남긴 요청 사유를 확인하고 필요하면 공급자 처리 사유를 입력해요. 계좌이체 주문은 환불계좌를 입력하거나 확인해요.</p>"
        },
        {
          "title": "부분환불을 입력할 때",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-cancel-partial-pc.webp",
              "alt": "09SCM 부분환불 입력 PC 화면",
              "ratio": 0.4155
            },
            {
              "device": "mobile",
              "src": "../assets/img/partner/order-cancel-partial-mobile.webp",
              "alt": "09SCM 부분환불 입력 모바일 화면",
              "ratio": 0.3202
            }
          ],
          "shotCaption": "09SCM 부분환불 입력 화면 (PC / 모바일)",
          "html": "<p>계좌이체와 현장결제 주문은 환불구분에서 부분환불을 고를 수 있어요. 총환불금액은 0원보다 크고 총 결제금액 이하로만 입력할 수 있어요. 0원이면 처리 버튼이 비활성이 되고 &quot;환불금액을 입력해주세요.&quot; 안내가 나와요.</p><p>카드결제는 전체환불만 가능해요. 환불구분이 전체환불로 고정되어 총 결제금액 전체가 환불돼요.</p>"
        },
        {
          "title": "취소요청을 반려할 때",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-cancel-reject-pc.webp",
              "alt": "09SCM 취소요청 반려 PC 화면",
              "ratio": 0.7806
            },
            {
              "device": "mobile",
              "src": "../assets/img/partner/order-cancel-reject-mobile.webp",
              "alt": "09SCM 취소요청 반려 모바일 화면",
              "ratio": 0.5882
            }
          ],
          "shotCaption": "09SCM 취소요청 반려 화면 (PC / 모바일)",
          "html": "<p>처리 방식에서 반려를 고르면 금액, 환불, 재고 반영 항목이 사라지고 공급자 처리 사유만 남아요. 반려하면 주문은 요청 이전 처리상태로 돌아가 정상 처리를 이어갈 수 있어요.</p>"
        },
        {
          "title": "완료된 주문을 반품 처리할 때",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-return-pc.webp",
              "alt": "09SCM 반품처리 PC 화면",
              "ratio": 0.5378
            },
            {
              "device": "mobile",
              "src": "../assets/img/partner/order-return-mobile.webp",
              "alt": "09SCM 반품처리 모바일 화면",
              "ratio": 0.428
            }
          ],
          "shotCaption": "09SCM 반품처리 화면 (PC / 모바일)",
          "html": "<p>픽업완료·배달완료 이후 주문은 [반품처리]로 열어요. 입력 항목은 취소처리와 같고 제목만 반품처리로 바뀌어요. 판매자 직권 반품은 완료 후 7일이 지나도 처리할 수 있어요.</p>"
        },
        {
          "title": "구매자의 반품요청을 처리할 때",
          "shots": [
            {
              "device": "pc",
              "src": "../assets/img/partner/order-return-request-pc.webp",
              "alt": "09SCM 반품요청 처리 PC 화면",
              "ratio": 0.4778
            },
            {
              "device": "mobile",
              "src": "../assets/img/partner/order-return-request-mobile.webp",
              "alt": "09SCM 반품요청 처리 모바일 화면",
              "ratio": 0.3856
            }
          ],
          "shotCaption": "09SCM 반품요청 처리 화면 (PC / 모바일)",
          "html": "<p>구매자가 남긴 반품 사유가 함께 보이고, 처리 방식에서 승인 또는 반려를 골라요. 승인하면 반품승인으로 확정되고, 반려하면 완료 상태로 돌아가요.</p>"
        }
      ]
    }
  ]
};

window.GUIDE_CONTENT['retail-order-chat'] = {
  screens: [
    {
      id: 'chat-link',
      label: '오픈채팅방 연동',
      shots: [
        { device: 'pc', src: '../assets/img/partner/chat-link-pc.webp', alt: '09SCM 채팅주문설정 오픈채팅방 연동 PC 화면', ratio: 4.6154 },
        { device: 'mobile', src: '../assets/img/partner/chat-link-mobile.webp', alt: '09SCM 채팅주문설정 오픈채팅방 연동 모바일 화면', ratio: 1.4103 }
      ],
      shotCaption: '09SCM 채팅주문설정 오픈채팅방 연동 (PC / 모바일)',
      overview:
        '<p>손님이 오픈채팅방에 정해진 형식으로 메시지를 보내면 자동으로 주문이 접수돼요. 이 화면에서 오픈채팅방을 연결하고, 자동으로 접수되지 않은 메시지를 처리해요.</p>' +
        '<ul>' +
          '<li>채팅주문은 항상 픽업·현장결제로 접수되고, 결제대기·주문접수 상태로 시작해요.</li>' +
          '<li>한 메시지에 상품을 여러 개 적어도 상품마다 개별 주문(개별 주문번호)으로 접수돼요.</li>' +
          '<li>접수 형식, 회원 확인 방식, 손님에게 가는 안내 문구는 정해져 있어서 이 화면에서 바꿀 수 없어요.</li>' +
          '<li>채팅으로는 주문 접수만 받아요. 취소·반품은 링크주문과 같이 소매몰 주문내역에서 해요.</li>' +
        '</ul>',
      steps:
        '<h3>채팅주문 시작하기</h3>' +
        '<p>채팅주문을 운영하려면 아래 세 가지를 모두 설정해야 해요.</p>' +
        '<ol>' +
          '<li><b>오픈채팅방 연결하기</b> 이 화면의 오픈채팅방 초대링크에 링크를 입력하고 [연동]을 눌러요. 눌러야 저장돼요.</li>' +
          '<li><b>상품에 채팅주문 허용하기</b> <a href="#retail-product-list">상품목록</a>의 소매정보 등록·수정에서 &quot;채팅주문 허용&quot;을 체크하고 채팅주문상품명을 입력해요. 배달 전용 상품은 채팅주문을 허용할 수 없어요.</li>' +
          '<li><b>회원에게 코드·닉네임 등록하기</b> <a href="#retail-member">회원관리</a>의 회원정보 상세에서 회원주문 코드(숫자 4자리)와 채팅주문 닉네임(오픈채팅방에서 쓰는 닉네임)을 등록해요.</li>' +
        '</ol>' +

        '<h3>연동상태</h3>' +
        '<div class="table-wrap"><table><thead><tr><th>상태</th><th>기준</th></tr></thead><tbody>' +
          '<tr><td>연결됨</td><td>초대링크가 저장되어 있음</td></tr>' +
          '<tr><td>미연결</td><td>초대링크가 비어 있음</td></tr>' +
        '</tbody></table></div>' +

        '<h3>손님이 보내는 메시지 형식</h3>' +
        '<p>손님은 오픈채팅방에 아래 형식으로 메시지를 보내요.</p>' +
        '<ul>' +
          '<li><b>형식</b> 상품명 수량, 상품명 수량, … 회원주문 코드 4자리</li>' +
          '<li><b>예시</b> 햇사과 2개, 레몬 1개 1234 (쉼표 대신 줄바꿈으로 나눠도 돼요)</li>' +
          '<li>상품명은 몰에 보이는 상품명이 아니라 상품에 지정한 채팅주문상품명으로 적어야 해요. 현재 판매중이고 소매몰에 노출 중인 상품만 인식돼요.</li>' +
          '<li>같은 상품을 여러 번 적으면 수량을 합쳐 주문 1건으로 접수돼요. 1회 최대구매수량도 합친 수량으로 확인해요.</li>' +
        '</ul>',
      cases: [
        {
          title: '메시지가 어떻게 분류되나요',
          html:
            '<p>메시지를 받으면 시스템이 아래 순서로 확인해요. 앞 단계에서 걸리면 뒤 단계는 확인하지 않아요.</p>' +
            '<ol>' +
              '<li><b>형식과 상품명</b> 정해진 형식인지, 적힌 상품명이 모두 현재 판매중이고 소매몰에 노출 중인 채팅주문 허용 상품(채팅주문상품명)과 일치하는지 확인해요.</li>' +
              '<li><b>회원 확인</b> 메시지 끝의 코드로 회원을 찾고, 보낸 사람의 채팅방 닉네임이 등록된 채팅주문 닉네임과 같은지 확인해요. 코드와 닉네임이 모두 맞아야 본인으로 인정돼요.</li>' +
              '<li><b>회원 상태</b> 찾은 회원이 이용제한 상태인지, 닉네임이 등록되어 있는지 확인해요.</li>' +
              '<li><b>상품별 한도</b> 상품마다 판매가능수량과 1회 최대구매수량 안에 들어오는지 확인해요.</li>' +
            '</ol>' +

            '<p><b>1. 정상 처리돼요</b></p>' +
            '<div class="table-wrap"><table class="wide"><thead><tr><th>조건</th><th>처리</th><th class="c">손님 안내</th></tr></thead><tbody>' +
              '<tr><td>형식과 상품명이 모두 맞고, 코드·닉네임이 일치하고, 이용제한이 아니며, 모든 상품이 한도 이내</td><td>상품마다 개별 주문 생성</td><td class="c">접수 안내 발송</td></tr>' +
              '<tr><td>위 조건에서 일부 상품만 판매가능수량 부족 또는 1회 최대구매수량 초과</td><td>한도 이내인 상품만 주문 생성, 나머지는 미접수</td><td class="c">접수분과 미접수 사유 발송</td></tr>' +
            '</tbody></table></div>' +

            '<p><b>2. 매칭 실패 건에 쌓여요</b></p>' +
            '<div class="table-wrap"><table class="wide"><thead><tr><th>조건</th><th>처리</th><th class="c">손님 안내</th></tr></thead><tbody>' +
              '<tr><td>형식과 상품명은 맞지만 코드와 일치하는 회원이 없음</td><td>매칭 실패 건에 대기</td><td class="c">발송 안 함</td></tr>' +
              '<tr><td>형식과 상품명은 맞고 코드로 회원이 조회되지만, 보낸 사람의 닉네임이 등록된 닉네임과 다름 (이용제한 회원이면 해당 없음)</td><td>매칭 실패 건에 대기</td><td class="c">발송 안 함</td></tr>' +
            '</tbody></table></div>' +
            '<p>사장님이 <a href="#chat-fail">매칭 실패 건 처리</a>에서 회원을 직접 확인해 매칭하거나 삭제해요. 매칭으로 주문이 접수되면 그때 접수 안내가 발송돼요.</p>' +

            '<p><b>3. 접수되지 않아요</b></p>' +
            '<p>주문이 만들어지지 않고 매칭 실패 건에도 쌓이지 않아요. 손님 안내가 가는 경우와 가지 않는 경우로 나뉘어요.</p>' +
            '<div class="table-wrap"><table class="wide"><thead><tr><th>조건</th><th>처리</th><th class="c">손님 안내</th></tr></thead><tbody>' +
              '<tr><td>코드로 조회된 회원이 이용제한 상태 (닉네임이 일치·불일치·미등록이어도 동일)</td><td>주문 미생성</td><td class="c">이용제한 안내 발송</td></tr>' +
              '<tr><td>코드로 조회된 회원에 등록된 닉네임이 없음</td><td>주문 미생성</td><td class="c">닉네임 등록 안내 발송</td></tr>' +
              '<tr><td>모든 상품이 판매가능수량 부족</td><td>주문 미생성</td><td class="c">재고 부족 안내 발송</td></tr>' +
              '<tr><td>모든 상품이 1회 최대구매수량 초과</td><td>주문 미생성</td><td class="c">최대구매수량 안내 발송</td></tr>' +
              '<tr><td>정해진 형식이 아닌 메시지</td><td>아무 기록도 남지 않음</td><td class="c">발송 안 함</td></tr>' +
              '<tr><td>적힌 상품명 중 하나라도 판매중·노출중인 채팅주문 허용 상품과 다름</td><td>전체 미접수, 아무 기록도 남지 않음</td><td class="c">발송 안 함</td></tr>' +
            '</tbody></table></div>' +
            '<ul>' +
              '<li>이용제한이 가장 먼저 적용돼요. 이용제한 회원이면 닉네임이 맞든 다르든 등록하지 않았든 이용제한 안내만 발송하고, 매칭 실패 건에도 쌓이지 않아요.</li>' +
              '<li>상품명이 하나만 틀려도 다른 상품까지 모두 접수되지 않고, 손님에게 안내도 가지 않아요. 판매를 끝냈거나 노출하지 않는 상품, 채팅주문을 허용하지 않은 상품의 이름도 마찬가지예요.</li>' +
              '<li>이용제한과 닉네임 미등록, 재고 부족, 1회 최대구매수량 초과는 시스템이 바로 판단해서 손님에게 안내하기 때문에 매칭 실패 건에 나타나지 않아요.</li>' +
              '<li>채팅주문에는 주문접수완료 알림톡이 가지 않고, 채팅방 접수 안내로 대신해요. 결제확인완료·픽업대기·픽업완료 등 이후 단계 알림톡은 링크주문과 똑같이 발송돼요.</li>' +
              '<li>알림톡 발송 설정은 시스템관리의 알림설정에서 해요.</li>' +
            '</ul>'
        }
      ],
      trouble:
        '<div class="table-wrap"><table class="wide"><thead><tr><th>증상</th><th>확인할 내용</th></tr></thead><tbody>' +
          '<tr><td>손님이 주문했는데 주문목록에 없어요</td><td>매칭 실패 건에 쌓였는지 확인 · 쌓이지 않았다면 메시지 형식과 상품명을 확인 (형식이 틀리거나 상품명이 하나라도 틀리면 기록이 남지 않으니 손님에게 형식 재안내)</td></tr>' +
          '<tr><td>손님이 닉네임 등록 안내를 받았어요</td><td>회원관리에서 해당 회원의 채팅주문 닉네임 등록 여부 확인</td></tr>' +
          '<tr><td>상품명을 썼는데 인식되지 않아요</td><td>채팅주문 허용 여부 · 채팅주문상품명 일치 여부 · 현재 판매중이고 노출 중인지 확인</td></tr>' +
        '</tbody></table></div>'
    },
    {
      id: 'chat-fail',
      label: '매칭 실패 건 처리',
      shots: [
        { device: 'pc', src: '../assets/img/partner/chat-list-pc.webp', alt: '09SCM 매칭 실패 건 PC 화면', ratio: 1.6744 },
        { device: 'mobile', src: '../assets/img/partner/chat-list-mobile.webp', alt: '09SCM 매칭 실패 건 모바일 화면', ratio: 0.3308 }
      ],
      shotCaption: '09SCM 매칭 실패 건 (PC / 모바일)',
      overview:
        '<p>회원 확인에 실패해서 자동으로 접수되지 않은 메시지가 쌓이는 목록이에요. 메시지 끝의 회원주문 코드로 회원을 찾을 수 없거나, 코드는 맞지만 채팅방 닉네임이 등록된 닉네임과 다른 경우예요.</p>' +
        '<ul>' +
          '<li>회원을 직접 확인해서 주문으로 접수(매칭)하거나, 오입력·스팸이면 삭제해요.</li>' +
          '<li>목록에 쌓여 있는 동안에는 손님에게 아무 안내도 가지 않아요.</li>' +
          '<li>목록에는 수신일시, 원문 메시지, 상품 파싱값, 채팅주문 닉네임, 회원주문 코드가 최신순으로 보여요. 상품 파싱값은 원문에서 읽어낸 상품명과 수량이에요.</li>' +
        '</ul>',
      steps:
        '<h3>찾기</h3>' +
        '<p>수신일 기간으로 거르거나 검색어로 찾을 수 있어요. 원문 메시지, 상품 파싱값, 채팅주문 닉네임, 회원주문 코드가 검색 대상이고, 영문 대소문자와 하이픈(-)은 구분하지 않아요. 목록은 한 페이지에 20건씩 보여요.</p>' +

        '<h3>매칭하기</h3>' +
        '<ol>' +
          '<li><b>매칭 누르기</b> 처리할 건의 [매칭]을 누르면 &quot;채팅주문 매칭&quot; 창이 열려요. 원문 메시지, 상품 파싱값, 수신 닉네임, 수신 코드가 그대로 보여요.</li>' +
          '<li><b>회원 확인하기</b> 회원주문 코드 입력란에는 원래 메시지의 코드가 미리 채워져 있어요. 그 코드로 찾을 수 있는 회원이 있으면 결과가 미리 보이고, 코드를 고쳤다면 [회원 확인]을 눌러 다시 조회해요.</li>' +
          '<li><b>본인인지 판단하기</b> 조회 결과에 회원명, 연락처, 등록된 채팅주문 닉네임, 이용상태가 나와요. 수신 닉네임과 등록된 닉네임을 비교해서 본인이 맞는지 직접 판단해요. 등록된 닉네임이 없으면 &quot;-&quot;로 보여요.</li>' +
          '<li><b>매칭 적용하기</b> [매칭 적용]을 누르면 상품 파싱값 그대로 상품마다 채팅주문(픽업·현장결제) 주문이 만들어져요.</li>' +
        '</ol>' +
        '<ul>' +
          '<li>주문은 결제대기·주문접수 상태로 만들어지고, 주문일시는 매칭을 적용한 시각으로 기록돼요.</li>' +
          '<li>주문이 만들어지는 즉시 상품의 판매가능수량과 보유수량이 주문 수량만큼 함께 줄어요.</li>' +
          '<li>손님 채팅방에는 접수 안내가 발송돼요.</li>' +
          '<li>처리가 끝난 건은 목록에서 바로 사라져요. 결과는 <a href="#retail-order-list">주문목록</a>에서 주문경로가 채팅주문인 건으로 확인해요.</li>' +
          '<li>상품과 수량은 이 창에서 바꿀 수 없어요.</li>' +
        '</ul>' +

        '<h3>삭제하기</h3>' +
        '<p>오입력이나 스팸이라고 판단되는 건은 [삭제]로 지워요. 삭제하면 주문은 만들어지지 않아요. 여러 건은 체크박스로 고른 뒤 [일괄삭제]로 한 번에 지워요.</p>',
      cases: [
        {
          title: '매칭이 막히는 경우',
          shots: [
            { device: 'pc', src: '../assets/img/partner/chat-match-blocked-pc.webp', alt: '09SCM 채팅주문 매칭 차단 PC 화면', ratio: 0.8027 },
            { device: 'mobile', src: '../assets/img/partner/chat-match-blocked-mobile.webp', alt: '09SCM 채팅주문 매칭 차단 모바일 화면', ratio: 0.6647 }
          ],
          shotCaption: '09SCM 채팅주문 매칭 차단 (PC / 모바일)',
          html:
            '<p>[매칭 적용]을 눌렀을 때 아래에 해당하면 주문을 만들지 않고 창 안에 안내가 나와요.</p>' +
            '<div class="table-wrap"><table class="wide"><thead><tr><th>상황</th><th>안내 문구</th></tr></thead><tbody>' +
              '<tr><td>회원 확인을 하지 않음</td><td>회원주문 코드로 회원을 먼저 확인해주세요.</td></tr>' +
              '<tr><td>이용제한 회원</td><td>이용제한 회원에게는 주문접수를 생성할 수 없습니다.</td></tr>' +
              '<tr><td>상품명이 판매중·노출중인 채팅주문 허용 상품과 다름</td><td>채팅주문상품명과 일치하지 않습니다: (상품명)</td></tr>' +
              '<tr><td>판매가능수량 부족</td><td>판매가능수량이 부족합니다: (상품명) 현재 N개</td></tr>' +
              '<tr><td>1회 최대구매수량 초과</td><td>1회 최대구매수량을 초과했습니다: (상품명) 최대 N개</td></tr>' +
            '</tbody></table></div>' +
            '<ul>' +
              '<li>매칭 적용은 상품이 여러 개일 때 하나라도 걸리면 전체가 막혀요. 자동 접수와 달리 일부 상품만 접수하지 않아요.</li>' +
              '<li>같은 상품이 여러 번 적혀 있으면 수량을 합친 값으로 확인해요.</li>' +
              '<li>막힌 건은 목록에 그대로 남아요. 이 경우 손님에게는 자동 안내가 가지 않으니, 사유를 확인한 뒤 건을 삭제하고 채팅방에서 손님에게 직접 안내해주세요.</li>' +
            '</ul>'
        },
        {
          title: '회원 확인 결과가 이렇게 나와요',
          shots: [
            { device: 'pc', src: '../assets/img/partner/chat-match-nomember-pc.webp', alt: '09SCM 채팅주문 매칭 회원 확인 PC 화면', ratio: 0.938 },
            { device: 'mobile', src: '../assets/img/partner/chat-match-nomember-mobile.webp', alt: '09SCM 채팅주문 매칭 회원 확인 모바일 화면', ratio: 0.7652 }
          ],
          shotCaption: '09SCM 채팅주문 매칭 회원 확인 (PC / 모바일)',
          html:
            '<div class="table-wrap"><table class="wide"><thead><tr><th>입력</th><th>결과</th></tr></thead><tbody>' +
              '<tr><td>코드를 비워둠</td><td>회원주문 코드를 입력해주세요.</td></tr>' +
              '<tr><td>숫자 4자리가 아님</td><td>회원주문 코드는 숫자 4자리로 입력해주세요.</td></tr>' +
              '<tr><td>일치하는 회원이 없음</td><td>일치하는 회원이 없습니다.</td></tr>' +
              '<tr><td>일치하는 회원이 있음</td><td>회원명, 연락처, 등록된 채팅주문 닉네임, 이용상태 표시</td></tr>' +
            '</tbody></table></div>' +
            '<p>조회된 회원이 이용제한 상태이면 &quot;이용제한 회원 — 매칭 적용 시 주문접수가 제한됩니다&quot; 경고가 함께 나와요.</p>'
        },
        {
          title: '삭제할 때는 확인 창이 나와요',
          shots: [
            { device: 'pc', src: '../assets/img/partner/chat-delete-pc.webp', alt: '09SCM 매칭 실패 건 삭제 확인 PC 화면', ratio: 2.0422 }
          ],
          shotCaption: '09SCM 매칭 실패 건 삭제 확인 (PC)',
          html:
            '<p>[삭제]를 누르면 &quot;매칭 실패 건을 삭제하시겠습니까?&quot; 확인 창이 나와요. 삭제한 건은 복구할 수 없고 이력도 남지 않아요. 일괄삭제는 &quot;선택한 N건을 삭제하시겠습니까?&quot;로 물어봐요.</p>' +
            '<p>일괄삭제는 현재 페이지에서 선택한 건만 대상이에요. 다른 페이지로 이동하면 선택이 풀려요.</p>'
        },
        {
          title: '선택하지 않고 일괄삭제를 누르면 알려줘요',
          shots: [
            { device: 'pc', src: '../assets/img/partner/chat-bulkalert-pc.webp', alt: '09SCM 매칭 실패 건 일괄삭제 선택 안내 PC 화면', ratio: 2.5208 }
          ],
          shotCaption: '09SCM 일괄삭제 선택 안내 (PC)',
          html: '<p>선택한 건이 없으면 &quot;삭제할 매칭 실패 건을 선택해주세요.&quot; 안내가 나와요.</p>'
        },
        {
          title: '조건에 맞는 건이 없어요',
          html: '<p>검색 결과가 없으면 &quot;조건에 맞는 회원매칭실패 건이 없습니다.&quot;가 나와요.</p>'
        }
      ]
    }
  ]
};
