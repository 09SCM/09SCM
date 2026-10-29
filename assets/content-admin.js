// 통합관리자 이용가이드 — 화면별 본문
// 키는 nav-admin.js의 leaf id. 값이 없는 섹션은 화면에 나타나지 않는다.
// 통합관리자는 운영용 PC 화면이라 캡처는 PC 1장만 쓴다(이용가이드 디자인시스템 9-2절).
window.GUIDE_CONTENT = window.GUIDE_CONTENT || {};

var IMG_ADMIN = '../assets/img/admin/';

// 소개 페이지 본문 안에 넣는 캡처 1장 (PC 1장, 원본 크기 기준 폭 지정)
function adminInlineShot(name, alt, caption, cssWidth) {
  return '<div class="cshot"><div class="cshot-row cshot-one">' +
    '<figure class="shot-item shot-pc"' + (cssWidth ? ' style="width:' + cssWidth + ';max-width:100%"' : '') + '><img src="' + IMG_ADMIN + name + '.webp" alt="' + alt + '" loading="lazy"></figure>' +
    '</div><p class="shot-caption">' + caption + '</p></div>';
}

// ---- 시작하기 > 09SCM 통합관리자 소개 ----
window.GUIDE_CONTENT['start-intro'] = {
  shots: [
    { device: 'pc', src: IMG_ADMIN + 'intro-pc.webp', alt: '09SCM 통합관리자 대시보드 화면', ratio: 1440 / 900 }
  ],
  shotCaption: '09SCM 통합관리자 화면',
  sections: [
    { id: 'sec1', label: '09SCM 통합관리자란', html:
      '<p>09SCM을 운영하는 담당자가 본사와 가맹점의 현황, 매출, 공지, 약관을 한곳에서 관리하는 운영용 관리자예요.</p>' },
    { id: 'sec2', label: '이런 분이 사용해요', html:
      '<p>09SCM을 운영하는 담당자만 사용해요. 본사와 가맹점은 <a href="partner.html">09SCM 관리자</a>를 사용해요.</p>' },
    { id: 'sec3', label: '할 수 있는 일', html:
      '<ul>' +
        '<li><a href="#dashboard-ops"><b>대시보드</b></a> 본사·가맹점 운영 현황과 이번 달 결제·매출 규모를 한눈에 확인해요.</li>' +
        '<li><a href="#hq-list"><b>본사 관리</b></a> 본사 도입신청부터 승인, 운영 상태까지 관리해요.</li>' +
        '<li><a href="#franchise-list"><b>가맹점 정보</b></a> 전체 가맹점의 현황과 상태를 확인해요.</li>' +
        '<li><a href="#trade-all"><b>거래/매출 현황</b></a> 본사·가맹점의 결제, 취소·환불, 매출 현황과 매출 추이를 조회해요.</li>' +
        '<li><a href="#system-notice"><b>시스템 관리</b></a> 공지사항과 약관을 관리해요.</li>' +
      '</ul>' },
    { id: 'sec4', label: '공통 영역 보기', html:
      '<p>로그인하면 모든 화면에 똑같이 나오는 영역이에요. 맨 위의 헤더와 왼쪽 메뉴로 이루어져요.</p>' +
      '<h3>헤더</h3>' +
      '<p>화면 맨 위 오른쪽에 지금 로그인한 계정의 정보가 표시돼요.</p>' +
      adminInlineShot('common-header-pc', '09SCM 통합관리자 헤더 PC 화면', '09SCM 통합관리자 헤더 화면', '560px') +
      '<div class="table-wrap"><table class="wide">' +
        '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
        '<tbody>' +
          '<tr><td>권한명</td><td>로그인한 계정의 권한 (현재는 최고관리자)</td></tr>' +
          '<tr><td>이름</td><td>로그인한 계정의 이름</td></tr>' +
          '<tr><td>아이디</td><td>로그인할 때 쓴 아이디</td></tr>' +
        '</tbody></table></div>' +
      '<h3>왼쪽 메뉴</h3>' +
      adminInlineShot('common-lnb-pc', '09SCM 통합관리자 왼쪽 메뉴 PC 화면', '09SCM 통합관리자 왼쪽 메뉴 화면', '248px') +
      '<div class="table-wrap"><table class="wide">' +
        '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
        '<tbody>' +
          '<tr><td>대시보드</td><td><a href="#dashboard-ops">대시보드</a>로 이동</td></tr>' +
          '<tr><td>본사/가맹점 관리</td><td>누르면 본사 관리, 가맹점 정보 메뉴가 펼쳐짐</td></tr>' +
          '<tr><td>거래/매출 현황</td><td><a href="#trade-all">거래/매출 현황</a>으로 이동</td></tr>' +
          '<tr><td>시스템 관리</td><td>누르면 공지사항, 약관 관리 메뉴가 펼쳐짐</td></tr>' +
          '<tr><td>[09SCM 관리자 바로가기]</td><td>09SCM 관리자(본사·가맹점 관리자)를 새 창으로 열기</td></tr>' +
          '<tr><td>[09SCM 홈페이지 바로가기]</td><td>09SCM 홈페이지를 새 창으로 열기</td></tr>' +
          '<tr><td>[로그아웃]</td><td>확인 창 없이 로그인 화면으로 이동 (<a href="#start-login">로그인</a>)</td></tr>' +
        '</tbody></table></div>' }
  ]
};

