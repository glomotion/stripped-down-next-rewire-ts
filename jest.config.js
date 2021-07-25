module.exports = {
  coverageDirectory: 'coverage/jest',
  coverageReporters: ['text', 'text-summary', 'json'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/*.test.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  setupFiles: ['<rootDir>/config/jest/setupEnv.ts'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.ts'],
  testRegex: '^.+\\.jest\\.test\\.(js|ts|jsx|tsx)$',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '^.+\\.cypress\\.test\\.(js|ts|jsx|tsx)$',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // @NOTE:
    // enable using a local design system clone. This needs to be kept
    // in sync with ./tsconfig.json.
    '^react$': '<rootDir>/node_modules/react',
    '^react-dom(.*)$': '<rootDir>/node_modules/react-dom$1',
    '^react-router-dom(.*)$': '<rootDir>/node_modules/react-router-dom$1',
    '^@emotion/css(.*)$': '<rootDir>/node_modules/@emotion/css$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};
