import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts'
  ]),
  {
    rules: {
      '@stylistic/space-before-function-paren': 'off',
      '@stylistic/multiline-ternary': 'off',
      '@stylistic/space-infix-ops': 'off',
      '@stylistic/space-in-parens': 'off',
      '@stylistic/generator-star-spacing': 'off',
      '@stylistic/quotes': 'off',
      '@stylistic/indent': 'off',
      '@stylistic/member-delimiter-style': 'off',
      '@stylistic/no-extra-semi': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/quote-props': 'off',
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/return-await': 'off',
      'react-hooks/exhaustive-deps': [
        'error',
        {
          additionalHooks:
            '(useAsyncResult|useAsyncCallback|useAsyncLoading|useDebouncedCallback|useEffectOnce)'
        }
      ],
      'prefer-spread': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react/no-find-dom-node': 'off',
      'unused-imports/no-unused-imports-ts': 'off'
    }
  },
  eslintPluginPrettierRecommended
])

export default eslintConfig
