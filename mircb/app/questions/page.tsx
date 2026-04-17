'use client'
import { useState } from 'react'
import { MOCK_QUESTIONS } from '@/lib/mock-data'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export default function QuestionsPage() {
  const [answering, setAnswering] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState<string[]>([])

  const currentQ = MOCK_QUESTIONS[0]
  const archiveQs = MOCK_QUESTIONS.slice(1)

  function submit(id: string) {
    if (answers[id]?.trim()) {
      setSubmitted(prev => [...prev, id])
      setAnswering(null)
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-medium mb-1">이번 달의 질문</h1>
      <p className="text-sm text-stone-400 mb-6">모임에서 나온 인상 깊은 질문들을 아카이빙합니다.</p>

      <div className="bg-cb text-white rounded-card p-5 mb-8">
        <p className="text-xs font-medium tracking-widest uppercase opacity-70 mb-2">
          {format(new Date(currentQ.date), 'yyyy년 M월', { locale: ko })}
        </p>
        <p className="text-lg font-medium leading-snug mb-1">"{currentQ.content}"</p>
        <p className="text-xs opacity-60 mb-4">{currentQ.asker} · {format(new Date(currentQ.date), 'M월 d일', { locale: ko })} 전체 모임</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex -space-x-1.5">
            {['A', '김', '박', '이'].map((i, idx) => (
              <div key={idx} className="w-7 h-7 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-xs font-medium">{i}</div>
            ))}
          </div>
          <span className="text-xs opacity-70">{currentQ.answer_count}명이 답변했어요</span>
        </div>
        {submitted.includes(currentQ.id) ? (
          <p className="text-sm bg-white/20 rounded-lg px-4 py-2 inline-block">답변이 저장됐어요 🌱</p>
        ) : answering === currentQ.id ? (
          <div>
            <textarea
              value={answers[currentQ.id] ?? ''}
              onChange={e => setAnswers(p => ({ ...p, [currentQ.id]: e.target.value }))}
              placeholder="나만의 단어를 적어보세요."
              className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-sm text-white placeholder-white/50 resize-none min-h-24 outline-none font-[inherit]"
            />
            <div className="flex gap-2 mt-2">
              <button onClick={() => submit(currentQ.id)} className="bg-white text-cb text-sm px-4 py-2 rounded-lg hover:opacity-85 transition-opacity">저장하기</button>
              <button onClick={() => setAnswering(null)} className="text-white/70 text-sm px-3 py-2">취소</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setAnswering(currentQ.id)} className="bg-white/20 border border-white/40 text-white text-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
            내 답변 남기기
          </button>
        )}
      </div>

      <h2 className="text-sm font-medium text-stone-400 mb-3">지난 질문들</h2>
      <div className="space-y-3">
        {archiveQs.map(q => (
          <div key={q.id} className="bg-white rounded-card border border-amber-100 p-5">
            <p className="text-xs text-cb-roasted font-medium mb-1">{format(new Date(q.date), 'yyyy년 M월', { locale: ko })}</p>
            <p className="text-sm font-medium leading-snug mb-2">"{q.content}"</p>
            <p className="text-xs text-stone-400 mb-3">{q.asker} · {format(new Date(q.date), 'M월 d일', { locale: ko })}</p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-stone-400">{q.answer_count}명이 답변했어요</span>
              {submitted.includes(q.id) ? (
                <span className="ml-auto text-xs text-cb">저장됨 ✓</span>
              ) : (
                <button onClick={() => setAnswering(answering === q.id ? null : q.id)} className="ml-auto text-xs border border-cb-roasted text-cb-roasted px-3 py-1 rounded-full hover:bg-orange-50 transition-colors">
                  {answering === q.id ? '접기' : '답변 쓰기'}
                </button>
              )}
            </div>
            {answering === q.id && !submitted.includes(q.id) && (
              <div className="mt-3">
                <textarea value={answers[q.id] ?? ''} onChange={e => setAnswers(p => ({ ...p, [q.id]: e.target.value }))} placeholder="나라면 이렇게 답했을 것 같아요..." className="w-full border border-amber-100 rounded-lg p-3 text-sm bg-amber-50 resize-none min-h-16 outline-none focus:border-cb transition-colors font-[inherit] text-stone-700" />
                <button onClick={() => submit(q.id)} className="mt-1.5 bg-cb text-white text-xs px-3 py-1.5 rounded-lg">저장</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
