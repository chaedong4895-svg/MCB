import Link from 'next/link'
import { StoryCard } from '@/components/ui/StoryCard'
import { MOCK_STORIES, MOCK_QUESTIONS, MOCK_GROUPS } from '@/lib/mock-data'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export default function HomePage() {
  const recent = MOCK_STORIES.slice(0, 3)
  const missed = MOCK_STORIES.slice(3, 4)
  const currentQ = MOCK_QUESTIONS[0] ?? null
  const nextMeeting = MOCK_GROUPS[0] ?? null
  const meetingDate = nextMeeting?.next_meeting_date
    ? new Date(nextMeeting.next_meeting_date)
    : null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6">
      <div>
        {/* 이번 달의 질문 히어로 */}
        {currentQ ? (
          <div className="relative bg-cb text-white rounded-card p-6 mb-6 overflow-hidden">
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-7xl opacity-10 select-none">☕</div>
            <p className="text-xs font-medium tracking-widest uppercase opacity-70 mb-2">이번 달의 질문 · 4월</p>
            <p className="text-lg font-medium leading-snug mb-4 max-w-md">"{currentQ.content}"</p>
            <Link
              href="/questions"
              className="inline-block bg-white/20 border border-white/40 text-white text-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              내 답변 남기기
            </Link>
          </div>
        ) : (
          <div className="relative bg-cb text-white rounded-card p-6 mb-6 overflow-hidden">
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-7xl opacity-10 select-none">☕</div>
            <p className="text-xs font-medium tracking-widest uppercase opacity-70 mb-2">이번 달의 질문</p>
            <p className="text-lg font-medium leading-snug mb-4 max-w-md">아직 등록된 질문이 없어요.</p>
            <Link
              href="/questions"
              className="inline-block bg-white/20 border border-white/40 text-white text-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              질문 보러 가기
            </Link>
          </div>
        )}

        {/* 최근 이야기 */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium">최근 이야기</h2>
          <Link href="/stories" className="text-xs text-cb-roasted hover:underline">전체 보기 →</Link>
        </div>
        {recent.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {recent.map(s => <StoryCard key={s.id} story={s} />)}
          </div>
        ) : (
          <div className="bg-white rounded-card border border-amber-100 p-8 text-center mb-6">
            <p className="text-2xl mb-3">☕</p>
            <p className="text-sm text-stone-400 mb-3">아직 이야기가 없어요.</p>
            <Link href="/write" className="text-sm text-cb-roasted hover:underline">첫 번째 이야기를 남겨보세요 →</Link>
          </div>
        )}

        {/* 놓쳤을지도 모를 이야기 */}
        {missed.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium">놓쳤을지도 모를 이야기</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {missed.map(s => <StoryCard key={s.id} story={s} />)}
            </div>
          </>
        )}
      </div>

      {/* 사이드바 */}
      <aside className="space-y-4">
        {meetingDate && (
          <div className="bg-white rounded-card border border-amber-100 p-4">
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">다음 모임</p>
            <div className="flex gap-3">
              <div className="bg-cb text-white rounded-lg px-3 py-2 text-center min-w-[48px]">
                <div className="text-xl font-medium leading-none">{format(meetingDate, 'd')}</div>
                <div className="text-[10px] opacity-80 mt-0.5">{format(meetingDate, 'MMM', { locale: ko }).toUpperCase()}</div>
              </div>
              <div>
                <p className="text-sm font-medium">4월 정기모임</p>
                <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">오후 7시 · {nextMeeting?.next_meeting_place}<br />1, 2, 3조 전체</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-card border border-amber-100 p-4">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">오늘의 태그</p>
          <div className="flex flex-wrap gap-1.5">
            {['리더십', '자아', '성장', '관계', '두려움', '커리어'].map(tag => (
              <Link
                key={tag}
                href={`/stories?tag=${tag}`}
                className="text-xs text-stone-500 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full hover:border-amber-300 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-card border border-amber-100 p-4">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">나의 활동</p>
          <div className="space-y-1.5 text-sm text-stone-500">
            {[['쓴 글', '0'], ['공감한 글', '0'], ['남긴 질문', '0']].map(([label, val]) => (
              <div key={label} className="flex justify-between">
                <span>{label}</span>
                <span className="font-medium text-stone-700">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
