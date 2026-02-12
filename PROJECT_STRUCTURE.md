# 🎁 You.us 프로젝트 전체 구조

> **프로젝트명**: You.us - 선물 추천 및 판매 플랫폼
> **기술 스택**: Next.js 16.1.1, React 19, TypeScript, Tailwind CSS
> **작성일**: 2026-02-12

---

## 📁 전체 프로젝트 구조 (주석 포함)

```
final-08-You.us/
│
├── 📂 .claude/                                    # Claude AI 설정 파일 폴더
│   └── settings.local.json                        # Claude 로컬 설정
│
├── 📂 .github/                                    # GitHub 관련 설정 폴더
│   ├── ISSUE_TEMPLATE/                            # GitHub 이슈 템플릿 폴더
│   └── workflows/                                 # GitHub Actions 워크플로우 (CI/CD)
│
├── 📂 .vscode/                                    # VSCode 에디터 설정 폴더
│   ├── settings.json                              # VSCode 워크스페이스 설정
│   └── tailwind.json                              # Tailwind CSS Intellisense 설정
│
├── 📂 api/                                        # API 관련 파일 폴더
│   ├── bruno/                                     # Bruno API 테스트 컬렉션
│   │   ├── sample/                                # 샘플 API 테스트
│   │   │   ├── bruno.json                         # Bruno 설정 파일
│   │   │   ├── 00_DB 초기화/                      # DB 초기화 API 테스트
│   │   │   ├── 01_회원/                           # 회원 관련 API 테스트
│   │   │   │   ├── 01_회원가입,로그인/             # 회원가입/로그인 테스트
│   │   │   │   ├── 02_회원 정보 수정/             # 회원정보 수정 테스트
│   │   │   │   ├── 03_회원 목록 조회/             # 회원 목록 조회 테스트
│   │   │   │   └── 04_회원 정보 조회/             # 회원 정보 조회 테스트
│   │   │   ├── 02_일반 회원/                      # 일반 회원 기능 테스트
│   │   │   │   ├── 01_상품/                       # 상품 관련 테스트
│   │   │   │   │   ├── 01_상품 검색/              # 상품 검색 테스트
│   │   │   │   │   └── 02_상품 정렬/              # 상품 정렬 테스트
│   │   │   │   ├── 02_구매/                       # 구매 관련 테스트
│   │   │   │   │   ├── 01_구매 목록 조회/         # 구매 목록 조회 테스트
│   │   │   │   │   └── 02_상품 구매/              # 상품 구매 테스트
│   │   │   │   ├── 03_구매 후기/                  # 리뷰 관련 테스트
│   │   │   │   ├── 04_장바구니/                   # 장바구니 테스트
│   │   │   │   ├── 05_북마크(찜하기), 좋아요/     # 찜하기 테스트
│   │   │   │   └── 06_알림메세지/                 # 알림 메시지 테스트
│   │   │   ├── 03_판매 회원/                      # 판매자 기능 테스트
│   │   │   │   ├── 01_상품 관리/                  # 상품 관리 테스트
│   │   │   │   │   ├── 01_상품 검색/              # 상품 검색 테스트
│   │   │   │   │   └── 02_상품 정렬/              # 상품 정렬 테스트
│   │   │   │   └── 02_주문 관리/                  # 주문 관리 테스트
│   │   │   │       ├── 01_주문 조회/              # 주문 조회 테스트
│   │   │   │       └── 02_주문 수정/              # 주문 수정 테스트
│   │   │   ├── 04_관리자/                         # 관리자 기능 테스트
│   │   │   │   ├── 01_회원 관리/                  # 회원 관리 테스트
│   │   │   │   ├── 02_코드 관리/                  # 코드 관리 테스트
│   │   │   │   ├── 03_통계 조회/                  # 통계 조회 테스트
│   │   │   │   └── 04_설정 관리/                  # 설정 관리 테스트
│   │   │   ├── 05_게시판(QnA, 공지 등)/           # 게시판 기능 테스트
│   │   │   │   ├── 01_목록 조회/                  # 목록 조회 테스트
│   │   │   │   ├── 02_게시물 등록/                # 게시물 등록 테스트
│   │   │   │   └── 03_댓글/                       # 댓글 테스트
│   │   │   └── 06_시스템/                         # 시스템 기능 테스트
│   │   │       ├── 01_파일/                       # 파일 업로드 테스트
│   │   │       ├── 02_인증/                       # 인증 테스트
│   │   │       ├── 03_코드 조회/                  # 코드 조회 테스트
│   │   │       ├── 04_설정 조회/                  # 설정 조회 테스트
│   │   │       └── 05_메일 전송/                  # 메일 전송 테스트
│   │   └── team/                                  # 팀 프로젝트 API 테스트
│   │       └── bruno.json                         # 팀 Bruno 설정 파일
│   │
│   └── dbinit/                                    # 데이터베이스 초기화 데이터 폴더
│       ├── sample/                                # 샘플 초기 데이터
│       │   ├── data.json                          # 샘플 데이터 (사용자, 상품 등)
│       │   └── uploadFiles/                       # 샘플 업로드 파일
│       └── team/                                  # 팀 프로젝트 초기 데이터
│           ├── data.json                          # 실제 운영 초기 데이터 (상품, 회원 등)
│           ├── init.json                          # DB 초기화 스크립트
│           ├── hja.json                           # 팀원(하재안) 데이터
│           ├── sohyerim.json                      # 팀원(서혜림) 데이터
│           ├── yeoukyoung.json                    # 팀원(여경) 데이터
│           └── uploadFiles/                       # 실제 업로드 파일 (이미지 등)
│               ├── folder_1/                      # 업로드 파일 폴더 1
│               ├── folder_2/                      # 업로드 파일 폴더 2
│               ├── folder_3/                      # 업로드 파일 폴더 3
│               ├── folder_4/                      # 업로드 파일 폴더 4
│               └── folder_5/                      # 업로드 파일 폴더 5
│
├── 📂 public/                                     # 정적 파일 폴더 (빌드 시 그대로 복사)
│   ├── fonts/                                     # 커스텀 폰트 파일
│   ├── icons/                                     # 아이콘 이미지 파일
│   ├── images/                                    # 이미지 파일 폴더
│   │   ├── banners/                               # 메인 배너 이미지
│   │   ├── cart/                                  # 장바구니 관련 이미지
│   │   ├── common/                                # 공통 이미지 (로고, 아이콘 등)
│   │   └── products/                              # 상품 이미지
│   │       ├── Beauty/                            # 뷰티 카테고리 상품 이미지
│   │       └── mypage/                            # 마이페이지 관련 이미지
│   ├── products/                                  # 상품 관련 정적 파일
│   └── uploadFiles/                               # 사용자 업로드 파일
│
├── 📂 src/                                        # 소스 코드 메인 폴더
│   │
│   ├── 📂 app/                                    # Next.js App Router 폴더
│   │   │
│   │   ├── 📂 (auth)/                             # 인증 관련 페이지 (헤더/푸터 없음)
│   │   │   ├── layout.tsx                         # 인증 페이지 전용 레이아웃
│   │   │   ├── login/                             # 로그인 페이지
│   │   │   │   ├── page.tsx                       # 로그인 메인 페이지
│   │   │   │   └── callback/                      # 소셜 로그인 콜백
│   │   │   │       └── naver/                     # 네이버 로그인 콜백
│   │   │   │           ├── page.tsx               # 네이버 콜백 페이지 (Server Component)
│   │   │   │           └── NaverCallback.tsx      # 네이버 콜백 로직 (Client Component)
│   │   │   └── signup/                            # 회원가입 페이지
│   │   │       └── page.tsx                       # 회원가입 폼 페이지
│   │   │
│   │   ├── 📂 (public)/                           # 공개 페이지 (비로그인 접근 가능)
│   │   │   ├── layout.tsx                         # 공개 페이지 레이아웃
│   │   │   ├── intro/                             # 서비스 소개/랜딩 페이지
│   │   │   │   └── page.tsx                       # 인트로 메인 페이지
│   │   │   └── recommend/                         # AI 선물 추천 기능
│   │   │       ├── page.tsx                       # 추천 질문 페이지
│   │   │       └── result/                        # 추천 결과 페이지
│   │   │           └── page.tsx                   # AI 추천 결과 표시
│   │   │
│   │   ├── 📂 (with-layout)/                      # 헤더/푸터 포함 일반 페이지
│   │   │   ├── layout.tsx                         # 메인 레이아웃 (헤더/푸터 포함)
│   │   │   ├── page.tsx                           # 메인 홈페이지 (랜딩 페이지)
│   │   │   │
│   │   │   ├── cart/                              # 장바구니 페이지
│   │   │   │   └── page.tsx                       # 장바구니 메인 페이지
│   │   │   │
│   │   │   ├── products/                          # 상품 관련 페이지
│   │   │   │   ├── [[...categories]]/             # 동적 카테고리 페이지 (선택적 catch-all)
│   │   │   │   │   └── page.tsx                   # 카테고리별 상품 목록
│   │   │   │   └── [category]/                    # 카테고리 동적 라우트
│   │   │   │       └── [subcategory]/             # 서브 카테고리 동적 라우트
│   │   │   │           └── [id]/                  # 상품 ID 동적 라우트
│   │   │   │               ├── page.tsx           # 상품 상세 페이지
│   │   │   │               └── loading.tsx        # 상품 상세 로딩 UI
│   │   │   │
│   │   │   └── 📂 (protected)/                    # 로그인 필요 페이지
│   │   │       ├── layout.tsx                     # 보호된 페이지 레이아웃 (인증 체크)
│   │   │       │
│   │   │       ├── checkout/                      # 결제 페이지
│   │   │       │   ├── page.tsx                   # 결제 진행 페이지
│   │   │       │   └── result/                    # 결제 결과 페이지
│   │   │       │       ├── page.tsx               # 결제 완료/실패 페이지
│   │   │       │       └── CheckoutResult.tsx     # 결제 결과 컴포넌트
│   │   │       │
│   │   │       └── mypage/                        # 마이페이지
│   │   │           ├── layout.tsx                 # 마이페이지 레이아웃
│   │   │           ├── MypageLayoutClient.tsx     # 마이페이지 클라이언트 레이아웃
│   │   │           ├── page.tsx                   # 마이페이지 메인 (대시보드)
│   │   │           │
│   │   │           ├── orders/                    # 주문 내역
│   │   │           │   ├── page.tsx               # 주문 목록 페이지
│   │   │           │   └── [id]/                  # 주문 상세
│   │   │           │       └── page.tsx           # 주문 상세 페이지
│   │   │           │
│   │   │           ├── reviews/                   # 리뷰 관리
│   │   │           │   ├── page.tsx               # 내 리뷰 목록 페이지
│   │   │           │   ├── create/                # 리뷰 작성
│   │   │           │   │   └── [orderId]/         # 주문 ID별 리뷰
│   │   │           │   │       └── [productId]/   # 상품 ID별 리뷰
│   │   │           │   │           └── page.tsx   # 리뷰 작성 페이지
│   │   │           │   └── [reviewId]/            # 리뷰 상세/수정
│   │   │           │       ├── page.tsx           # 리뷰 상세 페이지
│   │   │           │       └── edit/              # 리뷰 수정
│   │   │           │           └── page.tsx       # 리뷰 수정 페이지
│   │   │           │
│   │   │           ├── wishlist/                  # 찜 목록
│   │   │           │   └── page.tsx               # 찜한 상품 목록 페이지
│   │   │           │
│   │   │           ├── delivery/                  # 배송지 관리
│   │   │           │   └── page.tsx               # 배송지 목록/추가/수정 페이지
│   │   │           │
│   │   │           ├── profile/                   # 프로필 관리
│   │   │           │   └── page.tsx               # 회원정보 수정 페이지
│   │   │           │
│   │   │           └── qna/                       # Q&A
│   │   │               └── page.tsx               # 문의 내역 페이지
│   │   │
│   │   ├── 📂 api/                                # Next.js API Routes (서버리스 함수)
│   │   │   └── recommend/                         # AI 추천 API
│   │   │       └── route.ts                       # OpenAI GPT 추천 API 엔드포인트
│   │   │
│   │   ├── layout.tsx                             # 전역 루트 레이아웃 (HTML, 메타데이터 등)
│   │   ├── error.tsx                              # 전역 에러 페이지
│   │   ├── not-found.tsx                          # 404 페이지
│   │   └── CategoryInit.tsx                       # 카테고리 데이터 초기화 컴포넌트
│   │
│   ├── 📂 components/                             # React 컴포넌트 폴더
│   │   │
│   │   ├── 📂 common/                             # 공통 컴포넌트
│   │   │   ├── Header/                            # 헤더 관련 컴포넌트
│   │   │   │   ├── Header.tsx                     # 메인 헤더 컴포넌트 (반응형)
│   │   │   │   ├── DesktopHeader.tsx              # 데스크톱 헤더
│   │   │   │   ├── MobileHeader.tsx               # 모바일 헤더
│   │   │   │   ├── MobileSidebar.tsx              # 모바일 사이드바 메뉴
│   │   │   │   ├── MobileContainer.tsx            # 모바일 컨테이너
│   │   │   │   ├── DesktopCategoryDropdown.tsx    # 데스크톱 카테고리 드롭다운
│   │   │   │   └── SmallCategory.tsx              # 소형 카테고리 메뉴
│   │   │   │
│   │   │   ├── Footer/                            # 푸터 관련 컴포넌트
│   │   │   │   ├── Footer.tsx                     # 메인 푸터 컴포넌트
│   │   │   │   └── FooterLinks.tsx                # 푸터 링크 섹션
│   │   │   │
│   │   │   ├── Button.tsx                         # 공통 버튼 컴포넌트
│   │   │   ├── Input.tsx                          # 공통 입력 필드 컴포넌트
│   │   │   ├── Modal.tsx                          # 모달 컴포넌트
│   │   │   ├── Loading.tsx                        # 로딩 스피너 컴포넌트
│   │   │   ├── EmptyState.tsx                     # 빈 상태 표시 컴포넌트
│   │   │   ├── ErrorBoundary.tsx                  # React 에러 바운더리
│   │   │   ├── Navigation.tsx                     # 네비게이션 컴포넌트
│   │   │   ├── Pagination.tsx                     # 페이지네이션 컴포넌트
│   │   │   ├── ProductCard.tsx                    # 상품 카드 컴포넌트
│   │   │   ├── MoreButton.tsx                     # 더보기 버튼 컴포넌트
│   │   │   ├── SectionHeaderProps.tsx             # 섹션 헤더 컴포넌트
│   │   │   └── ToastProvider.tsx                  # Toast 알림 프로바이더
│   │   │
│   │   ├── 📂 modals/                             # 모달 컴포넌트 폴더
│   │   │   └── TermsModal.tsx                     # 약관 동의 모달
│   │   │
│   │   └── 📂 pages/                              # 페이지별 전용 컴포넌트
│   │       │
│   │       ├── main/                              # 메인 페이지 컴포넌트
│   │       │   ├── MainBannerSwiper.tsx           # 메인 배너 슬라이더 (Swiper)
│   │       │   └── ProductCategorySection.tsx     # 카테고리별 상품 섹션
│   │       │
│   │       ├── login/                             # 로그인 페이지 컴포넌트
│   │       │   └── LoginForm.tsx                  # 로그인 폼 컴포넌트
│   │       │
│   │       ├── signup/                            # 회원가입 페이지 컴포넌트
│   │       │
│   │       ├── intro/                             # 인트로 페이지 컴포넌트
│   │       │   └── IntroActions.tsx               # 인트로 액션 버튼 컴포넌트
│   │       │
│   │       ├── recommend/                         # 추천 페이지 컴포넌트
│   │       │
│   │       ├── products/                          # 상품 목록 페이지 컴포넌트
│   │       │
│   │       ├── product-detail/                    # 상품 상세 페이지 컴포넌트
│   │       │   └── ProductTap/                    # 상품 상세 탭
│   │       │       └── ProductReviews/            # 리뷰 탭 컴포넌트
│   │       │
│   │       ├── cart/                              # 장바구니 페이지 컴포넌트
│   │       │   ├── CartPageClient.tsx             # 장바구니 클라이언트 컴포넌트
│   │       │   ├── CartList.tsx                   # 장바구니 목록 컴포넌트
│   │       │   ├── CartListItem.tsx               # 장바구니 아이템 컴포넌트
│   │       │   ├── CartCheckoutButton.tsx         # 결제하기 버튼 컴포넌트
│   │       │   ├── CartEmpty.tsx                  # 빈 장바구니 상태 컴포넌트
│   │       │   ├── CartOptionModal.tsx            # 상품 옵션 변경 모달
│   │       │   └── AllCheck.tsx                   # 전체 선택 체크박스 컴포넌트
│   │       │
│   │       ├── checkout/                          # 결제 페이지 컴포넌트
│   │       │   ├── CheckoutClient.tsx             # 결제 클라이언트 컴포넌트
│   │       │   ├── OrderItems.tsx                 # 주문 상품 목록 컴포넌트
│   │       │   ├── OrderSummary.tsx               # 주문 요약 컴포넌트
│   │       │   ├── UserInfo.tsx                   # 주문자 정보 입력 컴포넌트
│   │       │   ├── AddressInfo.tsx                # 배송지 정보 입력 컴포넌트
│   │       │   ├── PaymentMethod.tsx              # 결제 수단 선택 컴포넌트
│   │       │   └── PaymentButton.tsx              # 결제하기 버튼 컴포넌트
│   │       │
│   │       └── mypage/                            # 마이페이지 컴포넌트
│   │           ├── main/                          # 마이페이지 메인
│   │           │   ├── MyPageSection.tsx          # 마이페이지 섹션 컴포넌트
│   │           │   ├── QuickMenu.tsx              # 빠른 메뉴 컴포넌트
│   │           │   └── ReviewInfo.tsx             # 리뷰 정보 요약 컴포넌트
│   │           │
│   │           ├── orders/                        # 주문 내역 컴포넌트
│   │           │   ├── OrderStatusHeader.tsx      # 주문 상태 헤더
│   │           │   ├── OrderButtons.tsx           # 주문 액션 버튼 (취소, 환불 등)
│   │           │   ├── DeliveredIcon.tsx          # 배송완료 아이콘 컴포넌트
│   │           │   └── ShippingIcon.tsx           # 배송중 아이콘 컴포넌트
│   │           │
│   │           ├── profile/                       # 프로필 관리 컴포넌트
│   │           │   ├── ProfileCard.tsx            # 프로필 카드 컴포넌트
│   │           │   ├── EditableField.tsx          # 수정 가능 필드 컴포넌트
│   │           │   └── PasswordChange.tsx         # 비밀번호 변경 컴포넌트
│   │           │
│   │           ├── reviews/                       # 리뷰 관리 컴포넌트
│   │           │
│   │           └── wishlist/                      # 찜 목록 컴포넌트
│   │
│   ├── 📂 hooks/                                  # Custom React Hooks 폴더
│   │   └── auth/                                  # 인증 관련 커스텀 훅
│   │
│   ├── 📂 lib/                                    # 라이브러리 및 유틸리티 폴더
│   │   ├── api/                                   # API 통신 관련 함수
│   │   │   └── main/                              # 메인 API 함수들
│   │   │
│   │   ├── auth/                                  # 인증 관련 로직 (JWT, 토큰 관리 등)
│   │   │
│   │   ├── openai/                                # OpenAI GPT API 연동 코드
│   │   │
│   │   ├── utils/                                 # 공통 유틸리티 함수 (날짜, 숫자 포맷 등)
│   │   │
│   │   └── zustand/                               # Zustand 상태 관리 스토어
│   │       └── auth/                              # 인증 상태 관리 스토어
│   │
│   └── 📂 types/                                  # TypeScript 타입 정의 폴더
│       └── *.ts                                   # 각종 타입 정의 파일 (API, 도메인 모델 등)
│
├── 📄 .eslintrc.json                              # ESLint 설정 파일 (코드 린팅)
├── 📄 .gitignore                                  # Git 제외 파일 목록
├── 📄 .prettierrc                                 # Prettier 설정 파일 (코드 포맷팅)
├── 📄 next.config.ts                              # Next.js 설정 파일
├── 📄 package.json                                # 프로젝트 의존성 및 스크립트
├── 📄 package-lock.json                           # 의존성 버전 잠금 파일
├── 📄 postcss.config.mjs                          # PostCSS 설정 (Tailwind CSS 처리)
├── 📄 tailwind.config.ts                          # Tailwind CSS 설정 파일
├── 📄 tsconfig.json                               # TypeScript 설정 파일
└── 📄 README.md                                   # 프로젝트 설명 문서
```

