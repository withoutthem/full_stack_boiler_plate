import axios from 'axios';
import { addCartFour_reducer, addCart_reducer, deleteCart_reducer } from '../store';
import { addCartPopup, addCartPopup_duplicated, unknownError } from './open_pop';

export const addCartOne = async (userId:string, productId:string, dispatch:Function, count:number)=>{
  try{
    const result = await axios.post('/api/cart/post_cart_info' ,{userId, productId})
    if(!result.data.stat && result.data.status === 409) return addCartPopup_duplicated(dispatch)
    if(!result) throw new Error('알 수 없는 에러에요.')
    dispatch(addCart_reducer({productId}));
    if(count <4 ){
      const result_add = await axios.get(`/api/product/get_product_by_query?id=${productId}`)
      dispatch(addCartFour_reducer({userId:userId ,Product:result_add.data[0]}))
    }
    addCartPopup(dispatch)
  }
  catch(err){
    unknownError(dispatch);
    console.error(err);
    return false;
  }
}