// ---- 시작하기 > 로그인 ----
window.GUIDE_CONTENT['start-login'] = {
  shots: [
    { device: 'pc', src: IMG_ADMIN + 'login-pc.webp', alt: '09SCM 통합관리자 로그인 PC 화면', ratio: 1440 / 900 }
  ],
  shotCaption: '09SCM 통합관리자 로그인 화면',
  overview:
    '<p>09SCM을 운영하는 담당자만 쓰는 관리자예요. 아이디, 비밀번호, 자동등록방지 숫자로 로그인하고, 로그인하면 대시보드가 열려요.</p>' +
    '<ul>' +
      '<li>회원가입과 아이디·비밀번호 찾기는 제공하지 않아요.</li>' +
      '<li>비밀번호를 5회 연속 틀리면 계정이 잠겨요.</li>' +
    '</ul>',
  steps:
    '<h3>로그인하기</h3>' +
    '<ol>' +
      '<li><b>입력하기</b> 아이디와 비밀번호를 입력해요. 비밀번호는 입력한 값이 가려져서 보여요.</li>' +
      '<li><b>자동등록방지 입력하기</b> 이미지에 보이는 숫자 6자리를 입력해요. 숫자가 잘 안 보이면 [새로고침]을 눌러 새 숫자로 바꿔요.</li>' +
      '<li><b>로그인하기</b> [로그인]을 누르거나 입력칸에서 Enter를 눌러요. 로그인하면 대시보드가 열려요.</li>' +
    '</ol>' +
    '<div class="table-wrap"><table class="wide">' +
      '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>아이디</td><td>로그인할 때 쓰는 아이디</td></tr>' +
        '<tr><td>비밀번호</td><td>입력값 가림 처리</td></tr>' +
        '<tr><td>자동등록방지</td><td>이미지의 숫자 6자리 입력 (숫자만 입력 가능, [새로고침]으로 새 숫자 생성)</td></tr>' +
        '<tr><td>[로그인]</td><td>입력한 내용으로 로그인 시도 (입력칸에서 Enter로도 가능)</td></tr>' +
      '</tbody></table></div>' +
    '<p>로그인에 성공하면 이전에 보던 메뉴, 검색어, 필터, 선택 상태는 이어지지 않고 대시보드부터 시작해요. 로그인하면 화면 맨 위 오른쪽에 로그인한 계정의 정보가 표시돼요. 자세한 내용은 <a href="#start-intro/sec4">공통 영역 보기</a>에서 확인해주세요.</p>' +
    '<p>입력이 맞지 않으면 로그인되지 않아요. 상황별 안내는 <a href="#start-login/cases">상황별로 달라져요</a>에서 확인해요.</p>' +

    '<h3>로그아웃하기</h3>' +
    '<p>왼쪽 메뉴 맨 아래 [로그아웃]을 누르면 확인 창 없이 바로 로그인 화면으로 돌아가요. 로그아웃한 뒤에는 뒤로가기나 새로고침으로 관리자 화면에 다시 들어갈 수 없고, 다시 로그인해야 해요.</p>' +
    adminInlineShot('common-logout-pc', '09SCM 통합관리자 로그아웃 PC 화면', '09SCM 통합관리자 로그아웃 영역 화면', '248px') +
    '<p>로그인하지 않은 상태에서 관리자 화면 주소로 바로 들어가도 로그인 화면이 열려요.</p>',
  cases: [
    {
      html:
        '<p>입력을 확인하는 순서가 정해져 있고, 앞 단계에서 걸리면 다음 단계는 확인하지 않아요. 안내 문구는 [로그인] 버튼 위에 한 줄로만 나와요. 안내가 나오면 비밀번호와 자동등록방지 입력값은 비워지고, 자동등록방지 숫자는 새로 바뀌어요.</p>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>상황</th><th>안내 문구</th><th>비밀번호 오류 횟수</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>입력하지 않은 항목이 있을 때</td><td>"아이디를 입력해 주세요." / "비밀번호를 입력해 주세요." / "자동등록방지 숫자를 입력해 주세요."</td><td>포함 안 됨</td></tr>' +
            '<tr><td>자동등록방지 숫자가 다를 때</td><td>"자동등록방지 숫자가 일치하지 않습니다."</td><td>포함 안 됨</td></tr>' +
            '<tr><td>없는 아이디일 때</td><td>"아이디 또는 비밀번호가 올바르지 않습니다."</td><td>포함 안 됨</td></tr>' +
            '<tr><td>잠긴 계정일 때</td><td>"비밀번호 5회 오류로 계정이 잠겼습니다. 운영 담당자에게 잠금 해제를 요청해 주세요."</td><td>포함 안 됨</td></tr>' +
            '<tr><td>비밀번호가 다를 때</td><td>"아이디 또는 비밀번호가 올바르지 않습니다."</td><td>1회 추가</td></tr>' +
          '</tbody></table></div>'
    },
    {
      title: '입력하지 않은 항목이 있으면',
      shots: [{ device: 'pc', src: IMG_ADMIN + 'login-error-empty-pc.webp', alt: '09SCM 통합관리자 입력 누락 PC 화면', ratio: 864 / 922 }],
      shotCaption: '09SCM 통합관리자 로그인 입력 누락 화면',
      html: '<p>아이디, 비밀번호, 자동등록방지 순서로 확인해서 비어 있는 첫 항목의 안내가 나와요. 이 오류는 비밀번호 오류 횟수에 포함되지 않아요.</p>'
    },
    {
      title: '자동등록방지 숫자가 다르면',
      shots: [{ device: 'pc', src: IMG_ADMIN + 'login-error-captcha-pc.webp', alt: '09SCM 통합관리자 자동등록방지 오류 PC 화면', ratio: 864 / 922 }],
      shotCaption: '09SCM 통합관리자 로그인 오류 화면',
      html: '<p>입력한 숫자가 이미지와 다르면 안내가 나와요. 이 오류는 비밀번호 오류 횟수에 포함되지 않아요.</p>'
    },
    {
      title: '아이디 또는 비밀번호가 맞지 않으면',
      shots: [{ device: 'pc', src: IMG_ADMIN + 'login-error-pw-pc.webp', alt: '09SCM 통합관리자 비밀번호 오류 PC 화면', ratio: 864 / 922 }],
      shotCaption: '09SCM 통합관리자 로그인 오류 화면',
      html: '<p>아이디가 없거나 비밀번호가 다르면 같은 안내가 나와요. 비밀번호가 다른 경우에는 오류 횟수가 1회 쌓이고, 로그인에 성공하면 횟수는 0으로 돌아가요.</p>'
    },
    {
      title: '비밀번호를 5회 연속 틀리면',
      shots: [{ device: 'pc', src: IMG_ADMIN + 'login-locked-pc.webp', alt: '09SCM 통합관리자 계정 잠금 PC 화면', ratio: 864 / 958 }],
      shotCaption: '09SCM 통합관리자 계정 잠금 화면',
      html: '<p>계정이 잠기고, 이후에는 올바른 비밀번호를 입력해도 로그인되지 않아요. 잠금 안내가 나오면 운영 담당자에게 잠금 해제를 요청해요.</p>'
    }
  ],
  trouble:
    '<h3>비밀번호가 기억나지 않아요</h3>' +
    '<p>통합관리자에는 비밀번호 찾기가 없어요. 운영 담당자에게 문의해요.</p>'
};

