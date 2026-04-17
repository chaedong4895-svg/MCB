import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center py-24">
      <div className="text-5xl mb-4">☕</div>
      <h1 className="text-xl font-medium mb-2">페이지를 찾을 수 없어요</h1>
      <p className="text-sm text-stone-400 mb-6">커피 한 잔 마시고 돌아가볼까요?</p>
      <Link href="/" className="text-sm text-cb-roasted hover:underline">홈으로 돌아가기</Link>
    </div>
  )
}
