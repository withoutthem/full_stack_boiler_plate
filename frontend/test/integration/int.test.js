
let equalTest;

beforeEach(()=>{
  equalTest = 'integration'  
})
it('should be called by npm run test:int', ()=>{
  expect('integration').toStrictEqual(equalTest)
})