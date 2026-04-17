import type { Story, Question, Group, User } from '@/types'

export const MOCK_USERS: User[] = [
  { id: 'u1', email: 'chaedong@kia.com', name: '채동', nickname: '커피한잔', group_id: 1, role: '마케팅', created_at: '2025-01-01' },
  { id: 'u2', email: 'seoyeon@kia.com', name: '김서연', group_id: 1, role: '전략기획', created_at: '2025-01-01' },
  { id: 'u3', email: 'anon1@kia.com', name: '이준혁', nickname: '창가자리', group_id: 2, role: '영업', created_at: '2025-01-01' },
  { id: 'u4', email: 'anon2@kia.com', name: '박민지', group_id: 3, role: 'HR', created_at: '2025-01-01' },
]

export const MOCK_STORIES: Story[] = [
  {
    id: 's1',
    author_id: 'u3',
    body: '"두려워하는 건 실패야, 아니면 실패한 너를 보는 다른 사람의 시선이야?" — 집에 오는 길 내내 이 질문이 머릿속에서 떠나질 않았다. 처음엔 당연히 실패 그 자체라고 생각했는데, 곱씹다 보니 아닌 것 같았다. 내가 두려운 건 타인의 시선이었다.\n\n그럼 아무도 안 보고 있다면 나는 더 용감하게 시도할 수 있을까? 그 질문이 또 꼬리를 물었다.',
    display_name: 'anonymous',
    tags: ['두려움', '자아'],
    group_id: 2,
    created_at: '2026-04-17T14:23:00Z',
    reactions: { hug: 12, insight: 5, cheer: 8, coffee: 2, question: 3 },
  },
  {
    id: 's2',
    author_id: 'u2',
    title: '리더십이라고 생각했던 것',
    body: '리더십이라고 생각했던 게 사실은 통제였다는 걸 이번 모임에서 처음 깨달았다. 팀원이 실수할 때 내가 느끼는 감정이 뭔지 돌아보게 됐다.',
    display_name: 'real',
    tags: ['리더십', '관계'],
    group_id: 1,
    created_at: '2026-04-16T09:10:00Z',
    reactions: { hug: 9, insight: 0, cheer: 0, coffee: 3, question: 1 },
  },
  {
    id: 's3',
    author_id: 'u4',
    body: '성장이라는 단어가 요즘은 좀 무겁게 느껴진다. 매일 더 나아져야 한다는 압박인지, 정말로 변하고 싶다는 바람인지 헷갈릴 때가 있다.',
    display_name: 'nickname',
    tags: ['성장', '커리어'],
    group_id: 3,
    created_at: '2026-04-15T19:45:00Z',
    reactions: { hug: 21, insight: 0, cheer: 11, coffee: 0, question: 7 },
  },
  {
    id: 's4',
    author_id: 'u3',
    body: '오늘 모임에서 처음으로 "나는 인정받고 싶다"는 말을 입 밖에 냈다. 그 말이 나오기까지 얼마나 오래 걸렸는지.',
    display_name: 'anonymous',
    tags: ['자아', '관계'],
    group_id: 3,
    created_at: '2026-04-12T21:00:00Z',
    reactions: { hug: 18, insight: 0, cheer: 11, coffee: 0, question: 0 },
  },
  {
    id: 's5',
    author_id: 'u1',
    body: '"지금 잘하는 것보다 지금 하고 싶은 걸 먼저 알아야 할 것 같아." — 1년 전에 이런 메모를 남겼는데, 지금의 나는 얼마나 달라졌을까.',
    display_name: 'anonymous',
    tags: ['자아', '성장'],
    group_id: 1,
    created_at: '2025-04-18T10:00:00Z',
    reactions: { hug: 14, insight: 6, cheer: 3, coffee: 1, question: 2 },
  },
]

export const MOCK_QUESTIONS: Question[] = [
  { id: 'q1', content: '요즘 당신을 가장 설레게 하는 단어 하나를 꼽는다면?', asker: '사업부장님', date: '2026-04-11', answer_count: 7 },
  { id: 'q2', content: '지금 가장 용기 있는 일은 무엇이라고 생각하나요?', asker: '사업부장님', date: '2026-03-14', answer_count: 5 },
  { id: 'q3', content: '나는 어떤 사람으로 기억되고 싶은가요?', asker: '사업부장님', date: '2026-02-28', answer_count: 9 },
  { id: 'q4', content: '두려워하는 건 실패야, 아니면 실패한 너를 보는 다른 사람의 시선이야?', asker: '사업부장님', date: '2026-01-24', answer_count: 11 },
]

export const MOCK_GROUPS: Group[] = [
  { id: 1, name: '1조', next_meeting_date: '2026-04-25', next_meeting_place: '본사 소회의실 A', this_month_topic: '리더십과 책임감' },
  { id: 2, name: '2조', next_meeting_date: '2026-04-25', next_meeting_place: '본사 소회의실 B', this_month_topic: '두려움과 용기' },
  { id: 3, name: '3조', next_meeting_date: '2026-04-25', next_meeting_place: '본사 소회의실 C', this_month_topic: '성장의 의미' },
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
