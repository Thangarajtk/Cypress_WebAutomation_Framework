const todoPage = require('../pageobjects/todo-page');

describe('TODO Actions', () => {
  let testData;

  before(() => {
    cy.fixture('todos.json').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    todoPage.navigate();
  });

  it('Should be able to add new TODO to the list', () => {
    const todoText = testData.todos[0].text;

    todoPage.addTodo(todoText);
    todoPage.validateTodoText(0, todoText);
    todoPage.validateTodoCheckboxIsNotChecked();
  });

  it('Should mark a TODO as completed', () => {
    const todoText = testData.todos[1].text;

    todoPage.addTodo(todoText);
    todoPage.toggleTodo(0);

    cy.get('label').should('have.css', 'text-decoration-line', 'line-through');
  });

  it('Should clear completed TODOs', () => {
    const todoText = testData.todos[2].text;

    todoPage.addTodo(todoText);
    todoPage.toggleTodo(0);
    todoPage.clearCompleted();

    todoPage.validateNumberOfTodosShown(0);
  });
});
