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

describe('find', function() {
  it('should return the index of the value in the array', function() {
    expect(Collection.find([1, 2, 3], 3)).toEqual(2);
  });

  it('should return the default value if it is not found', function() {
    expect(Collection.find([1, 2, 3], 6, 0)).toEqual(0);
  });

  it('should return null if the value is not found and no default is given', function() {
    expect(Collection.find([1, 2, 3], 6)).toEqual(null);
  });
});
