module.exports = {
  preset: 'react-native',
  setupFiles: ['./src/setupJest.js'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-navigation)',
  ],
  testRegex: '/__tests__/.+\\.test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^src(\\/?.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    '**/*.tsx',
    '**/*.ts',
    '!src/store.ts',
    '!src/config.ts',
    '!src/App.tsx',
  ],
};
