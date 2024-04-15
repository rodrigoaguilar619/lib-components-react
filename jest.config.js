module.exports = {
    moduleNameMapper: {
        '^@app/(.*)$': '<rootDir>/src/$1',
        '^@tests/(.*)$': '<rootDir>/tests/$1',
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    esModuleInterop: true,
    testEnvironment: "@happy-dom/jest-environment"
};