/// <reference types="Cypress" />

import * as todoPage from '../pageobjects/todo-page'

describe('Visual validation', () => {
    before(() => {
        todoPage.navigate()
    });

    beforeEach(() => {
        cy.eyesOpen({appName: 'TodoMVC', batchName: 'Visual Test'})
        browser: [
            {name: 'chrome', width: 1024, height: 768},
            {name: 'firefox', width: 1024, height: 768},
            {deviceName: 'iPhone X'},
        ]
    });

    afterEach(() => {
        cy.eyesClose()
    });

    it('Should add todo', () => {
        cy.eyesCheckWindow('Empty Todo list')

        todoPage.addTodo('Clean Room')
        todoPage.addTodo('Learn Javascript')

        cy.eyesCheckWindow('Added 2 todos')

        todoPage.toggleTodo(0)
        cy.eyesCheckWindow('Mark 1 TODO as completed')
    });
});