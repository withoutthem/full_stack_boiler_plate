export const dbToUser = (value:any)=>{
  const returnValue = {
    id: value.id,
    email : value.email,
    nickname : value.nickname,
    roles : value.roles
  }
  return returnValue;
}