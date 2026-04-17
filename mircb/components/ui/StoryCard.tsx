import Link from 'next/link'
import type { Story } from '@/types'
import { getDisplayName, getDisplayInitial, formatRelative, totalReactions } from '@/lib/utils'
import { EMOJI_MAP } from '@/lib/mock-data'

interface Props {
  story: Story
}

export function StoryCard({ story }: Props) {
  const name = getDisplayName(story)
  const initial = getDisplayInitial(story)
  const topReactions = Object.entries(story.reactions ?? {})
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)

  return (
    <Link href={`/stories/${story.id}`} className="block group">
      <article className="bg-white rounded-card border border-amber-100 p-5 hover:border-amber-300 hover:shadow-sm transition-all">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-cb-cream flex items-center justify-center text-xs font-medium text-cb">
            {initial}
          </div>
          <span className="text-xs text-stone-500">{name}</span>
          <span className="ml-auto text-xs text-cb-roasted bg-orange-50 px-2 py-0.5 rounded-full">
            {story.group_id}조
          </span>
        </div>

        {story.title && (
          <h3 className="text-sm font-medium mb-1.5 line-clamp-1">{story.title}</h3>
        )}
        <p className="text-sm text-stone-700 leading-relaxed line-clamp-3 mb-3">
          {story.body}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {story.tags.map(tag => (
            <span key={tag} className="text-xs text-stone-500 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-stone-400">
          {topReactions.map(([key, count]) => {
            const e = EMOJI_MAP[key]
            return e ? (
              <span key={key} className="flex items-center gap-1">
                <span>{e.icon}</span>{count}
              </span>
            ) : null
          })}
          <span className="ml-auto">{formatRelative(story.created_at)}</span>
        </div>
      </article>
    </Link>
  )
}
