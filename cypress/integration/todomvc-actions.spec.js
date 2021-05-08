/// <reference types="Cypress" />

import { navigate, addTodo, 
    validateTodoText, toggleTodo, 
    clearCompleted, validateNumberOfTodosShown } from "../pageobjects/todo-page";

describe('TODO Actions', () => {
    beforeEach(() => {
       navigate()

       addTodo('Clean room')
    });
    
    it('Should be able to add new TODO to the list', () => {
        validateTodoText(0, 'Clean room')

        cy.get('.toggle').should('not.be.checked')
    });

    it('Should mark a TODO as completed', () => {
        toggleTodo(0)
        cy.get('label').should('have.css', 'text-decoration-line', 'line-through')
    });

    it('Should clear completed TODOs', () => {
        toggleTodo(0)

        clearCompleted()

        validateNumberOfTodosShown(0)
    });
});