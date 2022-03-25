/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
  testEnvironment: 'node',
  collectCoverage: true,
};