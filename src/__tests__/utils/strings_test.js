jest.dontMock('../../utils/strings');

var Strings = require('../../utils/strings');

describe('capitalize', function() {
  it('should return an empty string if str is undefined', function() {
    expect(Strings.capitalize()).toEqual('');
  });

  it('should capitalize the first letter of the string', function() {
    expect(Strings.capitalize('foo bar')).toEqual('Foo bar');
  });
});
