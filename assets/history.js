// 이용가이드 변경 이력 — 인덱스 카드의 히스토리에 표시한다. 최신 버전이 위로 오도록 앞에 추가한다.
// version: 배포 버전(version-*.js와 일치) / date: 업데이트 일시(YY.MM.DD HH:MM) / push: 반영 커밋 ID(7자리) / note: 비고
// items(선택): summary(수정 내용 1줄) / path(섹션 경로) / link(해당 위치 링크, 이용가이드 기준 상대 주소). 없으면 펼침 없이 한 줄로 표시한다.
window.GUIDE_HISTORY = {
  admin: [
    {
      version: '목업 수정', date: '26.10.29 16:42', push: '99a365a',
      items: [
        { summary: '매출 추이 표 위에 집계 기준일 안내 문구 추가 (주문건수·결제액은 결제완료일, 취소·환불은 승인일 기준)', path: '통합관리자 화면 > 거래/매출 현황 > 매출 추이', link: './mock/admin.html' }
      ]
    }
  ],
  partner: [
    {
      version: 'v1.1', date: '26.10.29 14:48', push: 'cd8a7a3',
      items: [
        { summary: '헤더 오른쪽 위 계정 정보(회원 유형·상호명·아이디) 설명과 PC·모바일 캡처 추가', path: '시작하기 > 09SCM 관리자 소개 > 화면 오른쪽 위 계정 정보', link: './guide/partner.html#start-intro/sec6' },
        { summary: '로그인 후 표시되는 계정 정보 문장에서 새 구역으로 연결', path: '시작하기 > 가입신청·로그인', link: './guide/partner.html#start-login' }
      ]
    },
    { version: 'v1.0', date: '26.10.27 10:42', push: '54a2fdc', note: '최초작성' }
  ],
  shop: [
    { version: 'v1.0', date: '26.10.29 14:55', push: 'ec49a06', note: '최초작성' }
  ]
};
