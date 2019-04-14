# [RunMate](https://runmate.co)


## Introduction

**RunMate**는 사용자가 추천하는 러닝 코스를 등록하고, 위치 기반으로 러닝 코스를 검색할 수 있는 어플리케이션입니다.

<img height="500" alt="example" src="./runmate.gif">

## Content
- [Requirements](#Requirements)
- [Installation](#Installation)
- [Features](#Features)
- [Skills](#Skills)
- [Test](#Test)
- [Deployment & Continuous Integration](#Deployment-&-Continuous-Integration)
- [Project Control](#Project-Control)
- [Version Control](#Version-Control)
- [Challenges](#Challenges)
- [Things To Do](#Things-To-Do)
- [Sincere Thanks](#Sincere-Thanks)


## Requirements

- 모바일에서의 사용을 권장합니다.
- RunMate는 Facebook API를 사용했습니다.
- Facebook 가입이 선행되어야 합니다.


## Installation

### Client

```javascript
git clone https://github.com/choinashil/runmate-web.git
cd runmate-web
npm install
npm start
```

### Server

```javascript
git clone https://github.com/choinashil/runmate-server.git
cd runmate-server
npm install
npm start
```


## Features

- Firebase Social Login (Facebook)
- JSON Web Token Authentication
- 사용자 기기의 위치 사용
- Google API를 이용한 위치 검색 기능
- 검색 위치 주변 반경 내 코스 검색 기능 
- Mapbox API를 이용한 지도 상 코스 입력 기능
- 코스 정보 입력 기능 (제목, 설명, 세부정보 등)
- 사용자 Facebook 프로필 페이지
- 코스 즐겨찾기 저장/삭제 기능


## Skills
### Client-Side

- ES2015+
- React
- React Router
- Redux
- Firebase Authentication
- Scss


### Server-Side

- Node.js
- Express
- ES2015+
- JSON Web Token Authentication
- MongoDB
- Mongoose
- Atlas


## Test

- PropTypes
- Reducer Unit Test (Jest)
- Component Unit Test (Jest, Enzyme)


## Deployment & Continuous Integration

### Client

- Netlify CI를 통한 배포 자동화

### Server
- AWS Elastic beanstalk를 통해 서비스 배포
- CircleCI를 통한 배포 자동화


## Project Control

- Git Branch 기반 개발 진행
- Trello를 이용한 Task Management


## Version Control

- Web, Server의 독립적인 관리를 위한 GIT Repo 구분


## Challenges

- Mapbox, Google Map의 Vanilla Javascript code를 React Lifecyle에 맞게 변형하는 부분이 어려웠습니다. 기초적인 Javascript와 React에 대한 이해가 더 필요하다고 생각했습니다.
- 배포, 자동화 및 HTTPS 인증서 설정하는 부분에서 어려움이 있었습니다. Client Side와 Server Side에서 각각 커스텀 도메인을 설정하고 연결하는 방식으로 Mixed Content 문제를 해결했습니다. 


## Things To Do

- 검색결과 페이지에서 추가 검색 가능하도록 UI 수정
- 검색옵션에 반경 추가 (현재 default: 약 1km)
- Detail Page에서 Start, End 지점 표시
- 코스 입력 후 수정 및 삭제 기능
- 댓글 기능



## Sincere Thanks

[Ken Huh](https://github.com/Ken123777) / Vanilla Coding
