jest.dontMock('../list');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Property = require('../property');
var List = require('../list');

describe('component did mount', function() {
  it('should create an initial child component', function() {
    var list = TestUtils.renderIntoDocument(
      <List rowClass="inputRow">
        <Property
          inputType="text"
          name="foo"
          stateAction={function(v) { return v; }}
          value={1} />
        <Property
          inputType="text"
          name="foo"
          stateAction={function(v) { return v; }}
          value={1} />
      </List>
    );

    var listItems = TestUtils.scryRenderedDOMComponentsWithClass(list, "inputRow");

    expect(listItems.length).toEqual(1);

    listItems[0].props.children[0].forEach(function(item) {
      expect(TestUtils.isElementOfType(item, Property)).toBeTruthy();
    });

    expect(TestUtils.isElementOfType(listItems[0].props.children[1], 'a')).toBeTruthy();
  });
});

describe('findChild', function() {
  it('should find the index of the child element that was clicked', function() {
    var list = TestUtils.renderIntoDocument(
      <List rowClass="inputRow">
        <Property
          inputType="text"
          name="foo"
          stateAction={function(v) { return v; }}
          value={1} />
        <Property
          inputType="text"
          name="foo"
          stateAction={function(v) { return v; }}
          value={1} />
      </List>
    );

    var button = React.findDOMNode(list.refs.addButton);

    TestUtils.Simulate.click(button);

    expect(list.findChild(2)).toEqual(1);
  });
});

describe('user interaction', function() {
  it('should create another child element when the add button is clicked', function() {
    var list = TestUtils.renderIntoDocument(
      <List rowClass="inputRow">
        <Property
          inputType="text"
          name="foo"
          stateAction={function(v) { return v; }}
          value={1} />
        <Property
          inputType="text"
          name="foo"
          stateAction={function(v) { return v; }}
          value={1} />
      </List>
    );

    var button = React.findDOMNode(list.refs.addButton);

    TestUtils.Simulate.click(button);

    var listItems = TestUtils.scryRenderedDOMComponentsWithClass(list, "inputRow");

    expect(listItems.length).toEqual(2);
  });

  it('should remove the element whose remove button is clicked', function() {
    var list = TestUtils.renderIntoDocument(
      <List rowClass="inputRow">
        <Property
          inputType="text"
          name="foo"
          stateAction={function(v) { return v; }}
          value={1} />
        <Property
          inputType="text"
          name="foo"
          stateAction={function(v) { return v; }}
          value={1} />
      </List>
    );

    var button = React.findDOMNode(list.refs.addButton);

    // Add a few new rows
    TestUtils.Simulate.click(button);
    TestUtils.Simulate.click(button);

    // verify that we have three rows
    var listItems = TestUtils.scryRenderedDOMComponentsWithClass(list, "inputRow");
    expect(listItems.length).toEqual(3);

    // Find the second row and remove it
    var removeButtons = TestUtils.scryRenderedDOMComponentsWithTag(list, 'a')
    TestUtils.Simulate.click(removeButtons[1]);

    var listItems = TestUtils.scryRenderedDOMComponentsWithClass(list, "inputRow");
    expect(listItems.length).toEqual(2);

    expect(listItems[0].props.children[1].props.value).toEqual(1);
    expect(listItems[1].props.children[1].props.value).toEqual(3);

    // Let's add another one to the end and remove the first one
    TestUtils.Simulate.click(button);

    // Again, verify we have three rows
    var listItems = TestUtils.scryRenderedDOMComponentsWithClass(list, "inputRow");
    expect(listItems.length).toEqual(3);

    // Let's remove the first row this time
    var removeButtons = TestUtils.scryRenderedDOMComponentsWithTag(list, 'a');
    TestUtils.Simulate.click(removeButtons[0]);

    var listItems = TestUtils.scryRenderedDOMComponentsWithClass(list, "inputRow");

    expect(listItems[0].props.children[1].props.value).toEqual(3);
    expect(listItems[1].props.children[1].props.value).toEqual(4);
  });
});
