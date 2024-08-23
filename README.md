# 서비스 이름
## 서비스 미리보기
&nbsp;

## 기술 스택
### React
- Frontend 개발 라이브러리
- 페이지 특성상 사용자와의 interaction이 많고 페이지 수가 많지 않아 CSR이 적합하다고 생각되어 선택

### Vite
- javaScirpt 모듈 번들러
- webpack에 비해 속도가 빠르고 현재 프로젝트 요구사항 상 거대한 webpack 생태계의 다양한 기능과 복잡한 커스터마이징이 필요하지 않아 선택

### pnpm
- node package manager
- npm에 비해 속도가 빠르고 의존성 문제를 해결하여 충돌이 잘 발생하지 않아 선택
&nbsp;

## 프론트엔드 디렉토리 구조
src
|
|
|---assets: 이미지 등 프로젝트에 사용되는 리소스
|
|---components: 분리가 필요한 컴포넌트들의 모음
|
|---pages
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|---main
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|---manage
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|---room
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NotFound
|
|---utils: 분리가 필요하다고 생각한 기능적 요소들

