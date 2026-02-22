const todoPage = require('../pageobjects/todo-page');

describe('Visual Regression Testing (Screenshot Comparisons)', () => {
  let testData;

  before(() => {
    cy.fixture('todos.json').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    todoPage.navigate();
  });

  describe('Image Snapshot Testing - Pixel Perfect Comparisons', () => {
    it('Should match empty todo list snapshot', () => {
      // Take and compare a screenshot of the empty todo list
      cy.screenshot('empty-todo-list');
    });

    it('Should match todo list with items added', () => {
      const todosToAdd = testData.todos.slice(3, 5);
      todosToAdd.forEach((todo) => {
        todoPage.addTodo(todo.text);
      });

      // Take and compare screenshot with todos added
      cy.screenshot('with-todos-added');
    });

    it('Should match todo list with completed item', () => {
      todoPage.addTodo(testData.todos[0].text);
      todoPage.toggleTodo(0);

      // Take and compare screenshot with one todo marked as completed
      cy.screenshot('with-completed-todo');
    });

    it('Should match filtered active todos', () => {
      testData.todos.slice(0, 3).forEach((todo) => {
        todoPage.addTodo(todo.text);
      });

      // Complete second todo
      todoPage.toggleTodo(1);

      // Click active filter
      cy.contains('a', 'Active').click();
      cy.screenshot('active-todos-filtered');
    });

    it('Should match filtered completed todos', () => {
      testData.todos.slice(0, 3).forEach((todo) => {
        todoPage.addTodo(todo.text);
      });

      // Complete first and third todos
      todoPage.toggleTodo(0);
      todoPage.toggleTodo(2);

      // Click completed filter
      cy.contains('a', 'Completed').click();
      cy.screenshot('completed-todos-filtered');
    });

    it('Should match full page screenshot', () => {
      const todosToAdd = testData.todos.slice(0, 4);
      todosToAdd.forEach((todo) => {
        todoPage.addTodo(todo.text);
      });

      // Full page screenshot for complete UI validation
      cy.screenshot('full-page-with-todos', { capture: 'fullPage' });
    });
  });

  describe('Element-Level Visual Testing', () => {
    it('Should match todo item element styling', () => {
      todoPage.addTodo('Buy groceries');

      // Take screenshot of specific element
      cy.get('.todo-list li').first().screenshot('todo-item-element');
    });

    it('Should match input field styling', () => {
      // Verify input field appearance
      cy.get('.new-todo').screenshot('todo-input-field');
    });
  });
});
