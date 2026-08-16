# AGENTS.md

온라인 도구 모음 사이트. 브라우저에서 바로 동작하는 무료 웹 유틸리티를 여러 개 모아두는 허브이며, 각 도구는 `src/tools/` 아래 독립된 페이지로 존재한다. 현재 도구: JSON 포맷터.

## 스택

- 순수 HTML/CSS/JS (프레임워크 없음)
- 빌드 도구: [Vite](https://vitejs.dev/) (multi-page 모드)
- 광고: Google AdSense (플레이스홀더 상태, 실제 client ID 미설정)

## 프로젝트 구조

```
package.json / vite.config.js   빌드 설정
src/                             편집하는 소스 (이 안의 파일만 수정)
├── index.html                   홈 — 도구 카드 목록
├── privacy.html                 개인정보처리방침 (AdSense 승인 요건)
├── css/style.css                전체 공용 스타일 (레이아웃, 도구 카드, 개별 도구 UI 전부 포함)
└── tools/
    └── json-formatter/
        ├── index.html           도구 페이지
        └── app.js                도구 전용 로직 (ES module)
dist/                             `npm run build` 결과물. git에 커밋하지 않음, 배포 대상
```

- `src/`가 진짜 소스, `dist/`는 산출물이다. `dist/` 안의 파일을 직접 고치지 않는다 (빌드할 때마다 덮어써짐).
- CSS는 도구별로 분리하지 않고 `src/css/style.css` 하나에 전부 있다. 새 도구를 추가할 때 이 파일에 필요한 클래스를 이어서 추가한다.
- 각 도구 페이지는 홈/도구 페이지 상호간 이동을 위해 상대경로 링크를 쓴다 (`../../`로 홈, `tools/<name>/`으로 도구). `index.html`이 URL에 노출되지 않도록 링크는 항상 디렉터리 경로로 끝낸다 (`href="tools/json-formatter/"`이지 `href="tools/json-formatter/index.html"`이 아님).

## 빌드 / 실행

```
npm install       # 최초 1회
npm run dev        # 개발 서버, http://localhost:5173, HMR 지원
npm run build       # src/ -> dist/ 정적 빌드 (해시된 CSS/JS 포함)
npm run preview     # dist/ 결과물을 로컬에서 프리뷰
```

## 새 도구 추가하는 법

1. `src/tools/<도구명>/index.html` 생성. 기존 `src/tools/json-formatter/index.html`을 템플릿으로 삼는다 (헤더, 브레드크럼, 광고 슬롯, 푸터 구조 동일하게 유지).
2. 도구 전용 JS가 필요하면 같은 폴더에 `app.js`로 작성하고 `<script type="module" src="app.js"></script>`로 로드한다. **`type="module"`을 빠뜨리면 Vite가 번들링/해시 처리를 하지 않고 파일을 그대로 복사만 한다.**
3. `vite.config.js`의 `build.rollupOptions.input`에 새 페이지 엔트리를 추가한다 (안 하면 `npm run build` 시 해당 페이지가 `dist/`에 생성되지 않음).
4. `src/index.html`의 `<main class="tool-grid">`에 도구 카드(`<a class="tool-card">`) 링크를 추가한다.
5. 필요한 전용 스타일은 `src/css/style.css`에 추가한다.

## 배포

`npm run build`로 만든 `dist/` 폴더 전체가 배포 대상이다. Netlify/Vercel/Cloudflare Pages 등에 연결할 경우 Build command는 `npm run build`, Publish directory는 `dist`로 설정한다.

## AdSense

`ca-pub-XXXXXXXXXXXXXXXX`와 `data-ad-slot="0000000000"`은 전부 플레이스홀더다. 실제 배포 전에 발급받은 client ID와 slot ID로 각 페이지의 `<script>` 태그와 `<ins class="adsbygoogle">` 태그를 교체해야 한다.

`adsbygoogle.push({})` 호출은 반드시 `window.adsbygoogle = window.adsbygoogle || []; window.adsbygoogle.push({});` 형태로 작성한다. `type="module"` 스크립트는 strict mode로 실행되므로, `var`/`window.` 없이 `adsbygoogle`에 직접 할당하면 `ReferenceError`가 발생하고 조용히 무시된다.

## 알려진 제약

- 도구 로직에 대한 자동 테스트는 없다. 변경 후 `npm run dev`로 브라우저에서 직접 동작을 확인한다.
- `src/css/style.css`가 전체 사이트 공용이므로, 한 도구를 위해 스타일을 고치면 다른 페이지에 영향이 없는지 확인한다.
