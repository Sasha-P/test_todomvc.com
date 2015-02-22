describe('TodoMVC page test', function() {

  beforeEach(function() {
    browser.get('/examples/angularjs/#/');
  });

  xit('should have a title', function() {
    expect(browser.getTitle()).toMatch('TodoMVC');
  });

  describe('Create a ToDos', function() {

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

    function aplieFilterAll() {
      filterAll.click();
    };

    function aplieFilterActive() {
      filterActive.click();
    };

    function aplieFilterCompleted() {
      filterCompleted.click();
    };

    function getCompletedCount() {
      return completedCount.getText();
    };
    
    function clickClearCompletedTodos() {
      var hiddenElement = browser.findElement(protractor.By.xpath('.//footer/button'));
      browser.executeScript("arguments[0].click()", hiddenElement);
    };
    
    function mouseMove(element) {
      browser.actions().mouseMove(element).perform();
    };

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    };

    beforeEach(function() {
      //browser.refresh();
    });

    it('should create a one ToDo', function() {
      var todoText = 'simple todo';
      var newTodoText = 'new simple todo';
      addToDo(todoText);
      
      expect(getTodoInTodosCount()).toBe(1);
      expect(getRemainingCountText()).toBe('1');
      //expect(todoList.get(0).getText()).toBe(todoText);
      expect(getToDoTextByIndex(0)).toBe(todoText);
      
      checkToDoAsCompletedByIndex(0);
      //expect(getCompletedCount()).toBe('1');

      replaceTodoTitleByIndex(0,newTodoText);
      mouseMove(getTodoInTodosByIndex(0));
      removeToDoByIndex(0);
    });

    it('should create a two ToDos', function() {
      addToDo('simple todo 1');
      addToDo('simple todo 2');
      
      //expect(getTodoInTodosCount).toBe(3);
      expect(getRemainingCountText()).toBe('2');
      checkToDoAsCompletedByIndex(1);
      clickClearCompletedTodos();
      addToDo('simple todo 3');
      mouseMove(filterCompleted);
      aplieFilterCompleted();
    });

    it('should create a random number of ToDos', function() {
      var r = getRandomArbitrary(2,10);

      for (var i = 0; i < r; i++) {
        addToDo('simple todo ' + i);
      }

      clickAllChecked();
      expect(getRemainingCountText()).toBe('0');
      clickClearCompletedTodos();
    });

    xit('', function() {
    });

    xit('', function() {
    });
  });
});