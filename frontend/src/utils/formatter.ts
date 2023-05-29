export const formatter = (amount:number)=>{
  const format = new Intl.NumberFormat('en-US');
  return format.format(amount);
}