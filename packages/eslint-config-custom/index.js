module.exports = {
  extends: ['turbo', 'standard-with-typescript'],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-confusing-void-expression': 0,
    '@typescript-eslint/prefer-ts-expect-error': 0
  }
}
