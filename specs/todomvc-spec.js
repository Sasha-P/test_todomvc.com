describe('TodoMVC page.', function() {

  // global var
  var simpleTodoText = 'simple todo';

  // input 
  var newTodo = element(by.model('newTodo'));       //ng-model="newTodo"
  var allChecked = element(by.model('allChecked')); //ng-model="allChecked"

  // list of todos
  var todoInTodos = element.all(by.repeater('todo in todos')); //ng-repeat="todo in todos ..."

  // list item
  //var todoCompleted = element(by.model('todo.completed'));           //ng-model="todo.completed"
  //var todoTitleLabel =  element(by.binding('todo.title'));           //{{todo.title}}
  //var removeTodo = element(by.css('[ng-click="removeTodo(todo)"]')); //<button class="destroy" ng-click="removeTodo(todo)"></button>
  
  // edit list item
  //var todoTitleEdit = element(by.model('todo.title'));               //ng-model="todo.title"

  // footer counter
  var remainingCount = element(by.binding('remainingCount')); //{{remainingCount}}

  // filters
  var filterAll = element(by.css('[ng-class="{selected: status == \'\'} "]')); //<a ng-class="{selected: status == ''} " href="#/">All</a>
  //var filterAll2 = element(webdriver.By.linkText("#/"));
  
  var filterActive = element(by.css('[ng-class="{selected: status == \'active\'}"]')); //<a ng-class="{selected: status == 'active'}" href="#/active">Active</a>
  //var filterActive2 = element(webdriver.By.linkText("#/active"));
  
  var filterCompleted = element(by.css('[ng-class="{selected: status == \'completed\'}"]')); //<a ng-class="{selected: status == 'completed'}" href="#/completed">Completed</a>
  //var filterCompleted2 = element(webdriver.By.linkText("#/completed"));

  // remove all
  //var clearCompletedTodos = element(by.css('[ng-click="clearCompletedTodos()"]')); //<button id="clear-completed" ng-click="clearCompletedTodos()" ng-show="completedCount">Clear completed ({{completedCount}})</button>
  //var clearCompletedTodos = element(by.partialButtonText('Clear completed')); //ElementNotVisibleError: element not visible
  var clearCompletedTodos = element(by.xpath('.//footer/button')); //ElementNotVisibleError: element not visible
  //var clearCompletedTodos = element(by.css('#clear-completed::after button'));

  var completedCount = element(by.binding('completedCount')); //{{completedCount}}


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
    return getTodoInTodosByIndex(index).element(by.binding('todo.title'));   //{{todo.title}}
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

  function checkToDoAsDoneByText(todoText) {
    //
  };

  function removeToDoByIndex(index) {
    getRemoveTodoByIndex(index).click();
  };

  function removeToDoByText(todoText) {
    //
  };
  
  function getRemainingCountText() {
    return remainingCount.getText();
  };

  function applieFilterAll() {
    filterAll.click();
  };

  function applieFilterActive() {
    filterActive.click();
  };

  function applieFilterCompleted() {
    filterCompleted.click();
  };

  function getClearCompleted() {
    return browser.findElement(protractor.By.xpath('.//footer/button'));
  };

  function getCompletedCount() {
    //return completedCount.getText();
    var script = "var re = /\\d+/; \
    var value = re.exec(arguments[0].innerHTML);\
    if (value) { return parseInt(value[0]); }\
    return 0;";
    //var str = browser.executeScript("return arguments[0].innerHTML", getClearCompleted());
    return browser.executeScript(script, getClearCompleted());
  };

  // function generateClearCompleted(value) {
  //   return 'Clear completed (' + value + ')';
  // };
  
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

    it('should create a one ToDo', function() {
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

    it('should create a two ToDos', function() {
      addToDo(simpleTodoText + ' 1');
      addToDo(simpleTodoText + ' 2');
      
      //expect(getTodoInTodosCount).toBe(3);
      expect(getRemainingCountText()).toBe('2');
      checkToDoAsCompletedByIndex(1);
      clickClearCompletedTodos();
      addToDo(simpleTodoText + ' 3');
      mouseMove(filterCompleted);
      applieFilterCompleted();
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

    it('should check todo as completed', function() {
      checkToDoAsCompletedByIndex(0);
      expect(getRemainingCountText()).toBe('0');
      expect(getCompletedCount()).toBe(1);
    });

    it('should uncheck todo as completed', function() {
      checkToDoAsCompletedByIndex(0);
      expect(getRemainingCountText()).toBe('1');
      expect(getCompletedCount()).toBe(0);
    });

    it('should replace todo text', function() {
      var newText = "simple text";
      replaceTodoTitleByIndex(0, newText);
      expect(getRemainingCountText()).toBe('1');
      //expect(getTodoTitleFirst()).toBe(newText);
    });

    it('should complete todo text', function() {
      var newText = " text";
      changeTodoTitleByIndex(0, newText);
      expect(getRemainingCountText()).toBe('1');
      //expect(getTodoTitleFirst()).toBe(newText);
    });

    it('should applie filter Completed', function() {
      applieFilterCompleted();
      expect(getRemainingCountText()).toBe('1');
      expect(getTodoInTodosCount()).toBe(0);
    });
  });
});