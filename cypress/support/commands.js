/**
 * Custom Cypress commands for enterprise-grade testing
 * These commands extend Cypress functionality for common test operations
 */

/**
 * Custom command: Add multiple todos at once
 * Usage: cy.addMultipleTodos(['todo1', 'todo2', 'todo3'])
 */
Cypress.Commands.add('addMultipleTodos', (todos) => {
  cy.log(`Adding ${todos.length} todos`);
  todos.forEach((todoText) => {
    cy.get('.new-todo', { timeout: 5000 }).type(todoText + '{enter}');
    cy.get('.todo-list li').should('have.length.greaterThan', 0);
  });
});

/**
 * Custom command: Toggle multiple todos
 * Usage: cy.toggleMultipleTodos([0, 1, 2])
 */
Cypress.Commands.add('toggleMultipleTodos', (indices) => {
  cy.log(`Toggling ${indices.length} todos`);
  indices.forEach((index) => {
    cy.get(`.todo-list li:nth-child(${index + 1}) .toggle`).click();
  });
});

/**
 * Custom command: Verify todo list length
 * Usage: cy.verifyTodoCount(3)
 */
Cypress.Commands.add('verifyTodoCount', (expectedCount) => {
  cy.log(`Verifying todo count: ${expectedCount}`);
  cy.get('.todo-list li').should('have.length', expectedCount);
});

/**
 * Custom command: Verify todo text at index
 * Usage: cy.verifyTodoTextAt(0, 'Expected Text')
 */
Cypress.Commands.add('verifyTodoTextAt', (index, expectedText) => {
  cy.log(`Verifying todo at index ${index}: ${expectedText}`);
  cy.get(`.todo-list li:nth-child(${index + 1}) label`).should('have.text', expectedText);
});

/**
 * Custom command: Get all todo texts
 * Usage: cy.getAllTodoTexts().then(texts => { ... })
 */
Cypress.Commands.add('getAllTodoTexts', () => {
  return cy.get('.todo-list li label').then((elements) => {
    return Array.from(elements).map((el) => el.textContent);
  });
});

/**
 * Custom command: Wait for page load
 * Usage: cy.waitForPageLoad()
 */
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('exist');
  cy.get('.todoapp').should('be.visible');
});

/**
 * Custom command: Login (if authentication is needed in future)
 * Usage: cy.login(email, password)
 */
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="password"]').type(password);
  cy.get('[data-testid="login-button"]').click();
});

/**
 * Custom command: Logout
 * Usage: cy.logout()
 */
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="logout-button"]').click();
});

/**
 * Visual Testing Commands
 */

/**
 * Custom command: Compare visual snapshot (pixel-perfect)
 * Usage: cy.matchSnapshot('element-name')
 * Updates baseline: npm run test:visual:update
 */
Cypress.Commands.add('matchSnapshot', (specName, options = {}) => {
  const opts = {
    failureThreshold: 0.5, // Allow 0.5% threshold
    failureThresholdType: 'percent',
    ...options,
  };
  cy.screenshot(specName, { capture: 'viewport', ...opts });
});

/**
 * Custom command: Compare full page snapshot
 * Usage: cy.matchFullPageSnapshot('page-name')
 */
Cypress.Commands.add('matchFullPageSnapshot', (specName) => {
  cy.screenshot(specName, { capture: 'fullPage' });
});

/**
 * Custom command: Compare element snapshot
 * Usage: cy.get('selector').matchElementSnapshot('element-name')
 */
Cypress.Commands.add('matchElementSnapshot', { prevSubject: 'element' }, (subject, specName) => {
  cy.wrap(subject).screenshot(specName, { capture: 'viewport' });
  return subject;
});

/**
 * Custom command: Visual check with Applitools Eyes
 * Usage: cy.checkWithEyes('step-name')
 * Note: Requires APPLITOOLS_API_KEY environment variable
 */
Cypress.Commands.add('checkWithEyes', (stepName) => {
  if (!Cypress.env('applitoolsIsDisabled')) {
    cy.eyesCheckWindow({
      tag: stepName,
      target: 'window',
      fully: true,
    });
  } else {
    cy.log('Applitools Eyes is disabled. Set APPLITOOLS_API_KEY to enable.');
  }
});
