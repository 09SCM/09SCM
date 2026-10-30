// 이용가이드 변경 이력 — 인덱스 카드의 히스토리에 표시한다. 최신 버전이 위로 오도록 앞에 추가한다.
// version: 배포 버전(version-*.js와 일치) / date: 업데이트 일시(YY.MM.DD HH:MM) / push: 반영 커밋 ID(7자리) / note: 비고
// items(선택): summary(수정 내용 1줄) / path(섹션 경로) / link(해당 위치 링크, 이용가이드 기준 상대 주소). 없으면 펼침 없이 한 줄로 표시한다.
window.GUIDE_HISTORY = {
  admin: [
    {
      version: '목업 수정', date: '26.10.30 17:50', push: 'd31f83e',
      items: [
        { summary: '본사 상세 신청정보 탭의 필수 항목에 * 표시 (직접등록 화면은 선택 입력이라 표시 없음)', path: '통합관리자 화면 > 본사 관리 > 본사 상세 > 신청정보', link: './mock/admin.html' },
        { summary: '[운영승인] 시 필수 항목이 비어 있으면 안내 후 승인 중단 ([저장]은 필수 확인 없음)', detail: ['안내 : 필수 항목을 모두 입력해야 운영승인할 수 있습니다.'], path: '통합관리자 화면 > 본사 관리 > 본사 상세 > 신청정보', link: './mock/admin.html' }
      ]
    },
    {
      version: '목업 수정', date: '26.10.29 16:42', push: '99a365a',
      items: [
        { summary: '매출 추이 표 위에 집계 기준일 안내 문구 추가 (주문건수·결제액은 결제완료일, 취소·환불은 승인일 기준)', path: '통합관리자 화면 > 거래/매출 현황 > 매출 추이', link: './mock/admin.html' }
      ]
    }
  ],
  partner: [
    {
      version: '목업 수정', date: '26.10.30 17:50', push: 'b65e9dd',
      items: [
        { summary: '본사 계정이 운영제한일 때도 이용제한과 같은 제한 적용 (소매몰 접근 불가, 도소매 등록·전환 버튼 비활성)', path: '가맹관리자 화면 > 공통 > 이용제한 상태', link: './mock/partner.html' },
        { summary: '이용제한 배너·비활성 버튼 안내 문구를 가맹점·본사 공통 문구로 통일', detail: ['배너 : 이 계정은 이용이 제한된 상태입니다. 도소매 기능 이용이 제한되며, 해제하려면 관리 담당자에게 문의해 주세요.', '툴팁 : 현재 상태에서는 사용할 수 없습니다.'], path: '가맹관리자 화면 > 공통 > 이용제한 배너', link: './mock/partner.html' },
        { summary: '로그인 데모 계정 변경: 본사 bonsa → bonsa1(본사 · 운영중), bonsa2(본사 · 운영제한) 추가', path: '가맹관리자 화면 > 로그인', link: './mock/partner.html' }
      ]
    },
    {
      version: 'v1.1', date: '26.10.30 17:50', push: 'dd38247',
      items: [
        { summary: '이용제한 가맹점 캡처를 새 배너 문구 기준으로 재촬영', path: '가맹점 관리 > 가맹점목록 > 이용상태 변경하기', link: './guide/partner.html#franchise-list' },
        { summary: "소개에 '공통 영역 보기' 구역 추가: 헤더 및 왼쪽 메뉴 설명 보충", path: '시작하기 > 09SCM 관리자 소개 > 공통 영역 보기', link: './guide/partner.html#start-intro/sec6' },
        { summary: '로그인 후 표시되는 계정 정보 안내 문장 추가, 공통 영역 보기로 연결', path: '시작하기 > 가입신청·로그인', link: './guide/partner.html#start-login' }
      ]
    },
    { version: 'v1.0', date: '26.10.27 10:42', push: '54a2fdc', note: '최초작성' }
  ],
  shop: [
    { version: 'v1.0', date: '26.10.29 14:55', push: 'ec49a06', note: '최초작성' }
  ]
};
