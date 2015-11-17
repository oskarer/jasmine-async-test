module.exports = function asyncTest(testFunction) {
  return function(done) {
    return testFunction.call(this).then(done);
  };
};
