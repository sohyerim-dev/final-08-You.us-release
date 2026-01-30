import nextConfig from 'eslint-config-next'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

const config = [
  // Next.js 기본 설정 (flat config 형식)
  ...nextConfig,

  // Prettier 연동
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  // Prettier 룰 무력화 (중복 방지)
  prettierConfig,
]

export default config
