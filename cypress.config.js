const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Base URL for the application
    baseUrl: 'http://todomvc-app-for-testing.surge.sh/',
    
    // Disable watching file changes for performance
    watchForFileChanges: false,
    
    // Configure spec patterns for E2E tests
    specPattern: 'cypress/e2e/**/*.spec.js',
    
    // Set up default viewport size
    viewportWidth: 1024,
    viewportHeight: 768,
    
    // Configure reporter
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      reportFilename: 'mochawesome-report-[datetime]',
      overwrite: false,
      html: false,
      json: true,
      timestamp: 'yyyy-mm-dd_HH-MM-ss'
    },
    
    // Set request timeout
    requestTimeout: 10000,
    
    // Set response timeout
    responseTimeout: 10000,
    
    // Setup plugins
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      require('@applitools/eyes-cypress')(module)
      return config
    }
  }
});
