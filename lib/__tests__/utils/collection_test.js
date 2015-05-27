jest.dontMock('../../utils/collection');

var Collection = require('../../utils/collection');

describe('include', function() {
  it('should return false if the value is not included in the collection', function() {
    expect(Collection.include([1, 2, 3], 7)).toBeFalsy();
  });

  it('should return true if the value is included in the collection', function() {
    expect(Collection.include([1, 2, 3], 1)).toBeTruthy();
  });
});
