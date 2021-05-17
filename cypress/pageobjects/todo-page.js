/**
 * Navigate to AUT
 */
export function navigate() {
    cy.visit('/')
}

/**
 * Add Todo
 * @param {string, required} todoText - TODO text
 */
export function addTodo(todoText) {
    cy.get('.new-todo', { timeout: 5000 }).type(todoText + "{enter}")
}

/**
 * Verify that TODO checkbox is not checked
 */
export function validateTodoCheckboxIsNotChecked() {
    cy.get('.toggle').should('not.be.checked')
}

/**
 * This method is to validate the expected Todo text is displayed at the given index
 * @param {*} todoIndex 
 * @param {*} expectedText 
 */
export function validateTodoText(todoIndex, expectedText) {
    cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).should('have.text', expectedText)
}

/**
 * Method to toggle Todo at the given index
 * @param {*} todoIndex 
 */
export function toggleTodo(todoIndex) {
    cy.get(`.todo-list li:nth-child(${todoIndex + 1}) .toggle`).click()
}

/**
 * Click on "Active"
 */
export function showOnlyActiveTodos() {
    cy.contains('Active').click()
}

/**
 * Click on "Completed"
 */
export function showOnlyCompletedTodos() {
    cy.contains('Completed').click()
}

/**
 * Click on "All"
 */
export function showAllTodos() {
    cy.contains('All').click()
}

/**
 * Click on "Clear completed"
 */
export function clearCompleted() {
    cy.contains('Clear completed').click()
}

/**
 * This method is to validate that the expected number of Todos are shown 
 * @param {*} expectedNumberOfTodos 
 */
export function validateNumberOfTodosShown(expectedNumberOfTodos) {
    cy.get('.todo-list li').should('have.length', expectedNumberOfTodos)
}