import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
//module
import { addCartOne } from '../utils/to_cart';
//type
import { ProductInterface } from '../types/product';
import { unknownError, open_ShouldLoginPopup } from '../utils/open_pop';

const Detail = ():React.ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeState:any = useSelector(state => state);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get('id');
  const [product, setProduct] = useState<ProductInterface|null>(null);

  const addToCart = ()=>{
    if(id){
      if(storeState.userInfo.id) return addCartOne(storeState.userInfo.id, id, dispatch, storeState.userCartFour.items.length);
      else return open_ShouldLoginPopup(dispatch)
    } 
    else{
      unknownError(dispatch);
      console.log('에러에요.')
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await axios.get(`/api/product/get_product_by_query?id=${id}`)
        console.log(result)
        if(!result) return unknownError(dispatch);
        setProduct(result.data[0]);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        unknownError(dispatch);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={product.imageuri} alt="" />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button onClick={()=>{navigate(-1)}}>X</button>
      <button onClick={()=>{addToCart()}}>장바구니에 담기</button>
    </div>
  );
};

export default Detail;