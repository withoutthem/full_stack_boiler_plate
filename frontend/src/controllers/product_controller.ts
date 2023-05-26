import axios from 'axios';
import { ProductInterface } from '../types/product';

export const getPopularProducts = async():Promise<ProductInterface[]|null>=>{
  try{
    const result = await axios.get(`/api/product/get_product_by_likes`)
    if(!result){
      throw new Error('클라이언트 오류가 발생했습니다.')
    } 
    return result.data
  }
  catch(err:any){
    console.error(err);
    alert(err.message);
    return null
  }
}