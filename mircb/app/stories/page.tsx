'use client'
import { useState } from 'react'
import { StoryCard } from '@/components/ui/StoryCard'
import { MOCK_STORIES, ALL_TAGS } from '@/lib/mock-data'
import type { Story } from '@/types'

type Sort = 'latest' | 'popular' | 'questions'

export default function StoriesPage() {
  const [sort, setSort] = useState<Sort>('latest')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered: Story[] = MOCK_STORIES
    .filter(s => !activeTag || s.tags.includes(activeTag))
    .sort((a, b) => {
      if (sort === 'popular') return (b.reactions?.hug ?? 0) - (a.reactions?.hug ?? 0)
      if (sort === 'questions') return (b.reactions?.question ?? 0) - (a.reactions?.question ?? 0)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

  return (
    <div>
      <h1 className="text-xl font-medium mb-1">이야기</h1>
      <p className="text-sm text-stone-400 mb-5">동료들의 고민과 인사이트를 만나보세요.</p>

      {/* 정렬 탭 */}
      <div className="flex gap-1 bg-white border border-amber-100 rounded-lg p-1 w-fit mb-4">
        {([['latest', '최신순'], ['popular', '공감순'], ['questions', '질문많은']] as [Sort, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSort(key)}
            className={`px-3 py-1.5 rounded-md text-sm transition-all ${
              sort === key ? 'bg-cb text-white font-medium' : 'text-stone-500 hover:text-cb'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 태그 필터 */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setActiveTag(null)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
            !activeTag ? 'bg-cb-cream border-cb text-cb' : 'bg-white border-amber-100 text-stone-500 hover:border-amber-300'
          }`}
        >
          전체
        </button>
        {ALL_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              activeTag === tag ? 'bg-cb-cream border-cb text-cb' : 'bg-white border-amber-100 text-stone-500 hover:border-amber-300'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-stone-400 text-sm">아직 이 태그의 이야기가 없어요.</div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {filtered.map(s => <StoryCard key={s.id} story={s} />)}
        </div>
      )}
    </div>
  )
}
