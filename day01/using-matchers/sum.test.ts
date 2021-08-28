import { sum, sum2 } from "./sum";

test('adds 1 + 2 to equals 3', () => {
    expect(sum(1, 2)).toBe(3);
})
test('adds 2 + 3 to equals 5', () => {
    expect(sum2(2, 3)).toBe(5);
})

interface Data {
    [key: string]: number;
}

test("object assignment", () => {
    const data: Data = { one: 1 };
    data["two"] = 2;
    expect(data).toEqual({ one: 1, two: 2 });
})

test("Array assignment", () => {
    const array: number[] = [1];
    array.push(2);
    expect(array).toEqual([1, 2]);
})

test('adding positive numbers is not zero', () => {
    for (let a = 1; a < 10; a++) {
        for (let b = 1; b < 10; b++) {
            expect(a + b).not.toBe(0);
        }
    }
});

test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    //expect(value).toBe(0.3); This won't work because of rounding error
    expect(value).toBeCloseTo(0.3); // This works.
});


test('there is not I in team', () => {
    expect('team').not.toMatch(/i/g);
})


// const fetchData = (callback:Function) => {
//     setTimeout(()=>{
//         callback("peanut butter");
//     },100)
// }

// test('the data is peanut butter', done => {
//     function callback(data:string) {
//         expect(data).toBe('peanut butter');
//     }
//     fetchData(callback);
// });




const fetchDataPromise = ()=>{
    return new Promise<string>((resovle,reject)=>{
        resovle("peanut butter");
    })
}

test("promises",():Promise<any>=>{
    expect.assertions(1);
    return fetchDataPromise().then(data=>{
        expect(data).toBe('peanut butter');
    })
})

const fetchDataPromiseWithError = ()=>{
    return new Promise<string>((resovle,reject)=>{
      reject("error");
    })
}


test("promises error",():Promise<any>=>{
    expect.assertions(1);
    return fetchDataPromiseWithError().catch(e=>expect(e).toMatch("error"));
})


const fetchDataPromiseResovle = ():Promise<string>=>{
    return Promise.resolve("peanut")
}
test("promises resolve",():Promise<any>=>{
    expect.assertions(1);
    return fetchDataPromiseResovle().then(data=>expect(data).toBe("peanut"));
})

const fetchDataPromiseReject = ():Promise<string>=>{
    return Promise.reject("error");
}

test("promises reject",():Promise<any>=>{
    expect.assertions(1);
    return fetchDataPromiseReject().catch(e=>expect(e).toMatch("error"));
})

const fetchData1 = ()=>{
    return "peanut butter"
}

const fetchData2 = ()=> "error";

test('the data is peanut butter', async () => {
    const data = await fetchData1();
    expect(data).toBe('peanut butter');
  });
  
  test('the fetch fails with an error', async () => {
    expect.assertions(1);
    try {
        const data = await fetchData2();
        expect(data).toBe('peanut butter');
    } catch (e) {
      expect(e).toMatch('error');
    }
  });


