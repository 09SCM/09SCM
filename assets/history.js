// 이용가이드 변경 이력 — 인덱스 카드의 히스토리에 표시한다. 최신 버전이 위로 오도록 앞에 추가한다.
// 버전: 배포 버전(version-*.js와 일치) / date: 업데이트 일시(YY.MM.DD HH:MM) / push: 반영 커밋 ID(7자리)
// items: summary(수정 내용 1줄) / path(섹션 경로) / link(해당 위치 링크, 이용가이드 기준 상대 주소)
window.GUIDE_HISTORY = {
  shop: [
    {
      version: 'v1.0', date: '26.10.29 14:55', push: '__PUSH__', note: '최초작성',
      items: [
        { summary: '시작하기 5개 화면 최초 작성', path: '시작하기', link: './guide/shop.html#start-intro' },
        { summary: '둘러보기 3개 화면 최초 작성', path: '둘러보기', link: './guide/shop.html#browse-main' },
        { summary: '주문하기 2개 화면 최초 작성', path: '주문하기', link: './guide/shop.html#order-cart' },
        { summary: '주문조회 3개 화면 최초 작성', path: '주문조회', link: './guide/shop.html#check-quick' },
        { summary: '마이페이지 3개 화면 최초 작성', path: '마이페이지', link: './guide/shop.html#mypage-info' },
      ]
    }
  ],
  partner: [
    {
      version: 'v1.0', date: '26.10.27 10:42', push: '54a2fdc', note: '최초작성',
      items: [
        { summary: '시작하기 3개 화면 최초 작성', path: '시작하기', link: './guide/partner.html#start-intro' },
        { summary: '대시보드 1개 화면 최초 작성', path: '대시보드', link: './guide/partner.html#dashboard-ops' },
        { summary: '소매관리 8개 화면 최초 작성', path: '소매관리', link: './guide/partner.html#retail-product-list' },
        { summary: '도매관리 6개 화면 최초 작성', path: '도매관리', link: './guide/partner.html#wholesale-shop' },
        { summary: '가맹점관리 4개 화면 최초 작성', path: '가맹점관리', link: './guide/partner.html#franchise-list' },
        { summary: '시스템관리 4개 화면 최초 작성', path: '시스템관리', link: './guide/partner.html#system-member' },
      ]
    }
  ],
  admin: [
    {
      version: 'v1.0', date: '26.10.07 16:25', push: 'c999849', note: '최초작성',
      items: [
        { summary: '시작하기 2개 화면 최초 작성', path: '시작하기', link: './guide/admin.html#start-login' },
        { summary: '대시보드 1개 화면 최초 작성', path: '대시보드', link: './guide/admin.html#dashboard-ops' },
        { summary: '본사/가맹점 관리 2개 화면 최초 작성', path: '본사/가맹점 관리', link: './guide/admin.html#hq-list' },
        { summary: '거래/매출 현황 3개 화면 최초 작성', path: '거래/매출 현황', link: './guide/admin.html#trade-all' },
        { summary: '시스템 관리 2개 화면 최초 작성', path: '시스템 관리', link: './guide/admin.html#system-notice' },
      ]
    }
  ],
};
