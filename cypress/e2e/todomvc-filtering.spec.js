const todoPage = require('../pageobjects/todo-page')

describe('TODOs Filtering', () => {
    let testData

    before(() => {
        cy.fixture('todos.json').then((data) => {
            testData = data
        })
    })

    beforeEach(() => {
        todoPage.navigate()

        // Add todos from fixture
        const todosToAdd = testData.todos.slice(0, 3)
        todosToAdd.forEach((todo) => {
            todoPage.addTodo(todo.text)
        })

        // Mark second todo as completed
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
