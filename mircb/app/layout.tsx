import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/components/layout/Nav'

export const metadata: Metadata = {
  title: '미르 커피브레이크',
  description: '고민을 나누고, 인사이트를 남기고, 서로 이어지는 공간',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Nav />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
