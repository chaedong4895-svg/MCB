import Link from 'next/link'
import { MOCK_GROUPS, MOCK_STORIES, MOCK_USERS } from '@/lib/mock-data'
import { StoryCard } from '@/components/ui/StoryCard'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export default function GroupsPage() {
  return (
    <div>
      <h1 className="text-xl font-medium mb-1">조별 라운지</h1>
      <p className="text-sm text-stone-400 mb-6">각 조의 이야기를 엿볼 수 있어요. 다른 조가 어떤 이야기를 나누는지 확인해보세요.</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {MOCK_GROUPS.map(group => {
          const members = MOCK_USERS.filter(u => u.group_id === group.id)
          const meetingDate = group.next_meeting_date ? new Date(group.next_meeting_date) : null

          return (
            <div key={group.id} className="bg-white rounded-card border border-amber-100 p-5">
              <div className="text-4xl font-medium text-cb/20 mb-3">0{group.id}</div>
              <h2 className="text-base font-medium mb-1">{group.id}조 라운지</h2>
              <div className="text-xs text-stone-400 leading-relaxed mb-4">
                {meetingDate && <div>다음 모임: {format(meetingDate, 'M월 d일', { locale: ko })}</div>}
                {group.this_month_topic && <div>이번 주제: {group.this_month_topic}</div>}
              </div>
              <div className="flex -space-x-1.5">
                {members.map(m => (
                  <div key={m.id} title={m.name} className="w-7 h-7 rounded-full bg-cb-cream border-2 border-white flex items-center justify-center text-xs font-medium text-cb">
                    {m.name.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {MOCK_GROUPS.map(group => {
        const groupStories = MOCK_STORIES.filter(s => s.group_id === group.id)
        if (groupStories.length === 0) return null
        return (
          <div key={group.id} className="mb-8">
            <h2 className="text-sm font-medium mb-3">{group.id}조의 최근 이야기</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {groupStories.map(s => <StoryCard key={s.id} story={s} />)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
