export type DisplayName = 'real' | 'nickname' | 'anonymous'
export type EmojiType = 'hug' | 'insight' | 'cheer' | 'coffee' | 'question'
export type GroupId = 1 | 2 | 3

export interface User {
  id: string
  email: string
  name: string
  nickname?: string
  group_id: GroupId
  role: string
  avatar_url?: string
  created_at: string
}

export interface Story {
  id: string
  author_id: string
  title?: string
  body: string
  display_name: DisplayName
  tags: string[]
  group_id: GroupId
  created_at: string
  reactions?: Record<EmojiType, number>
  author?: Pick<User, 'name' | 'nickname' | 'group_id'>
}

export interface Question {
  id: string
  content: string
  asker: string
  date: string
  group_id?: GroupId
  answer_count?: number
}

export interface Reaction {
  id: string
  user_id: string
  story_id: string
  emoji_type: EmojiType
}

export interface Group {
  id: GroupId
  name: string
  next_meeting_date?: string
  next_meeting_place?: string
  this_month_topic?: string
}