// ---- 시작하기 > 용어집 ----
window.GUIDE_CONTENT['start-terms'] = {
  sections: [
    { id: 'sec1', label: '운영 주체와 상태', html:
      '<div class="table-wrap"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody>' +
        '<tr><td>통합관리자</td><td>09SCM을 운영하는 담당자가 본사와 가맹점의 현황, 매출, 공지, 약관을 관리하는 화면</td></tr>' +
        '<tr><td>본사</td><td>09SCM을 도입해 소속 가맹점을 관리하는 계정. 통합관리자에서 신청부터 승인, 운영 상태까지 직접 관리</td></tr>' +
        '<tr><td>가맹점</td><td>본사에 소속된 계정. 통합관리자에서는 조회만 하고, PayApp 연동정보만 수정 가능</td></tr>' +
        '<tr><td>소매몰</td><td>본사와 가맹점이 각자 운영하는 고객용 쇼핑 사이트</td></tr>' +
        '<tr><td>도입신청</td><td>본사가 09SCM 홈페이지에서 솔루션 이용을 신청하는 것</td></tr>' +
      '</tbody></table></div>' +
      '<h3>본사 상태</h3>' +
      '<div class="table-wrap"><table><thead><tr><th>상태</th><th>뜻</th></tr></thead><tbody>' +
        '<tr><td>승인대기</td><td>도입신청이 접수되어 검토 전인 단계 (본사 계정과 소매몰은 아직 만들어지지 않음)</td></tr>' +
        '<tr><td>운영중</td><td>정상 운영 중인 본사 (운영중으로 처음 바뀌는 시점에 본사 계정과 소매몰 생성)</td></tr>' +
        '<tr><td>운영제한</td><td>운영 중이던 본사에 제한이 걸린 상태 (신규 가맹점 유치 중단 포함)</td></tr>' +
        '<tr><td>승인불가</td><td>도입신청을 승인하지 않은 상태</td></tr>' +
      '</tbody></table></div>' +
      '<h3>가맹점 이용상태</h3>' +
      '<div class="table-wrap"><table><thead><tr><th>상태</th><th>뜻</th></tr></thead><tbody>' +
        '<tr><td>이용대기</td><td>가입신청 후 본사의 이용승인을 기다리는 상태</td></tr>' +
        '<tr><td>이용승인</td><td>모든 메뉴를 정상으로 쓰는 상태</td></tr>' +
        '<tr><td>이용제한</td><td>신규 주문과 상품 등록이 제한된 상태</td></tr>' +
        '<tr><td>이용불가</td><td>로그인할 수 없는 상태</td></tr>' +
      '</tbody></table></div>' +
      '<p>본사 상태와 가맹점 이용상태는 서로 다른 체계라서 이름을 섞어 쓰지 않아요. 본사가 운영제한이 되어도 소속 가맹점의 이용상태는 자동으로 바뀌지 않아요.</p>' },
    { id: 'sec2', label: '매출과 결제', html:
      '<div class="table-wrap"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody>' +
        '<tr><td>결제총액</td><td>결제가 완료된 금액의 합계 (구매자가 부담한 카드수수료, 배달·배송비 포함)</td></tr>' +
        '<tr><td>취소·환불액</td><td>취소·반품이 승인된 금액의 합계 (환불대기 건 포함)</td></tr>' +
        '<tr><td>매출액</td><td>결제총액 − 취소·환불액 (취소·환불이 더 크면 마이너스 가능)</td></tr>' +
        '<tr><td>페이앱 결제액</td><td>결제수단이 카드결제(페이앱)인 결제총액</td></tr>' +
        '<tr><td>현장결제·계좌이체 결제액</td><td>결제수단이 현장결제·계좌이체인 결제총액</td></tr>' +
        '<tr><td>이용료</td><td>가맹점이 본사에 매달 내는 비용</td></tr>' +
        '<tr><td>이용료 수납액</td><td>본사가 가맹점에서 실제로 받은 이용료의 합계 (결제완료와 수기완납 포함, 매출액에는 포함하지 않음)</td></tr>' +
        '<tr><td>본사별 현황</td><td>본사 계정 자체의 매출만 보는 화면 (소속 가맹점의 매출은 합치지 않고 가맹점별 현황에서 확인)</td></tr>' +
        '<tr><td>가맹점별 현황</td><td>가맹점 계정 자체의 매출을 가맹점별로 보는 화면</td></tr>' +
        '<tr><td>실시간 집계</td><td>화면을 열거나 새로고침한 시점의 최신 값을 보여주는 방식 (한국 시간 기준)</td></tr>' +
      '</tbody></table></div>' +
      '<p>통합관리자에서는 개별 본사·가맹점의 결제 건별 내역은 다루지 않고, 매출 합계와 추이만 다뤄요.</p>' },
    { id: 'sec3', label: 'PayApp', html:
      '<div class="table-wrap"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody>' +
        '<tr><td>PayApp</td><td>온라인 결제를 처리하는 외부 서비스</td></tr>' +
        '<tr><td>PayApp 연동정보</td><td>판매자 아이디, 연동 KEY, 연동 VALUE (검증 결과에 따라 연동완료, 미연동으로 표시)</td></tr>' +
        '<tr><td>유효성 검증</td><td>입력한 PayApp 연동정보가 쓸 수 있는 값인지 확인하는 기능</td></tr>' +
      '</tbody></table></div>' }
  ]
};

