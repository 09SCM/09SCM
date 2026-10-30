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
    '<p>정산이 끝난 카드결제 건은 취소·반품을 승인하면 환불이 끝나기 전([환불대기])에도 승인한 날의 취소·환불액에 들어가요.</p>' +

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


// ---- 거래/매출 현황 (전체 현황 · 본사별 현황 · 가맹점별 현황) ----
// 2열 설명표 — rows: [[항목, 설명], ...]
function tradeTable(rows, h1, h2) {
  return '<div class="table-wrap"><table class="wide">' +
    '<thead><tr><th>' + (h1 || '항목') + '</th><th>' + (h2 || '설명') + '</th></tr></thead><tbody>' +
    rows.map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td></tr>'; }).join('') +
    '</tbody></table></div>';
}
function tradeShot(name, alt, w, h) {
  return [{ device: 'pc', src: IMG_ADMIN + name + '.webp', alt: alt, ratio: w / h }];
}

// 조회 조건 영역 (세 화면 공통 안내에서 전체 현황이 기준)
var TRADE_STEPS_ALL =
  '<h3>상단 버튼</h3>' +
  tradeTable([
    ['[엑셀 다운로드]', '현재 조회 조건 기준 전체 데이터 내려받기']
  ]) +

  '<h3>조회 조건</h3>' +
  tradeTable([
    ['조회기간', '칩 6종 중 선택 (기본값 이번달, 시작일·종료일은 [기간]을 고를 때만 입력 가능)'],
    ['거래유형', '전체, 소매, 도매 중 선택 (기본값 전체, 이용료 수납액에는 적용되지 않음)']
  ]) +

  '<h3>조회기간 칩</h3>' +
  tradeTable([
    ['오늘', '오늘 0시부터 조회한 시점까지'],
    ['어제', '어제 하루'],
    ['이번주', '이번 주 월요일부터 오늘까지'],
    ['이번달', '이번 달 1일부터 오늘까지'],
    ['저번달', '지난달 1일부터 말일까지'],
    ['기간', '시작일과 종료일을 직접 선택']
  ]) +

  '<h3>조회 버튼</h3>' +
  tradeTable([
    ['[초기화]', '조회 조건을 기본값(이번달, 전체)으로 되돌림'],
    ['[조회]', '고른 조건으로 조회 (조건을 바꿔도 누르기 전에는 반영되지 않음)']
  ]) +

  '<h3>집계 기준 시각</h3>' +
  '<p>화면 위쪽에 "실시간 집계 (YY.MM.DD HH:MM)"가 표시돼요. 화면을 열거나 새로고침한 시각의 최신 값이고, 한국 시간 기준이에요. 자동으로 다시 불러오지 않으니 최신 값을 보려면 새로고침해요. 오늘 값은 조회한 시점까지의 값이에요.</p>' +

  '<h3>요약 카드</h3>' +
  '<p>조회기간과 거래유형에 맞는 값이에요. 결제가 완료된 건만 집계하고 미수납·결제대기 건은 제외해요.</p>' +
  tradeTable([
    ['결제총액', '결제완료 일시가 조회기간 안에 있는 주문의 결제금액 합계 (구매자가 부담한 카드수수료, 배달·배송비 포함, 결제완료 주문 건수를 "주문 N건"으로 함께 표시)'],
    ['취소·환불액', '취소·반품 승인 일시가 조회기간 안에 있는 건의 금액 합계 (환불대기 건 포함, 결제대기 상태에서 취소된 건은 제외, 건수를 "취소·환불 N건"으로 함께 표시)'],
    ['매출액', '결제총액 − 취소·환불액 (취소·환불액이 더 크면 마이너스)'],
    ['페이앱 결제액', '결제총액 중 결제수단이 카드결제(페이앱)인 금액'],
    ['현장결제·계좌이체 결제액', '결제총액 중 결제수단이 현장결제·계좌이체인 금액 (페이앱 결제액과 합하면 결제총액)'],
    ['이용료 수납액', '이용료 [결제완료]와 [수기완납] 금액 합계 (매출액에 포함하지 않음)']
  ]) +

  '<h3>추이 단위</h3>' +
  '<p>조회기간의 매출을 단위별로 묶어 차트와 표로 보여줘요.</p>' +
  tradeTable([
    ['일별', '하루 단위'],
    ['주별', '월요일부터 시작하는 한 주 단위 (조회기간의 처음과 끝에서 잘린 주는 조회기간 안의 구간만 집계)'],
    ['월별', '한 달 단위 (조회기간의 처음과 끝에서 잘린 달은 조회기간 안의 구간만 집계)']
  ], '탭', '설명') +

  '<h3>추이 차트</h3>' +
  tradeTable([
    ['페이앱 매출액', '그 기간의 카드결제(페이앱) 결제총액 − 같은 결제수단의 취소·환불액'],
    ['현장결제·계좌이체 매출액', '그 기간의 현장결제·계좌이체 결제총액 − 같은 결제수단의 취소·환불액'],
    ['총매출액', '그 기간의 결제총액 − 취소·환불액'],
    ['이용료 수납액', '그 기간에 받은 이용료 합계 (매출에 포함하지 않음, 전체·본사 조회에서만 표시)']
  ]) +
  '<p>기간이 길어 차트가 영역보다 넓어지면 좌우로 밀어서 봐요. 처음에는 가장 최근 기간이 보여요.</p>' +

  '<h3>추이 표</h3>' +
  '<p>맨 위 합계 행은 조회기간 전체의 합이고, 아래로 최근 기간부터 한 페이지에 10행씩 보여줘요. 추이 단위를 바꾸면 1페이지로 돌아가요.</p>' +
  tradeTable([
    ['기간', '묶음 단위의 기간'],
    ['페이앱 매출액, 현장결제·계좌이체 매출액, 총매출액', '추이 차트와 같은 값'],
    ['주문건수', '결제완료 주문 건수 (주문접수일시 기준인 09SCM 관리자 통합매출조회의 주문건수와는 기준이 다름)'],
    ['취소·환불건수', '취소·환불액에 포함된 건수'],
    ['이용료 수납액', '그 기간에 받은 이용료 합계 (전체·본사 조회에서만 표시)']
  ]);

window.GUIDE_CONTENT['trade-all'] = {
  shots: tradeShot('trade-all-pc', '09SCM 통합관리자 거래/매출 전체 현황 PC 화면', 2880, 3118),
  shotCaption: '09SCM 통합관리자 전체 현황 화면',
  overview:
    '<p>본사와 가맹점의 매출 데이터를 종합해서 보여주는 화면이에요. 결제, 취소·환불, 매출 현황과 기간별 매출 추이를 확인할 수 있어요.</p>' +
    '<ul>' +
      '<li>대시보드의 [거래/매출 현황 보기 →]을 누르면 이 화면으로 들어와요. 조회 조건은 기본값(이번달, 전체)이에요.</li>' +
      '<li>본사나 가맹점별로 따로 보려면 <a href="#trade-hq">본사별 현황</a>, <a href="#trade-franchise">가맹점별 현황</a> 탭을 사용해요.</li>' +
    '</ul>',
  steps: TRADE_STEPS_ALL,
  cases: [
    {
      title: '조회기간이 맞지 않으면',
      shots: tradeShot('trade-all-error-pc', '09SCM 통합관리자 조회기간 오류 PC 화면', 2848, 196),
      shotCaption: '09SCM 통합관리자 조회기간 오류 화면',
      html:
        '<p>[기간]을 고른 상태에서 입력이 맞지 않으면 조회하지 않고, 조회 조건 아래에 안내 문구가 나와요. 나오는 안내 문구는 아래와 같아요.</p>' +
        '<div class="table-wrap"><table class="wide">' +
          '<thead><tr><th>상황</th><th>안내 문구</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>시작일 또는 종료일을 입력하지 않음</td><td>"조회 시작일과 종료일을 모두 선택해 주세요."</td></tr>' +
            '<tr><td>시작일이 종료일보다 늦음</td><td>"조회 시작일은 종료일보다 이후일 수 없습니다."</td></tr>' +
          '</tbody></table></div>'
    },
    {
      title: '정산이 끝난 카드결제 건에 취소·반품이 있으면',
      html:
        '<ul>' +
          '<li>집계: 취소·반품을 승인한 날의 취소·환불액에 포함 ([환불대기] 상태에서도 포함)</li>' +
          '<li>환불 완료: [결제취소]로 바뀌어도 승인한 날 기준 그대로, 한 번만 집계</li>' +
        '</ul>'
    },
    {
      title: '본사나 가맹점이 삭제되었다면',
      html: '<p>삭제된 본사와 가맹점의 거래·매출·이용료 수납 이력은 전체 현황 합계에 계속 포함돼요. 본사별·가맹점별 현황 목록에는 나오지 않아요.</p>'
    }
  ],
  trouble:
    '<h3>대시보드나 본사·가맹점 정보의 숫자와 달라요</h3>' +
    '<p>대시보드, 본사 관리, 가맹점 정보의 당월 수치는 이 화면의 조회기간 [이번달], 거래유형 [전체] 값과 같아야 해요. 조건이 다르거나 화면을 연 시점이 다르면 값이 다르게 보이니, 같은 조건으로 새로고침한 뒤 다시 비교해요.</p>' +
    '<h3>매출액이 마이너스예요</h3>' +
    '<p>취소·환불은 결제한 달이 아니라 취소·반품을 승인한 달에 반영돼요. 지난달에 결제한 건을 이번 달에 취소하면 이번 달 취소·환불액이 결제총액보다 커질 수 있어요.</p>' +
    '<h3>조건을 바꿨는데 숫자가 그대로예요</h3>' +
    '<p>조건을 바꾼 뒤 [조회]를 눌러야 반영돼요. [초기화]를 누르면 이번달, 전체로 돌아가요.</p>'
};

