/// <reference types="Cypress" />

import * as todoPage from '../../pageobjects/todo-page'

describe('TODOs Filtering', () => {
    beforeEach(() => {
        todoPage.navigate()

        todoPage.addTodo('Learn Web App Automation')
        todoPage.addTodo('Learn Cypress')
        todoPage.addTodo('Learn Javascript')

        cy.get('.todo-list li:nth-child(2) .toggle').click()
    });

    it('Should filter active TODOs', () => {
        todoPage.showOnlyActiveTodos()
    
        todoPage.validateNumberOfTodosShown(2)
    });

    it('Should filter completed TODOs', () => {
        todoPage.showOnlyCompletedTodos()

        todoPage.validateNumberOfTodosShown(1)
    });

    it('Should filter all TODOs', () => {
        todoPage.showAllTodos()

        todoPage.validateNumberOfTodosShown(3)
    });
});