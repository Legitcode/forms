jest.dontMock('../../utils/obj');

var Obj = require('../../utils/obj');

describe('clone', function() {
  it('should return a clone of the passed in object', function() {
    expect(Obj.clone({foo: "bar"})).toEqual({foo: "bar"});
  });

  it('should handle arrays also', function() {
    expect(Obj.clone([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should handle arrays of objects', function() {
    expect(Obj.clone([{foo: "bar"}, {1: "2"}])).toEqual([{foo: "bar"}, {1: "2"}]);
  });
});