---

## 📋 주요 설정 파일 설명

### package.json

```json
{
  "scripts": {
    "dev": "next dev", // 개발 서버 실행 (localhost:3000)
    "build": "next build", // 프로덕션 빌드
    "start": "next start", // 프로덕션 서버 실행
    "lint": "eslint .", // ESLint 코드 검사
    "lint:fix": "eslint . --fix", // ESLint 자동 수정
    "format": "prettier --write ...", // Prettier 코드 포맷팅
    "prebuild": "npm run format && npm run lint" // 빌드 전 자동 검사
  }
}
```

### 주요 의존성

- **Next.js 16.1.1**: React 기반 풀스택 프레임워크
- **React 19.2.3**: UI 라이브러리
- **TypeScript 5**: 타입 안정성
- **Tailwind CSS 4**: 유틸리티 CSS 프레임워크
- **Zustand 5**: 경량 전역 상태 관리
- **React Query 5**: 서버 상태 관리 및 캐싱
- **Axios 1.13.4**: HTTP 클라이언트
- **OpenAI 6.16.0**: AI 추천 기능 (GPT API)
- **Swiper 12**: 이미지 슬라이더
- **react-toastify 11**: 알림 메시지
- **ESLint + Prettier**: 코드 품질 및 포맷팅

---

