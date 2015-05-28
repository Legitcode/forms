jest.dontMock('../../list/list_item');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Property = require('../../property');
var ListItem = require('../../list/list_item');

describe('valid', function() {
  it('should return false if any of the fields are not valid', function() {
    var listItem = TestUtils.renderIntoDocument(
      <ListItem>
        <Property
          inputType="text"
          name="foo"
          onChange={ function(v) { return v; } }
          validation={ function(v) { return v > 0; } }
          value={1} />
        <Property
          inputType="text"
          name="foo"
          onChange={ function(v) { return v; } }
          validation={ function(v) { return v > 1; } }
          value={1} />
      </ListItem>
    );

    expect(listItem.valid()).toBeFalsy();
  });

  it('should return true if all of the fields are valid', function() {
    var listItem = TestUtils.renderIntoDocument(
      <ListItem>
        <Property
          inputType="text"
          name="foo"
          onChange={ function(v) { return v; } }
          validation={ function(v) { return v > 0; } }
          value={1} />
        <Property
          inputType="text"
          name="foo"
          onChange={ function(v) { return v; } }
          validation={ function(v) { return v > 0; } }
          value={1} />
      </ListItem>
    );

    expect(listItem.valid()).toBeTruthy();
  });
});
