'use client'
import { useState } from 'react'
import { StoryCard } from '@/components/ui/StoryCard'
import { MOCK_STORIES, ALL_TAGS } from '@/lib/mock-data'

export default function ArchivePage() {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const yearAgoStories = MOCK_STORIES.filter(s => s.id === 's5')
  const filtered = MOCK_STORIES.filter(s => {
    const matchTag = !activeTag || s.tags.includes(activeTag)
    const matchQ = !query.trim() || s.body.includes(query) || (s.title ?? '').includes(query) || s.tags.some(t => t.includes(query))
    return matchTag && matchQ
  })

  return (
    <div>
      <h1 className="text-xl font-medium mb-1">인사이트 아카이브</h1>
      <p className="text-sm text-stone-400 mb-5">과거의 이야기를 다시 만나보세요.</p>

      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="키워드, 태그, 이름으로 검색..."
        className="w-full max-w-md border border-amber-100 rounded-lg px-4 py-2.5 text-sm bg-white outline-none focus:border-cb transition-colors mb-4"
      />

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setActiveTag(null)} className={`text-xs px-3 py-1.5 rounded-full border transition-all ${!activeTag ? 'bg-cb-cream border-cb text-cb' : 'bg-white border-amber-100 text-stone-500 hover:border-amber-300'}`}>전체</button>
        {ALL_TAGS.map(tag => (
          <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} className={`text-xs px-3 py-1.5 rounded-full border transition-all ${activeTag === tag ? 'bg-cb-cream border-cb text-cb' : 'bg-white border-amber-100 text-stone-500 hover:border-amber-300'}`}>#{tag}</button>
        ))}
      </div>

      {!query && !activeTag && (
        <div className="mb-8">
          <h2 className="text-sm font-medium text-stone-400 mb-3">1년 전 오늘의 이야기</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {yearAgoStories.map(s => <StoryCard key={s.id} story={s} />)}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-sm font-medium text-stone-400 mb-3">
          {query || activeTag ? `검색 결과 (${filtered.length}개)` : '전체 이야기'}
        </h2>
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-stone-400 text-sm">검색 결과가 없어요.</div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {filtered.map(s => <StoryCard key={s.id} story={s} />)}
          </div>
        )}
      </div>
    </div>
  )
}
