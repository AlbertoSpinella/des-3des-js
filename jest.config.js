const config =  {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  verbose: true,
  testMatch: [
    "**/__**__test__/*.test.js"
  ],
  testTimeout: 15000
};

export default config;
