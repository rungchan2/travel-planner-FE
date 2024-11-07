## 프로젝트 설명

- 프로젝트 명: ?
- 프로젝트 설명: 여행 일정 관리 웹 서비스
- 개발 기간: 2024.11.04 ~ 2024.11.30
- FE 개발 인원: 3명
- 피그마 파일 링크 : https://www.figma.com/design/1aeu6A6MWSluU89UeU2pB7/%EC%97%AC%ED%96%89%ED%94%8C%EB%9E%98%EB%84%88?node-id=64-1035&t=eqqk2Lp9mO0SfIR3-1[https://www.figma.com/design/1aeu6A6MWSluU89UeU2pB7/%EC%97%AC%ED%96%89%ED%94%8C%EB%9E%98%EB%84%88?node-id=64-1035&t=eqqk2Lp9mO0SfIR3-1]

## 사용 기술

- React
- TypeScript
- Styled-Components

## 프로젝트 구조

- src/components: 컴포넌트 파일
- src/hooks: 커스텀 훅 파일
- src/store: 상태 관리 파일
- src/assets: 이미지 파일
- src/App.tsx: 라우팅 설정 및 기본 레이아웃 설정
- src/App.css: 전역 스타일 설정

## 사용 패키지

- react-router-dom: 라우팅 설정
- @mui/material: 디자인 시스템
- @mui/icons-material: 아이콘 사용
- react-hook-form: 폼 관리
- styled-components: 스타일 설정

## Script

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드 생성
- `npm run preview`: 프로덕션 빌드 실행

## Branch 전략

- main: 배포 브랜치
- page: 페이지 개발 브랜치
  - 페이지 개발 시 생성 (ex. page/main)
  - 관련 작업시 해당 페이지 브렌치에서 작업.
  - 개발 완료 후 main 브랜치로 병합

## 컨벤션

- 컴포넌트 명은 대문자로 시작하는 PascalCase로 작성
- 파일 명은 소문자로 시작하는 camelCase로 작성
