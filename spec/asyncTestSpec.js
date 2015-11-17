//var Promise = require('bluebird');
var asyncTest = require('../index');

describe('asyncTest', function() {
  var promise, testSpy;

  beforeEach(function() {
    promise = {
      then: function(done) {
        done();
      }
    };

    testSpy = jasmine.createSpy('test').and.returnValue(promise);
  });

  it('calls the provided test', function() {
    var context = {};
    var modifiedTest = asyncTest(testSpy);

    modifiedTest.call(context, function() {});

    expect(testSpy.calls.all()).toEqual([{
      object: context,
      args: [],
      returnValue: promise
    }]);
  });

  it('calls the done callback', function() {
    var doneSpy = jasmine.createSpy('done');
    var modifiedTest = asyncTest(testSpy);

    modifiedTest(doneSpy);

    expect(doneSpy.calls.count()).toBe(1);
  });
});