// 본사별·가맹점별 현황 공통: 선택한 대상 헤더 + 이동 버튼
function tradeSelectedBlock(kind) {
  var isHq = kind === 'hq';
  return '<h3>선택한 ' + (isHq ? '본사' : '가맹점') + '</h3>' +
    tradeTable(isHq ? [
      ['상호명', '선택한 본사의 상호명'],
      ['운영상태', '[운영중] 또는 [운영제한]'],
      ['사업자번호', '선택한 본사의 사업자번호']
    ] : [
      ['상호명', '선택한 가맹점의 상호명'],
      ['이용상태', '[이용대기], [이용승인], [이용제한], [이용불가] 중 하나'],
      ['소속 본사', '가맹점이 속한 본사의 상호명'],
      ['사업자번호', '선택한 가맹점의 사업자번호']
    ]) +
    '<h3>이동 버튼</h3>' +
    tradeTable([
      [isHq ? '[본사 상세 이동 →]' : '[가맹점 상세 이동 →]', '선택한 ' + (isHq ? '본사' : '가맹점') + '의 상세 화면으로 이동'],
      ['[목록으로]', (isHq ? '본사별' : '가맹점별') + ' 현황 목록으로 돌아감 (직전 검색어와 페이지 유지)']
    ]);
}

window.GUIDE_CONTENT['trade-hq'] = {
  screens: [
    {
      id: 'list',
      label: '본사별 현황 보기',
      shots: tradeShot('trade-hq-list-pc', '09SCM 통합관리자 본사별 현황 PC 화면', 2880, 1800),
      shotCaption: '09SCM 통합관리자 본사별 현황 화면',
      overview:
        '<p>본사를 찾아 그 본사의 매출을 따로 보는 화면이에요. 목록에서 본사를 찾고 [보기]를 누르면 <a href="#trade-hq/detail">본사 매출 상세 보기</a>가 열려요.</p>' +
        '<ul>' +
          '<li>상단의 조회기간과 거래유형 조건은 <a href="#trade-all/steps">전체 현황</a>과 같아요. 조건을 바꾸고 [조회]를 누르면 목록의 주문건수와 매출액에 반영돼요.</li>' +
                  '</ul>',
      steps:
        '<h3>본사 찾기</h3>' +
        tradeTable([
          ['검색', '상호명, 대표자명, 사업자번호로 검색 (영문 대소문자 구분 없음, 사업자번호의 하이픈(-) 무시, [검색]을 누르거나 Enter를 눌러야 반영, 비우고 검색하면 전체 목록)'],
          ['정렬', '매출액순, 주문순, 상호명순 중 선택 (기본값 매출액순, 매출액순·주문순은 많은 순)']
        ]) +
        '<p>[운영중]과 [운영제한] 본사만 나와요. 목록 위에는 검색을 적용한 뒤의 "전체 N건"이 표시되고, 한 페이지에 20건씩 보여줘요. 검색, 정렬, 탭을 바꾸면 1페이지로 돌아가요.</p>' +

        '<h3>목록 항목</h3>' +
        tradeTable([
          ['본사정보', '본사 상호명과 대표자명'],
          ['가맹점 수', '본사에 소속된 가맹점 수'],
          ['주문건수', '조회기간과 거래유형에 맞는 본사 자체의 결제완료 주문 건수'],
          ['매출액', '결제총액 − 취소·환불액 (조회기간과 거래유형 적용)'],
          ['운영상태', '[운영중] 또는 [운영제한]'],
          ['관리', '[보기] 버튼 (누르면 <a href="#trade-hq/detail">본사 매출 상세 보기</a>로 이동)']
        ]),
      cases: [
        {
          title: '검색 결과가 없으면',
          shots: tradeShot('trade-hq-empty-pc', '09SCM 통합관리자 본사별 현황 검색 결과 없음 PC 화면', 2848, 624),
          shotCaption: '09SCM 통합관리자 본사별 현황 검색 결과 없음 화면',
          html: '<ul><li>안내: "검색 결과가 없습니다."</li><li>건수: 전체 0건</li></ul>'
        }
      ],
      trouble:
        '<h3>본사가 목록에 없어요</h3>' +
        '<p>목록에는 [운영중]과 [운영제한] 본사만 나와요. [승인대기]·[승인불가] 본사와 삭제한 본사는 나오지 않아요. 삭제한 본사의 매출은 <a href="#trade-all">전체 현황</a> 합계에는 포함돼요.</p>'
    },
    {
      id: 'detail',
      label: '본사 매출 상세 보기',
      shots: tradeShot('trade-hq-detail-pc', '09SCM 통합관리자 본사 매출 상세 PC 화면', 2880, 3282),
      shotCaption: '09SCM 통합관리자 본사 매출 상세 화면',
      overview:
        '<p>목록에서 고른 본사의 매출을 조회하는 화면이에요. 요약 카드, 추이 차트, 추이 표는 <a href="#trade-all/steps">전체 현황</a>과 같은 구성이고 선택한 본사 기준으로 보여줘요.</p>' +
        '<ul>' +
          '<li>본사 관리의 본사 상세에서 [거래/매출 현황 이동 →]을 누르면 이 화면으로 들어와요. 조회기간은 기본값(이번달)이에요.</li>' +
          '<li>상단의 조회기간과 거래유형을 바꾸고 [조회]를 누르면 선택한 본사의 값에 반영돼요.</li>' +
        '</ul>',
      steps:
        tradeSelectedBlock('hq') +
        '<h3>요약 카드</h3>' +
        tradeTable([
          ['이용료 수납액', '이 본사에 속한 가맹점이 낸 이용료 합계 (이용료 [결제완료]와 [수기완납] 금액)']
        ]),
      cases: [
        {
          title: '조회기간에 거래가 없으면',
          shots: tradeShot('trade-hq-zero-pc', '09SCM 통합관리자 본사 매출 거래 없음 PC 화면', 2848, 1324),
          shotCaption: '09SCM 통합관리자 본사 매출 거래 없음 화면',
          html:
            '<ul>' +
              '<li>금액: 결제총액, 취소·환불액, 매출액, 결제수단별 결제액, 이용료 수납액 0원</li>' +
              '<li>건수: 주문 0건, 취소·환불 0건</li>' +
              '<li>추이 차트: 막대 없음</li>' +
              '<li>추이 표: 모든 행 0</li>' +
            '</ul>'
        }
      ]
    }
  ]
};

window.GUIDE_CONTENT['trade-franchise'] = {
  screens: [
    {
      id: 'list',
      label: '가맹점별 현황 보기',
      shots: tradeShot('trade-fr-list-pc', '09SCM 통합관리자 가맹점별 현황 PC 화면', 2880, 1800),
      shotCaption: '09SCM 통합관리자 가맹점별 현황 화면',
      overview:
        '<p>가맹점을 찾아 그 가맹점의 매출을 따로 보는 화면이에요. 목록에서 가맹점을 찾고 [보기]를 누르면 <a href="#trade-franchise/detail">가맹점 매출 상세 보기</a>가 열려요.</p>' +
        '<ul>' +
          '<li>상단의 조회기간과 거래유형 조건은 <a href="#trade-all/steps">전체 현황</a>과 같아요. 조건을 바꾸고 [조회]를 누르면 목록의 주문건수와 매출액에 반영돼요.</li>' +
        '</ul>',
      steps:
        '<h3>가맹점 찾기</h3>' +
        tradeTable([
          ['검색', '소속 본사 상호명, 가맹 상호명, 가맹 대표자명, 가맹 사업자번호로 검색 (영문 대소문자 구분 없음, 사업자번호의 하이픈(-) 무시, [검색]을 누르거나 Enter를 눌러야 반영, 비우고 검색하면 전체 목록)'],
          ['정렬', '매출액순, 주문순, 상호명순 중 선택 (기본값 매출액순, 매출액순·주문순은 많은 순)']
        ]) +
        '<p>09SCM에서 삭제하지 않은 모든 가맹점이 나와요. 이용상태가 [이용대기], [이용불가]인 가맹점도 포함돼요. 목록 위에는 검색을 적용한 뒤의 "전체 N건"이 표시되고, 한 페이지에 20건씩 보여줘요. 검색, 정렬, 탭을 바꾸면 1페이지로 돌아가요.</p>' +

        '<h3>목록 항목</h3>' +
        tradeTable([
          ['가맹점정보', '가맹점 상호명과 대표자명'],
          ['소속 본사', '가맹점이 속한 본사의 상호명'],
          ['주문건수', '조회기간과 거래유형에 맞는 가맹점 자체의 결제완료 주문 건수'],
          ['매출액', '결제총액 − 취소·환불액 (조회기간과 거래유형 적용)'],
          ['이용상태', '[이용대기], [이용승인], [이용제한], [이용불가] 중 하나'],
          ['관리', '[보기] 버튼 (누르면 <a href="#trade-franchise/detail">가맹점 매출 상세 보기</a>로 이동)']
        ]),
      cases: [
        {
          title: '검색 결과가 없으면',
          shots: tradeShot('trade-fr-empty-pc', '09SCM 통합관리자 가맹점별 현황 검색 결과 없음 PC 화면', 2848, 624),
          shotCaption: '09SCM 통합관리자 가맹점별 현황 검색 결과 없음 화면',
          html: '<ul><li>안내: "검색 결과가 없습니다."</li><li>건수: 전체 0건</li></ul>'
        }
      ],
      trouble:
        '<h3>가맹점이 목록에 없어요</h3>' +
        '<p>삭제한 가맹점은 목록에 나오지 않아요. 삭제한 가맹점의 거래·매출은 <a href="#trade-all">전체 현황</a> 합계에는 포함돼요.</p>'
    },
    {
      id: 'detail',
      label: '가맹점 매출 상세 보기',
      shots: tradeShot('trade-fr-detail-pc', '09SCM 통합관리자 가맹점 매출 상세 PC 화면', 2880, 3282),
      shotCaption: '09SCM 통합관리자 가맹점 매출 상세 화면',
      overview:
        '<p>목록에서 고른 가맹점의 매출을 조회하는 화면이에요. 요약 카드, 추이 차트, 추이 표는 <a href="#trade-all/steps">전체 현황</a>과 같은 구성이고 선택한 가맹점 기준으로 보여줘요. 이용료 수납액은 요약 카드, 추이 차트, 추이 표 모두에 나오지 않아요.</p>' +
        '<ul>' +
          '<li>가맹점 정보의 가맹점 상세에서 [거래/매출 현황 이동 →]을 누르면 이 화면으로 들어와요. 조회기간은 기본값(이번달)이에요.</li>' +
          '<li>상단의 조회기간과 거래유형을 바꾸고 [조회]를 누르면 선택한 가맹점의 값에 반영돼요.</li>' +
        '</ul>',
      steps:
        tradeSelectedBlock('franchise'),
      cases: [
        {
          title: '조회기간에 거래가 없으면',
          shots: tradeShot('trade-fr-zero-pc', '09SCM 통합관리자 가맹점 매출 거래 없음 PC 화면', 2848, 1324),
          shotCaption: '09SCM 통합관리자 가맹점 매출 거래 없음 화면',
          html:
            '<ul>' +
              '<li>금액: 결제총액, 취소·환불액, 매출액, 결제수단별 결제액 0원</li>' +
              '<li>건수: 주문 0건, 취소·환불 0건</li>' +
              '<li>추이 차트: 막대 없음</li>' +
              '<li>추이 표: 모든 행 0</li>' +
            '</ul>'
        }
      ]
    }
  ]
};

