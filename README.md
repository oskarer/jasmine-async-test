# jasmine-async-test
Simple helper function for writing asynchronous tests in Jasmine. Eliminate
calling the `done` callback in asynchronous tests by wrapping your test function
in `asyncTest`. Your test function must return a promise.

## Usage

**Functions that return promises:**

```js
import Promise from 'bluebird';
import asyncTest from 'jasmine-async-test';

describe('asynchronous testing', () => {
  it('runs async tests', asyncTest(() => {
    return new Promise(resolve => {
      expect(2 + 2).toEqual(4);
      setTimeout(resolve, 1000);
    });
  }));
});
```

**ES2016 async/await functions:**

```js
import asyncTest from 'jasmine-async-test';

describe('asynchronous testing', () => {
  it('works with async/await', asyncTest(async function() {
    const data = await fetchSomeData();
    expect(data).toBe(42);
  }));
});
```
