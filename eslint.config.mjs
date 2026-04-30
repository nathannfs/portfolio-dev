import rocketseatEslintConfig from '@rocketseat/eslint-config/react.mjs'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default [
  ...rocketseatEslintConfig,
  {
    ignores: ['.next'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      '@stylistic/max-len': 'off',
    },
  },
]
