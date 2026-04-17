# 미르 커피브레이크 (mircb.kr)

> 고민을 나누고, 인사이트를 남기고, 서로 이어지는 공간

## 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **스타일링**: Tailwind CSS
- **폰트**: Pretendard
- **배포**: Vercel (무료)
- **DB (다음 단계)**: Supabase

## 로컬 실행

```bash
npm install
npm run dev
# http://localhost:3000
```

## 배포 (Vercel)

1. GitHub에 push
2. vercel.com → Import project → 자동 배포
3. Settings → Domains → mircb.kr 연결

## 구현된 페이지

| 경로 | 설명 |
|---|---|
| `/` | 홈 — 이번 달 질문 + 최근 이야기 |
| `/stories` | 이야기 목록 (태그 필터, 정렬) |
| `/stories/[id]` | 이야기 상세 (공감 이모지 5종, 질문 남기기) |
| `/questions` | 이번 달의 질문 + 아카이브 |
| `/groups` | 조별 라운지 (1~3조) |
| `/archive` | 인사이트 아카이브 (검색) |
| `/write` | 글 쓰기 (실명/닉네임/익명, 3분 모드) |

## 다음 단계 — Supabase 연동

현재는 mock data로 동작합니다. 실제 DB 연동을 위해:

1. supabase.com 프로젝트 생성
2. `.env.local` 작성:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
3. `lib/mock-data.ts` → `lib/supabase.ts` 교체

## 비용

| 항목 | 금액 |
|---|---|
| Vercel 호스팅 | 0원 |
| Supabase (20명 규모) | 0원 |
| 도메인 mircb.kr | 연 22,000원 |
| **합계** | **연 22,000원** |