// ---- 본사/가맹점 관리 > 본사 관리 ----
// 캡처 크기(가로 × 세로 px). tools/capture_admin_hq.py로 촬영한 원본 기준.
var HQ_SIZES = {"hq-bulk-delete-pc": [904, 430], "hq-d-access-pc": [904, 350], "hq-d-corp-pc": [2848, 918], "hq-d-go-franchise-pc": [2880, 1800], "hq-d-go-sales-pc": [2880, 1800], "hq-d-id-dup-pc": [2848, 700], "hq-d-id-locked-pc": [2848, 644], "hq-d-memo-add-pc": [2848, 648], "hq-d-memo-empty-pc": [2848, 424], "hq-d-memo-pc": [2848, 492], "hq-d-payapp-alert-pc": [904, 348], "hq-d-payapp-edit-pc": [2848, 660], "hq-d-payapp-empty-pc": [2848, 570], "hq-d-payapp-pc": [2848, 570], "hq-d-payapp-verified-pc": [2848, 660], "hq-d-pw-edit-pc": [2848, 836], "hq-d-pw-error-pc": [2848, 892], "hq-d-save-error-pc": [2848, 550], "hq-d-trade-pc": [2848, 868], "hq-d-trade-zero-pc": [2848, 868], "hq-d-wait-id-pc": [2848, 644], "hq-delete-fr-pc": [904, 430], "hq-delete-pc": [904, 350], "hq-deleted-pc": [2848, 1080], "hq-detail-pc": [2880, 3132], "hq-filter-limit-pc": [2848, 612], "hq-filter-reject-pc": [2848, 612], "hq-filter-run-pc": [2848, 612], "hq-filter-wait-pc": [2848, 612], "hq-list-pc": [2880, 1800], "hq-reg-addr-pc": [2848, 826], "hq-reg-biz-dup-pc": [2848, 882], "hq-reg-biz-ok-pc": [2848, 890], "hq-reg-corp-pc": [2848, 918], "hq-reg-done-pc": [2848, 1548], "hq-reg-id-dup-pc": [2848, 856], "hq-reg-id-ok-pc": [2848, 864], "hq-reg-id-rule-pc": [2848, 856], "hq-reg-payapp-fail-pc": [2848, 592], "hq-reg-payapp-ok-pc": [2848, 536], "hq-reg-pc": [2880, 3094], "hq-reg-pw-error-pc": [2848, 510], "hq-reg-rule-error-pc": [2848, 510], "hq-reg-terms-error-pc": [2848, 510], "hq-s-approve-error-pc": [2880, 130], "hq-s-approved-pc": [2880, 130], "hq-s-limit-done-pc": [2880, 130], "hq-s-limit-partner-pc": [2880, 1520], "hq-s-limit-pc": [2880, 130], "hq-s-limit-select-pc": [2880, 130], "hq-s-reject-done-pc": [2880, 130], "hq-s-reject-pc": [2880, 130], "hq-s-revoke-done-pc": [2880, 130], "hq-s-run-pc": [2880, 130], "hq-s-wait-pc": [2880, 130], "hq-s-wait-ready-pc": [2880, 130], "hq-search-biz-pc": [2848, 612], "hq-search-empty-pc": [2848, 378], "hq-select-pc": [2848, 1540], "hq-sms-pc": [904, 658], "hq-status-pc": [2880, 1800]};

