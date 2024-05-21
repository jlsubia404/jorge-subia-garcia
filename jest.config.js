module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: [],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|mjs|js|html)$': 'ts-jest',
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/app/$1',
        '@environments/(.*)': '<rootDir>/src/environments/$1',
    },
    testMatch: ['**/+(*.)+(spec).+(ts|js)?(x)'],
    collectCoverage: true,
    coverageReporters: ['html'],
    coverageDirectory: 'coverage/jest',
    moduleDirectories: ['node_modules', 'src'],
};
