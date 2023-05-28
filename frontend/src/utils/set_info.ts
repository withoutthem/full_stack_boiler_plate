import axios from 'axios';
import { setUserInfo_reducer, setCart_reducer, setCartFour_reducer, deleteUserInfo_reducer, clearCart_reducer,clearAllFour_reducer } from '../store';

export const setInfoAll = async (dispatch:Function)=>{
  try{
    const userInfo = await axios.get('/api/auth/get_my_info');
    const cartInfo = await axios.post('api/cart/get_cart_info', {id : userInfo.data.data.id})
    const cartOnlyFourItems = await axios.post('/api/cart/get_cart_four', {id : userInfo.data.data.id});
    dispatch(setUserInfo_reducer(userInfo.data.data))
    dispatch(setCart_reducer({user : userInfo.data.data.id, productId : cartInfo.data}));
    dispatch(setCartFour_reducer(cartOnlyFourItems.data))
    return {userInfo, cartInfo}
  }
  catch(err){
    return false
  }
}

export const clearAllInfo = (dispatch:Function)=>{
  dispatch(clearAllFour_reducer())
  dispatch(clearCart_reducer())
  dispatch(deleteUserInfo_reducer())
}