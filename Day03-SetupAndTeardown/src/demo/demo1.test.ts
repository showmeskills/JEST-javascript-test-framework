
interface CityName{
    name:string;
}
interface Food{
    name:string;
}

let cities:Array<CityName> = [];
let foods:Array<Food> = [];
const initializeCityDatabase = ()=>{
    cities.push({name:"Vienna"});
    cities.push({name:"San Juan"});
}
const clearCityDatabase = ()=>cities = [];
const isCity=(cityName:string)=>cities.map(city=>city.name).includes(cityName);

beforeEach(()=>{
    initializeCityDatabase()
});
afterEach(()=>{
    clearCityDatabase();
})

it('city database has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy();
});
  
it('city database has San Juan', () => {
    expect(isCity('San Juan')).toBeTruthy();
});

const initializeFoodDatabase = ()=>{
    foods.push({name:'Wiener Schnitzel'});
    foods.push({name:'Mofongo'});
}
const isValidCityFoodPair = (name:string,foodName:string)=>{
    const city = cities.map(city => city.name).includes(name);
    const food = foods.map(food=>food.name).includes(foodName);
    
    return city === food;
}
describe('matching cities to foods', () => {
    // Applies only to tests in this describe block
    beforeEach(() => {
      return initializeFoodDatabase();
    });
  
    test('Vienna <3 veal', () => {
      expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
    });
  
    test('San Juan <3 plantains', () => {
      expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
    });
  });



  