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
      // Applitools Eyes for AI-powered visual testing
      require('@applitools/eyes-cypress')(module)
      
      // Image snapshot plugin for pixel-perfect comparison
      require('cypress-image-snapshot/plugin').addMatchImageSnapshotPlugin(on, config);
      
      return config
    }
  },
  
  // Environment variables for visual testing
  env: {
    // Applitools Eyes configuration
    applitoolsIsDisabled: true, // Set to false if you have APPLITOOLS_API_KEY
    
    // Image snapshot configuration
    imageSnapshotMaxDiffThreshold: 0.5, // Allow 0.5% difference
    imageSnapshotResizeDevicePixelRatio: true,
    imageSnapshotDisableTimersAndAnimations: true
  }
});
