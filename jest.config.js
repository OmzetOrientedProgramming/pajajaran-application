module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/{_app.tsx,_document.tsx,jest.setup.ts}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  coverageReporters: ["html", "text", "text-summary", "cobertura", "lcov"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/cssTransform.js",
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^.+\\.module\\.(css)$": "identity-obj-proxy",
  },
  testResultsProcessor: "jest-sonar-reporter",
};