function hqShot(name, alt) {
  var s = HQ_SIZES[name] || [2880, 1800];
  return [{ device: 'pc', src: IMG_ADMIN + name + '.webp', alt: '09SCM 통합관리자 ' + alt + ' PC 화면', ratio: s[0] / s[1] }];
}
// 케이스 한 줄: 제목, 캡처 이름, 화면 이름(캡션·대체텍스트), 상세내용 html
function hqCase(title, name, caption, html) {
  return { title: title, shots: hqShot(name, caption), shotCaption: '09SCM 통합관리자 ' + caption + ' 화면', html: html };
}
function hqList(items) { return '<ul>' + items.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>'; }

var HQ_STATUS_NOTE = '<a href="#hq-list/status">본사 상태 바꾸기</a>';

window.GUIDE_CONTENT['hq-list'] = {
  screens: [
    {
      id: 'list',
      label: '본사 목록 보기',
      shots: hqShot('hq-list-pc', '본사 관리 목록'),
      shotCaption: '09SCM 통합관리자 본사 관리 화면',
      overview:
        '<p>09SCM 도입을 신청한 본사부터 운영 중인 본사까지 한 곳에서 찾고 관리하는 화면이에요. 목록에서 본사를 찾아 상세 화면을 열고, SMS를 보내거나 삭제해요.</p>' +
        '<ul>' +
          '<li>왼쪽 메뉴의 [본사/가맹점 관리 > 본사 관리]로 들어오면 검색어 없이 [전체] 탭이 열려요.</li>' +
          '<li>대시보드(<a href="#dashboard-ops">운영현황</a>)의 승인 대기·운영제한 카드를 누르면 해당 상태 탭이 골라진 목록이 열려요.</li>' +
          '<li>본사는 통합관리자에서 직접 등록·수정·삭제하는 대상이에요. 소속 가맹점은 <a href="#franchise-list">가맹점 정보</a>에서 조회만 할 수 있어요.</li>' +
        '</ul>',
      steps:
        '<h3>상단 버튼</h3>' +
        tradeTable([
          ['[엑셀 다운로드]', '지금 검색·상태 탭·정렬이 적용된 목록 전체(모든 페이지)를 파일로 내려받기. 파일에는 도입신청일시, 상호명, 대표자명, 이름, 휴대폰번호, 소매몰 URL, 가맹점 수, 당월 매출액, 당월 이용료 수납액, 상태가 담김'],
          ['[+ 본사직접등록]', '신청 절차 없이 본사를 등록하는 <a href="#hq-list/register">본사 직접등록하기</a> 화면으로 이동'],
          ['[삭제]', '체크박스로 고른 본사를 한 번에 삭제 (고른 본사가 없으면 누를 수 없음)']
        ]) +

        '<h3>본사 찾기</h3>' +
        tradeTable([
          ['검색', '아이디, 이름, 상호명, 대표자명, 사업자번호로 검색 (영문 대소문자 구분 없음, 사업자번호의 하이픈(-) 무시, [검색]을 누르거나 Enter를 눌러야 반영, 입력만 해서는 목록이 바뀌지 않음)'],
          ['상태 탭', '전체, 승인대기, 운영중, 운영제한, 승인불가 중 선택'],
          ['정렬', '도입신청일시순 (최근 신청한 본사가 맨 위, 다른 정렬은 없음)']
        ]) +
        '<p>고른 조건에 모두 맞는 본사만 보여줘요. 목록 위에는 조건을 적용한 뒤의 "전체 N건 | 선택 N건"이 표시되고, 한 페이지에 20건씩 보여줘요. 검색, 상태 탭, 정렬을 바꾸면 1페이지로 돌아가요.</p>' +
        '<p>상세 화면에서 [← 목록으로]로 돌아오면 보던 페이지와 검색어, 상태 탭이 그대로예요. 삭제해서 현재 페이지가 비면 바로 앞 페이지가 열려요.</p>' +

        '<h3>목록 항목</h3>' +
        tradeTable([
          ['체크박스', '삭제할 본사 선택 (헤더 체크박스는 현재 페이지 전체 선택, 페이지를 넘기면 선택 해제)'],
          ['도입신청일시', '도입을 신청한 일시 (직접등록한 본사는 등록한 일시)'],
          ['본사정보', '상호명(위)과 대표자명(아래)'],
          ['회원정보', '이름(위)과 휴대폰번호(아래)'],
          ['소매몰 URL', '09SCM 소매몰 주소 (누르면 새 창으로 열림, 운영승인 전이거나 승인불가이면 "-")'],
          ['가맹점 수', '본사에 소속된 가맹점 수 (이용상태와 관계없이 모두 포함)'],
          ['당월 매출액', '이번 달 본사 매출액 (결제총액 − 취소·환불액)'],
          ['당월 이용료 수납액', '이번 달 소속 가맹점에서 실제로 받은 이용료 합계'],
          ['상태', '본사 상태 배지 (승인대기 / 운영중 / 운영제한 / 승인불가)'],
          ['관리', '[상세보기], [SMS 발송], [삭제] 버튼']
        ]) +
        '<p>가맹점 수와 매출액은 화면을 열거나 새로고침한 시점의 최신 값이에요. <a href="#trade-hq">거래/매출 현황의 본사별 현황</a>과 같은 기준으로 계산해요.</p>' +

        '<h3>관리 버튼</h3>' +
        tradeTable([
          ['[상세보기]', '신청 내용 확인·수정, 페이앱 연동, 상태 변경 등을 하는 <a href="#hq-list/detail">본사 상세 보기</a> 화면으로 이동'],
          ['[SMS 발송]', '해당 본사 담당자에게 SMS를 보내는 창 열기 (<a href="#hq-list/list">SMS를 보낼 때</a> 참고)'],
          ['[삭제]', '해당 본사 삭제 확인 창 열기 (<a href="#hq-list/list">삭제할 때</a> 참고)']
        ]),
      cases: [
        {
          group: '상태 탭으로 볼 때',
          rows: [
            hqCase('승인대기 탭을 고르면', 'hq-filter-wait-pc', '본사 관리 승인대기 목록',
              hqList([
                '대상: 도입 신청이 접수되어 UDID 검토를 기다리는 본사',
                '소매몰 URL: "-" (09SCM 본사 계정과 소매몰이 아직 만들어지지 않음)',
                '가맹점 수·당월 매출액·당월 이용료 수납액: 0',
                '다음 단계: 상세 화면에서 [운영승인] 또는 [승인불가]'
              ])),
            hqCase('운영중 탭을 고르면', 'hq-filter-run-pc', '본사 관리 운영중 목록',
              hqList([
                '대상: 정상 운영 중인 본사',
                '소매몰 URL: 소매몰 주소 링크',
                '가맹점 수와 매출 값: 소속 가맹점과 이번 달 거래에 따라 표시'
              ])),
            hqCase('운영제한 탭을 고르면', 'hq-filter-limit-pc', '본사 관리 운영제한 목록',
              hqList([
                '대상: 운영 중이다가 제한이 걸린 본사 (제한 내용은 ' + HQ_STATUS_NOTE + ' 참고)',
                '소매몰 URL: 소매몰 주소 링크',
                '소속 가맹점의 이용상태는 본사 상태와 관계없이 그대로'
              ])),
            hqCase('승인불가 탭을 고르면', 'hq-filter-reject-pc', '본사 관리 승인불가 목록',
              hqList([
                '대상: 도입 신청을 승인하지 않은 본사',
                '소매몰 URL: "-"',
                '다음 단계: 상세 화면의 [반려철회]로 승인대기로 되돌릴 수 있음'
              ]))
          ]
        },
        {
          group: '검색할 때',
          rows: [
            hqCase('사업자번호로 검색하면', 'hq-search-biz-pc', '본사 관리 사업자번호 검색 결과',
              hqList([
                '조건: 검색창에 하이픈(-) 없이 사업자번호를 입력하고 [검색]을 누름',
                '결과: 하이픈을 무시하고 일치하는 본사만 표시, 목록 위 건수도 검색 결과 기준으로 바뀜'
              ])),
            hqCase('검색 결과가 없으면', 'hq-search-empty-pc', '본사 관리 검색 결과 없음',
              hqList([
                '표시: 표에 본사가 나오지 않음',
                '건수: 전체 0건 | 선택 0건'
              ]))
          ]
        },
        {
          group: '본사를 고를 때',
          rows: [
            hqCase('체크박스로 본사를 고르면', 'hq-select-pc', '본사 관리 본사 선택',
              hqList([
                '건수: 고를 때마다 "선택 N건"이 바뀜',
                '상단 [삭제]: 1건 이상 고르면 누를 수 있음',
                '선택은 현재 페이지에서만 유지되고, 페이지를 넘기거나 검색·상태 탭·정렬을 바꾸면 해제됨'
              ]))
          ]
        },
        {
          group: 'SMS를 보낼 때',
          rows: [
            hqCase('SMS를 보내려면', 'hq-sms-pc', '본사 SMS 발송',
              hqList([
                '조건: 관리 컬럼의 [SMS 발송]을 누름',
                '발송 대상: 본사 회원정보의 이름과 휴대폰번호 (바꿀 수 없음)',
                '템플릿: 비밀번호 안내, 승인 안내, 서류보완요청, 기타 중 선택',
                '내용: 보낼 문구를 직접 입력',
                '[발송]: SMS를 보내고 창을 닫음',
                '[취소]: 보내지 않고 창을 닫음',
                'SMS는 운영자가 직접 보내는 안내예요. 운영승인·비밀번호 변경 같은 처리와 자동으로 이어지지 않아요.'
              ]))
          ]
        },
        {
          group: '삭제할 때',
          rows: [
            hqCase('소속 가맹점이 없는 본사를 삭제하려면', 'hq-delete-pc', '본사 삭제 확인',
              hqList([
                '조건: 관리 컬럼의 [삭제]를 누름 (본사 상태와 운영 이력에 관계없이 삭제할 수 있음)',
                '안내: "OO 계정을 삭제하시겠습니까?", "삭제한 데이터는 복구할 수 없습니다. 신중하게 삭제해 주세요."',
                '[삭제]: 본사를 삭제',
                '[취소]: 확인 창을 닫음'
              ])),
            hqCase('소속 가맹점이 있는 본사를 삭제하려면', 'hq-delete-fr-pc', '소속 가맹점이 있는 본사 삭제 확인',
              hqList([
                '조건: 소속 가맹점이 있는 본사의 [삭제]를 누름',
                '추가 안내(빨간색): "소속 가맹점이 있는 본사를 삭제하면 해당 가맹점과 본사의 연결이 끊어집니다."',
                '통합관리자에서는 가맹점을 삭제하거나 소속을 바꿀 수 없어요. 연결이 끊긴 가맹점은 <a href="#franchise-list">가맹점 정보</a> 목록에서 소속 본사가 "-"로 표시돼요.'
              ])),
            hqCase('선택한 본사를 한 번에 삭제하려면', 'hq-bulk-delete-pc', '선택한 본사 삭제 확인',
              hqList([
                '조건: 체크박스로 본사를 고르고 상단 [삭제]를 누름',
                '안내: "선택한 본사 계정 N건을 삭제하시겠습니까?", "삭제한 데이터는 복구할 수 없습니다. 신중하게 삭제해 주세요."',
                '고른 본사 중 하나라도 소속 가맹점이 있으면 연결 끊김 안내(빨간색)도 함께 나옴'
              ])),
            hqCase('삭제가 끝나면', 'hq-deleted-pc', '본사 삭제 후 목록',
              hqList([
                '이동: 본사 목록 (삭제한 본사는 목록에서 사라지고 건수가 줄어듦)',
                '삭제한 본사의 거래·매출·이용료 수납 이력은 남아서 <a href="#trade-all">거래/매출 현황 전체 현황</a> 합계에는 계속 포함되고, 본사별 현황 목록에는 나오지 않음'
              ]))
          ]
        }
      ],
      trouble:
        '<h3>본사가 목록에 없어요</h3>' +
        '<p>검색어가 남아 있거나 다른 상태 탭이 골라져 있는지 확인해요. 삭제한 본사는 목록에 나오지 않고 복구할 수 없어요.</p>' +
        '<h3>소매몰 URL이 "-"예요</h3>' +
        '<p>[승인대기]와 [승인불가] 본사는 09SCM 본사 계정과 소매몰이 만들어지지 않아 "-"로 표시돼요. 운영승인하면 소매몰 주소가 나타나요.</p>' +
        '<h3>[삭제]를 누를 수 없어요</h3>' +
        '<p>상단 [삭제]는 체크박스로 본사를 고른 뒤에 눌러요. 페이지를 넘기면 선택이 풀리니 삭제할 페이지에서 다시 골라요.</p>' +
        '<h3>가맹점 수나 매출이 다르게 보여요</h3>' +
        '<p>값은 화면을 열거나 새로고침한 시점의 최신 값이에요. 같은 조건(이번달, 전체)의 <a href="#trade-hq">본사별 현황</a>과 비교할 때는 두 화면을 모두 새로고침한 뒤 확인해요.</p>'
    },

    {
      id: 'register',
      label: '본사 직접등록하기',
      shots: hqShot('hq-reg-pc', '본사 직접등록'),
      shotCaption: '09SCM 통합관리자 본사 직접등록 화면',
      overview:
        '<p>도입 신청 절차 없이 운영자가 본사를 직접 등록하는 화면이에요. 본사 목록의 [+ 본사직접등록]을 누르면 열려요.</p>' +
        '<ul>' +
          '<li>등록하면 항상 <strong>승인대기</strong> 본사로 만들어져요. 운영승인은 등록한 뒤 <a href="#hq-list/detail">본사 상세 보기</a>의 하단 영역에서 해요.</li>' +
          '<li>필수 입력은 이용약관과 개인정보처리방침 동의뿐이에요. 다만 운영승인에는 <a href="#hq-list/status">필수 항목이 모두 저장</a>되어 있어야 하니, 비워 둔 항목은 상세 화면에서 채워요.</li>' +
          '<li>도입신청일시는 등록한 일시로 저장되고, 가맹점 수와 매출은 0에서 시작해요.</li>' +
        '</ul>',
      steps:
        '<h3>상단 버튼</h3>' +
        tradeTable([
          ['[← 목록으로]', '입력한 내용을 버리고 본사 목록으로 돌아감 (하단 [취소]와 같음)']
        ]) +

        '<h3>회원정보</h3>' +
        tradeTable([
          ['아이디', '영문 소문자로 시작하는 영문 소문자·숫자 3~20자. 09SCM 로그인과 소매몰 기본주소(mall.zeroscm.kr/아이디)로 쓰여서 운영중·운영제한 상태에서는 바꿀 수 없음. 다른 본사·가맹점 아이디나 신청이 접수된 아이디와 같으면 쓸 수 없음 ([중복확인]으로 미리 확인)'],
          ['비밀번호 / 비밀번호 확인', '입력하는 경우 공백 없이 영문과 숫자를 포함한 8~20자, 두 값이 같아야 함'],
          ['이름', '한글·영문 2~20자'],
          ['휴대폰번호', '숫자만 11자리 (인증번호 발송 절차 없음)'],
          ['이메일', '이메일 형식, 100자 이내']
        ]) +

        '<h3>사업자정보</h3>' +
        tradeTable([
          ['사업자유형', '개인사업자 / 법인사업자 (처음에는 개인사업자)'],
          ['본사명(상호)', '50자 이내'],
          ['대표자명', '한글·영문 2~20자'],
          ['사업자등록번호', '숫자 10자리 (입력하면 000-00-00000 형태로 자동 변환). [사업자인증]으로 이미 등록된 번호인지 확인'],
          ['법인등록번호', '사업자유형이 법인사업자일 때만 보임. 숫자 13자리 (000000-0000000 형태로 자동 변환)'],
          ['업태 / 업종', '각각 30자 이내'],
          ['사업장주소', '우편번호와 기본주소는 직접 입력할 수 없고 [주소찾기]로 채움, 상세주소만 100자 이내로 직접 입력']
        ]) +

        '<h3>페이앱 연동정보</h3>' +
        tradeTable([
          ['판매자 아이디, 연동 KEY, 연동 VALUE', '이 본사의 페이앱 연동 값. 입력하지 않아도 등록할 수 있음'],
          ['검증상태', '검증완료 / 미검증. 세 값 중 하나라도 바꾸면 미검증으로 돌아감'],
          ['[유효성 검증]', '세 값을 모두 입력한 뒤 눌러 검증. 검증완료는 등록할 때 그대로 저장됨 (등록 조건은 아님)']
        ]) +

        '<h3>이용약관 동의</h3>' +
        tradeTable([
          ['이용약관 [필수]', '체크해야 등록할 수 있음'],
          ['개인정보처리방침 [필수]', '체크해야 등록할 수 있음'],
          ['마케팅정보 수신동의 [선택]', '선택 사항']
        ]) +

        '<h3>보조 버튼</h3>' +
        tradeTable([
          ['[중복확인]', '입력한 아이디를 쓸 수 있는지 확인하고 결과를 입력칸 아래에 표시 (등록의 필수 절차가 아님)'],
          ['[사업자인증]', '입력한 사업자등록번호가 이미 본사로 등록된 번호인지 확인하고 결과를 입력칸 아래에 표시 (등록의 필수 절차가 아님)'],
          ['[주소찾기]', '우편번호와 기본주소를 채움']
        ]) +

        '<h3>하단 버튼</h3>' +
        tradeTable([
          ['[취소]', '입력한 내용을 버리고 본사 목록으로 돌아감'],
          ['[등록]', '입력한 내용으로 승인대기 본사를 만들고 본사 목록으로 이동']
        ]) +
        '<p>값을 입력한 항목은 위 규칙을 지켜야 하고, 아이디나 사업자등록번호가 이미 등록되어 있으면 등록할 수 없어요. 등록하지 못하면 화면 아래에 안내가 한 건 나오고 입력한 내용은 그대로 남아요.</p>',
      cases: [
        {
          group: '아이디를 확인할 때',
          rows: [
            hqCase('사용할 수 있는 아이디이면', 'hq-reg-id-ok-pc', '본사 직접등록 아이디 사용 가능',
              hqList(['조건: 아이디를 입력하고 [중복확인]을 누름', '안내: "사용 가능한 아이디입니다." (입력칸 아래, 초록색)'])),
            hqCase('이미 사용 중인 아이디이면', 'hq-reg-id-dup-pc', '본사 직접등록 아이디 중복',
              hqList(['조건: 다른 본사·가맹점이 쓰는 아이디(신청이 접수된 아이디 포함)를 입력하고 [중복확인]을 누름', '안내: "이미 사용 중인 아이디입니다." (입력칸 아래, 빨간색)', '다른 아이디로 바꿔서 다시 확인해요.'])),
            hqCase('아이디 규칙에 맞지 않으면', 'hq-reg-id-rule-pc', '본사 직접등록 아이디 규칙 안내',
              hqList(['조건: 영문 소문자로 시작하는 영문 소문자·숫자 3~20자가 아닌 아이디에서 [중복확인]을 누름', '안내: "아이디는 영문 소문자로 시작하는 영문 소문자·숫자 조합 3~20자로 입력해 주세요."', '아이디를 입력하지 않고 누르면 "아이디를 입력해 주세요."가 나와요.']))
          ]
        },
        {
          group: '사업자정보를 입력할 때',
          rows: [
            hqCase('사업자인증이 되면', 'hq-reg-biz-ok-pc', '본사 직접등록 사업자인증 완료',
              hqList(['조건: 사업자등록번호를 입력하고 [사업자인증]을 누름', '안내: "사업자 인증이 완료되었습니다." (입력칸 아래, 초록색)'])),
            hqCase('이미 등록된 사업자등록번호이면', 'hq-reg-biz-dup-pc', '본사 직접등록 사업자등록번호 중복',
              hqList(['조건: 이미 본사로 등록된 사업자등록번호에서 [사업자인증]을 누름', '안내: "이미 본사로 등록된 사업자등록번호입니다." (입력칸 아래, 빨간색)', '이 번호로는 등록할 수 없어요.'])),
            hqCase('법인사업자를 고르면', 'hq-reg-corp-pc', '본사 직접등록 법인사업자',
              hqList(['조건: 사업자유형에서 [법인사업자]를 고름', '법인등록번호 입력칸이 나타남 ([개인사업자]를 고르면 사라짐)'])),
            hqCase('주소를 찾으면', 'hq-reg-addr-pc', '본사 직접등록 주소찾기',
              hqList(['조건: [주소찾기]를 누름', '우편번호와 기본주소가 채워지고, 상세주소만 직접 입력'])),
          ]
        },
        {
          group: '페이앱 연동정보를 확인할 때',
          rows: [
            hqCase('연동 값이 모두 입력되지 않았으면', 'hq-reg-payapp-fail-pc', '본사 직접등록 페이앱 검증 입력 부족',
              hqList(['조건: 판매자 아이디, 연동 KEY, 연동 VALUE 중 비어 있는 값이 있는 채로 [유효성 검증]을 누름', '안내: "판매자 아이디, 연동 KEY, 연동 VALUE를 모두 입력해 주세요." (빨간색)', '검증상태: 미검증'])),
            hqCase('검증에 성공하면', 'hq-reg-payapp-ok-pc', '본사 직접등록 페이앱 검증완료',
              hqList(['조건: 세 값을 모두 입력하고 [유효성 검증]을 누름', '검증상태: 검증완료 (등록하면 그대로 저장되어 상세의 페이앱 연동 탭에서도 연동완료로 보임)', '값을 하나라도 바꾸면 미검증으로 돌아가요.']))
          ]
        },
        {
          group: '등록이 되지 않을 때',
          rows: [
            hqCase('약관에 동의하지 않았으면', 'hq-reg-terms-error-pc', '본사 직접등록 약관 미동의 오류',
              hqList(['조건: 이용약관 또는 개인정보처리방침에 체크하지 않고 [등록]을 누름', '안내: "이용약관과 개인정보처리방침에 모두 동의해 주세요." (화면 아래, 빨간색)', '입력한 내용은 그대로 남음'])),
            hqCase('입력 규칙에 맞지 않으면', 'hq-reg-rule-error-pc', '본사 직접등록 입력 규칙 오류',
              '<p>값을 입력한 항목이 규칙에 맞지 않으면 화면 순서대로 처음 맞지 않는 항목의 안내 한 건이 나와요. 입력하지 않은 항목은 검사하지 않아요. 나오는 안내 문구는 아래와 같아요.</p>' +
              tradeTable([
                ['아이디', '"아이디는 영문 소문자로 시작하는 영문 소문자·숫자 조합 3~20자로 입력해 주세요."'],
                ['비밀번호', '"비밀번호는 공백 없이 영문과 숫자를 포함한 8~20자로 입력해 주세요."'],
                ['이름', '"이름은 한글·영문 2~20자로 입력해 주세요."'],
                ['휴대폰번호', '"휴대폰번호는 숫자 11자리로 입력해 주세요."'],
                ['이메일', '"이메일 형식이 올바르지 않습니다."'],
                ['본사명(상호)', '"본사명(상호)은 50자 이내로 입력해 주세요."'],
                ['대표자명', '"대표자명은 한글·영문 2~20자로 입력해 주세요."'],
                ['사업자등록번호', '"사업자등록번호는 숫자 10자리(000-00-00000)로 입력해 주세요."'],
                ['법인등록번호', '"법인등록번호는 숫자 13자리(000000-0000000)로 입력해 주세요."'],
                ['업태·업종', '"업태·업종은 각각 30자 이내로 입력해 주세요."'],
                ['상세주소', '"상세주소는 100자 이내로 입력해 주세요."']
              ], '항목', '안내 문구')),
            hqCase('비밀번호가 서로 다르면', 'hq-reg-pw-error-pc', '본사 직접등록 비밀번호 불일치 오류',
              hqList(['조건: 비밀번호와 비밀번호 확인이 다른 채로 [등록]을 누름', '안내: "비밀번호와 비밀번호 확인이 일치하지 않습니다." (화면 아래, 빨간색)', '아이디나 사업자등록번호가 이미 등록되어 있을 때도 [중복확인], [사업자인증]과 같은 문구가 화면 아래에 나와요.']))
          ]
        },
        {
          group: '등록이 끝나면',
          rows: [
            hqCase('등록하면', 'hq-reg-done-pc', '본사 직접등록 후 목록',
              hqList(['이동: 본사 목록', '표시: 방금 등록한 본사가 [승인대기]로 맨 위에 나타남 (도입신청일시는 등록 일시, 가맹점 수·매출은 0)', '다음 단계: 상세 화면에서 비어 있는 필수 항목을 채우고 페이앱 연동을 검증한 뒤 운영승인']))
          ]
        }
      ],
      trouble:
        '<h3>[등록]을 눌렀는데 등록되지 않아요</h3>' +
        '<p>화면 아래의 안내를 확인해요. 이용약관과 개인정보처리방침에 모두 체크했는지, 입력한 항목이 규칙에 맞는지, 아이디나 사업자등록번호가 이미 등록되어 있지 않은지 살펴봐요.</p>' +
        '<h3>등록했는데 운영중이 아니에요</h3>' +
        '<p>직접등록한 본사도 [승인대기]로 시작해요. 상세 화면에서 <a href="#hq-list/status">운영승인</a>을 해야 09SCM 본사 계정과 소매몰이 만들어져요.</p>'
    },

    {
      id: 'detail',
      label: '본사 상세 보기',
      shots: hqShot('hq-detail-pc', '본사 상세'),
      shotCaption: '09SCM 통합관리자 본사 상세 화면',
      overview:
        '<p>본사의 신청 내용, 페이앱 연동, 가맹점·매출 요약, 내부메모를 확인하고 고치는 화면이에요. 본사 목록의 [상세보기]를 누르면 신청정보 탭으로 열려요.</p>' +
        '<ul>' +
          '<li>거래/매출 현황의 <a href="#trade-hq/detail">본사 매출 상세</a>에서 [본사 상세 이동 →]을 눌러도 이 화면이 열려요.</li>' +
          '<li>화면 아래 고정 영역에서는 탭과 관계없이 본사 상태를 바꿔요. 자세한 내용은 ' + HQ_STATUS_NOTE + '에서 안내해요.</li>' +
        '</ul>',
      steps:
        '<h3>상단 영역</h3>' +
        tradeTable([
          ['[← 목록으로]', '본사 목록으로 돌아감 (보던 페이지, 검색어, 상태 탭 유지)'],
          ['상호명, 상태 배지', '본사 상호명과 지금 상태'],
          ['[관리자접속]', '이 본사의 09SCM 관리자 화면을 새 창으로 열기 (운영중·운영제한 본사에만 보임, <a href="#hq-list/detail">관리자 접속할 때</a> 참고)']
        ]) +

        '<h3>탭</h3>' +
        tradeTable([
          ['신청정보', '회원정보, 사업자정보, 솔루션도입정보, 이용약관 동의를 확인하고 고침'],
          ['페이앱 연동', '결제대행(페이앱) 연동 정보를 확인하고 고침'],
          ['가맹점·매출 요약', '소속 가맹점과 이번 달 매출을 집계해서 봄 (조회 전용)'],
          ['내부메모', '운영자끼리 남기는 메모']
        ]) +

        '<h3>신청정보 탭</h3>' +
        '<p>입력 규칙은 <a href="#hq-list/register">본사 직접등록하기</a>와 같아요. 라벨에 <strong>*</strong>가 붙은 항목은 <a href="#hq-list/status">운영승인</a>에 꼭 필요한 항목이에요. [저장]에는 필수 입력이 없어서 빈 항목이 있어도 저장할 수 있어요.</p>' +
        tradeTable([
          ['아이디 * (+ [중복확인])', '승인대기·승인불가 본사만 바꿀 수 있음. 운영중·운영제한 본사는 입력칸과 [중복확인]이 비활성화됨'],
          ['비밀번호 *', '[비밀번호 변경]으로만 바꿈. 새 비밀번호와 확인이 같아야 하고, 본사 상태와 관계없이 언제든 다시 정할 수 있음 (임시 비밀번호는 자동으로 만들어지지 않음). 비밀번호가 없는 본사는 "비밀번호 없음"으로 표시됨'],
          ['이름 *, 휴대폰번호 *, 이메일 *', '회원정보'],
          ['사업자유형', '개인사업자 / 법인사업자'],
          ['본사명(상호) *, 대표자명 *', '사업자정보'],
          ['사업자등록번호 * (+ [사업자인증])', '숫자 10자리'],
          ['법인등록번호 *', '법인사업자일 때만 보임. 개인사업자로 바꾸고 저장하면 비워짐'],
          ['업태 / 업종', '각각 30자 이내 (필수 아님)'],
          ['사업장주소 *, 기본주소 *, 상세주소 *', '우편번호와 기본주소는 [주소찾기]로만 채우고, 상세주소만 직접 입력'],
          ['예상 가맹점 수, 문의 및 요청사항', '도입 신청 때 접수된 내용 (수정 가능, 필수 아님)'],
          ['이용약관 동의', '이용약관[필수], 개인정보처리방침[필수], 마케팅정보 수신동의[선택]의 동의 여부 (조회만 가능)']
        ]) +
        tradeTable([
          ['[저장]', '신청정보를 한 번에 저장. 아이디를 바꿨다면 중복 여부, 사업자등록번호를 바꿨다면 이미 등록된 번호인지 확인한 뒤 저장함']
        ], '버튼', '설명') +

        '<h3>페이앱 연동 탭</h3>' +
        tradeTable([
          ['판매자 아이디, 연동 KEY, 연동 VALUE', '입력된 연동 값 (입력하지 않았다면 "미입력")'],
          ['검증상태', '연동완료 / 미연동. 연동완료여야 <a href="#hq-list/status">[운영승인]</a>을 할 수 있음'],
          ['[연동정보 변경]', '값을 고치는 편집 상태로 전환. 이미 연동 값이 있으면 먼저 확인 창이 나옴'],
          ['[유효성 검증]', '편집 중인 세 값이 유효한지 검증 (세 값을 모두 입력해야 성공)'],
          ['[변경]', '검증을 통과한 값으로 바꾸고 조회 상태로 돌아감. 검증완료 전에는 누를 수 없음']
        ]) +
        '<p>편집 중에 값을 하나라도 바꾸면 검증상태가 미검증으로 돌아가요.</p>' +

        '<h3>가맹점·매출 요약 탭</h3>' +
        '<p>이 본사에 소속된 가맹점과 본사의 이번 달 매출을 집계해서 보여줘요. 입력 항목은 없고, 각 영역 오른쪽 위에 "실시간 집계 (YY.MM.DD HH:MM)"로 집계한 시각이 표시돼요. 화면을 열거나 새로고침한 시점의 값이에요.</p>' +
        tradeTable([
          ['운영 가맹점', '이용승인·이용제한 상태인 가맹점 수 (아래에 "전체 N개 중"으로 소속 전체 가맹점 수 표시)'],
          ['당월 거래발생 가맹점', '운영 가맹점 중 이번 달 결제완료 거래가 1건 이상인 가맹점 수 (아래에 운영 가맹점 대비 비율 표시)'],
          ['당월 미거래 가맹점', '운영 중이지만 이번 달 거래가 없는 가맹점 수 (이탈한 가맹점이 아님, 운영 가맹점 대비 비율 표시)'],
          ['당월 신규가입 가맹점', '이번 달에 가입을 신청한 가맹점 수 (이용상태와 관계없음)']
        ], '가맹점요약', '설명') +
        '<p>운영 가맹점이 0개이면 비율 자리에 "-"가 표시돼요.</p>' +
        tradeTable([
          ['당월 페이앱 결제액', '결제수단이 카드결제(페이앱)인 이번 달 결제총액'],
          ['당월 현장결제·계좌이체 결제액', '결제수단이 현장결제·계좌이체인 이번 달 결제총액'],
          ['당월 매출액', '이번 달 결제총액 − 취소·환불액 (취소·환불이 더 크면 마이너스)'],
          ['당월 이용료 수납액', '소속 가맹점(삭제된 가맹점 포함)에서 이번 달 실제로 받은 이용료 (매출액에 포함하지 않음)']
        ], '매출요약', '설명') +
        tradeTable([
          ['[해당 본사 가맹점 보기 →]', '<a href="#franchise-list">가맹점 정보</a> 목록으로 이동. 검색창에 이 본사의 상호명이 입력되어 이 본사 소속 가맹점이 조회된 상태로 열림'],
          ['[거래/매출 현황 이동 →]', '<a href="#trade-hq/detail">거래/매출 현황의 본사별 현황</a>으로 이동. 이 본사가 선택되고 조회기간은 이번달']
        ], '버튼', '설명') +

        '<h3>내부메모 탭</h3>' +
        tradeTable([
          ['메모 입력 + [추가]', '메모를 목록 맨 위에 추가 (내용이 비어 있으면 추가되지 않음)'],
          ['메모 목록', '최신 메모가 맨 위. 메모마다 작성 일시와 [삭제] 버튼이 있음 (삭제하면 바로 삭제되고 복구할 수 없음)']
        ]) +
        '<p>해당 본사에게는 보이지 않는 내부 참고용 메모예요. 승인불가 사유나 상태를 바꾼 이유를 남기는 데 써요.</p>',
      cases: [
        {
          group: '신청정보 탭에서',
          rows: [
            hqCase('운영중·운영제한 본사의 아이디이면', 'hq-d-id-locked-pc', '운영중 본사 아이디 수정 불가',
              hqList(['조건: 본사 상태가 운영중 또는 운영제한', '아이디 입력칸과 [중복확인]이 비활성화되어 바꿀 수 없음 (09SCM 로그인과 소매몰 주소에 쓰이는 값)'])),
            hqCase('승인대기·승인불가 본사의 아이디이면', 'hq-d-wait-id-pc', '승인대기 본사 아이디 수정 가능',
              hqList(['조건: 본사 상태가 승인대기 또는 승인불가', '아이디를 바꾸고 [중복확인]을 할 수 있음', '비밀번호가 없는 본사는 "비밀번호 없음"이 표시됨 (운영승인 전에 [비밀번호 변경]으로 정해야 함)'])),
            hqCase('이미 사용 중인 아이디로 바꾸면', 'hq-d-id-dup-pc', '본사 상세 아이디 중복',
              hqList(['조건: 다른 본사·가맹점이 쓰는 아이디를 입력하고 [중복확인]을 누름', '안내: "이미 사용 중인 아이디입니다." (빨간색)', '[저장]을 눌러도 같은 안내가 나오고 저장되지 않음'])),
            hqCase('비밀번호를 바꾸려면', 'hq-d-pw-edit-pc', '본사 상세 비밀번호 변경',
              hqList(['조건: [비밀번호 변경]을 누름', '새 비밀번호와 비밀번호 확인 입력칸, [취소], [변경]이 나타남', '[변경]: 새 비밀번호로 바꾸고 조회 상태로 돌아감', '[취소]: 바꾸지 않고 돌아감'])),
            hqCase('비밀번호 변경이 되지 않으면', 'hq-d-pw-error-pc', '본사 상세 비밀번호 변경 오류',
              tradeTable([
                ['규칙에 맞지 않거나 비어 있음', '"비밀번호는 공백 없이 영문과 숫자를 포함한 8~20자로 입력해 주세요."'],
                ['비밀번호와 확인이 다름', '"비밀번호와 비밀번호 확인이 일치하지 않습니다."']
              ], '상황', '안내 문구') + '<p>안내는 입력칸 아래에 빨간색으로 나오고, 입력한 내용은 그대로 남아요.</p>'),
            hqCase('법인사업자로 바꾸면', 'hq-d-corp-pc', '본사 상세 법인사업자 선택',
              hqList(['조건: 사업자유형에서 [법인사업자]를 고름', '법인등록번호 입력칸이 나타남 (법인등록번호도 운영승인 필수 항목이 됨)', '개인사업자로 바꾸고 저장하면 법인등록번호는 비워짐'])),
            hqCase('저장이 되지 않으면', 'hq-d-save-error-pc', '본사 상세 신청정보 저장 오류',
              hqList(['조건: 입력한 항목이 규칙에 맞지 않거나 바꾼 아이디·사업자등록번호가 이미 등록된 값인 채로 [저장]을 누름', '안내: [저장] 위에 빨간색으로 한 건 (문구는 <a href="#hq-list/register">본사 직접등록하기</a>의 입력 규칙 오류와 같음)', '저장되지 않고 입력한 내용은 그대로 남음'])),
          ]
        },
        {
          group: '페이앱 연동 탭에서',
          rows: [
            hqCase('연동 값이 있으면', 'hq-d-payapp-pc', '본사 상세 페이앱 연동 조회',
              hqList(['판매자 아이디, 연동 KEY, 연동 VALUE가 보이고 검증상태는 연동완료', '[연동정보 변경]으로 값을 바꿀 수 있음'])),
            hqCase('연동 값이 없으면', 'hq-d-payapp-empty-pc', '본사 상세 페이앱 연동 없음',
              hqList(['세 값이 모두 "미입력", 검증상태는 미연동', '승인대기 본사는 신청할 때 연동 정보가 들어오지 않아서 이 상태가 정상이에요. 운영승인 전에 운영자가 입력해요.', '값이 없으면 [연동정보 변경]을 눌러도 확인 창 없이 바로 편집 상태가 됨'])),
            hqCase('연동 값을 바꾸려 하면', 'hq-d-payapp-alert-pc', '본사 상세 페이앱 연동정보 변경 확인',
              hqList(['조건: 연동 값이 있는 본사에서 [연동정보 변경]을 누름', '안내: "연동정보를 변경하면 기존 정산계좌 등 연동 정보가 모두 바뀌어 문제가 발생할 수 있습니다. 계속하시겠습니까?"', '[계속]: 검증상태를 미검증으로 바꾸고 편집 상태로 전환', '[취소]: 바꾸지 않고 확인 창을 닫음'])),
            hqCase('연동 값을 고치는 중이면', 'hq-d-payapp-edit-pc', '본사 상세 페이앱 연동 편집',
              hqList(['제목: "페이앱 연동 정보 (편집중)"', '검증상태: 미검증 (값을 바꿀 때마다 미검증으로 돌아감)', '[변경]: 검증완료 전에는 누를 수 없음', '[유효성 검증]: 세 값이 모두 입력되어 있으면 검증완료로 바뀜'])),
            hqCase('검증이 끝나면', 'hq-d-payapp-verified-pc', '본사 상세 페이앱 연동 검증완료',
              hqList(['검증상태: 검증완료', '[변경]: 누를 수 있게 됨. 누르면 새 값으로 바뀌고 조회 상태로 돌아감', '검증을 하지 않은 채로 두면 운영승인 단계에서 막혀요. 이미 운영중인 본사의 값을 편집하는 중에 미검증이 되어도 본사 상태는 자동으로 바뀌지 않아요.']))
          ]
        },
        {
          group: '가맹점·매출 요약 탭에서',
          rows: [
            hqCase('소속 가맹점과 매출이 있으면', 'hq-d-trade-pc', '본사 상세 가맹점·매출 요약',
              hqList(['가맹점요약: 운영 가맹점, 당월 거래발생 가맹점, 당월 미거래 가맹점, 당월 신규가입 가맹점', '매출요약: 당월 페이앱 결제액, 당월 현장결제·계좌이체 결제액, 당월 매출액, 당월 이용료 수납액', '각 영역 오른쪽 위: "실시간 집계 (YY.MM.DD HH:MM)"'])),
            hqCase('소속 가맹점이 없으면', 'hq-d-trade-zero-pc', '본사 상세 가맹점 없음',
              hqList(['조건: 승인대기·승인불가 본사처럼 소속 가맹점이 없는 본사', '모든 카드가 0으로 표시됨 (비율은 "-")', '[해당 본사 가맹점 보기 →], [거래/매출 현황 이동 →]은 그대로 누를 수 있음'])),
            hqCase('[해당 본사 가맹점 보기 →]를 누르면', 'hq-d-go-franchise-pc', '본사의 가맹점 정보 목록',
              hqList(['이동: <a href="#franchise-list">가맹점 정보</a> 목록', '표시: 검색창에 이 본사의 상호명이 입력되어 이 본사 소속 가맹점이 조회된 상태 (이용상태 [전체], 가입신청일시순)'])),
            hqCase('[거래/매출 현황 이동 →]을 누르면', 'hq-d-go-sales-pc', '본사 거래/매출 현황',
              hqList(['이동: <a href="#trade-hq">거래/매출 현황의 본사별 현황</a>', '표시: 이 본사가 선택된 상태 (조회기간 이번달)']))
          ]
        },
        {
          group: '내부메모 탭에서',
          rows: [
            hqCase('메모가 있으면', 'hq-d-memo-pc', '본사 상세 내부메모',
              hqList(['메모와 작성 일시가 최신 메모부터 나옴', '안내: "본사 내부 참고용이며, 해당 본사에게는 노출되지 않습니다."'])),
            hqCase('메모를 추가하면', 'hq-d-memo-add-pc', '본사 상세 내부메모 추가',
              hqList(['조건: 메모를 입력하고 [추가]를 누름', '표시: 새 메모가 맨 위에 작성 일시와 함께 나타나고 입력칸은 비워짐', '내용을 입력하지 않고 [추가]를 누르면 아무 일도 일어나지 않음'])),
            hqCase('메모가 없으면', 'hq-d-memo-empty-pc', '본사 상세 내부메모 없음',
              hqList(['안내: "등록된 메모가 없습니다."', '메모의 [삭제]를 누르면 바로 삭제되고 복구할 수 없어요.']))
          ]
        },
        {
          group: '관리자 접속할 때',
          rows: [
            hqCase('이 본사의 관리자 화면을 열려면', 'hq-d-access-pc', '본사 관리자접속 안내',
              hqList(['조건: 운영중·운영제한 본사의 상세 상단 [관리자접속]을 누름 (승인대기·승인불가 본사에는 버튼이 없음)', '안내: "OO의 본사 관리자로 접속합니다.", "새 창에서 해당 계정의 관리자 화면이 열립니다."', '[접속]: 새 창으로 이 본사의 09SCM 관리자 화면을 열고 확인 창을 닫음', '[취소]: 확인 창을 닫음']))
          ]
        }
      ],
      trouble:
        '<h3>아이디를 바꿀 수 없어요</h3>' +
        '<p>아이디는 09SCM 로그인과 소매몰 주소에 쓰이기 때문에 [운영중], [운영제한] 본사는 바꿀 수 없어요. [승인대기], [승인불가] 본사만 바꿀 수 있어요.</p>' +
        '<h3>비밀번호를 잊어버렸다고 해요</h3>' +
        '<p>[비밀번호 변경]으로 새 비밀번호를 정해 SMS로 안내해요. 본사 상태와 관계없이 언제든 바꿀 수 있고, 임시 비밀번호는 자동으로 만들어지지 않아요.</p>' +
        '<h3>[관리자접속]이 보이지 않아요</h3>' +
        '<p>[승인대기]와 [승인불가] 본사에는 09SCM 관리자 계정이 만들어지지 않아 버튼이 없어요. 운영승인 뒤에 나타나요.</p>' +
        '<h3>[변경]을 누를 수 없어요</h3>' +
        '<p>페이앱 연동 값을 바꾸면 검증상태가 미검증으로 돌아가요. 세 값을 모두 입력하고 [유효성 검증]을 누른 뒤에 [변경]을 눌러요.</p>'
    },

    {
      id: 'status',
      label: '본사 상태 바꾸기',
      shots: hqShot('hq-status-pc', '본사 상세 하단 상태 영역'),
      shotCaption: '09SCM 통합관리자 본사 상세 하단 상태 영역 화면',
      overview:
        '<p>본사의 운영 상태를 바꾸는 방법이에요. 본사 상세 화면 맨 아래에 고정된 영역에서, 탭과 관계없이 항상 바꿀 수 있어요.</p>' +
        '<ul>' +
          '<li>상태는 승인대기, 운영중, 운영제한, 승인불가 네 가지예요. 가맹점의 이용상태(이용대기·이용승인·이용제한·이용불가)와는 별개의 상태예요.</li>' +
          '<li>상태를 바꾼 이유는 <a href="#hq-list/detail">내부메모 탭</a>에 남겨 두면 나중에 확인하기 좋아요.</li>' +
        '</ul>',
      steps:
        '<h3>본사 상태</h3>' +
        tradeTable([
          ['승인대기', '도입 신청이 접수되어 UDID 검토를 기다리는 상태. 09SCM 본사 계정과 소매몰이 아직 없음. 직접등록한 본사도 이 상태로 시작'],
          ['운영중', '정상 운영 중인 상태'],
          ['운영제한', '운영 중이던 본사에 제한이 걸린 상태 (제한 내용은 아래 참고)'],
          ['승인불가', '도입 신청을 승인하지 않은 상태']
        ], '상태', '의미') +

        '<h3>상태 바꾸는 방법</h3>' +
        tradeTable([
          ['승인대기', '[승인불가], [운영승인] 버튼. 페이앱 연동 검증과 필수 항목 저장이 끝나야 [운영승인]을 할 수 있음'],
          ['승인불가', '[반려철회] 버튼. 누르면 승인대기로 돌아감'],
          ['운영중', '운영중·운영제한 선택 + [변경확인] 버튼. 운영제한을 고르고 [변경확인]을 누르면 운영제한으로 바뀜'],
          ['운영제한', '운영중·운영제한 선택 + [변경확인] 버튼. 운영중을 고르고 [변경확인]을 누르면 운영중으로 돌아감']
        ], '현재 상태', '보이는 항목과 동작') +
        '<p>상태를 바꾸면 아래 영역에 "처리되었습니다."가 표시되고 화면의 상태 배지도 바뀌어요. 운영승인을 한 뒤에는 승인대기·승인불가로 되돌릴 수 없고, 운영중과 운영제한 사이에서만 바꿀 수 있어요.</p>' +

        '<h3>운영승인에 필요한 것</h3>' +
        tradeTable([
          ['페이앱 연동 검증완료', '<a href="#hq-list/detail">페이앱 연동 탭</a>의 검증상태가 연동완료여야 함. 미검증이면 [운영승인]이 비활성화되고 "페이앱 연동 검증을 완료해야 운영승인할 수 있습니다."가 나옴'],
          ['신청정보 필수 항목 저장', '신청정보 탭에서 <strong>*</strong>가 붙은 항목(아이디, 비밀번호, 이름, 휴대폰번호, 이메일, 본사명, 대표자명, 사업자등록번호, 사업장주소, 법인사업자는 법인등록번호)이 모두 저장되어 있어야 함. 비어 있으면 "필수 항목을 모두 입력해야 운영승인할 수 있습니다."가 빨간색으로 나옴']
        ], '조건', '설명') +
        '<p>운영승인을 하면 본사가 [운영중]이 되고, 처음 운영승인할 때 09SCM 본사 계정과 소매몰이 만들어져요. 이때부터 본사 목록의 소매몰 URL에 주소가 나타나고 상세에 [관리자접속]이 보여요.</p>' +

        '<h3>승인불가일 때</h3>' +
        '<p>신청자에게 자동으로 안내가 가지 않아요. 필요하면 본사 목록의 <a href="#hq-list/list">[SMS 발송]</a>으로 직접 안내하고, 사유는 내부메모에 기록해요.</p>' +

        '<h3>운영제한일 때</h3>' +
        tradeTable([
          ['가맹점 이용제한과 같은 제재', '이 본사 계정이 09SCM 관리자에서 도소매 신규 등록·주문 기능을 쓸 수 없고, 소매몰은 대문 화면으로 이동해 신규 주문을 받지 않음. 이미 진행 중인 주문의 처리는 계속할 수 있음'],
          ['신규 가맹점 유치 중단', '소매몰에서 가맹점 가입 신청을 받지 않음'],
          ['소속 가맹점', '본사가 운영제한이 되어도 소속 가맹점의 이용상태는 바뀌지 않음']
        ], '구분', '내용') +
        '<p>운영제한을 고르면 영역에 "가맹점 이용제한과 동일한 제재가 적용되고, 신규 가맹점 유치가 불가합니다." 안내가 나와요. 운영제한 본사가 09SCM 관리자에 로그인하면 아래와 같은 안내가 보여요.</p>' +
        tradeTable([
          ['상단 배너', '"이 계정은 이용이 제한된 상태입니다. 도소매 기능 이용이 제한되며, 해제하려면 관리 담당자에게 문의해 주세요."'],
          ['비활성 버튼 툴팁', '"현재 상태에서는 사용할 수 없습니다."']
        ], '구분', '문구'),
      cases: [
        {
          group: '승인대기일 때',
          rows: [
            hqCase('페이앱 연동 검증을 하지 않았으면', 'hq-s-wait-pc', '본사 승인대기 하단 영역',
              hqList(['표시: 상태 배지(승인대기), [승인불가], [운영승인]', '안내: "페이앱 연동 검증을 완료해야 운영승인할 수 있습니다."', '[운영승인]: 비활성화되어 누를 수 없음', '해결: <a href="#hq-list/detail">페이앱 연동 탭</a>에서 연동 값을 입력하고 [유효성 검증] 후 [변경]'])),
            hqCase('페이앱 연동 검증이 끝나면', 'hq-s-wait-ready-pc', '본사 승인대기 운영승인 가능',
              hqList(['표시: 안내 문구가 사라지고 [운영승인]을 누를 수 있게 됨', '필수 항목이 모두 저장되어 있어야 운영승인이 처리됨'])),
            hqCase('필수 항목이 비어 있으면', 'hq-s-approve-error-pc', '본사 운영승인 필수 항목 오류',
              hqList(['조건: 필수 항목(비밀번호 등) 중 저장되지 않은 항목이 있는 채로 [운영승인]을 누름', '안내: "필수 항목을 모두 입력해야 운영승인할 수 있습니다." (빨간색)', '상태는 승인대기 그대로', '해결: 신청정보 탭에서 <strong>*</strong> 항목을 채우고 [저장] (비밀번호는 [비밀번호 변경])한 뒤 다시 [운영승인]'])),
            hqCase('운영승인이 되면', 'hq-s-approved-pc', '본사 운영승인 완료',
              hqList(['안내: "처리되었습니다."', '상태: 운영중으로 바뀌고, 영역이 운영중·운영제한 선택으로 바뀜', '09SCM 본사 계정과 소매몰이 만들어지고, 상세 상단에 [관리자접속]이 나타남'])),
            hqCase('승인불가로 처리하면', 'hq-s-reject-done-pc', '본사 승인불가 처리 완료',
              hqList(['조건: [승인불가]를 누름', '안내: "처리되었습니다."', '상태: 승인불가로 바뀌고 [반려철회]가 나타남', '신청자에게 자동 안내는 가지 않으니 필요하면 SMS로 안내하고 사유를 내부메모에 기록해요.']))
          ]
        },
        {
          group: '승인불가일 때',
          rows: [
            hqCase('승인불가 본사이면', 'hq-s-reject-pc', '본사 승인불가 하단 영역',
              hqList(['표시: 상태 배지(승인불가), [반려철회]'])),
            hqCase('반려를 철회하면', 'hq-s-revoke-done-pc', '본사 반려철회 완료',
              hqList(['조건: [반려철회]를 누름', '안내: "처리되었습니다."', '상태: 승인대기로 돌아가고 [승인불가], [운영승인]이 다시 나타남']))
          ]
        },
        {
          group: '운영중일 때',
          rows: [
            hqCase('운영중 본사이면', 'hq-s-run-pc', '본사 운영중 하단 영역',
              hqList(['표시: 상태 선택(운영중이 선택됨), [변경확인]', '[변경확인]: 지금 상태와 같은 값이 선택되어 있으면 누를 수 없음'])),
            hqCase('운영제한을 고르면', 'hq-s-limit-select-pc', '본사 운영제한 선택',
              hqList(['조건: 상태에서 [운영제한]을 고름', '안내: "가맹점 이용제한과 동일한 제재가 적용되고, 신규 가맹점 유치가 불가합니다."', '[변경확인]: 누를 수 있게 됨'])),
            hqCase('운영제한으로 바꾸면', 'hq-s-limit-done-pc', '본사 운영제한 변경 완료',
              hqList(['조건: [변경확인]을 누름', '안내: "처리되었습니다."', '상태: 운영제한으로 바뀌고 제한이 바로 적용됨 (소속 가맹점의 이용상태는 그대로)']))
          ]
        },
        {
          group: '운영제한일 때',
          rows: [
            hqCase('운영제한 본사이면', 'hq-s-limit-pc', '본사 운영제한 하단 영역',
              hqList(['표시: 상태 선택(운영제한이 선택됨)과 제재 안내, [변경확인]', '운영중으로 돌리려면 [운영중]을 고르고 [변경확인]을 누름 (처리되면 "처리되었습니다."가 나오고 제재가 풀림)'])),
            hqCase('운영제한 본사가 09SCM 관리자에 접속하면', 'hq-s-limit-partner-pc', '운영제한 본사의 09SCM 관리자',
              hqList(['표시: 화면 맨 위에 안내 배너가 고정됨 (스크롤해도 유지, 닫을 수 없음)', '배너: "이 계정은 이용이 제한된 상태입니다. 도소매 기능 이용이 제한되며, 해제하려면 관리 담당자에게 문의해 주세요."', '도소매 등록·전환 등 제한된 기능의 버튼은 비활성화되고, 마우스를 올리면 "현재 상태에서는 사용할 수 없습니다."가 나옴', '로그인과 메뉴 이동은 그대로 되고, 이미 진행 중인 주문은 계속 처리할 수 있음', '운영중으로 돌아오면 배너가 사라지고 버튼이 다시 활성화돼요.']))
          ]
        }
      ],
      trouble:
        '<h3>[운영승인]을 누를 수 없어요</h3>' +
        '<p>페이앱 연동 검증이 끝나지 않은 상태예요. 상세의 페이앱 연동 탭에서 연동 값을 입력하고 [유효성 검증]에 성공한 뒤 [변경]을 눌러요.</p>' +
        '<h3>"필수 항목을 모두 입력해야 운영승인할 수 있습니다."가 나와요</h3>' +
        '<p>신청정보 탭에서 <strong>*</strong>가 붙은 항목 중 저장되지 않은 항목이 있어요. 특히 직접등록하거나 비밀번호가 없는 본사는 [비밀번호 변경]으로 비밀번호를 정한 뒤에 운영승인해요. 법인사업자는 법인등록번호도 필요해요.</p>' +
        '<h3>[변경확인]을 누를 수 없어요</h3>' +
        '<p>지금 상태와 다른 값을 선택해야 눌러져요. 운영중에서 운영제한으로, 또는 운영제한에서 운영중으로 바꿀 때만 쓰는 버튼이에요.</p>' +
        '<h3>승인불가를 되돌리고 싶어요</h3>' +
        '<p>[반려철회]를 누르면 승인대기로 돌아가요. 그 뒤 다시 [운영승인]이나 [승인불가]를 할 수 있어요. 운영승인을 한 본사는 승인대기로 되돌릴 수 없어요.</p>'
    }
  ]
};
