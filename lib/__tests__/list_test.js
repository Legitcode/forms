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
    expect(listItems[0].props.children[0].length).toEqual(2);
  });
})
