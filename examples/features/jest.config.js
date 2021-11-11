/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/*.feature", "**/*.{spec,test}.{ts,js}"],
  moduleFileExtensions: ['feature', 'js', 'mjs', 'ts'],
  transform: {
    "\\.feature$": "@typedtools/behavioral-jest"
  },
  setupFilesAfterEnv: ['<rootDir>/setup.ts'],
};
