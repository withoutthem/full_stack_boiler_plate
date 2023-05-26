import axios from 'axios';

export const setInfo = async ()=>{
  try{
    const userInfo = await axios.get('/api/auth/get_my_info');
    const cartInfo = await axios.post('api/cart/get_cart_info', {id : userInfo.data.id})
    console.log(userInfo.data)
    console.log(cartInfo.data)
  }
  catch(err){
    console.log(err)
  }
}
