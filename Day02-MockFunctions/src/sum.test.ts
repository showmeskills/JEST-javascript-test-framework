


describe("mock function", () => {
    //using mock functions
    function forEach(items: Array<number>, callback: Function) {
        for (let index = 0; index < items.length; index++) {
            callback(items[index]);
        }
    }
    it("The mock function is called twice", () => {
        const mockCallback = jest.fn(x => 42 + x);
        forEach([0, 1], mockCallback);
        expect(mockCallback.mock.calls.length).toBe(2);
    })
    it("The first argument of the first call to the function was 0", () => {
        const mockCallback = jest.fn(x => 42 + x);
        forEach([0, 1], mockCallback);
        expect(mockCallback.mock.calls[0][0]).toBe(0);
    })
    it("The first argument of the second call to the function was 1", () => {
        const mockCallback = jest.fn(x => 42 + x);
        forEach([0, 1], mockCallback);
        expect(mockCallback.mock.calls[1][0]).toBe(1);
    })
    it("The return value of the first call to the function was 42", () => {
        const mockCallback = jest.fn(x => 42 + x);
        forEach([0, 1], mockCallback);
        expect(mockCallback.mock.results[0].value).toBe(42);
    })
})

// interface B {
//     name?: string;
// }
describe("mock property", () => {
    // const myMock = jest.fn();

    // const a = new myMock();
    // const b: B = { };
    // a.name = "a";
    // b.name = "b";
    // const bound = myMock.bind(b);
    // bound();

    // console.log(myMock.mock.instances);//[ mockConstructor { name: 'a' }, { name: 'b' } ]



    it("The function was called exactly once", () => {
        function forEach(items: Array<number>, callback: Function) {
            for (let index = 0; index < items.length; index++) {
                callback(items[index]);
            }
        }
        const someMockFunction = jest.fn(x => x);
        forEach([0], someMockFunction);
        expect(someMockFunction.mock.calls.length).toBe(1);
    })
    it(`The first arg of the first call to the function was 'first arg'
    The second arg of the first call to the function was 'second arg'
    `, () => {
        function forEach(items: Array<string>, callback: Function) {
            for (let index: number = 0; index < items.length; index++) {
                callback(items[index]);
            }
        }
        interface X {
            [x: number]: string;
        }
        const someMockFunction = jest.fn<any, X[]>(x => x);
        forEach(["first arg", "second arg"], someMockFunction)
        expect(someMockFunction.mock.calls[0][0]).toBe('first arg');
        //console.log(someMockFunction.mock.calls)// [ [ 'first arg' ], [ 'second arg' ] ]
        expect(someMockFunction.mock.calls[1][0]).toBe('second arg');
    })

    it("The return value of the first call to the function was 'return value'", () => {
        const forEach = (items: Array<string>, callback: Function) => {
            for (let index: number = 0; index < items.length; index++) {
                for (let index: number = 0; index < items.length; index++) {
                    callback(items[index]);
                }
            }
        }
        const someMockFunction = jest.fn(x => x);
        forEach(['return value'], someMockFunction)
        /*
            console.log(someMockFunction.mock)
              {
                calls: [ [ 'return value' ] ],
                instances: [ undefined ],
                invocationCallOrder: [ 14 ],
                results: [ { type: 'return', value: 'return value' } ]
            }
        */
        expect(someMockFunction.mock.results[0].value).toBe('return value');
    })
    it("This function was instantiated exactly twice", () => {
        const someMockFunction = jest.fn();
        const a = new someMockFunction();
        const b = { };
        const bound = someMockFunction.bind(b);
        bound();
        expect(someMockFunction.mock.instances.length).toBe(2);
    })
    it(" The object returned by the first instantiation of this function had a `name` property whose value was set to 'test'", () => {
        const someMockFunction = jest.fn();
        const firstInstance = {
            name: "test"
        };
        const bound = someMockFunction.bind(firstInstance);
        bound();
        console.log(someMockFunction.mock)
        expect(someMockFunction.mock.instances[0].name).toEqual('test');
    })
})

