const sonarqubeScanner = require('sonarqube-scanner');

module.exports = sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000',
    options: {
      'sonar.language': 'js',
      'sonar.sources': 'src',
      'sonar.tests': '__tests__',
      'sonar.inclusions': 'src/**',
      'sonar.exclusions': 'src/db/**',
      'sonar.test.inclusions': '__tests__/**/*.test.js',
      'sonar.javascript.lcov.reportPaths': '__tests__/coverage/lcov.info',
      'sonar.eslint.reportPaths': '__tests__/coverage/eslint-report.info',
      'sonar.testExecutionReportPaths': '__tests__/coverage/test-reporter.xml',
    },
  }, () => { },
);
