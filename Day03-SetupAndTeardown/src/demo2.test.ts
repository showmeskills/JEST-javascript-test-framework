// import {getChangedFilesForRoots} from "jest-changed-files";

// it('test ---', async () => {
//     // print the set of modified files since last commit in the current repo
//     await getChangedFilesForRoots(['./demo'], {
//         lastCommit: true,
//     }).then((result: { changedFiles: any; }) => console.log(result.changedFiles));
// })


// import { diff } from "jest-diff";

// it("test dffi btw a and b", () => {
//     const a = { a: { b: { c: 5 } } };
//     const b = { a: { b: { c: 6 } } };

//     const result = diff(a, b);
//     console.log(result);
// })
// import {parseWithComments} from "jest-docblock";

// it("test jest-doc-block", () => {
//     const code = `
//     /**
//      * This is a sample
//      *
//      * @flow
//      */

//     console.log('Hello World!');
//     `;

//     const parsed = parseWithComments(code);

//     // prints an object with two attributes: comments and pragmas.
//     console.log(parsed);
// })

// import { getType } from "jest-get-type";

// it("test jest-get-type", () => {
//     const array = [1, 2, 3];
//     const nullValue = null;
//     const undefinedValue = undefined;

//     // prints 'array'
//     console.log(getType(array));
//     // prints 'null'
//     console.log(getType(nullValue));
//     // prints 'undefined'
//     console.log(getType(undefinedValue));
// })

// import {validate} from "jest-validate";

// it("test jest-validate", () => {
//     const configByUser = {
//         transform: '<rootDir>/node_modules/my-custom-transform',
//       };     
//       const result = validate(configByUser, {
//         comment: '  Documentation: http://custom-docs.com',
//         exampleConfig: {transform: '<rootDir>/node_modules/babel-jest'},
//       }); 
//       console.log(result);
// })

// import {Worker} from "jest-worker"; 

// it("test jest-worker",()=>{
//     // main.js

// async function main() {
//     const worker:any = new Worker(require.resolve('./heavy-task.ts'));

//     // run 2 tasks in parallel with different arguments
//     const results = await Promise.all([
//       worker.myHeavyTask({foo: 'bar'}),
//       worker.myHeavyTask({bar: 'foo'}),
//     ]);

//     console.log(results);
//   }

//   main();
// })


import prettyFormat from "pretty-format";
it("test pretty-format", () => {
    const val:any = { object: {} };
    val.circularReference = val;
    val[Symbol('foo')] = 'foo';
    val.map = new Map([['prop', 'value']]);
    val.array = [-0, Infinity, NaN];

    console.log(prettyFormat(val));
})