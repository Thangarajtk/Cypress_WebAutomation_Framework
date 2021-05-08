/// <reference types="Cypress" />

describe('TODOs Filtering', () => {
    beforeEach(() => {
        cy.visit('http://todomvc-app-for-testing.surge.sh/')

        cy.get('.new-todo', { timeout: 5000 }).type("Clean room{enter}")
        cy.get('.new-todo', { timeout: 5000 }).type("Learn Cypress{enter}")
        cy.get('.new-todo', { timeout: 5000 }).type("Learn Javascript{enter}")

        cy.get('.todo-list li:nth-child(2) .toggle').click()
    });

    it('Should filter active TODOs', () => {
        cy.contains('Active').click()

        cy.get('.todo-list li').should('have.length', 2)
    });

    it('Should filter completed TODOs', () => {
        cy.contains('Completed').click()

        cy.get('.todo-list li').should('have.length', 1)
    });

    it('Should filter all TODOs', () => {
        cy.contains('All').click()

        cy.get('.todo-list li').should('have.length', 3)
    });
});