describe('TodoMVC page.', function() {

  // global var
  var simpleTodoText = 'simple todo';

  // input 
  var newTodo = element(by.model('newTodo'));       //ng-model="newTodo"
  var allChecked = element(by.model('allChecked')); //ng-model="allChecked"

  // list of todos
  var todoInTodos = element.all(by.repeater('todo in todos')); //ng-repeat="todo in todos ..."

  // footer counter
  var footer = element(by.css('[id="footer"]'));

  var remainingCount = element(by.binding('remainingCount')); //{{remainingCount}}

  // filters
  var filterAll = element(by.css('[ng-class="{selected: status == \'\'} "]')); //<a ng-class="{selected: status == ''} " href="#/">All</a>  
  var filterActive = element(by.css('[ng-class="{selected: status == \'active\'}"]')); //<a ng-class="{selected: status == 'active'}" href="#/active">Active</a>
  var filterCompleted = element(by.css('[ng-class="{selected: status == \'completed\'}"]')); //<a ng-class="{selected: status == 'completed'}" href="#/completed">Completed</a>

  // clear completed
  var clearCompletedTodos = element(by.xpath('.//footer/button')); 

  var completedCount = element(by.css('{completedCount}')); //{{completedCount}}


  function addToDo(todoText) {
    newTodo.sendKeys(todoText + '\n');
  };

  function clickAllChecked() {
    allChecked.click();
  };

  function getTodoInTodosCount() {
    return todoInTodos.count();
  };

  function getTodoInTodosByIndex(index) {
    return todoInTodos.get(index);
  };

  function getTodoCompletedByIndex(index) {
    return getTodoInTodosByIndex(index).element(by.model('todo.completed')); //ng-model="todo.completed"
  };

  function getTodoTitleLast() {
    return todoInTodos.last().element(by.binding('todo.title'));   //{{todo.title}}
  };

  function getTodoTitleFirst() {
    return todoInTodos.first().element(by.binding('todo.title'));   //{{todo.title}}
  };

  function getTodoTitleByIndex(index) {
    return getTodoInTodosByIndex(index).getText();   //{{todo.title}}
  };

  function doubleClickTodoTitleByIndex(index) {
    browser.actions().doubleClick(getTodoTitleByIndex(index)).perform();
  };
  
  function getTodoTitleEdited() {
    return element(by.model('todo.title'));   //ng-model="todo.title"
  };

  function clearTodoTitle() {
    var todoTitleEdit = getTodoTitleEdited();
    todoTitleEdit.clear();
    todoTitleEdit.sendKeys('\n');
  };
  
  function replaceTodoTitleByIndex(index, newTodoText) {
    doubleClickTodoTitleByIndex(index);
    var todoTitleEdit = getTodoTitleEdited();
    todoTitleEdit.clear();
    todoTitleEdit.sendKeys(newTodoText + '\n');
  };

  function changeTodoTitleByIndex(index, newTodoText) {
    doubleClickTodoTitleByIndex(index);
    var todoTitleEdit = getTodoTitleEdited();
    todoTitleEdit.sendKeys(newTodoText + '\n');
  };

  function getRemoveTodoByIndex(index) {
    return getTodoInTodosByIndex(index).element(by.css('[ng-click="removeTodo(todo)"]')); //<button class="destroy" ng-click="removeTodo(todo)"></button>
  };

  function getToDoTextByIndex(index) {
    return getTodoInTodosByIndex(index).getText();
  };

  function checkToDoAsCompletedByIndex(index) {
    getTodoCompletedByIndex(index).click();
  };

  function removeToDoByIndex(index) {
    mouseMove(getTodoInTodosByIndex(index));
    getRemoveTodoByIndex(index).click();
  };
  
  function getRemainingCountText() {
    return remainingCount.getText();
  };

  function applyFilterAll() {
    filterAll.click();
  };

  function applyFilterActive() {
    filterActive.click();
  };

  function applyFilterCompleted() {
    filterCompleted.click();
  };

  function getClearCompleted() {
    return browser.findElement(protractor.By.xpath('.//footer/button'));
  };

  function getCompletedCount() {
    var script = "var re = /\\d+/; \
    var value = re.exec(arguments[0].innerHTML);\
    if (value) { return parseInt(value[0]); }\
    return 0;";
    return browser.executeScript(script, getClearCompleted());
  };
 
  function clickClearCompletedTodos() {
    browser.executeScript("arguments[0].click()", getClearCompleted());
  };
  
  function mouseMove(element) {
    browser.actions().mouseMove(element).perform();
  };

  function getRandomArbitrary(max) {
    var min = 2;
    return Math.random() * (max - min) + min;
  };

  beforeEach(function() {
    browser.get('/examples/angularjs/#/');
  });

  xit('should have a title', function() {
    expect(browser.getTitle()).toMatch('TodoMVC');
  });

  xdescribe('Tests for helper functions.', function() {

    it('should create one ToDo', function() {
      var newText = 'new ';
      //var newTodoText = 'new simple todo';
      addToDo(simpleTodoText);
      
      expect(getTodoInTodosCount()).toBe(1);
      expect(getRemainingCountText()).toBe('1');
      //expect(todoList.get(0).getText()).toBe(simpleTodoText);
      expect(getToDoTextByIndex(0)).toBe(simpleTodoText);
      
      checkToDoAsCompletedByIndex(0);
      //expect(getCompletedCount()).toBe('1');

      replaceTodoTitleByIndex(0, newText + simpleTodoText);
      mouseMove(getTodoInTodosByIndex(0));
      removeToDoByIndex(0);
    });

    it('should create two ToDos', function() {
      addToDo(simpleTodoText + ' 1');
      addToDo(simpleTodoText + ' 2');
      
      //expect(getTodoInTodosCount).toBe(3);
      expect(getRemainingCountText()).toBe('2');
      checkToDoAsCompletedByIndex(1);
      clickClearCompletedTodos();
      addToDo(simpleTodoText + ' 3');
      mouseMove(filterCompleted);
      applyFilterCompleted();
      clickAllChecked();
      clickClearCompletedTodos();
    });

    it('should create a random number of ToDos', function() {

      var r = getRandomArbitrary(10);

      for (var i = 0; i < r; i++) {
        addToDo(simpleTodoText + ' ' + i);
      }

      clickAllChecked();
      expect(getRemainingCountText()).toBe('0');
      clickClearCompletedTodos();
    });
  });

  describe('One todo.', function() {

    it('should create one todo', function() {
      addToDo(simpleTodoText);
      expect(getRemainingCountText()).toBe('1');
      expect(getCompletedCount()).toBe(0);
    });

    it('should check a todo as completed', function() {
      checkToDoAsCompletedByIndex(0);
      expect(getRemainingCountText()).toBe('0');
      expect(getCompletedCount()).toBe(1);
    });

    it('should uncheck a todo as completed', function() {
      checkToDoAsCompletedByIndex(0);
      expect(getRemainingCountText()).toBe('1');
      expect(getCompletedCount()).toBe(0);
    });

    it('should replace todo text', function() {
      var newText = "simple text";
      replaceTodoTitleByIndex(0, newText);
      expect(getRemainingCountText()).toBe('1');
      expect(getTodoTitleByIndex(0)).toBe(newText);
    });

    it('should complete todo text', function() {
      var newText = " text";
      changeTodoTitleByIndex(0, newText);
      expect(getRemainingCountText()).toBe('1');
      expect(getTodoTitleByIndex(0)).toMatch(newText + newText);
    });
  });

  describe('Several todos.', function() {

    it('should add a second todo', function() {
      addToDo(simpleTodoText);
      expect(getRemainingCountText()).toBe('2');
      expect(getTodoInTodosCount()).toBe(2);
      checkToDoAsCompletedByIndex(1);
      expect(getRemainingCountText()).toBe('1');
      expect(getTodoInTodosCount()).toBe(2);
    });

    it('should apply the Completed filter', function() {
      applyFilterCompleted();
      expect(getRemainingCountText()).toBe('1');
      expect(getTodoInTodosCount()).toBe(1);
    });

    it('should apply the Active filter', function() {
      applyFilterActive();
      expect(getRemainingCountText()).toBe('1');
      expect(getTodoInTodosCount()).toBe(1);
    });

    it('should apply the All filter', function() {
      applyFilterCompleted();
      applyFilterAll();
      expect(getRemainingCountText()).toBe('1');
      expect(getTodoInTodosCount()).toBe(2);
    });

    it('should check all as completed', function() {
      clickAllChecked();
      expect(getRemainingCountText()).toBe('0');
      expect(getTodoInTodosCount()).toBe(2);
    });

    it('should uncheck all as completed', function() {
      clickAllChecked();
      expect(getRemainingCountText()).toBe('2');
      expect(getTodoInTodosCount()).toBe(2);
    });
  });

  describe('Remove todos.', function() {

    it('should remove one todo', function() {
      removeToDoByIndex(0);
      expect(getRemainingCountText()).toBe('1');
      expect(getTodoInTodosCount()).toBe(1);
    });

    it('should remove the last todo', function() {
      removeToDoByIndex(0);
      expect(getRemainingCountText()).toBe('');
      expect(getTodoInTodosCount()).toBe(0);
      expect(footer.isDisplayed()).not.toBeTruthy();
    });

    it('should remove todos by clear completed', function() {
      var r = getRandomArbitrary(5);

      for (var i = 0; i < r; i++) {
        addToDo(simpleTodoText + ' ' + i);
      }

      clickAllChecked();
      clickClearCompletedTodos();
      expect(getRemainingCountText()).toBe('');
      expect(getTodoInTodosCount()).toBe(0);
      expect(footer.isDisplayed()).not.toBeTruthy();
    });
  });
});