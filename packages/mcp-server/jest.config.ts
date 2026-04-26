import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', { sourceMaps: 'inline' }],
  },
  moduleNameMapper: {
    '^micro-mcp$': '<rootDir>/src/index.ts',
    '^micro-mcp/(.*)$': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
  ],
  testPathIgnorePatterns: ['scripts'],
};

export default config;