// ---- 대시보드 > 운영현황 ----
window.GUIDE_CONTENT['dashboard-ops'] = {
  shots: [
    { device: 'pc', src: IMG_ADMIN + 'dashboard-pc.webp', alt: '09SCM 통합관리자 대시보드 PC 화면', ratio: 1440 / 1153 }
  ],
  shotCaption: '09SCM 통합관리자 대시보드 화면',
  overview:
    '<p>로그인하면 처음 보이는 화면이에요. 본사·가맹점 운영 현황, 이번 달 결제 규모, 최근 6개월 매출 추이, 승인을 기다리는 본사를 한 화면에서 확인해요.</p>' +
    '<ul>' +
      '<li><b>본사·가맹점 카드</b> 승인 대기 본사, 운영 본사, 운영 가맹점, 이번 달 신규 가입 가맹점을 보여줘요.</li>' +
      '<li><b>당월 결제 카드</b> 이번 달 결제총액과 결제수단별 금액, 이용료 수납액을 보여줘요.</li>' +
      '<li><b>월별 매출 추이</b> 최근 6개월 매출을 막대 차트로 보여줘요.</li>' +
      '<li><b>승인 대기 본사</b> 승인을 기다리는 본사 신청을 최근 순으로 보여줘요.</li>' +
      '<li><b>운영 현황</b> 운영제한 본사와 이용제한 가맹점 수를 보여줘요.</li>' +
    '</ul>' +
    '<p>보기만 하는 화면이에요. 기간이나 거래유형을 바꾸는 조회 조건은 없고, 카드와 목록은 이번 달, 추이는 최근 6개월로 정해져 있어요.</p>',
  steps:
    '<h3>집계 기준 시각</h3>' +
    '<p>화면 오른쪽 위에 "실시간 집계 (YY.MM.DD HH:MM)"가 표시돼요. 화면을 열거나 새로고침한 시각의 최신 값이고, 한국 시간 기준이에요. 최신 데이터를 보려면 새로고침해요.</p>' +

    '<h3>본사·가맹점 카드</h3>' +
    '<div class="table-wrap"><table class="wide">' +
      '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>승인 대기 본사</td><td>상태가 승인대기인 본사 수</td></tr>' +
        '<tr><td>운영 본사</td><td>운영중과 운영제한 본사 수 (전체 본사는 승인대기·승인불가를 포함한 등록된 모든 본사)</td></tr>' +
        '<tr><td>운영 가맹점</td><td>이용승인과 이용제한 가맹점 수 (전체 가맹점은 소속된 모든 가맹점)</td></tr>' +
        '<tr><td>당월 신규 가입 가맹점</td><td>가입신청일이 이번 달인 가맹점 수 (이용상태와 관계없이 집계)</td></tr>' +
      '</tbody></table></div>' +

    '<h3>당월 결제 카드</h3>' +
    '<p>이번 달에 결제가 완료된 금액이에요. 취소·환불을 빼기 전 금액이라서 취소·환불까지 반영한 매출액은 아래 월별 매출 추이에서 확인해요.</p>' +
    '<div class="table-wrap"><table class="wide">' +
      '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>당월 결제총액</td><td>이번 달 결제완료 금액 합계 (결제완료 주문 건수 포함)</td></tr>' +
        '<tr><td>당월 페이앱 결제액</td><td>결제수단이 카드결제(페이앱)인 결제총액 (결제총액 대비 비율 포함)</td></tr>' +
        '<tr><td>당월 현장결제·계좌이체 결제액</td><td>결제수단이 현장결제·계좌이체인 결제총액 (결제총액 대비 비율 포함)</td></tr>' +
        '<tr><td>당월 이용료 수납액</td><td>이용료 결제완료와 수기완납 금액의 합계</td></tr>' +
      '</tbody></table></div>' +

    '<h3>월별 매출 추이</h3>' +
    '<p>이번 달을 포함한 최근 6개월의 매출을 월별 막대 차트로 보여줘요. 이번 달은 조회한 시점까지의 값이에요.</p>' +
    '<div class="table-wrap"><table class="wide">' +
      '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>페이앱 매출액</td><td>그 달의 카드결제(페이앱) 결제총액 − 같은 결제수단의 취소·환불액</td></tr>' +
        '<tr><td>현장결제·계좌이체 매출액</td><td>그 달의 현장결제·계좌이체 결제총액 − 같은 결제수단의 취소·환불액</td></tr>' +
        '<tr><td>총매출액</td><td>그 달의 결제총액 − 취소·환불액</td></tr>' +
        '<tr><td>이용료 수납액</td><td>그 달에 받은 이용료 합계 (매출에는 포함하지 않음)</td></tr>' +
        '<tr><td>[거래/매출 현황 보기 →]</td><td>거래/매출 현황을 기본 조건(이번달, 전체)으로 열기</td></tr>' +
      '</tbody></table></div>' +
    '<p>취소·환불은 결제한 달이 아니라 취소·반품을 승인한 달에서 빼요. 지난달에 결제한 건을 이번 달에 취소하면 이번 달 매출에서 빠지고, 그 때문에 매출액이 마이너스가 될 수도 있어요.</p>' +
    '<p>정산이 끝난 카드결제 건은 환불을 요청한 날 취소·반품이 승인된 것으로 보기 때문에, 환불이 완료되기 전인 환불대기 상태에서도 그날의 취소·환불액에 들어가요.</p>' +

    '<h3>승인 대기 본사</h3>' +
    '<p>상태가 승인대기인 본사를 도입신청일시가 최근인 순서로 최대 5건 보여줘요. 제목 옆에 전체 건수가 표시되고, 5건이 넘으면 [본사 관리 보기 →]에서 전체를 확인해요.</p>' +
    '<div class="table-wrap"><table class="wide">' +
      '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>도입신청일시</td><td>본사가 도입신청한 일시</td></tr>' +
        '<tr><td>본사정보</td><td>상호명과 대표자명</td></tr>' +
        '<tr><td>회원정보</td><td>이름과 휴대폰번호</td></tr>' +
        '<tr><td>[상세보기]</td><td>해당 본사의 상세(신청정보 탭)로 이동</td></tr>' +
      '</tbody></table></div>' +

    '<h3>운영 현황</h3>' +
    '<div class="table-wrap"><table class="wide">' +
      '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>운영제한 본사</td><td>상태가 운영제한인 본사 수 (운영 본사 대비 비율 포함)</td></tr>' +
        '<tr><td>이용제한 가맹점</td><td>이용상태가 이용제한인 가맹점 수 (운영 가맹점 대비 비율 포함)</td></tr>' +
      '</tbody></table></div>',
  cases: [
    {
      title: '카드를 눌러 이동해요',
      html:
        '<p>목록 하나로 바로 확인할 수 있는 항목만 눌러서 이동해요. 이동한 목록의 건수는 카드 숫자와 같아요.</p>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>누르는 곳</th><th>이동하는 화면</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>승인 대기 본사 카드, [본사 관리 보기 →]</td><td><a href="#hq-list">본사 관리</a> (상태 필터 승인대기)</td></tr>' +
            '<tr><td>승인 대기 본사 목록의 [상세보기]</td><td><a href="#hq-list">본사 관리</a>의 해당 본사 상세 (신청정보 탭)</td></tr>' +
            '<tr><td>운영제한 본사 카드</td><td><a href="#hq-list">본사 관리</a> (상태 필터 운영제한)</td></tr>' +
            '<tr><td>이용제한 가맹점 카드</td><td><a href="#franchise-list">가맹점 정보</a> (이용상태 필터 이용제한)</td></tr>' +
            '<tr><td>[거래/매출 현황 보기 →]</td><td><a href="#trade-all">거래/매출 현황</a> (이번달, 전체)</td></tr>' +
          '</tbody></table></div>' +
        '<p>운영 본사, 운영 가맹점, 당월 신규 가입 가맹점과 당월 결제 카드는 눌러도 이동하지 않아요. 이동한 화면에서 왼쪽 메뉴를 다시 누르면 적용된 필터가 사라져요.</p>'
    },
    {
      group: '데이터가 없을 때',
      rows: [
        {
          title: '승인 대기 본사가 없으면',
          shots: [{ device: 'pc', src: IMG_ADMIN + 'dash-empty-wait-pc.webp', alt: '09SCM 통합관리자 승인 대기 본사 없음 PC 화면', ratio: 1200 / 530 }],
          shotCaption: '09SCM 통합관리자 승인 대기 본사 없음 화면',
          html: '<ul><li>안내: "승인 대기 중인 본사가 없습니다."</li><li>건수: 제목 옆에 0건 표시</li></ul>'
        },
        {
          title: '이번 달 결제총액이 0원이면',
          shots: [{ device: 'pc', src: IMG_ADMIN + 'dash-empty-pay-pc.webp', alt: '09SCM 통합관리자 이번 달 결제 없음 PC 화면', ratio: 2384 / 410 }],
          shotCaption: '09SCM 통합관리자 이번 달 결제 없음 화면',
          html: '<ul><li>금액: 결제총액과 결제수단별 금액 0원</li><li>비율: 결제수단별 카드에 "결제총액 대비 -" 표시</li></ul>'
        },
        {
          title: '운영 본사 또는 운영 가맹점이 0개이면',
          shots: [{ device: 'pc', src: IMG_ADMIN + 'dash-empty-ops-pc.webp', alt: '09SCM 통합관리자 운영 현황 없음 PC 화면', ratio: 1200 / 546 }],
          shotCaption: '09SCM 통합관리자 운영 현황 없음 화면',
          html: '<ul><li>건수: 운영제한 본사, 이용제한 가맹점 0개</li><li>비율: "운영 본사 대비 -", "운영 가맹점 대비 -" 표시</li></ul>'
        }
      ]
    },
    {
      title: '삭제된 본사와 가맹점은 이렇게 반영돼요',
      html: '<p>삭제된 본사와 가맹점의 거래·매출 이력은 결제총액, 월별 매출 추이 같은 합계에 계속 포함돼요. 삭제된 가맹점은 가맹점 수를 세는 카드에서는 빠져요.</p>'
    }
  ],
  trouble:
    '<h3>숫자가 바로 바뀌지 않아요</h3>' +
    '<p>대시보드는 열거나 새로고침한 시점의 값을 보여줘요. 최신 값을 보려면 화면을 새로고침해요.</p>' +
    '<h3>다른 화면의 숫자와 달라 보여요</h3>' +
    '<p>대시보드의 수치는 본사 관리, 가맹점 정보, 거래/매출 현황의 수치와 같아야 해요. 화면마다 열어 둔 시점이 다르면 값이 다르게 보일 수 있으니 각 화면을 새로고침한 뒤 다시 비교해요.</p>'
};
