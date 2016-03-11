var Promise = require('bluebird');
var asyncTest = require('../index');

describe('asyncTest', function() {
  var resolvedPromise, rejectedPromise, successTest, failTest;

  beforeEach(function() {
    resolvedPromise = new Promise(function(resolve) {
      resolve();
    });
    rejectedPromise = new Promise(function(resolve, reject) {
      reject();
    });

    successTest = jasmine.createSpy('test1').and.returnValue(resolvedPromise);
    failTest = jasmine.createSpy('test2').and.returnValue(rejectedPromise);
  });

  it('calls the provided test', function() {
    var context = {};
    var modifiedTest = asyncTest(successTest);

    modifiedTest.call(context, function() {});

    expect(successTest.calls.all()).toEqual([{
      object: context,
      args: [],
      returnValue: resolvedPromise
    }]);
  });

  fit('calls the done callback', function(done) {
    var doneSpy = jasmine.createSpy('done');
    var hej = function hej() {
      return new Promise(function(resolve) {
        resolve();
      });
    };

    var modifiedTest = asyncTest(hej);

    modifiedTest(done);

    // expect(doneSpy.calls.count()).toBe(1);
  });

  it('calls the done.fail callback', function() {
    var failSpy = jasmine.createSpy('done');
    var modifiedTest = asyncTest(failTest);

    modifiedTest(failSpy);

    expect(failSpy.calls.count()).toBe(1);
  });
});
