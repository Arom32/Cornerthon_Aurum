# 🎭 Cornerthon - 공연 정보 커뮤니티 플랫폼

> **공연 정보 검색부터 커뮤니티 활동까지 한 곳에서!**  
> 공연 정보 조회, 관심 공연 저장, 커뮤니티 게시판, 사용자 레벨링 시스템을 갖춘 통합 플랫폼

## 📋 목차

- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [설치 및 개발 환경 구성](#설치-및-개발-환경-구성)
- [실행 방법](#실행-방법)
- [API 문서](#api-문서)
- [팀 정보](#팀-정보)

---

## 프로젝트 소개

**Cornerthon**는 대한민국의 다양한 공연 정보를 제공하고, 사용자들이 공연을 검색·평가하며 커뮤니티를 통해 소통할 수 있는 플랫폼입니다.

- 🎫 **KOPIS API** 연동으로 공연 정보 실시간 제공
- 👥 사용자 레벨링 및 타이틀 시스템으로 커뮤니티 활성화
- 💬 자유 게시판 및 거래 게시판을 통한 사용자 간 상호작용

---

## 팀 정보

| 역할 | 인원 |
|------|------|
| 백엔드 | 이지현, 이연우 |
| 프론트엔드 | 이채원, 임수영 |

- **팀명**: Cornerthon Team 2
- **저장소**: [GitHub](https://github.com/Arom32/Cornerthon_Aurumn)
- **저장소**: [Notion](https://www.notion.so/2f72b9fe3aaa80bca773c518f39875ce?source=copy_link)


## 주요 기능

### 🎬 공연 정보 관리
- **공연 목록 조회**: 페이징, 필터링(장르, 지역, 상태), 검색 기능
- **공연 상세 정보**: 공연 상세 설명, 가격, 시설 정보 제공
- **공연 분류**: 연극, 뮤지컬, 콘서트, 페스티벌, 전시 등 다양한 장르
- **공연 동기화**: KOPIS API를 통한 자동 데이터 동기화

### 👤 사용자 관리
- **회원가입/로그인**: JWT 기반 인증
- **사용자 프로필**: 레벨, 타이틀, 활동 통계
- **레벨링 시스템**: 활동량에 따른 등급 상승
- **타이틀 시스템**: 사용자 활동에 따른 칭호 부여

### 💬 커뮤니티
- **자유 게시판**: 일반 게시글 작성, 수정, 삭제
- **댓글 기능**: 게시글에 댓글 작성 및 상호작용

---

## 기술 스택

### 🔧 백엔드
| 기술 | 용도 |
|------|------|
| **Node.js** | JavaScript 런타임 환경 |
| **Express** | 웹 프레임워크 |
| **MongoDB** | NoSQL 데이터베이스 |
| **Mongoose** | MongoDB ODM |
| **JWT** | 사용자 인증 |
| **bcrypt** | 비밀번호 암호화 |
| **Swagger** | API 문서화 |
| **Axios** | HTTP 클라이언트 (KOPIS API 호출) |
| **node-cron** | 스케줄링 (공연 데이터 동기화) |

### 💻 프론트엔드
| 기술 | 용도 |
|------|------|
| **React 19** | UI 라이브러리 |
| **Vite** | 빌드 도구 |
| **React Router** | 페이지 라우팅 |
| **CSS** | 스타일링 |

### 🛠 개발 도구
| 도구 | 용도 |
|------|------|
| **ESLint** | 코드 린팅 |
| **Nodemon** | 개발 중 자동 재시작 |
| **Concurrently** | 여러 서버 동시 실행 |

---

## 프로젝트 구조

```
2026-1_Coner_Conerthon/
│
├── backend/                          # Node.js/Express 백엔드
│   ├── app.js                        # Express 애플리케이션 진입점
│   ├── package.json                  # 백엔드 의존성
│   ├── .env                          # 환경 변수
│   │
│   ├── config/
│   │   └── dbConnect.js              # MongoDB 연결 설정
│   │
│   ├── models/                       # Mongoose 스키마
│   │   ├── User.js                   # 사용자 모델
│   │   ├── Board.js                  # 게시글 모델
│   │   ├── Comment.js                # 댓글 모델
│   │   └── Performance.js            # 공연 정보 모델
│   │
│   ├── controllers/                  # 비즈니스 로직
│   │   ├── user.js                   # 사용자 관리
│   │   ├── board.js                  # 게시글 관리
│   │   ├── comments.js               # 댓글 관리
│   │   ├── performance.js            # 공연 정보 관리
│   │   ├── userLeveling.js           # 레벨링 시스템
│   │   ├── userRanking.js            # 랭킹 시스템
│   │   └── userTitle.js              # 타이틀 시스템
│   │
│   ├── routes/                       # API 라우트
│   │   ├── userRoutes.js             # 사용자 API
│   │   ├── boardRoutes.js            # 게시글 API
│   │   ├── commentRoutes.js          # 댓글 API
│   │   ├── performanceRoutes.js      # 공연 정보 API
│   │   ├── userTitleRoutes.js        # 타이틀 API
│   │   └── kopisTest.js              # KOPIS API 테스트
│   │
│   ├── services/                     # 외부 API 및 유틸리티
│   │   ├── kopis.js                  # KOPIS API 통합
│   │   └── performanceSync.js        # 공연 데이터 동기화
│   │
│   ├── middleWares/
│   │   └── authMiddleware.js         # JWT 인증 미들웨어
│   │
│   ├── utils/                        # 유틸리티 함수
│   │   ├── performanceUtils.js       # 공연 관련 유틸리티
│   │   ├── boardUtils.js             # 게시글 관련 유틸리티
│   │   ├── userUtils.js              # 사용자 관련 유틸리티
│   │   └── userTitleUtils.js         # 타이틀 관련 유틸리티
│   │
│   └── swagger/                      # API 문서
│       ├── swagger.js                # Swagger 설정
│       ├── swagger.user.yaml         # 사용자 API 문서
│       ├── swagger.board.yaml        # 게시글 API 문서
│       ├── swagger.comment.yaml      # 댓글 API 문서
│       ├── swagger.kopis.yaml        # KOPIS API 문서
│       └── swagger.userTitle.yaml    # 타이틀 API 문서
│
├── frontend/                         # React/Vite 프론트엔드
│   ├── package.json                  # 프론트엔드 의존성
│   ├── vite.config.js                # Vite 설정
│   ├── index.html                    # HTML 진입점
│   ├── .env                          # 환경 변수
│   │
│   └── src/
│       ├── App.jsx                   # 메인 App 컴포넌트
│       ├── main.jsx                  # React 애플리케이션 진입점
│       ├── App.css                   # 전역 스타일
│       │
│       ├── main-page/                # 메인 페이지
│       ├── main-option/              # 옵션 페이지
│       ├── main-performance/         # 공연 메인 페이지
│       │
│       ├── performance-*/            # 공연 카테고리 페이지
│       │   └── performance-list/     # 공연 목록
│       │
│       ├── performance-detail-page/  # 공연 상세 페이지
│       ├── performance-display/      # 공연 카드 컴포넌트
│       │
│       ├── community-*/              # 커뮤니티 페이지
│       │   ├── community-main/       # 커뮤니티 메인
│       │   ├── community-free/       # 자유 게시판
│       │   └── community-deal/       # 거래 게시판
│       │
│       ├── free-bulletin-board/      # 자유 게시판 상세
│       ├── trade-bulletin-board/     # 거래 게시판 상세
│       ├── writing/                  # 게시글 작성 페이지
│       │
│       ├── login/                    # 로그인 페이지
│       ├── signup/                   # 회원가입 페이지
│       ├── mypage/                   # 마이페이지
│       ├── Header/                   # 헤더 컴포넌트
│       ├── CategoryBar/              # 카테고리 바
│       │
│       └── assets/                   # 이미지 및 리소스
│
├── package.json                      # 루트 package.json
└── README.md                       
```

---

## API 문서

### Swagger API 문서
개발 서버 실행 후 아래 주소에서 API 문서를 확인할 수 있습니다:
- **URL**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)


### 개발 문서
상세한 개발 가이드, API 명세, 데이터베이스 스키마는 팀의 Notion 문서를 참고하세요.
