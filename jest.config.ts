import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
    collectCoverage: false, // Disable coverage collection
    collectCoverageFrom: [
        "**/*.{ts,tsx}", // Include TypeScript files
        "!**/node_modules/**", // Exclude node_modules
        "!**/coverage/**", // Exclude the coverage directory
        "!<rootDir>/pages/_*.tsx", // Exclude Next.js special files like _app.tsx and _document.tsx
        "!<rootDir>/**/index.ts", // Exclude index files (optional)
    ],
    coverageDirectory: "coverage", // Output directory for coverage reports
    coverageProvider: "v8",
    coverageReporters: ["json", "lcov", "text", "clover"], // Specify desired report formats
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1", // Map the @ to the root directory
    },
    testEnvironment: "jsdom", // Use jsdom as the test environment
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
