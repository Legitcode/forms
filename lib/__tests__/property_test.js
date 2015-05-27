jest.dontMock('../property');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Property = require('../property');
var NumberInput = require('../controls/number_input');
var TextInput = require('../controls/text_input');

describe('Property', function() {
  describe('inputType', function() {
    it('should return the proper input type', function() {
      var property = new Property({ inputType: "number" });

      expect(TestUtils.isElementOfType(property.inputType(), NumberInput)).toBeTruthy();
    });

    it('should return a default of a text type if an invalid type is given', function() {
      var property = new Property({ inputType: "foo" });

      expect(TestUtils.isElementOfType(property.inputType(), TextInput));
    });

    it('should return a default of a text type if no type is given', function() {
      var property = new Property({});

      expect(TestUtils.isElementOfType(property.inputType(), TextInput));
    });
  });

  describe('valid', function() {
    it('should return true if no validation is defined', function() {
      var property = TestUtils.renderIntoDocument(
        <Property inputType="text" />
      );

      expect(property.valid()).toBeTruthy();
    });

    it('should return true if the validation passes', function() {
      var property = TestUtils.renderIntoDocument(
        <Property
          inputType="text"
          name="foo"
          validation={function(v) { return v > 0 }}
          onChange={function(v) { return v; }}
          value={1} />
      );

      expect(property.valid()).toBeTruthy();
    });

    it('should return false if the validation does not pass', function() {
      var property = TestUtils.renderIntoDocument(
        <Property
          inputType="text"
          name="foo"
          validation={function(v) { return v > 0 }}
          onChange={function(v) { return v; }}
          value={0} />
      );

      expect(property.valid()).toBeFalsy();
    });
  });
});
