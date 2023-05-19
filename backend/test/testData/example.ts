const UserExample:Object[] = []

const rolesMap = ['admin', 'root', 'family', 'vip', 'gold']

for(let i =0; i <10; i++ ){
  UserExample.push({
    email : `test${i}@test.com`,
    nickname: `victor${i}`,
    password: `exPassword!${i}`,
    roles : rolesMap[Math.floor(Math.random()*5)],
    rank : `rankex${i}`,
  })
}


export { UserExample }