'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ALL_TAGS } from '@/lib/mock-data'

type DisplayName = 'real' | 'nickname' | 'anonymous'

const ANON_OPTIONS: { key: DisplayName; icon: string; label: string; desc: string }[] = [
  { key: 'real',      icon: '🙂', label: '실명',      desc: '내 이름으로 남겨요' },
  { key: 'nickname',  icon: '🌙', label: '닉네임',    desc: '별명으로 남겨요' },
  { key: 'anonymous', icon: '🫥', label: '완전 익명', desc: '아무도 몰라요' },
]

export default function WritePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [display, setDisplay] = useState<DisplayName>('anonymous')
  const [tagInput, setTagInput] = useState('')
  const [quickMode, setQuickMode] = useState(false)
  const [done, setDone] = useState(false)

  function toggleTag(tag: string) {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  function addCustomTag() {
    const t = tagInput.replace(/^#/, '').trim()
    if (t && !tags.includes(t)) setTags(prev => [...prev, t])
    setTagInput('')
  }

  function submit() {
    if (!body.trim()) return
    setDone(true)
    setTimeout(() => router.push('/stories'), 1800)
  }

  if (done) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <div className="text-5xl mb-4">🌱</div>
        <h2 className="text-lg font-medium mb-2">이야기가 남겨졌어요</h2>
        <p className="text-sm text-stone-400">동료들이 곧 만나볼 거예요. 잠시 후 이동합니다.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xl font-medium">이야기 쓰기</h1>
        <button
          onClick={() => setQuickMode(q => !q)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-all ${quickMode ? 'bg-cb text-white border-cb' : 'border-cb-roasted text-cb-roasted hover:bg-orange-50'}`}
        >
          ⚡ {quickMode ? '3분 모드 ON' : '3분만 쓰기'}
        </button>
      </div>
      <p className="text-sm text-stone-400 mb-6">
        고민이나 인사이트를 자유롭게 남겨보세요. 제목도 선택, 태그도 선택이에요.
      </p>

      <div className="bg-white rounded-card border border-amber-100 p-6 space-y-5">
        {/* 제목 (간단 모드에선 숨김) */}
        {!quickMode && (
          <div>
            <label className="text-xs text-stone-400 block mb-1.5">제목 <span className="text-stone-300">(선택)</span></label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="제목 없이도 괜찮아요."
              className="w-full border border-amber-100 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cb transition-colors bg-amber-50/50"
            />
          </div>
        )}

        {/* 본문 */}
        <div>
          <label className="text-xs text-stone-400 block mb-1.5">
            이야기 {quickMode && <span className="text-cb">(짧게도 OK)</span>}
          </label>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder={quickMode
              ? "오늘 한 줄만 남겨볼까요?"
              : "오늘 어떤 생각이 남았나요? 길어도, 짧아도 괜찮아요."}
            className="w-full border border-amber-100 rounded-lg px-3 py-2.5 text-sm leading-relaxed outline-none focus:border-cb transition-colors bg-amber-50/50 resize-none font-[inherit]"
            style={{ minHeight: quickMode ? '100px' : '180px' }}
          />
          <p className="text-xs text-stone-300 mt-1 text-right">{body.length}자</p>
        </div>

        {/* 태그 */}
        {!quickMode && (
          <div>
            <label className="text-xs text-stone-400 block mb-2">태그 <span className="text-stone-300">(선택)</span></label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {ALL_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                    tags.includes(tag) ? 'bg-cb-cream border-cb text-cb' : 'border-amber-100 text-stone-500 hover:border-amber-300'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCustomTag()}
                placeholder="직접 입력 후 Enter"
                className="flex-1 border border-amber-100 rounded-lg px-3 py-2 text-xs outline-none focus:border-cb transition-colors bg-amber-50/50"
              />
              <button onClick={addCustomTag} className="text-xs border border-amber-200 px-3 py-2 rounded-lg text-stone-500 hover:bg-amber-50 transition-colors">
                추가
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map(tag => (
                  <span key={tag} onClick={() => toggleTag(tag)} className="text-xs bg-cb-cream text-cb border border-cb/30 px-2.5 py-1 rounded-full cursor-pointer hover:opacity-70">
                    #{tag} ×
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 이름 표시 방식 */}
        <div>
          <label className="text-xs text-stone-400 block mb-2">이름 표시 방식</label>
          <div className="grid grid-cols-3 gap-2">
            {ANON_OPTIONS.map(opt => (
              <button
                key={opt.key}
                onClick={() => setDisplay(opt.key)}
                className={`flex flex-col items-center gap-1 py-3 rounded-lg border text-center transition-all ${
                  display === opt.key ? 'border-cb bg-cb-cream' : 'border-amber-100 hover:border-amber-300'
                }`}
              >
                <span className="text-xl">{opt.icon}</span>
                <span className={`text-xs font-medium ${display === opt.key ? 'text-cb' : 'text-stone-600'}`}>{opt.label}</span>
                <span className="text-[10px] text-stone-400 leading-tight">{opt.desc}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-stone-300 mt-2 text-center">이 글은 언제든 수정하거나 삭제할 수 있어요.</p>
        </div>

        {/* 제출 */}
        <div className="flex items-center justify-between pt-2 border-t border-amber-50">
          <button onClick={() => router.back()} className="text-sm text-stone-400 hover:text-stone-600 transition-colors">취소</button>
          <button
            onClick={submit}
            disabled={!body.trim()}
            className="bg-cb text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:opacity-85 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            발행하기
          </button>
        </div>
      </div>
    </div>
  )
}
