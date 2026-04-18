import type { Story, Question, Group, User } from '@/types'

export const MOCK_USERS: User[ ] = [ ]

export const MOCK_STORIES: Story[ ] = [ ]

export const MOCK_QUESTIONS: Question[ ] = [ ]

export const MOCK_GROUPS: Group[] = [
  { id: 1, name: '1조', next_meeting_date: '2026-04-14', next_meeting_place: '중회의실', this_month_topic: '나의 역량 100% 활용법 : 지속가능성' },
  { id: 2, name: '2조', next_meeting_date: '2026-04-16', next_meeting_place: '중회의실', this_month_topic: '우리의 지평선을 넓히는 시간' },
  { id: 3, name: '3조', next_meeting_date: '2026-04-17', next_meeting_place: '중회의실', this_month_topic: '시간배분과 우선순위' },
]

export const ALL_TAGS = ['리더십', '자아', '성장', '관계', '두려움', '커리어']

export const EMOJI_MAP: Record<string, { icon: string; label: string }> = {
  hug:      { icon: '🫂', label: '공감' },
  insight:  { icon: '💡', label: '영감' },
  cheer:    { icon: '🌱', label: '응원' },
  coffee:   { icon: '☕', label: '같이 얘기해요' },
  question: { icon: '🤔', label: '질문이 생겨요' },
}

export const CURRENT_USER = MOCK_USERS[0]