describe("mock return values", () => {
    it("should be 10 'x' true, true", () => {
        const myMock = jest.fn()
        //console.log(myMock());// undefined
        myMock
            .mockReturnValueOnce(10)
            .mockReturnValueOnce('x')
            .mockReturnValue(true);
        console.log(myMock(), myMock(), myMock(), myMock());//10 'x' true, true
    })
    it("Make the mock return `true` for the first call and `false` for the second call", () => {
        const filterTestFn = jest.fn();
        filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);
        const result = [11, 12].filter(num => filterTestFn(num));//return true;
        console.log(result);// > [11]   
        console.log(filterTestFn.mock.calls[0][0]); // 11
        console.log(filterTestFn.mock.calls[1][0]); // 12
    })
})



describe("mocking modules", () => {
    it("should use axios to fetch user", async () => {
        try {
            jest.mock("axios");
            const axios: any = await import("axios");
            const Users: any = await import("./users");
            const users = [{ name: 'Bob' }];
            const resp = { data: users };
            axios.get.mockResolvedValue(resp);
            // or you could use the following depending on your use case:
            // axios.get.mockImplementation(() => Promise.resolve(resp))
            return Users.all().then((data: any) => expect(data).toEqual(users));
        } catch (err) {
            return new Error("the new error");
        }

    })
})


describe("mock implementation", () => {
    it("should return true", () => {
        const myMockFn = jest.fn((cb: Function) => cb(null, true));

        myMockFn((err: any, val: any) => console.log(val));//true
    })
    it("mockImplementationOnce", () => {
        const myMockFn = jest
            .fn()
            .mockImplementationOnce(cb => cb(null, true))
            .mockImplementationOnce(cb => cb(null, false));

        myMockFn((err: any, val: any) => console.log(val));
        // > true
        myMockFn((err: any, val: any) => console.log(val));
        // > false
    })
})



const that = this;
describe("mockReturnThis", () => {
    it("should return this", () => {
        const myObj = {
            myMethod: jest.fn().mockReturnThis(),
        };

        // is the same as

        const otherObj = {
            myMethod: jest.fn(
                function () {
                    return that;
                }
            ),
        };
        // console.log(myObj);
        // console.log(otherObj);
    })
})


describe("mockName", () => {
    const myMockFn = jest
        .fn()
        .mockReturnValue('default')
        .mockImplementation(scalar => 42 + scalar)
        .mockName('add42');
})

describe("custom matchers", () => {

    it("The mock function was called at least once", () => {
        const myMockFn = jest.fn();
        myMockFn();
        expect(myMockFn).toHaveBeenCalled();
    })
    it("The mock function was called at least once with the specified args", () => {
        const myMockFn = jest.fn();
        const arg1 = "arg1";
        const arg2 = "arg2";
        myMockFn(arg1, arg2);
        expect(myMockFn).toHaveBeenCalledWith(arg1, arg2);
    })
    it("The last call to the mock function was called with the specified args", () => {
        const myMockFn = jest.fn();
        const arg1 = "arg1";
        const arg2 = "arg2";
        myMockFn(arg1, arg2);
        expect(myMockFn).toHaveBeenLastCalledWith(arg1, arg2);
    })
    it("All calls and the name of the mock is written as a snapshot", () => {
        const myMockFn = jest.fn();
        myMockFn();
        expect(myMockFn).toMatchSnapshot();
    })
})


describe("common matchers", () => {
    it("The mock function was called at least once",()=>{
        const mockFunc = jest.fn();
        mockFunc([]);
        expect(mockFunc.mock.calls.length).toBeGreaterThan(0);
    })
    
    it("The mock function was called at least once with the specified args",()=>{
        const mockFunc = jest.fn();
        const arg1 = "arg1";
        const arg2 = "arg2";
        mockFunc(arg1,arg2);
        expect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);
    })
   
    it("The last call to the mock function was called with the specified args",()=>{
        const mockFunc = jest.fn();
        const arg1 = "arg1";
        const arg2 = "arg2";
        mockFunc(arg1,arg2);
        expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([arg1,arg2]);
    })
    
    it("The first arg of the last call to the mock function was `42`,(note that there is no sugar helper for this specific of an assertion)",()=>{
        const mockFunc = jest.fn();
        mockFunc(42)
        expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);
    })

    it("A snapshot will check that a mock was invoked the same number of times,in the same order, with the same arguments. It will also assert on the name.",()=>{
        const mockFunc = jest.fn();
        const arg1 = "arg1";
        const arg2 = "arg2";
        mockFunc(arg1,arg2);
        mockFunc.mockName('a mock name')
        expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);
        expect(mockFunc.getMockName()).toBe('a mock name');
    })
})
