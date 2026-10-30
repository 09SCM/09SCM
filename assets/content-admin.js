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

// 세로로 긴 캡처 1장 (예외: 본문 폭의 1/4, 860px 이하 50%)
function adminQuarterShot(name, alt, caption) {
  return '<div class="shot"><div class="shot-row shot-one shot-quarter"><figure class="shot-item shot-pc"><img src="' + IMG_ADMIN + name + '.webp" alt="' + alt + '" loading="lazy"></figure></div>' +
    '<p class="shot-caption">' + caption + '</p></div>';
}

// 알럿형 팝업 캡처 1장 (이용가이드 디자인시스템 9절: 본문 폭의 절반, 좌측 정렬, 860px 이하 100%)
function adminAlertShot(name, alt, caption) {
  return '<div class="shot"><div class="shot-row shot-one"><figure class="shot-item shot-pc"><img src="' + IMG_ADMIN + name + '.webp" alt="' + alt + '" loading="lazy"></figure></div>' +
    '<p class="shot-caption">' + caption + '</p></div>';
}

// 케이스 표(케이스 / 화면 / 상세내용)를 본문 html 안에 직접 쓰는 헬퍼 — 페이지 유형 화면용
function adminCaseTable(group, rows) {
  return '<div class="case case-table"><h3>' + group + '</h3><div class="ctable"><div class="ctable-head"><div>케이스</div><div>화면</div><div>상세내용</div></div>' +
    rows.map(function (r) {
      return '<div class="ctable-row"><div class="ctable-name">' + r.title + '</div><div class="ctable-blocks"><div class="ctable-block">' +
        '<div class="ctable-shot"><div class="cshot"><div class="cshot-row cshot-one"><figure class="shot-item shot-pc"><img src="' + IMG_ADMIN + r.shot + '.webp" alt="' + r.alt + '" loading="lazy"></figure></div>' +
        '<p class="shot-caption">' + r.caption + '</p></div></div><div class="ctable-desc">' + r.html + '</div></div></div></div>';
    }).join('') + '</div></div>';
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
    { id: 'sec4', label: '시작부터 운영까지', html:
      '<ol>' +
        '<li><b>신청</b> 본사가 <a href="https://09scm.github.io/09SCM-Homepage/apply/" target="_blank" rel="noopener noreferrer">09SCM 홈페이지의 솔루션 도입신청</a>을 작성하면 본사 관리에 승인대기로 접수돼요.</li>' +
        '<li><b>심사·결제 연동 확인</b> 운영자가 신청 내용을 확인하고, 결제 연동(PayApp) 정보를 입력해 검증해요.</li>' +
        '<li><b>승인</b> 결제 연동 검증이 끝나면 운영승인을 눌러요. 승인하면 본사 계정과 소매몰이 만들어져요.</li>' +
        '<li><b>운영</b> 본사는 소매몰에서 가맹점 가입신청을 받아 운영해요. 운영 중에는 대시보드와 거래/매출 현황에서 현황을 확인해요.</li>' +
      '</ol>' },
    { id: 'sec5', label: '공통 영역 보기', html:
      '<p>로그인하면 모든 화면에 똑같이 나오는 영역이에요. 맨 위의 헤더와 왼쪽 메뉴로 이루어져요.</p>' +
      '<h3>헤더</h3>' +
      '<p>화면 맨 위 오른쪽에 지금 로그인한 계정의 정보가 표시돼요.</p>' +
      adminAlertShot('common-header-pc', '09SCM 통합관리자 헤더 PC 화면', '09SCM 통합관리자 헤더 화면') +
      '<div class="table-wrap"><table class="wide">' +
        '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
        '<tbody>' +
          '<tr><td>권한명</td><td>로그인한 계정의 권한 (현재는 최고관리자)</td></tr>' +
          '<tr><td>이름</td><td>로그인한 계정의 이름</td></tr>' +
          '<tr><td>아이디</td><td>로그인할 때 쓴 아이디</td></tr>' +
        '</tbody></table></div>' +
      '<h3>왼쪽 메뉴</h3>' +
      adminQuarterShot('common-lnb-pc', '09SCM 통합관리자 왼쪽 메뉴 PC 화면', '09SCM 통합관리자 왼쪽 메뉴 화면') +
      '<div class="table-wrap"><table class="wide">' +
        '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
        '<tbody>' +
          '<tr><td>대시보드</td><td><a href="#dashboard-ops">대시보드</a>로 이동</td></tr>' +
          '<tr><td>본사/가맹점 관리</td><td>누르면 본사 관리, 가맹점 정보 메뉴가 펼쳐짐</td></tr>' +
          '<tr><td>거래/매출 현황</td><td><a href="#trade-all">거래/매출 현황</a>으로 이동</td></tr>' +
          '<tr><td>시스템 관리</td><td>누르면 공지사항, 약관 관리 메뉴가 펼쳐짐</td></tr>' +
          '<tr><td>[09SCM 관리자 바로가기]</td><td>09SCM 관리자(본사·가맹점 관리자)를 새 창으로 열기</td></tr>' +
          '<tr><td>[09SCM 홈페이지 바로가기]</td><td>09SCM 홈페이지를 새 창으로 열기</td></tr>' +
          '<tr><td>[로그아웃]</td><td>로그인 화면으로 이동</td></tr>' +
        '</tbody></table></div>' }
  ]
};

