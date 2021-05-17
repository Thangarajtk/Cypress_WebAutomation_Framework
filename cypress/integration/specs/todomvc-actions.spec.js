/// <reference types="Cypress" />

import * as todoPage from "../../pageobjects/todo-page"

describe('TODO Actions', () => {
    beforeEach(() => {
        todoPage.navigate()

        todoPage.addTodo('Learn Web App Automation')
    });
    
    it('Should be able to add new TODO to the list', () => {
        todoPage.validateTodoText(0, 'Learn Web App Automation')

        todoPage.validateTodoCheckboxIsNotChecked()
    });

    it('Should mark a TODO as completed', () => {
        todoPage.toggleTodo(0)
        cy.get('label').should('have.css', 'text-decoration-line', 'line-through')
    });

    it('Should clear completed TODOs', () => { 
        todoPage.toggleTodo(0)

        todoPage.clearCompleted()

        todoPage.validateNumberOfTodosShown(0)
    });
});