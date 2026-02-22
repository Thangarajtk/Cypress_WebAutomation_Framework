// =====================================================
// This example support/e2e.js is processed and
// loaded automatically before the test files.
//
// This is a great place to put global configuration
// and behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// the supportFile preprocess with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// =====================================================

// Import custom commands
require('./commands');

// Image snapshot plugin for pixel-perfect visual testing
require('cypress-image-snapshot/command');

// Applitools Eyes support for visual AI testing (optional)
// Uncomment the line below and set APPLITOOLS_API_KEY env variable to enable
// require('@applitools/eyes-cypress/commands');

// Disable uncaught exceptions to prevent tests from stopping
Cypress.on('uncaught:exception', () => {
  // Return false to prevent Cypress from failing the test
  return false;
});

// Hook: Log before each test
beforeEach(() => {
  cy.log(`Starting test: ${Cypress.currentTest.title}`);
});

// Hook: Log after each test
afterEach(function () {
  if (this.currentTest.state === 'passed') {
    cy.log(`✓ Test passed: ${this.currentTest.title}`);
  } else if (this.currentTest.state === 'failed') {
    cy.log(`✗ Test failed: ${this.currentTest.title}`);
  }
});
