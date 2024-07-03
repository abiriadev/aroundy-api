module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    camelcase: [
      'warn',
      { properties: 'never', ignoreGlobals: true, ignoreDestructuring: true },
    ], // 카멜케이스 경고
    '@typescript-eslint/interface-name-prefix': 'off', // 인터페이스 이름 접두어 비활성화
    '@typescript-eslint/explicit-function-return-type': 'off', // 명시적 함수 반환 타입 비활성화
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 명시적 모듈 경계 타입 비활성화
    '@typescript-eslint/no-explicit-any': 'off', // 명시적 any 사용 비활성화
    '@typescript-eslint/no-unused-vars': 'warn', // 사용되지 않는 변수 경고
    'prefer-const': 'warn', // 가능할 때 const 사용 권장 경고
    'no-console': 'off', // console.log 허용
    'no-debugger': 'warn', // debugger 사용 경고
    'no-undef': 'off', // 정의되지 않은 변수 허용
    'no-var': 'warn', // var 사용 경고
    'prefer-arrow-callback': 'warn', // 화살표 함수 사용 권장 경고
    'no-prototype-builtins': 'off', // Object.prototype 메소드 직접 사용 허용
    'class-methods-use-this': 'off', // 클래스 메소드에서 this 사용 안해도 허용
    'consistent-return': 'off', // 일관된 반환 허용
  },
};
