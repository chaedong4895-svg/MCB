import type { Story, User, DisplayName } from '@/types'
import { formatDistanceToNow, format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { MOCK_USERS } from './mock-data'

export function getDisplayName(story: Story): string {
  const author = MOCK_USERS.find(u => u.id === story.author_id)
  if (!author) return '익명'
  if (story.display_name === 'real') return author.name
  if (story.display_name === 'nickname') return author.nickname ?? author.name
  return '익명'
}

export function getDisplayInitial(story: Story): string {
  const name = getDisplayName(story)
  if (name === '익명') return 'A'
  return name.charAt(0)
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return format(date, 'yyyy. M. d', { locale: ko })
}

export function formatRelative(dateStr: string): string {
  return formatDistanceToNow(new Date(dateStr), { addSuffix: true, locale: ko })
}

export function totalReactions(reactions?: Record<string, number>): number {
  if (!reactions) return 0
  return Object.values(reactions).reduce((a, b) => a + b, 0)
}
