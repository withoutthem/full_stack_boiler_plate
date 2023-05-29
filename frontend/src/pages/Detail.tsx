import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
//module
import { addCartOne } from '../utils/to_cart';
import {BiWon} from 'react-icons/bi';
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
    <div className='detail_page'>
      <img src={product.imageuri} alt="" />
      <div className='detail_content'>
        <div className='detail_top'>
          <h1>{product.name}</h1>
          <p className='explan'>{product.description}</p>
        </div>
        <div className='detail_bot'>
          <p className='price'><BiWon></BiWon> <span>{product.price}</span></p>
          <div className='detail_btn_box'>
            <button className='plus' onClick={()=>{addToCart()}}>장바구니</button>
            <button className='delete' onClick={()=>{navigate(-1)}}>삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;