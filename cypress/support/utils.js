/**
 * Common utility functions for Cypress tests
 * Enterprise-grade utilities for data handling, assertions, and logging
 */

/**
 * Wait for element and verify visibility
 * @param {string} selector - CSS selector
 * @param {number} timeout - Timeout in milliseconds
 */
export const waitAndVerifyElement = (selector, timeout = 5000) => {
  cy.get(selector, { timeout }).should('be.visible')
}

/**
 * Clear input field and type text
 * @param {string} selector - CSS selector
 * @param {string} text - Text to type
 */
export const clearAndType = (selector, text) => {
  cy.get(selector).clear().type(text)
}

/**
 * Assert element contains text with logging
 * @param {string} selector - CSS selector
 * @param {string} expectedText - Expected text
 */
export const assertElementText = (selector, expectedText) => {
  cy.log(`Asserting element [${selector}] contains: ${expectedText}`)
  cy.get(selector).should('contain', expectedText)
}

/**
 * Get element count
 * @param {string} selector - CSS selector
 * @returns {Promise} Element count
 */
export const getElementCount = (selector) => {
  return cy.get(selector).then((elements) => elements.length)
}

/**
 * Screenshot with timestamp
 * @param {string} name - Screenshot name
 */
export const takeScreenshot = (name) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  cy.screenshot(`${name}-${timestamp}`)
}

/**
 * Log test step for reporting
 * @param {string} stepName - Step name
 * @param {string} details - Step details
 */
export const logTestStep = (stepName, details = '') => {
  cy.log(`✓ ${stepName} ${details ? `- ${details}` : ''}`)
}

/**
 * Handle API response
 * @param {object} response - Response object
 * @returns {object} Parsed response
 */
export const handleApiResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    cy.log(`✓ API Request successful: ${response.status}`)
    return response.body
  } else {
    throw new Error(`API Request failed with status ${response.status}`)
  }
}

/**
 * Wait for network idle
 * @param {number} timeout - Timeout in milliseconds
 */
export const waitForNetworkIdle = (timeout = 3000) => {
  cy.intercept('**').as('api')
  cy.get('body').then(() => {
    cy.wait('@api', { timeout }).catch(() => {
      // Network idle achieved or timeout
    })
  })
}
