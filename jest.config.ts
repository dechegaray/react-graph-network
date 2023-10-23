const esModules = ['jose', 'd3', 'd3-drag', 'd3-force', 'd3-selection'].join('|')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],

  transform: {
    /** Note: Given that some third-party modules are not compiled correctly,
     * having babel-jest configured was neccessary to transform .js(x) files that
     * ts-jest cannot compiled correctly
     *
     * If switching to only babel happens in the future, then change this configuration
     * to only "^.+\\.[jt]sx?$": "babel-jest"
     */
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    /** Note: By default `jest` does not transform any file from the folder "node_module";
     * therefore, if a third-party library is not compiled correctly to valid JS, its ingestion
     * fails on jest as soon as the file is requested by a running test. Because of it,
     * any library that needs actual transformation needs to be marked as an exception in this
     * configuration option, so the module can be transpiled/compiled by either babel-jest or
     * ts-jest.
     *
     * Add any node_module after `jose` using pipes "|" to allow its transformation
     */
    // "node_modules/(?!(jose|openid-client|@kubernetes))",
    `/node_modules/(?!${esModules})`,
  ],

  coverageThreshold: {
    global: {
      branches: 55,
      functions: 60,
      lines: 75,
      statements: 74,
    },
  },
}
