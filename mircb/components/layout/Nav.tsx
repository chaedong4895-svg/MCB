'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CURRENT_USER } from '@/lib/mock-data'

const links = [
  { href: '/',          label: '홈' },
  { href: '/stories',  label: '이야기' },
  { href: '/questions',label: '이번 달 질문' },
  { href: '/groups',   label: '조별 라운지' },
  { href: '/archive',  label: '아카이브' },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <header className="bg-white border-b border-amber-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-7 h-7 bg-cb rounded-md flex items-center justify-center text-sm">☕</span>
          <span className="text-sm font-medium text-cb hidden sm:block">미르 커피브레이크</span>
        </Link>

        <nav className="hidden md:flex gap-1">
          {links.map(({ href, label }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-cb-light text-cb font-medium'
                    : 'text-stone-500 hover:bg-amber-50 hover:text-cb'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/write"
            className="bg-cb text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:opacity-85 transition-opacity"
          >
            ✏ 글 쓰기
          </Link>
          <div className="w-8 h-8 rounded-full bg-cb-cream border border-amber-200 flex items-center justify-center text-xs font-medium text-cb">
            {CURRENT_USER.name.charAt(0)}
          </div>
        </div>
      </div>

      {/* 모바일 하단 탭 */}
      <div className="md:hidden flex border-t border-amber-100 overflow-x-auto">
        {links.map(({ href, label }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 min-w-fit text-center py-2 text-xs whitespace-nowrap px-3 transition-colors ${
                active ? 'text-cb font-medium border-b-2 border-cb' : 'text-stone-400'
              }`}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </header>
  )
}
