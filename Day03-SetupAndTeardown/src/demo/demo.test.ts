
describe("repeating setup for many tests", () => {
    let cities: Array<string> = [];
    const initializeCityDatabase = () => {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                cities.push("Vienna");
                cities.push("San Juan");
                resolve(cities);
            },100)
        })
    };
    const clearCityDatabase = () => {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                cities = [];
                resolve(cities);
            },100)
        })
    };
    const isCity = (cityName: string) => cities.includes(cityName);
    beforeEach (() => {// it will run before every test;
        return initializeCityDatabase();
    });

    afterEach(() => {// it will run after every test;
        return clearCityDatabase();
    });

    it('city database has Vienna', () => {
        expect(isCity('Vienna')).toBeTruthy();
    });

    it('city database has San Juan', () => {
        expect(isCity('San Juan')).toBeTruthy();
    });
    
})

interface CityName{
    name:string;
}

describe("repeating setup for many tests", () => {
    let cities: Array<CityName> = [];
    const initializeCityDatabase = () => {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                cities.push({name:"Vienna"});
                cities.push({name:"San Juan"})
                resolve(cities);
            },100)
        })
    };
    const clearCityDatabase = () => {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                cities = [];
                resolve(cities);
            },100)
        })
    };
    const isCity = (cityName: string) => cities.map(city=>city.name).includes(cityName);
    beforeAll (() => {// it will run before every test;
        return initializeCityDatabase();
    });

    afterAll(() => {// it will run after every test;
        return clearCityDatabase();
    });

    it('city database has Vienna', () => {
        expect(isCity('Vienna')).toBeTruthy();
    });

    it('city database has San Juan', () => {
        expect(isCity('San Juan')).toBeTruthy();
    });
})