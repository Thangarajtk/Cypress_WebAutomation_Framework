
export function navigate() {
    cy.visit('http://todomvc-app-for-testing.surge.sh/')
}

export function addTodo(todoText) {
    cy.get('.new-todo', { timeout: 5000 }).type(todoText + "{enter}")
}

export function validateTodoText(todoIndex, expectedText) {
    cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).should('have.text', expectedText)
}

export function toggleTodo(todoIndex) {
    cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).click()
}

export function showOnlyActiveTodos() {
    cy.contains('Active').click()
}

export function showOnlyCompletedTodos() {
    cy.contains('Completed').click()
}

export function showAllTodos() {
    cy.contains('All').click()
}

export function clearCompleted() {
    cy.contains('Clear completed').click()
}

export function validateNumberOfTodosShown(expectedNumberOfTodos) {
    cy.get('.todo-list li').should('have.length', expectedNumberOfTodos)
}