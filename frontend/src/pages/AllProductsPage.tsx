//libs
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
//modules
import { ProductInterface } from '../types/product';
import { unknownError } from '../utils/open_pop';

//components
import Searcher from '../components/MainPage/Searcher';

const AllProductsPage = ()=>{
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState<ProductInterface[]>([])

  const getAllProductList = async ()=>{
    try{
      const result = await axios.get('/api/product/get_product');
      if(!result) return unknownError(dispatch);
      setAllProducts(result.data);
      console.log(result.data)
    }
    catch(err){
      console.error(err);
      unknownError(dispatch)
    }
  }

  useEffect(()=>{
    getAllProductList()
  },[])

  return (
    <div className="all_products_page">
      <h3>전체상품</h3>
      <Searcher></Searcher>
      {
        allProducts.map((item:any) =>{
          return (
            <div className="test"></div>
          )
        })
      }
    </div>
  )
}

export default AllProductsPage;