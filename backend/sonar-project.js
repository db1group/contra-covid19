const sonarqubeScanner = require('sonarqube-scanner');

module.exports = sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000',
    options: {
      'sonar.sources': 'src',
      'sonar.tests': '__tests__',
      'sonar.inclusions': 'src/**', // Entry point of your code
      'sonar.test.inclusions': '__tests__/**/*.test.js',
      'sonar.javascript.lcov.reportPaths': '__tests__/coverage/lcov.info',
      'sonar.testExecutionReportPaths': '__tests__/coverage/test-reporter.xml',
    },
  }, () => { },
);
