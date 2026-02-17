const todoPage = require('../pageobjects/todo-page')

describe('Visual validation (Screenshot Tests)', () => {
    let testData

    before(() => {
        cy.fixture('todos.json').then((data) => {
            testData = data
        })
    })

    beforeEach(() => {
        todoPage.navigate()
    });

    it('Should display empty todo list', () => {
        // Take a screenshot of the empty todo list
        cy.screenshot('empty-todo-list')
    });

    it('Should display added todos', () => {
        const todosToAdd = testData.todos.slice(3, 5)
        todosToAdd.forEach((todo) => {
            todoPage.addTodo(todo.text)
        })

        // Take a screenshot with todos added
        cy.screenshot('with-todos-added')
    });

    it('Should display toggled todo', () => {
        todoPage.addTodo(testData.todos[0].text)
        todoPage.toggleTodo(0)
        
        // Take a screenshot with one todo marked as completed
        cy.screenshot('with-completed-todo')
    });
});
