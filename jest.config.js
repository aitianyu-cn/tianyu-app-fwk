/**
 * @format
 * @type {import('ts-jest').JestConfigWithTsJest}
 * */

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    reporters: [
        "default",
        [
            "./node_modules/jest-html-reporters",
            {
                pageTitle: "Tianyu Application Fwk Unit Test",
                publicPath: "test/__report__/unit",
                includeFailureMsg: true,
                expand: true,
                filename: "test-report.html",
            },
        ],
    ],
    coverageDirectory: "test/__report__/coverage",
    setupFilesAfterEnv: [],
    resetMocks: true,
    clearMocks: true,
    resetModules: true,
    transform: {},
    moduleNameMapper: {
        "^src/(.*)$": "<rootDir>/src/$1",
        "^test/(.*)$": "<rootDir>/test/$1",
    },
    testPathIgnorePatterns: [],
};