## 🎯 핵심 기능 및 특징

### 1. **페이지 라우팅 구조**

- **(auth)**: 로그인, 회원가입 (레이아웃 없음)
- **(public)**: 인트로, AI 추천 (누구나 접근)
- **(with-layout)**: 메인, 상품, 장바구니 (헤더/푸터 포함)
- **(protected)**: 결제, 마이페이지 (로그인 필수)

### 2. **AI 선물 추천**

- OpenAI GPT API 활용
- `/recommend` → 질문 응답 → `/recommend/result` 결과 표시
- `/api/recommend/route.ts`에서 서버 사이드 처리

### 3. **인증 시스템**

- 이메일/소셜 로그인 (네이버)
- JWT 기반 인증 (추정)
- Zustand로 인증 상태 관리

### 4. **상품 관리**

- 카테고리별 상품 목록
- 상품 상세 (리뷰, 옵션 등)
- 장바구니 → 결제 → 주문 내역

### 5. **마이페이지**

- 주문 내역, 리뷰 작성/수정
- 찜 목록, 배송지 관리
- 회원정보 수정

---

## 📝 개발 가이드

### 새 페이지 추가

1. `src/app/(with-layout)/` 하위에 폴더 생성
2. `page.tsx` 파일 작성
3. 필요 시 `loading.tsx`, `error.tsx` 추가

### 새 컴포넌트 추가

- **공통**: `src/components/common/`
- **페이지 전용**: `src/components/pages/[페이지명]/`

### API 호출

1. `src/lib/api/`에 함수 작성
2. React Query 훅 활용
3. Axios 인스턴스 사용

### 상태 관리

- **전역**: Zustand (`src/lib/zustand/`)
- **서버 상태**: React Query
- **로컬**: useState, useReducer

---

**작성일**: 2026-02-12
**버전**: 2.0.0 (통합 버전)
