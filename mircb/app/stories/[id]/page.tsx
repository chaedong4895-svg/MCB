'use client'
import { use, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MOCK_STORIES, EMOJI_MAP } from '@/lib/mock-data'
import { getDisplayName, getDisplayInitial, formatDate } from '@/lib/utils'
import type { EmojiType } from '@/types'

export default function StoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const story = MOCK_STORIES.find(s => s.id === id)
  if (!story) notFound()

  const [reactions, setReactions] = useState({ ...story.reactions })
  const [active, setActive] = useState<EmojiType | null>(null)
  const [question, setQuestion] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function toggleReaction(key: EmojiType) {
    setReactions(prev => ({
      ...prev,
      [key]: active === key ? (prev[key] ?? 0) - 1 : (prev[key] ?? 0) + 1
    }))
    setActive(prev => prev === key ? null : key)
  }

  const name = getDisplayName(story)
  const initial = getDisplayInitial(story)

  return (
    <div className="max-w-2xl">
      <Link href="/stories" className="text-sm text-cb-roasted hover:underline mb-5 block">
        ← 이야기 목록으로
      </Link>

      <article className="bg-white rounded-card border border-amber-100 p-6 mb-4">
        {/* 작성자 메타 */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-full bg-cb-cream flex items-center justify-center text-sm font-medium text-cb">
            {initial}
          </div>
          <span className="text-sm text-stone-600">{name}</span>
          <span className="text-xs text-cb-roasted bg-orange-50 px-2 py-0.5 rounded-full">{story.group_id}조</span>
          <span className="ml-auto text-xs text-stone-400">{formatDate(story.created_at)}</span>
        </div>

        {story.title && <h1 className="text-xl font-medium mb-3">{story.title}</h1>}

        <p className="text-sm leading-loose text-stone-700 whitespace-pre-line mb-4">{story.body}</p>

        <div className="flex flex-wrap gap-1.5">
          {story.tags.map(tag => (
            <span key={tag} className="text-xs text-stone-500 bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* 공감 이모지 바 */}
      <div className="bg-white rounded-card border border-amber-100 p-4 mb-4">
        <p className="text-xs text-stone-400 mb-3">이 이야기가 어떻게 느껴지셨나요?</p>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(EMOJI_MAP) as [EmojiType, { icon: string; label: string }][]).map(([key, { icon, label }]) => (
            <button
              key={key}
              onClick={() => toggleReaction(key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm transition-all ${
                active === key
                  ? 'border-cb bg-cb-cream text-cb'
                  : 'border-amber-100 bg-amber-50 text-stone-500 hover:border-amber-300'
              }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
              {(reactions[key] ?? 0) > 0 && (
                <span className="text-xs font-medium">{reactions[key]}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 질문 남기기 */}
      <div className="bg-white rounded-card border border-amber-100 p-4">
        <p className="text-sm font-medium mb-1">질문 남기기</p>
        <p className="text-xs text-stone-400 mb-3">
          댓글 대신, 코칭적 질문을 남겨보세요. "왜?"보다 "어떤?", "무엇?"이 좋아요.
        </p>
        {submitted ? (
          <p className="text-sm text-cb py-3">질문이 전달됐어요. 고마워요 🌱</p>
        ) : (
          <>
            <textarea
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="예: '그 시선이 가장 신경 쓰이는 사람은 누구인가요?'"
              className="w-full border border-amber-100 rounded-lg p-3 text-sm text-stone-700 bg-amber-50 resize-none min-h-20 outline-none focus:border-cb transition-colors font-[inherit]"
            />
            <button
              onClick={() => question.trim() && setSubmitted(true)}
              className="mt-2 bg-cb text-white text-sm px-4 py-2 rounded-lg hover:opacity-85 transition-opacity"
            >
              질문 남기기
            </button>
          </>
        )}
      </div>
    </div>
  )
}
