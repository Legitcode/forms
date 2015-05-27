jest.dontMock('../schema');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Schema = require('../schema');
var Property = require('../property');

describe('validate', function() {
  it('should return false if one of the properties is invalid', function() {
    var schema = TestUtils.renderIntoDocument(
      <Schema>
        <Property
          inputType="text"
          name="foo"
          validation={ function(v) { return v > 0 } }
          stateAction={ function(v) { return v; } }
          value={1} />
        <Property
          inputType="text"
          name="foo"
          validation={ function(v) { return v > 0 } }
          stateAction={ function(v) { return v; } }
          value={0} />
      </Schema>
    );

    expect(schema.validate()).toBeFalsy();
  });

  it('should return true if all the properties are valid', function() {
    var schema = TestUtils.renderIntoDocument(
      <Schema>
        <Property
          inputType="text"
          name="foo"
          validation={ function(v) { return v > 0 } }
          stateAction={ function(v) { return v; } }
          value={1} />
        <Property
          inputType="text"
          name="foo"
          validation={ function(v) { return v > 0 } }
          stateAction={ function(v) { return v; } }
          value={1} />
      </Schema>
    );

    expect(schema.validate()).toBeTruthy();
  });
});
