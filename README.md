# 온라인 도구 모음

설치 없이 브라우저에서 바로 사용하는 무료 웹 유틸리티 모음 사이트입니다. 모든 처리는 브라우저 안에서만 이루어지며, 입력한 데이터는 서버로 전송되지 않습니다.

## 제공 도구

- **JSON 포맷터** — JSON을 정렬, 압축하고 문법 오류를 검증합니다.
- **URL 인코더/디코더** — URL 문자열을 인코딩하거나 디코딩합니다.

## 스택

- 순수 HTML/CSS/JS (프레임워크 없음)
- 빌드 도구: [Vite](https://vitejs.dev/) (multi-page 모드)

## 시작하기

```bash
npm install       # 최초 1회
npm run dev        # 개발 서버, http://localhost:5173, HMR 지원
npm run build       # src/ -> dist/ 정적 빌드
npm run preview     # dist/ 결과물을 로컬에서 프리뷰
```

## 프로젝트 구조

```
src/
├── index.html          홈 — 도구 카드 목록
├── privacy.html         개인정보처리방침
├── css/style.css        전체 공용 스타일
└── tools/
    ├── json-formatter/
    └── url-encoder/
```

각 도구는 `src/tools/` 아래 독립된 페이지로 존재합니다. 새 도구를 추가하는 방법 등 자세한 개발 가이드는 [AGENTS.md](AGENTS.md)를 참고하세요.

## 배포

`npm run build`로 생성된 `dist/` 폴더가 배포 대상입니다. Netlify/Vercel/Cloudflare Pages 등에서 Build command는 `npm run build`, Publish directory는 `dist`로 설정하면 됩니다.
