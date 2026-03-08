# AGENTS.md

## Project overview
암기 카드를 작성해서 암기 카드를 보며 학습을 할 수 있는 웹 어플리케이션

- 목표 기능
  - 시스템
    - 다크모드 전환
    - OAuth 로그인 (구글, 페이스북)
    - 다국어 지원
  - 메인 화면
    - 암기 카드를 소개하는 메인 페이지
  - 사용자
    - 암기 카드 작성
    - 작성한 암기 카드 목록 조회
    - 타인과 암기 카드 공유 설정

## Setup
- Install: `npm install`
- Build: `npm run build`
- Test: `npm test`

## Code style
- TypeScript strict mode
- ESLint + Prettier 사용
- 함수형 패턴 선호

## Testing instructions
- PR 전에 반드시 `npm test` 실행
- 새 기능은 테스트 필수

## PR guidelines
- 제목 형식: `[module] Description`
- 커밋 메시지는 conventional commits 따름
