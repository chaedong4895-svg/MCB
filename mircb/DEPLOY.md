# 배포 가이드 — mircb.kr

## 1단계: GitHub에 올리기

```bash
# 이 폴더에서 실행
git init
git add .
git commit -m "초기 커밋: 미르 커피브레이크 MVP"

# GitHub에서 새 저장소 만든 후:
git remote add origin https://github.com/YOUR_ID/mircb.git
git branch -M main
git push -u origin main
```

## 2단계: Vercel 배포 (무료)

1. vercel.com 접속 → GitHub 로그인
2. "Add New Project" → mircb 저장소 선택
3. "Deploy" 클릭 → 2분이면 완료
4. 자동 생성된 URL (예: mircb.vercel.app) 확인

## 3단계: 도메인 연결 (mircb.kr)

### 도메인 구매 (가비아 기준)
1. gabia.com → "mircb.kr" 검색 → 구매 (~22,000원/년)

### Vercel 도메인 설정
1. Vercel 프로젝트 → Settings → Domains
2. "mircb.kr" 입력 → Add

### 가비아 DNS 설정
가비아 도메인 관리 → DNS 정보 → 다음 추가:

| 타입 | 이름 | 값 |
|---|---|---|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

→ 10~30분 후 mircb.kr 접속 가능!

## 4단계 (선택): Supabase 연동

실제 로그인 + 데이터 저장을 원할 때:

1. supabase.com → 새 프로젝트 생성
2. SQL Editor에서 테이블 생성 (설계안 7장 참고)
3. Vercel 환경변수 추가:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
