import {sum,sum2} from "./sum";

test('adds 1 + 2 to equals 3',()=>{
    expect(sum(1,2)).toBe(3);
})
test('adds 2 + 3 to equals 5',()=>{
    expect(sum2(2,3)).toBe(5);
})

