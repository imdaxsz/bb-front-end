const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  transformIgnorePatterns: ['/node_modules/(?!(lodash)/)'],
  testEnvironment: 'jsdom',
}

module.exports = createJestConfig(customJestConfig)
