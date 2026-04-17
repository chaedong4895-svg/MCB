import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cb: {
          DEFAULT: '#6F4E37',
          light: '#f0e8dc',
          cream: '#E8DCC4',
          roasted: '#C87533',
          paper: '#FAF7F2',
        }
      },
      fontFamily: {
        pretendard: ['Pretendard', 'Noto Sans KR', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
      }
    }
  },
  plugins: []
}
export default config
