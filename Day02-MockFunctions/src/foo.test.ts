// test.js
jest.mock('./foo'); // this happens automatically with automocking
const foo = require('./foo');

// foo is a mock function
foo.mockImplementation(() => 42);
it("should be 42",()=>{
    foo();
  // > 42
})