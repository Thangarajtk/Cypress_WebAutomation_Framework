/**
 * Custom Cypress commands for enterprise-grade testing
 * These commands extend Cypress functionality for common test operations
 */

/**
 * Custom command: Add multiple todos at once
 * Usage: cy.addMultipleTodos(['todo1', 'todo2', 'todo3'])
 */
Cypress.Commands.add('addMultipleTodos', (todos) => {
  cy.log(`Adding ${todos.length} todos`)
  todos.forEach((todoText) => {
    cy.get('.new-todo', { timeout: 5000 }).type(todoText + '{enter}')
    cy.get('.todo-list li').should('have.length.greaterThan', 0)
  })
})

/**
 * Custom command: Toggle multiple todos
 * Usage: cy.toggleMultipleTodos([0, 1, 2])
 */
Cypress.Commands.add('toggleMultipleTodos', (indices) => {
  cy.log(`Toggling ${indices.length} todos`)
  indices.forEach((index) => {
    cy.get(`.todo-list li:nth-child(${index + 1}) .toggle`).click()
  })
})

/**
 * Custom command: Verify todo list length
 * Usage: cy.verifyTodoCount(3)
 */
Cypress.Commands.add('verifyTodoCount', (expectedCount) => {
  cy.log(`Verifying todo count: ${expectedCount}`)
  cy.get('.todo-list li').should('have.length', expectedCount)
})

/**
 * Custom command: Verify todo text at index
 * Usage: cy.verifyTodoTextAt(0, 'Expected Text')
 */
Cypress.Commands.add('verifyTodoTextAt', (index, expectedText) => {
  cy.log(`Verifying todo at index ${index}: ${expectedText}`)
  cy.get(`.todo-list li:nth-child(${index + 1}) label`).should('have.text', expectedText)
})

/**
 * Custom command: Get all todo texts
 * Usage: cy.getAllTodoTexts().then(texts => { ... })
 */
Cypress.Commands.add('getAllTodoTexts', () => {
  return cy.get('.todo-list li label').then((elements) => {
    return Array.from(elements).map((el) => el.textContent)
  })
})

/**
 * Custom command: Wait for page load
 * Usage: cy.waitForPageLoad()
 */
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('exist')
  cy.get('.todoapp').should('be.visible')
})

/**
 * Custom command: Login (if authentication is needed in future)
 * Usage: cy.login(email, password)
 */
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('[data-testid="email"]').type(email)
  cy.get('[data-testid="password"]').type(password)
  cy.get('[data-testid="login-button"]').click()
})

/**
 * Custom command: Logout
 * Usage: cy.logout()
 */
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="logout-button"]').click()
})
