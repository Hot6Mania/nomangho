# NoMangHo

Next.js와 Supabase 기반의 지듣노망호 음악 재생 및 채팅 서비스. 여러 사용자가 동일한 방에 참여해 영상을 동시에 감상하고 플레이리스트를 공유할 수 있습니다.

## 기술 스택

* **Frontend**: Next.js (App Router), React 18, TypeScript, Tailwind CSS, shadcn/ui
* **State**: Zustand, TanStack Query
* **Backend / API**: Next.js Route Handlers (Vercel), YouTube Data API
* **Database & Realtime**: Supabase Postgres, Supabase Realtime, RLS
* **Storage**: Supabase Storage (디시콘, 업로드 파일)
* **Testing & Tools**: ESLint, Prettier, Vitest

## 주요 기능

* **동기 재생**

  * YouTube IFrame API 기반, 방 리더의 재생 상태를 모든 참여자에게 동기화
  * RTT 측정 및 드리프트 보정: ≤100ms 무시, 100–350ms 속도 조정, >350ms 강제 seek
* **채팅 & Presence**

  * Supabase Realtime Broadcast/Presence로 텍스트 채팅과 접속자 상태 공유
* **플레이리스트 관리**

  * 방별 큐(Queue) 추가/삭제/정렬, 유튜브 전용 Export(비공개 목록 생성)
* **권한**

  * 로그인 없음(익명), RLS + 방 토큰 기반 쓰기 제한
* **스토리지**

  * 디시콘 공개 버킷, 업로드 파일은 서명 URL로 제한 가능

## 실행 방법

```bash
npm install
npm run dev
# http://localhost:3000
```

## 환경 변수 (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE=
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
YOUTUBE_REFRESH_TOKEN=
ROOM_TOKEN_SALT=
```
