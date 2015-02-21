describe('TodoMVC page test', function() {
  beforeEach(function() {
    browser.get('http://todomvc.com/examples/angularjs/#/');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toMatch('TodoMVC');
  });
});
