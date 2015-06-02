jest.dontMock('../list');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Property = require('../property');
var List = require('../list');
var ListItem = require('../list/list_item');

describe('user interaction', function() {
  // it('should create another child element when the add button is clicked', function() {
  //   var list = TestUtils.renderIntoDocument(
  //     <List
  //       rowClass="inputRow"
  //       onListChange={function(v) { return v; }}>
  //
  //       <Property
  //         inputType="text"
  //         name="foo"
  //         onChange={function(v) { return v; }}
  //         value={1} />
  //       <Property
  //         inputType="text"
  //         name="foo"
  //         onChange={function(v) { return v; }}
  //         value={1} />
  //     </List>
  //   );
  //
  //   var button = React.findDOMNode(list.refs.addButton);
  //
  //   TestUtils.Simulate.click(button);
  //
  //   var listItems = TestUtils.scryRenderedComponentsWithType(list, ListItem);
  //
  //   expect(listItems.length).toEqual(1);
  // });

  // it('should remove the element whose remove button is clicked', function() {
  //   var list = TestUtils.renderIntoDocument(
  //     <List rowClass="inputRow" onChange={function(v) { return v; }}>
  //       <Property
  //         inputType="text"
  //         name="foo"
  //         onChange={function(v) { return v; }}
  //         value={1} />
  //       <Property
  //         inputType="text"
  //         name="foo"
  //         onChange={function(v) { return v; }}
  //         value={1} />
  //     </List>
  //   );
  //
  //   var button = React.findDOMNode(list.refs.addButton);
  //
  //   // Add a few new rows
  //   TestUtils.Simulate.click(button);
  //   TestUtils.Simulate.click(button);
  //
  //   // verify that we have three rows
  //   var listItems = TestUtils.scryRenderedComponentsWithType(list, ListItem);
  //   expect(listItems.length).toEqual(3);
  //
  //   // Find the second row and remove it
  //   var removeButtons = TestUtils.scryRenderedDOMComponentsWithTag(list, 'a')
  //   TestUtils.Simulate.click(removeButtons[1]);
  //
  //   var listItems = TestUtils.scryRenderedComponentsWithType(list, ListItem);
  //   expect(listItems.length).toEqual(2);
  //
  //   expect(listItems[0].props.removeButton.props.value).toEqual(1);
  //   expect(listItems[1].props.removeButton.props.value).toEqual(3);
  //
  //   // Let's add another one to the end and remove the first one
  //   TestUtils.Simulate.click(button);
  //
  //   // Again, verify we have three rows
  //   var listItems = TestUtils.scryRenderedComponentsWithType(list, ListItem);
  //   expect(listItems.length).toEqual(3);
  //
  //   // Let's remove the first row this time
  //   var removeButtons = TestUtils.scryRenderedDOMComponentsWithTag(list, 'a');
  //   TestUtils.Simulate.click(removeButtons[0]);
  //
  //   var listItems = TestUtils.scryRenderedComponentsWithType(list, ListItem);
  //
  //   expect(listItems[0].props.removeButton.props.value).toEqual(3);
  //   expect(listItems[1].props.removeButton.props.value).toEqual(4);
  // });
});

describe('valid', function() {
  // it('should return false if any of the fields are not valid', function() {
  //   var list = TestUtils.renderIntoDocument(
  //     <List rowClass="inputRow" onChange={function(v) { return v; }}>
  //       <Property
  //         inputType="text"
  //         name="foo"
  //         onChange={ function(v) { return v; } }
  //         validation={ function(v) { return v > 0 } }
  //         value={1} />
  //       <Property
  //         inputType="text"
  //         name="foo"
  //         onChange={ function(v) { return v; } }
  //         validation={ function(v) { return v > 1 } }
  //         value={1} />
  //     </List>
  //   );
  //
  //   expect(list.valid()).toBeFalsy();
  // });

  // it('should return true if all of the fields are valid', function() {
  //   var list = TestUtils.renderIntoDocument(
  //     <List rowClass="inputRow" onChange={function(v) { return v; }}>
  //       <Property
  //         inputType="text"
  //         name="foo"
  //         onChange={ function(v) { return v; } }
  //         validation={ function(v) { return v > 0 } }
  //         value={1} />
  //       <Property
  //         inputType="text"
  //         name="foo"
  //         onChange={ function(v) { return v; } }
  //         validation={ function(v) { return v > 0 } }
  //         value={1} />
  //     </List>
  //   );
  //
  //   expect(list.valid()).toBeTruthy();
  // });
});
