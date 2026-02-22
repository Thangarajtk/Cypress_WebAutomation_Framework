/**
 * Navigate to AUT
 */
function navigate() {
  cy.visit('/');
}

/**
 * Add Todo
 * @param {string, required} todoText - TODO text
 */
function addTodo(todoText) {
  cy.get('.new-todo', { timeout: 5000 }).type(todoText + '{enter}');
}

/**
 * Verify that TODO checkbox is not checked
 */
function validateTodoCheckboxIsNotChecked() {
  cy.get('.toggle').should('not.be.checked');
}

/**
 * This method is to validate the expected Todo text is displayed at the given index
 * @param {*} todoIndex
 * @param {*} expectedText
 */
function validateTodoText(todoIndex, expectedText) {
  cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).should('have.text', expectedText);
}

/**
 * Method to toggle Todo at the given index
 * @param {*} todoIndex
 */
function toggleTodo(todoIndex) {
  cy.get(`.todo-list li:nth-child(${todoIndex + 1}) .toggle`).click();
}

/**
 * Click on "Active"
 */
function showOnlyActiveTodos() {
  cy.contains('Active').click();
}

/**
 * Click on "Completed"
 */
function showOnlyCompletedTodos() {
  cy.contains('Completed').click();
}

/**
 * Click on "All"
 */
function showAllTodos() {
  cy.contains('All').click();
}

/**
 * Click on "Clear completed"
 */
function clearCompleted() {
  cy.contains('Clear completed').click();
}

/**
 * This method is to validate that the expected number of Todos are shown
 * @param {*} expectedNumberOfTodos
 */
function validateNumberOfTodosShown(expectedNumberOfTodos) {
  cy.get('.todo-list li').should('have.length', expectedNumberOfTodos);
}

// Export all functions
module.exports = {
  navigate,
  addTodo,
  validateTodoCheckboxIsNotChecked,
  validateTodoText,
  toggleTodo,
  showOnlyActiveTodos,
  showOnlyCompletedTodos,
  showAllTodos,
  clearCompleted,
  validateNumberOfTodosShown,
};