// ---- 시작하기 > 09SCM 홈페이지 ----
window.GUIDE_CONTENT['start-home'] = {
  shots: [
    { device: 'pc', src: IMG_ADMIN + 'home-main-pc.webp', alt: '09SCM 홈페이지 메인 PC 화면', ratio: 1440 / 900 }
  ],
  shotCaption: '09SCM 홈페이지 메인 화면',
  sections: [
    { id: 'sec1', label: '09SCM 홈페이지란', html:
      '<p>09SCM을 소개하고 본사의 도입신청을 받는 첫 화면이에요. 신청하는 분은 홈페이지에서 시작하고, 접수된 신청은 통합관리자의 <a href="#hq-list">본사 관리</a>에서 확인해요.</p>' +
      '<div class="link-row">' +
        '<a href="https://09scm.github.io/09SCM-Homepage/" target="_blank" rel="noopener noreferrer">09SCM 홈페이지</a>' +
      '</div>' },
    { id: 'sec2', label: '메인 화면', html:
      '<div class="table-wrap"><table class="wide">' +
        '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
        '<tbody>' +
          '<tr><td>솔루션 소개·핵심 기능·이용 흐름·도입 절차·FAQ</td><td>09SCM을 소개하는 안내 영역 (위쪽 메뉴를 누르면 해당 영역으로 이동)</td></tr>' +
          '<tr><td>[솔루션 도입신청]</td><td>솔루션 도입신청 화면으로 이동</td></tr>' +
          '<tr><td>[09SCM 로그인]</td><td>본사·가맹점 로그인 화면으로 이동 (<a href="partner.html#start-login">09SCM 관리자 이용가이드</a>)</td></tr>' +
        '</tbody></table></div>' },
    { id: 'sec3', label: '솔루션 도입신청', html:
      '<p>본사가 09SCM 도입을 신청하는 화면이에요. 4개 영역을 차례로 입력해요. *는 필수 항목이에요.</p>' +
      adminInlineShot('home-apply-pc', '09SCM 홈페이지 솔루션 도입신청 PC 화면', '09SCM 홈페이지 솔루션 도입신청 화면', '100%') +
      adminCaseTable('입력 영역', [
        { title: '01 회원정보', shot: 'home-apply-s1-pc', alt: '09SCM 홈페이지 도입신청 회원정보 PC 화면', caption: '09SCM 홈페이지 회원정보 입력 화면',
          html: '<ul>' +
            '<li>아이디 *: 영문 소문자로 시작하는 영문·숫자 3~20자 ([중복확인]으로 사용 가능 여부 확인, 소매몰 주소와 관리자 로그인에 사용되며 승인 후 변경 불가)</li>' +
            '<li>이름 *: 신청자 이름</li>' +
            '<li>휴대폰번호 *: 숫자 11자리 ([인증번호 발송] 후 받은 인증번호를 입력하고 [확인])</li>' +
            '<li>이메일 *: 신청 결과를 안내받을 이메일</li>' +
          '</ul>' },
        { title: '02 본사 사업자 정보', shot: 'home-apply-s2-pc', alt: '09SCM 홈페이지 도입신청 본사 사업자 정보 PC 화면', caption: '09SCM 홈페이지 본사 사업자 정보 법인사업자 선택 화면',
          html: '<ul>' +
            '<li>사업자 유형 *: 개인사업자 또는 법인사업자 선택 (기본값 개인사업자)</li>' +
            '<li>본사명(상호/법인명) *, 대표자명 *: 본사 상호(법인명)와 대표자 이름</li>' +
            '<li>사업자등록번호 *: 숫자 10자리 ([사업자인증]으로 형식 확인)</li>' +
            '<li>법인등록번호 *: 숫자 13자리 (법인사업자를 고르면 입력란 표시)</li>' +
            '<li>업태, 업종: 선택 입력</li>' +
            '<li>사업장 주소 *: [주소찾기]로 우편번호·기본주소를 채우고 상세주소 입력</li>' +
          '</ul>' },
        { title: '03 솔루션 도입 정보', shot: 'home-apply-s3-pc', alt: '09SCM 홈페이지 도입신청 솔루션 도입 정보 PC 화면', caption: '09SCM 홈페이지 솔루션 도입 정보 입력 화면',
          html: '<ul>' +
            '<li>현재 또는 예상 가맹점 수: 선택 입력 (숫자, 단위 개)</li>' +
            '<li>문의 및 요청사항: 선택 입력 (도입 상담 시 참고)</li>' +
          '</ul>' },
        { title: '04 솔루션 이용 및 약관 동의', shot: 'home-apply-s4-pc', alt: '09SCM 홈페이지 도입신청 약관 동의 PC 화면', caption: '09SCM 홈페이지 솔루션 이용 및 약관 동의 화면',
          html: '<ul>' +
            '<li>전체 동의: 아래 3종을 한 번에 선택</li>' +
            '<li>[필수] 이용약관, [필수] 개인정보처리방침: 동의해야 신청 가능</li>' +
            '<li>[선택] 마케팅정보 수신동의: 동의하지 않아도 신청 가능</li>' +
            '<li>[보기]: 약관 내용을 팝업으로 확인</li>' +
            '<li>약관 내용: 통합관리자의 <a href="#system-terms">약관 관리</a>에서 관리</li>' +
          '</ul>' }
      ]) +
      '<h3>접수가 끝나면</h3>' +
      adminAlertShot('home-apply-done-pc', '09SCM 홈페이지 솔루션 도입신청 접수 완료 PC 화면', '09SCM 홈페이지 솔루션 도입신청 접수 완료 화면') +
      '<ul>' +
        '<li>안내: "솔루션 도입신청이 접수되었습니다", "신청 내용을 심사한 후 본사 계정 발급 절차를 안내해드립니다."</li>' +
        '<li>[메인으로]: 홈페이지 메인 화면으로 이동</li>' +
        '<li>[09SCM 솔루션 소개]: 메인 화면의 솔루션 소개 영역으로 이동</li>' +
      '</ul>' +
      '<p>접수된 신청은 본사 관리에 승인대기 상태로 들어와요.</p>' },
    { id: 'sec4', label: '푸터 이용약관·개인정보처리방침', html:
      '<p>홈페이지 맨 아래 푸터에서 이용약관과 개인정보처리방침 페이지로 이동해요.</p>' +
      adminInlineShot('home-footer-pc', '09SCM 홈페이지 푸터 PC 화면', '09SCM 홈페이지 푸터 화면', '100%') +
      adminCaseTable('푸터에서 이동하는 페이지', [
        { title: '이용약관을 누르면', shot: 'home-terms-pc', alt: '09SCM 홈페이지 이용약관 PC 화면', caption: '09SCM 홈페이지 이용약관 화면',
          html: '<ul>' +
            '<li>시행일, 버전: 현재 시행본의 시행일과 버전</li>' +
            '<li>시행본: 이용약관 본문</li>' +
            '<li>약관 내용: 통합관리자의 <a href="#system-terms">약관 관리</a>에서 관리</li>' +
          '</ul>' },
        { title: '개인정보처리방침을 누르면', shot: 'home-privacy-pc', alt: '09SCM 홈페이지 개인정보처리방침 PC 화면', caption: '09SCM 홈페이지 개인정보처리방침 화면',
          html: '<ul>' +
            '<li>시행일, 버전: 현재 시행본의 시행일과 버전</li>' +
            '<li>시행본: 개인정보처리방침 본문</li>' +
            '<li>약관 내용: 통합관리자의 <a href="#system-terms">약관 관리</a>에서 관리</li>' +
          '</ul>' }
      ]) }
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
      '<li>비밀번호를 5회 연속 틀리면 계정이 잠겨요.</li>' +
    '</ul>',
  steps:
    '<h3>로그인하기</h3>' +
    '<ol>' +
      '<li><b>입력하기</b> 아이디와 비밀번호를 입력해요. 비밀번호는 입력한 값이 가려져서 보여요.</li>' +
      '<li><b>자동등록방지 입력하기</b> 이미지에 보이는 숫자 6자리를 입력해요. 숫자가 잘 안 보이면 [새로고침]을 눌러 새 숫자로 바꿔요.</li>' +
      '<li><b>로그인하기</b> [로그인]을 누르거나 입력칸에서 Enter를 눌러요. 로그인하면 대시보드가 열려요.</li>' +
    '</ol>' +
    '<h3>입력 항목</h3>' +
    '<div class="table-wrap"><table class="wide">' +
      '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>아이디</td><td>로그인할 때 쓰는 아이디</td></tr>' +
        '<tr><td>비밀번호</td><td>입력값 가림 처리</td></tr>' +
        '<tr><td>자동등록방지</td><td>이미지의 숫자 6자리 입력 (숫자만 입력 가능, [새로고침]으로 새 숫자 생성)</td></tr>' +
      '</tbody></table></div>' +
    '<h3>버튼</h3>' +
    '<div class="table-wrap"><table class="wide">' +
      '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>[로그인]</td><td>입력한 내용으로 로그인 시도 (입력칸에서 Enter로도 가능)</td></tr>' +
      '</tbody></table></div>' +
    '<p>로그인에 성공하면 이전에 보던 메뉴, 검색어, 필터, 선택 상태는 이어지지 않고 대시보드부터 시작해요. 로그인하면 화면 맨 위 오른쪽에 로그인한 계정의 정보가 표시돼요. 자세한 내용은 <a href="#start-intro/sec5">공통 영역 보기</a>에서 확인해주세요.</p>' +
    '<p>입력이 맞지 않으면 로그인되지 않아요. 안내 문구는 <a href="#start-login/cases">상황별로 달라져요</a>에서 확인해주세요.</p>',
  cases: [
    {
      title: '입력이 맞지 않으면',
      shots: [{ device: 'pc', src: IMG_ADMIN + 'login-error-pw-pc.webp', alt: '09SCM 통합관리자 로그인 오류 PC 화면', ratio: 864 / 922 }],
      shotCaption: '09SCM 통합관리자 로그인 오류 화면',
      html:
        '<p>안내 문구가 [로그인] 버튼 위에 한 줄로 나와요.</p>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>확인 순서</td><td>아이디, 비밀번호, 자동등록방지 순서 (앞 단계에서 걸리면 다음 단계는 확인하지 않음)</td></tr>' +
            '<tr><td>안내가 나온 뒤</td><td>비밀번호와 자동등록방지 입력값 비움, 자동등록방지 숫자 새로 생성</td></tr>' +
            '<tr><td>비밀번호 오류 횟수</td><td>아이디는 맞고 비밀번호가 다르면 1회 추가 (로그인에 성공하면 0으로 초기화, 5회 연속 틀리면 계정 잠김)</td></tr>' +
            '<tr><td>잠긴 계정</td><td>올바른 비밀번호도 로그인 불가 (운영 담당자에게 잠금 해제 요청)</td></tr>' +
          '</tbody></table></div>' +
        '<p>나오는 안내 문구는 아래와 같아요.</p>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>상황</th><th>안내 문구</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>아이디를 입력하지 않음</td><td>"아이디를 입력해 주세요."</td></tr>' +
            '<tr><td>비밀번호를 입력하지 않음</td><td>"비밀번호를 입력해 주세요."</td></tr>' +
            '<tr><td>자동등록방지 숫자를 입력하지 않음</td><td>"자동등록방지 숫자를 입력해 주세요."</td></tr>' +
            '<tr><td>자동등록방지 숫자가 이미지와 다름</td><td>"자동등록방지 숫자가 일치하지 않습니다."</td></tr>' +
            '<tr><td>아이디가 없거나 비밀번호가 다름</td><td>"아이디 또는 비밀번호가 올바르지 않습니다."</td></tr>' +
            '<tr><td>비밀번호 5회 오류로 잠긴 계정</td><td>"비밀번호 5회 오류로 계정이 잠겼습니다. 운영 담당자에게 잠금 해제를 요청해 주세요."</td></tr>' +
          '</tbody></table></div>'
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
      '<div class="table-wrap"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody>' +
        '<tr><td>승인대기</td><td>도입신청이 접수되어 검토 전인 단계 (본사 계정과 소매몰은 아직 만들어지지 않음)</td></tr>' +
        '<tr><td>운영중</td><td>정상 운영 중인 본사 (운영중으로 처음 바뀌는 시점에 본사 계정과 소매몰 생성)</td></tr>' +
        '<tr><td>운영제한</td><td>운영 중이던 본사에 제한이 걸린 상태 (신규 가맹점 유치 중단 포함)</td></tr>' +
        '<tr><td>승인불가</td><td>도입신청을 승인하지 않은 상태</td></tr>' +
      '</tbody></table></div>' +
      '<h3>가맹점 이용상태</h3>' +
      '<div class="table-wrap"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody>' +
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
        '<tr><td>본사별 현황</td><td>본사별로 도소매 매출과 이용료 수납액을 보는 화면</td></tr>' +
        '<tr><td>가맹점별 현황</td><td>가맹점별로 도소매 매출을 보는 화면</td></tr>' +
        '<tr><td>실시간 집계</td><td>화면을 열거나 새로고침한 시점의 최신 값을 보여주는 방식 (한국 시간 기준)</td></tr>' +
      '</tbody></table></div>' },
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
    '<p>카드와 목록은 이번 달, 추이는 최근 6개월 기준이에요.</p>',
  steps:
    '<h3>집계 기준 시각</h3>' +
    '<p>화면 오른쪽 위에 "실시간 집계 (YY.MM.DD HH:MM)"가 표시돼요. 화면을 열거나 새로고침한 시각의 최신 값이고, 한국 시간 기준이에요. 최신 데이터를 보려면 새로고침해요.</p>' +

    '<h3>본사·가맹점 카드</h3>' +
    '<div class="table-wrap"><table class="wide">' +
      '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>승인 대기 본사</td><td>상태가 [승인대기]인 본사 수</td></tr>' +
        '<tr><td>운영 본사</td><td>[운영중]과 [운영제한] 본사 수 (전체 본사는 [승인대기]·[승인불가]를 포함한 등록된 모든 본사)</td></tr>' +
        '<tr><td>운영 가맹점</td><td>[이용승인]과 [이용제한] 가맹점 수 (전체 가맹점은 소속된 모든 가맹점)</td></tr>' +
        '<tr><td>당월 신규 가입 가맹점</td><td>가입신청일이 이번 달인 가맹점 수 (이용상태와 관계없이 집계)</td></tr>' +
      '</tbody></table></div>' +

    '<h3>당월 결제 카드</h3>' +
    '<p>이번 달에 결제가 완료된 금액이에요. 취소·환불을 빼기 전 금액이라서 취소·환불까지 반영한 매출액은 아래 월별 매출 추이에서 확인해요.</p>' +
    '<div class="table-wrap"><table class="wide">' +
      '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>당월 결제총액</td><td>이번 달 [결제완료] 금액 합계 ([결제완료] 주문 건수 포함)</td></tr>' +
        '<tr><td>당월 페이앱 결제액</td><td>결제수단이 카드결제(페이앱)인 결제총액 (결제총액 대비 비율 포함)</td></tr>' +
        '<tr><td>당월 현장결제·계좌이체 결제액</td><td>결제수단이 현장결제·계좌이체인 결제총액 (결제총액 대비 비율 포함)</td></tr>' +
        '<tr><td>당월 이용료 수납액</td><td>이용료 [결제완료]와 [수기완납] 금액의 합계</td></tr>' +
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
      '</tbody></table></div>' +
    '<p>취소·환불은 결제한 달이 아니라 취소·반품을 승인한 달에서 빼요. 지난달에 결제한 건을 이번 달에 취소하면 이번 달 매출에서 빠지고, 그 때문에 매출액이 마이너스가 될 수도 있어요.</p>' +
    '<p>정산이 끝난 카드결제 건은 환불을 요청한 날 취소·반품이 승인된 것으로 보기 때문에, 환불이 완료되기 전인 [환불대기] 상태에서도 그날의 취소·환불액에 들어가요.</p>' +

    '<h3>승인 대기 본사</h3>' +
    '<p>상태가 [승인대기]인 본사를 도입신청일시가 최근인 순서로 최대 5건 보여줘요. 제목 옆에 전체 건수가 표시되고, 5건이 넘으면 [본사 관리 보기 →]에서 전체를 확인해요.</p>' +
    '<div class="table-wrap"><table class="wide">' +
      '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>도입신청일시</td><td>본사가 도입신청한 일시</td></tr>' +
        '<tr><td>본사정보</td><td>상호명과 대표자명</td></tr>' +
        '<tr><td>회원정보</td><td>이름과 휴대폰번호</td></tr>' +
      '</tbody></table></div>' +

    '<h3>운영 현황</h3>' +
    '<div class="table-wrap"><table class="wide">' +
      '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>운영제한 본사</td><td>상태가 [운영제한]인 본사 수 (운영 본사 대비 비율 포함)</td></tr>' +
        '<tr><td>이용제한 가맹점</td><td>이용상태가 [이용제한]인 가맹점 수 (운영 가맹점 대비 비율 포함)</td></tr>' +
      '</tbody></table></div>',
  cases: [
    {
      title: '카드를 누르면',
      html:
        '<p>목록 하나로 바로 확인할 수 있는 항목만 눌러서 이동해요. 이동한 목록의 건수는 카드 숫자와 같아요.</p>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>승인 대기 본사 카드, [본사 관리 보기 →]</td><td><a href="#hq-list">본사 관리</a> 열기 (상태 필터 [승인대기] 적용)</td></tr>' +
            '<tr><td>승인 대기 본사 목록의 [상세보기]</td><td><a href="#hq-list">본사 관리</a>의 해당 본사 상세(신청정보 탭) 열기</td></tr>' +
            '<tr><td>운영제한 본사 카드</td><td><a href="#hq-list">본사 관리</a> 열기 (상태 필터 [운영제한] 적용)</td></tr>' +
            '<tr><td>이용제한 가맹점 카드</td><td><a href="#franchise-list">가맹점 정보</a> 열기 (이용상태 필터 [이용제한] 적용)</td></tr>' +
            '<tr><td>[거래/매출 현황 보기 →]</td><td><a href="#trade-all">거래/매출 현황</a> 열기 (이번달, 전체)</td></tr>' +
          '</tbody></table></div>' +
        '<p>이동한 화면에서 왼쪽 메뉴를 다시 누르면 적용된 필터가 사라져요.</p>'
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
      title: '본사나 가맹점이 삭제되었다면',
      html: '<p>삭제된 본사와 가맹점의 거래·매출 이력은 결제총액, 월별 매출 추이 같은 합계에 계속 포함돼요. 삭제된 가맹점은 가맹점 수를 세는 카드에서는 빠져요.</p>'
    }
  ],
  trouble:
    '<h3>숫자가 바로 바뀌지 않아요</h3>' +
    '<p>대시보드는 열거나 새로고침한 시점의 값을 보여줘요. 최신 값을 보려면 화면을 새로고침해요.</p>' +
    '<h3>다른 화면의 숫자와 달라 보여요</h3>' +
    '<p>대시보드의 수치는 본사 관리, 가맹점 정보, 거래/매출 현황의 수치와 같아야 해요. 화면마다 열어 둔 시점이 다르면 값이 다르게 보일 수 있으니 각 화면을 새로고침한 뒤 다시 비교해요.</p>'
};

// ---- 시스템 관리 > 약관 관리 ----
window.GUIDE_CONTENT['system-terms'] = {
  screens: [
    {
      id: 'main',
      label: '약관 관리 보기',
      shots: [
        { device: 'pc', src: IMG_ADMIN + 'terms-main-pc.webp', alt: '09SCM 통합관리자 약관 관리 PC 화면', ratio: 2880 / 1836 }
      ],
      shotCaption: '09SCM 통합관리자 약관 관리 화면',
      overview:
        '<p>09SCM 솔루션의 약관을 확인하고 개정하는 화면이에요. 탭마다 지금 적용 중인 약관(현재 시행본)과 이전 버전(개정 이력)이 나와요.</p>' +
        '<ul>' +
          '<li>이용약관, 개인정보처리방침, 마케팅정보 수신동의 3종을 탭으로 나눠 관리해요.</li>' +
          '<li>이 약관은 09SCM 홈페이지의 <a href="#start-home">솔루션 도입신청 약관 동의와 푸터</a>, 각 본사 소매몰의 가맹점 가입신청에서 함께 써요.</li>' +
          '<li>소매몰 이용자(소비자)가 회원가입할 때 보는 이용약관·개인정보처리방침은 이 화면에서 다루지 않아요. 각 소매몰에서 따로 관리해요. (<a href="partner.html#retail-settings/settings-terms">09SCM 관리자 이용가이드</a>)</li>' +
        '</ul>',
      steps:
        '<h3>탭</h3>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>탭</th><th>설명</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>이용약관</td><td>솔루션 이용 조건 (화면을 처음 열면 이 탭이 열림)</td></tr>' +
            '<tr><td>개인정보처리방침</td><td>개인정보 처리 기준</td></tr>' +
            '<tr><td>마케팅정보 수신동의</td><td>도입신청·가맹점 가입신청에서 선택으로 동의받는 문서</td></tr>' +
          '</tbody></table></div>' +

        '<h3>현재 시행본</h3>' +
        '<p>탭에서 가장 최근에 등록한 버전을 읽기 전용으로 보여줘요.</p>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>버전</td><td>약관 종류별 등록 순서대로 정해진 버전</td></tr>' +
            '<tr><td>등록일시</td><td>개정을 등록한 일시</td></tr>' +
            '<tr><td>시행일</td><td>등록할 때 선택한 시행일</td></tr>' +
            '<tr><td>[개정 등록]</td><td>새 버전을 등록하는 <a href="#system-terms/register">약관 개정 등록하기</a> 화면으로 이동</td></tr>' +
          '</tbody></table></div>' +

        '<h3>개정 이력</h3>' +
        '<p>현재 시행본을 뺀 이전 버전을 최신순으로 한 페이지에 20건씩 보여줘요.</p>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>번호</td><td>목록 순번 (최신 버전이 가장 큰 번호)</td></tr>' +
            '<tr><td>버전</td><td>약관 종류별 등록 순서대로 정해진 버전</td></tr>' +
            '<tr><td>등록일시</td><td>개정을 등록한 일시</td></tr>' +
            '<tr><td>시행일</td><td>등록할 때 선택한 시행일</td></tr>' +
            '<tr><td>등록자</td><td>개정을 등록한 운영자</td></tr>' +
            '<tr><td>관리</td><td>[상세보기] 버튼 (이전 버전 내용을 팝업으로 확인)</td></tr>' +
          '</tbody></table></div>',
      cases: [
        {
          title: '이전 버전을 확인할 때',
          shots: [{ device: 'pc', src: IMG_ADMIN + 'terms-detail-pc.webp', alt: '09SCM 통합관리자 약관 개정 이력 상세 PC 화면', ratio: 904 / 1390 }],
          shotCaption: '09SCM 통합관리자 약관 개정 이력 상세 화면',
          html:
            '<p>개정 이력의 [상세보기]를 누르면 팝업이 열려요. 확인만 할 수 있어요.</p>' +
            '<div class="table-wrap"><table class="wide">' +
              '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
              '<tbody>' +
                '<tr><td>버전, 등록일시, 시행일, 등록자</td><td>개정 이력 목록과 같은 값</td></tr>' +
                '<tr><td>변경 사유</td><td>개정을 등록할 때 입력한 사유 (이 팝업에서만 확인)</td></tr>' +
                '<tr><td>본문</td><td>그 버전의 약관 내용</td></tr>' +
              '</tbody></table></div>' +
            '<p>[닫기]를 누르면 보던 탭과 목록 페이지가 그대로 유지돼요.</p>'
        },
        {
          title: '개정 이력이 없으면',
          shots: [{ device: 'pc', src: IMG_ADMIN + 'terms-no-history-pc.webp', alt: '09SCM 통합관리자 약관 개정 이력 없음 PC 화면', ratio: 2384 / 648 }],
          shotCaption: '09SCM 통합관리자 약관 개정 이력 없음 화면',
          html:
            '<ul>' +
              '<li>현재 시행본만 등록된 약관: 개정 이력에 "등록된 개정 이력이 없습니다." 안내</li>' +
              '<li>등록된 버전이 없는 약관: 현재 시행본에 "등록된 약관이 없습니다." 안내</li>' +
            '</ul>'
        }
      ],
      trouble:
        '<h3>방금 등록한 버전이 개정 이력에 안 보여요</h3>' +
        '<p>가장 최근에 등록한 버전은 현재 시행본에 나와요. 개정 이력에는 그 이전 버전만 나와요.</p>'
    },
    {
      id: 'register',
      label: '약관 개정 등록하기',
      shots: [
        { device: 'pc', src: IMG_ADMIN + 'terms-reg-pc.webp', alt: '09SCM 통합관리자 약관 개정 등록 PC 화면', ratio: 2880 / 1800 }
      ],
      shotCaption: '09SCM 통합관리자 약관 개정 등록 화면',
      overview:
        '<p>약관의 새 버전을 등록하는 화면이에요. 약관 관리의 [개정 등록]을 누르면 열려요. 제목에 약관 종류가 함께 표시돼요. 예) 이용약관 개정 등록</p>' +
        '<ul>' +
          '<li>등록하면 바로 새 버전이 현재 시행본으로 바뀌고, 이전 버전은 개정 이력으로 이동해요.</li>' +
          '<li>등록한 버전은 수정하거나 삭제할 수 없어요.</li>' +
          '<li>개정을 등록해도 공지사항은 자동으로 만들어지지 않아요.</li>' +
        '</ul>',
      steps:
        '<h3>입력 항목</h3>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>약관 종류</td><td>진입한 탭의 약관 종류 (변경 불가)</td></tr>' +
            '<tr><td>버전</td><td>약관 종류별 등록 순서대로 자동으로 정해지는 버전 (변경 불가)</td></tr>' +
            '<tr><td>시행일 *</td><td>약관을 시행하는 날짜 (달력에서 선택, 등록일과 달라도 되고 과거·미래 날짜 제한 없음, 등록한 즉시 교체되며 시행일에 맞춰 교체되지는 않음)</td></tr>' +
            '<tr><td>변경 사유 *</td><td>개정한 이유 (개정 이력 상세에서만 확인)</td></tr>' +
            '<tr><td>내용 *</td><td>약관 본문 (서식 에디터로 입력)</td></tr>' +
            '<tr><td>[현재 시행본 불러오기]</td><td>현재 시행본의 본문을 에디터에 채움</td></tr>' +
          '</tbody></table></div>' +
        '<p>*는 필수 항목이에요.</p>' +

        '<h3>하단 버튼</h3>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>[취소]</td><td>해당 탭으로 돌아감</td></tr>' +
            '<tr><td>[등록]</td><td>등록 확인 후 새 버전을 현재 시행본으로 등록</td></tr>' +
          '</tbody></table></div>',
      cases: [
        {
          title: '필수 항목이 비어 있으면',
          shots: [{ device: 'pc', src: IMG_ADMIN + 'terms-reg-error-pc.webp', alt: '09SCM 통합관리자 약관 개정 등록 입력 오류 PC 화면', ratio: 2848 / 1128 }],
          shotCaption: '09SCM 통합관리자 약관 개정 등록 입력 오류 화면',
          html:
            '<p>[등록]을 눌러도 저장되지 않고, 비어 있는 항목 아래에 안내가 나와요. 나오는 안내 문구는 아래와 같아요.</p>' +
            '<div class="table-wrap"><table class="wide">' +
              '<thead><tr><th>상황</th><th>안내 문구</th></tr></thead>' +
              '<tbody>' +
                '<tr><td>시행일을 선택하지 않고 [등록]을 누름</td><td>"시행일을 입력해 주세요."</td></tr>' +
                '<tr><td>변경 사유를 입력하지 않고 [등록]을 누름</td><td>"변경 사유를 입력해 주세요."</td></tr>' +
                '<tr><td>내용을 입력하지 않고 [등록]을 누름</td><td>"내용을 입력해 주세요."</td></tr>' +
              '</tbody></table></div>'
        },
        {
          group: '확인·안내가 나올 때',
          rows: [
            {
              title: '덮어쓰기를 확인할 때',
              shots: [{ device: 'pc', src: IMG_ADMIN + 'terms-reg-overwrite-pc.webp', alt: '09SCM 통합관리자 약관 개정 등록 덮어쓰기 확인 PC 화면', ratio: 904 / 348 }],
              shotCaption: '09SCM 통합관리자 약관 개정 등록 덮어쓰기 확인 화면',
              html:
                '<ul>' +
                  '<li>조건: 입력한 내용이 있는 상태에서 [현재 시행본 불러오기]를 누름</li>' +
                  '<li>[덮어쓰기]: 입력한 내용을 현재 시행본의 본문으로 바꿈</li>' +
                  '<li>[취소]: 입력한 내용을 그대로 두고 확인 창을 닫음</li>' +
                '</ul>'
            },
            {
              title: '작성 취소를 확인할 때',
              shots: [{ device: 'pc', src: IMG_ADMIN + 'terms-reg-leave-pc.webp', alt: '09SCM 통합관리자 약관 개정 등록 작성 취소 확인 PC 화면', ratio: 904 / 350 }],
              shotCaption: '09SCM 통합관리자 약관 개정 등록 작성 취소 확인 화면',
              html:
                '<ul>' +
                  '<li>조건: 입력한 내용이 있는 상태에서 [취소]나 [← 목록으로]를 누름</li>' +
                  '<li>[나가기]: 입력한 내용을 저장하지 않고 해당 탭으로 돌아감</li>' +
                  '<li>[취소]: 확인 창을 닫고 작성 화면에 그대로 머묾</li>' +
                  '<li>입력한 내용이 없을 때: 확인 없이 바로 돌아감</li>' +
                '</ul>'
            },
            {
              title: '등록을 확인할 때',
              shots: [{ device: 'pc', src: IMG_ADMIN + 'terms-reg-confirm-pc.webp', alt: '09SCM 통합관리자 약관 개정 등록 확인 PC 화면', ratio: 904 / 386 }],
              shotCaption: '09SCM 통합관리자 약관 개정 등록 확인 화면',
              html:
                '<ul>' +
                  '<li>조건: 필수 항목을 모두 입력하고 [등록]을 누름</li>' +
                  '<li>안내: 등록 즉시 현재 시행본으로 교체, 이후 수정·삭제 불가, 이전 시행본은 개정 이력으로 이동</li>' +
                  '<li>[등록]: 새 버전을 등록</li>' +
                  '<li>[취소]: 확인 창을 닫고 작성 화면에 그대로 머묾</li>' +
                '</ul>'
            },
            {
              title: '등록이 끝나면',
              shots: [{ device: 'pc', src: IMG_ADMIN + 'terms-reg-done-pc.webp', alt: '09SCM 통합관리자 약관 개정 등록 완료 안내 PC 화면', ratio: 904 / 210 }],
              shotCaption: '09SCM 통합관리자 약관 개정 등록 완료 안내 화면',
              html: '<ul><li>이동: 해당 탭으로 돌아감</li><li>안내: "저장되었습니다." 잠시 표시</li></ul>'
            }
          ]
        }
      ],
      trouble:
        '<h3>잘못 등록한 약관을 고치고 싶어요</h3>' +
        '<p>등록한 버전은 수정하거나 삭제할 수 없어요. 새 버전을 다시 등록하면 그 버전이 현재 시행본이 되고, 잘못 등록한 버전은 개정 이력에 남아요.</p>' +
        '<h3>개정했는데 안내가 따로 가지 않아요</h3>' +
        '<p>약관을 개정해도 공지사항은 자동으로 만들어지지 않아요. 개정을 미리 알려야 하면 <a href="#system-notice">공지사항</a>을 따로 등록해요.</p>'
    }
  ]
};

// ---- 시스템 관리 > 공지사항 ----
window.GUIDE_CONTENT['system-notice'] = {
  screens: [
    {
      id: 'list',
      label: '공지사항 보기',
      shots: [
        { device: 'pc', src: IMG_ADMIN + 'notice-list-pc.webp', alt: '09SCM 통합관리자 공지사항 PC 화면', ratio: 2880 / 1800 }
      ],
      shotCaption: '09SCM 통합관리자 공지사항 화면',
      overview:
        '<p>09SCM 운영자가 본사·가맹점 관리자에게 전하는 공지를 올리고 관리하는 화면이에요.</p>' +
        '<ul>' +
          '<li>이 목록에는 통합관리자에서 올린 09SCM 공지만 나와요. 본사가 가맹점에게 올린 공지(우리본사 공지)는 나오지 않아요. (<a href="partner.html#franchise-notice">09SCM 관리자 이용가이드</a>)</li>' +
          '<li>노출대상(공지가 보이는 계정)과 노출여부(공지를 보여줄지 여부)는 따로 정해요. [미노출]이면 노출대상과 관계없이 09SCM 어디에도 보이지 않아요.</li>' +
        '</ul>',
      steps:
        '<h3>상단 버튼</h3>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>[+ 공지사항 등록]</td><td>새 공지를 올리는 <a href="#system-notice/form">공지사항 등록·수정하기</a> 화면으로 이동</td></tr>' +
            '<tr><td>[삭제]</td><td>체크박스로 고른 공지를 한 번에 삭제 (고른 공지가 없으면 누를 수 없음)</td></tr>' +
          '</tbody></table></div>' +

        '<h3>공지 찾기</h3>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>노출여부</td><td>전체, 노출, 미노출 중 선택</td></tr>' +
            '<tr><td>검색</td><td>제목으로 검색 (영문 대소문자 구분 없음, [검색]을 누르거나 Enter를 눌러야 반영)</td></tr>' +
            '<tr><td>노출대상 탭</td><td>전체, 본사, 본사/가맹점 중 선택</td></tr>' +
          '</tbody></table></div>' +
        '<p>고른 조건에 모두 맞는 공지만 보여줘요. 목록은 등록일이 최근인 공지부터 한 페이지에 20건씩 보여줘요.</p>' +
        '<p>목록 위에는 조건에 맞는 공지 수(전체)와 체크한 공지 수(선택)를 "전체 N건 | 선택 N건"으로 보여줘요.</p>' +
        '<p>상세·등록·수정 화면에서 목록으로 돌아오면 조건과 페이지가 유지돼요.</p>' +

        '<h3>목록 항목</h3>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>체크박스</td><td>삭제할 공지 선택 (헤더 체크박스는 현재 페이지 전체 선택, 페이지를 넘기면 선택 해제)</td></tr>' +
            '<tr><td>번호</td><td>지금 보이는 목록의 순번 (맨 위 공지가 가장 큰 번호, 공지 고유 번호 아님)</td></tr>' +
            '<tr><td>제목</td><td>공지 제목 (첨부파일이 있으면 아이콘 표시, 누르면 <a href="#system-notice/detail">공지사항 상세 보기</a>로 이동)</td></tr>' +
            '<tr><td>노출대상</td><td>공지가 보이는 계정 (본사 / 본사/가맹점)</td></tr>' +
            '<tr><td>노출여부</td><td>공지를 보여줄지 여부 (노출 / 미노출)</td></tr>' +
            '<tr><td>작성자</td><td>공지를 올린 운영자</td></tr>' +
            '<tr><td>등록일</td><td>공지 등록일 (등록·수정할 때 운영자가 정한 날짜, 목록 정렬 기준)</td></tr>' +
            '<tr><td>조회수</td><td>09SCM 본사·가맹점 관리자가 공지 상세를 연 횟수</td></tr>' +
            '<tr><td>관리</td><td>[상세보기], [수정], [삭제] 버튼</td></tr>' +
          '</tbody></table></div>' +

        '<h3>노출 범위</h3>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>노출대상</th><th>노출여부</th><th>설명</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>본사</td><td>노출</td><td>09SCM 본사 계정 전체에 노출</td></tr>' +
            '<tr><td>본사/가맹점</td><td>노출</td><td>09SCM 본사 계정 전체와 소속 가맹점 계정 전체에 노출</td></tr>' +
            '<tr><td>본사, 본사/가맹점</td><td>미노출</td><td>어느 계정에도 노출되지 않음</td></tr>' +
          '</tbody></table></div>',
      cases: [
        {
          group: '데이터가 없을 때',
          rows: [
            {
              title: '검색 결과가 없으면',
              shots: [{ device: 'pc', src: IMG_ADMIN + 'notice-empty-search-pc.webp', alt: '09SCM 통합관리자 공지사항 검색 결과 없음 PC 화면', ratio: 2848 / 702 }],
              shotCaption: '09SCM 통합관리자 공지사항 검색 결과 없음 화면',
              html: '<ul><li>안내: "검색 결과가 없습니다."</li><li>건수: 전체 0건 | 선택 0건</li></ul>'
            },
            {
              title: '등록된 공지가 없으면',
              shots: [{ device: 'pc', src: IMG_ADMIN + 'notice-empty-all-pc.webp', alt: '09SCM 통합관리자 등록된 공지 없음 PC 화면', ratio: 2848 / 702 }],
              shotCaption: '09SCM 통합관리자 등록된 공지 없음 화면',
              html: '<ul><li>안내: "등록된 공지사항이 없습니다."</li><li>건수: 전체 0건 | 선택 0건</li></ul>'
            }
          ]
        },
        {
          group: '확인·안내가 나올 때',
          rows: [
            {
              title: '삭제를 확인할 때',
              shots: [{ device: 'pc', src: IMG_ADMIN + 'notice-delete-pc.webp', alt: '09SCM 통합관리자 공지사항 삭제 확인 PC 화면', ratio: 904 / 350 }],
              shotCaption: '09SCM 통합관리자 공지사항 삭제 확인 화면',
              html:
                '<ul>' +
                  '<li>조건: 관리 컬럼의 [삭제]를 누름</li>' +
                  '<li>안내: "공지사항을 삭제하시겠습니까?", "삭제한 데이터는 복구할 수 없습니다. 신중하게 삭제해 주세요."</li>' +
                  '<li>[삭제]: 공지와 첨부파일을 삭제, 09SCM에서도 해당 공지가 사라짐</li>' +
                  '<li>[취소]: 확인 창을 닫음</li>' +
                '</ul>'
            },
            {
              title: '선택한 공지의 삭제를 확인할 때',
              shots: [{ device: 'pc', src: IMG_ADMIN + 'notice-bulk-delete-pc.webp', alt: '09SCM 통합관리자 공지사항 선택 삭제 확인 PC 화면', ratio: 904 / 350 }],
              shotCaption: '09SCM 통합관리자 공지사항 선택 삭제 확인 화면',
              html:
                '<ul>' +
                  '<li>조건: 체크박스로 공지를 고르고 상단 [삭제]를 누름</li>' +
                  '<li>안내: "선택한 N건을 삭제하시겠습니까?", "삭제한 데이터는 복구할 수 없습니다. 신중하게 삭제해 주세요."</li>' +
                  '<li>[삭제]: 고른 공지와 첨부파일을 모두 삭제</li>' +
                  '<li>[취소]: 확인 창을 닫음</li>' +
                '</ul>'
            },
            {
              title: '삭제가 끝나면',
              shots: [{ device: 'pc', src: IMG_ADMIN + 'notice-deleted-pc.webp', alt: '09SCM 통합관리자 공지사항 삭제 완료 안내 PC 화면', ratio: 904 / 210 }],
              shotCaption: '09SCM 통합관리자 공지사항 삭제 완료 안내 화면',
              html: '<ul><li>이동: 공지사항 목록 (상세 화면에서 삭제해도 목록으로 이동)</li><li>안내: "삭제되었습니다." 잠시 표시</li></ul>'
            }
          ]
        }
      ],
      trouble:
        '<h3>올린 공지가 본사·가맹점에게 보이지 않아요</h3>' +
        '<p>노출여부가 [미노출]이면 어디에도 보이지 않고, 노출대상이 [본사]이면 가맹점에는 보이지 않아요. 공지를 수정해서 두 값을 확인해요.</p>' +
        '<h3>조회수가 오르지 않아요</h3>' +
        '<p>조회수는 09SCM 본사·가맹점 관리자가 공지 상세를 열 때만 올라요. 통합관리자에서 연 횟수는 집계하지 않아요.</p>'
    },
    {
      id: 'detail',
      label: '공지사항 상세 보기',
      shots: [
        { device: 'pc', src: IMG_ADMIN + 'notice-detail-pc.webp', alt: '09SCM 통합관리자 공지사항 상세 PC 화면', ratio: 2880 / 1800 }
      ],
      shotCaption: '09SCM 통합관리자 공지사항 상세 화면',
      overview:
        '<p>올린 공지의 내용을 확인하는 화면이에요. 공지사항 보기에서 공지 제목이나 [상세보기]를 누르면 열려요.</p>',
      steps:
        '<h3>상단 버튼</h3>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>[← 목록으로]</td><td>공지사항 목록으로 이동 (하단 [목록]과 같음)</td></tr>' +
          '</tbody></table></div>' +

        '<h3>공지 정보</h3>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>제목</td><td>공지 제목</td></tr>' +
            '<tr><td>노출대상</td><td>본사 / 본사/가맹점</td></tr>' +
            '<tr><td>노출여부</td><td>노출 / 미노출</td></tr>' +
            '<tr><td>작성자</td><td>공지를 올린 운영자</td></tr>' +
            '<tr><td>등록일</td><td>공지 등록일 (등록·수정할 때 운영자가 정한 날짜)</td></tr>' +
            '<tr><td>조회수</td><td>09SCM 본사·가맹점 관리자가 공지 상세를 연 횟수</td></tr>' +
            '<tr><td>첨부파일</td><td>첨부된 파일의 이름과 용량 (없으면 "첨부파일 없음")</td></tr>' +
          '</tbody></table></div>' +

        '<h3>공지 내용</h3>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>내용</td><td>입력한 서식 그대로 보여주는 공지 본문 (읽기 전용)</td></tr>' +
          '</tbody></table></div>' +

        '<h3>하단 버튼</h3>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>[목록]</td><td>공지사항 목록으로 이동 (고른 조건과 페이지 유지)</td></tr>' +
            '<tr><td>[수정]</td><td>이 공지를 고치는 <a href="#system-notice/form">공지사항 등록·수정하기</a> 화면으로 이동</td></tr>' +
            '<tr><td>[삭제]</td><td>삭제 확인 창을 거쳐 삭제하고 목록으로 이동 (확인 창은 <a href="#system-notice/list">공지사항 보기</a>의 삭제 확인과 같음)</td></tr>' +
          '</tbody></table></div>',
      cases: [
        {
          title: '첨부파일이 없으면',
          shots: [{ device: 'pc', src: IMG_ADMIN + 'notice-detail-nofile-pc.webp', alt: '09SCM 통합관리자 공지사항 첨부파일 없음 PC 화면', ratio: 2848 / 508 }],
          shotCaption: '09SCM 통합관리자 공지사항 첨부파일 없음 화면',
          html: '<ul><li>첨부파일: "첨부파일 없음" 표시</li></ul>'
        }
      ]
    },
    {
      id: 'form',
      label: '공지사항 등록·수정하기',
      shots: [
        { device: 'pc', src: IMG_ADMIN + 'notice-form-pc.webp', alt: '09SCM 통합관리자 공지사항 등록 PC 화면', ratio: 2880 / 1800 }
      ],
      shotCaption: '09SCM 통합관리자 공지사항 등록 화면',
      overview:
        '<p>공지를 새로 올리거나 올린 공지를 고치는 화면이에요. 공지사항 보기의 [+ 공지사항 등록]을 누르면 등록, [수정]을 누르면 수정으로 열려요. 등록과 수정은 같은 항목을 써요.</p>' +
        '<ul>' +
          '<li>작성자는 공지를 처음 올린 운영자이고, 수정해도 바뀌지 않아요.</li>' +
        '</ul>',
      steps:
        '<h3>상단 버튼</h3>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>[← 목록으로]</td><td>작성을 마치지 않고 돌아감 (하단 [취소]와 같음)</td></tr>' +
          '</tbody></table></div>' +

        '<h3>입력 항목</h3>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>노출대상 *</td><td>본사, 본사/가맹점 중 선택 (본사는 본사 계정에만, 본사/가맹점은 소속 가맹점까지 노출)</td></tr>' +
            '<tr><td>노출여부 *</td><td>노출, 미노출 중 선택 (미노출은 어느 계정에도 노출되지 않음)</td></tr>' +
            '<tr><td>등록일 *</td><td>공지 등록일 (달력에서 선택, 처음에는 오늘 날짜, 목록 정렬 기준)</td></tr>' +
            '<tr><td>제목 *</td><td>공지 제목 (100자 이내)</td></tr>' +
            '<tr><td>내용 *</td><td>공지 본문 (서식 에디터로 입력)</td></tr>' +
            '<tr><td>첨부파일</td><td>공지에 첨부할 파일 ([파일 추가]로 선택, 최대 5개, 파일당 10MB 이내, 문서·이미지·압축 파일, 실행 파일 불가)</td></tr>' +
          '</tbody></table></div>' +
        '<p>*는 필수 항목이에요.</p>' +

        '<h3>하단 버튼</h3>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>항목</th><th>설명</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>[취소]</td><td>작성을 마치지 않고 돌아감 (등록은 공지사항 목록, 수정은 해당 공지 상세)</td></tr>' +
            '<tr><td>[등록]</td><td>새 공지를 저장하고 공지사항 목록으로 이동 (등록할 때만 표시)</td></tr>' +
            '<tr><td>[저장]</td><td>고친 내용을 저장하고 해당 공지 상세로 이동 (수정할 때만 표시)</td></tr>' +
          '</tbody></table></div>',
      cases: [
        {
          title: '올린 공지를 수정할 때',
          shots: [{ device: 'pc', src: IMG_ADMIN + 'notice-edit-pc.webp', alt: '09SCM 통합관리자 공지사항 수정 PC 화면', ratio: 2848 / 1408 }],
          shotCaption: '09SCM 통합관리자 공지사항 수정 화면',
          html:
            '<ul>' +
              '<li>입력 항목: 올린 내용이 채워진 채로 열림</li>' +
              '<li>첨부파일: 올린 파일마다 [삭제]로 개별 삭제, [파일 추가]로 추가</li>' +
              '<li>노출 반영: 노출대상이나 노출여부를 바꾸고 [저장]하면 09SCM에 바로 반영</li>' +
            '</ul>'
        },
        {
          title: '필수 항목이 비어 있으면',
          shots: [{ device: 'pc', src: IMG_ADMIN + 'notice-form-error-pc.webp', alt: '09SCM 통합관리자 공지사항 입력 오류 PC 화면', ratio: 2848 / 1364 }],
          shotCaption: '09SCM 통합관리자 공지사항 입력 오류 화면',
          html:
            '<p>[등록]이나 [저장]을 눌러도 저장되지 않고, 비어 있는 항목 아래에 안내가 나와요. 나오는 안내 문구는 아래와 같아요.</p>' +
            '<div class="table-wrap"><table class="wide">' +
              '<thead><tr><th>상황</th><th>안내 문구</th></tr></thead>' +
              '<tbody>' +
                '<tr><td>노출대상을 선택하지 않음</td><td>"노출대상을 선택해 주세요."</td></tr>' +
                '<tr><td>노출여부를 선택하지 않음</td><td>"노출여부를 선택해 주세요."</td></tr>' +
                '<tr><td>등록일을 선택하지 않음</td><td>"등록일을 선택해 주세요."</td></tr>' +
                '<tr><td>제목을 입력하지 않음</td><td>"제목을 입력해 주세요."</td></tr>' +
                '<tr><td>내용을 입력하지 않음</td><td>"내용을 입력해 주세요."</td></tr>' +
              '</tbody></table></div>'
        },
        {
          title: '첨부파일을 추가하지 못하면',
          shots: [{ device: 'pc', src: IMG_ADMIN + 'notice-attach-error-pc.webp', alt: '09SCM 통합관리자 공지사항 첨부파일 오류 PC 화면', ratio: 2848 / 240 }],
          shotCaption: '09SCM 통합관리자 공지사항 첨부파일 오류 화면',
          html:
            '<p>파일을 고르는 즉시 파일 아래에 안내가 나오고, 해당 파일은 추가되지 않아요. 나오는 안내 문구는 아래와 같아요.</p>' +
            '<div class="table-wrap"><table class="wide">' +
              '<thead><tr><th>상황</th><th>안내 문구</th></tr></thead>' +
              '<tbody>' +
                '<tr><td>허용되지 않는 형식의 파일 (실행 파일 등)</td><td>"{파일명}: 허용되지 않는 형식입니다."</td></tr>' +
                '<tr><td>파일 용량이 10MB를 넘음</td><td>"{파일명}: 파일당 10MB 이내만 추가할 수 있습니다."</td></tr>' +
                '<tr><td>이미 5개를 추가한 상태에서 파일 추가</td><td>"첨부파일은 최대 5개까지 추가할 수 있습니다."</td></tr>' +
              '</tbody></table></div>'
        },
        {
          group: '확인·안내가 나올 때',
          rows: [
            {
              title: '작성 취소를 확인할 때',
              shots: [{ device: 'pc', src: IMG_ADMIN + 'notice-leave-pc.webp', alt: '09SCM 통합관리자 공지사항 작성 취소 확인 PC 화면', ratio: 904 / 350 }],
              shotCaption: '09SCM 통합관리자 공지사항 작성 취소 확인 화면',
              html:
                '<ul>' +
                  '<li>조건: 입력한 내용이 있는 상태에서 [취소]나 [← 목록으로]를 누름</li>' +
                  '<li>[나가기]: 입력한 내용을 저장하지 않고 돌아감 (등록은 공지사항 목록, 수정은 해당 공지 상세)</li>' +
                  '<li>[취소]: 확인 창을 닫고 작성 화면에 그대로 머묾</li>' +
                  '<li>입력한 내용이 없을 때: 확인 없이 바로 돌아감</li>' +
                '</ul>'
            },
            {
              title: '저장이 끝나면',
              shots: [{ device: 'pc', src: IMG_ADMIN + 'notice-saved-pc.webp', alt: '09SCM 통합관리자 공지사항 저장 완료 안내 PC 화면', ratio: 904 / 210 }],
              shotCaption: '09SCM 통합관리자 공지사항 저장 완료 안내 화면',
              html:
                '<ul>' +
                  '<li>이동: [등록]은 공지사항 목록, [저장]은 해당 공지 상세</li>' +
                  '<li>안내: "저장되었습니다." 잠시 표시</li>' +
                '</ul>'
            }
          ]
        }
      ],
      trouble:
        '<h3>공지를 삭제하지 않고 잠시 내리고 싶어요</h3>' +
        '<p>공지를 수정해서 노출여부를 [미노출]로 바꿔요. 삭제하면 09SCM에서도 사라지고 복구할 수 없어요.</p>'
    }
  ]
};
