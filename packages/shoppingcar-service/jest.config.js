/* eslint-disable */
module.exports = {
  displayName: 'shoppingcar-service',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  testResultsProcessor: "../../node_modules/jest-junit-reporter",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/packages/shoppingcar-service',
  maxWorkers: 1,
};
