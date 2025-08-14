
import { FlatCompat } from '@eslint/eslintrc'
 
const compat = new FlatCompat({
  
  baseDirectory: import.meta.dirname,
})
 
const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  }),
   {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: './tsconfig.json', 
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
   
      '@typescript-eslint/no-unused-vars': ['error', {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
    },
  },

]


 
export default eslintConfig