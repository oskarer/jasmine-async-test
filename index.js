module.exports = function asyncTest(testFunction) {
  return function(done) {
    console.log(testFunction);
    return testFunction.call(this)
      .then(function() {
        console.log('DONE', done)
        done();
      })
      .catch(function(error) {
        console.log('asdasdasdasdsad');
        done.fail(error.message);
      });
  };
};
