//libs
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
//modules
import { ProductInterface } from '../types/product';
import { unknownError } from '../utils/open_pop';

//components
import Searcher from '../components/MainPage/Searcher';
import Card from '../components/Card';
import IsLoading from '../components/IsLoading';

const AllProductsPage = ()=>{
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState<ProductInterface[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    finally {
      setIsLoading(false);
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
        isLoading ? <IsLoading/> : 
        allProducts.map((item:any) =>{
          return (
            allProducts.map(item => {
              return (
                <Card {...item} key={item.imageuri}></Card>
              )
            })
          )
        })
      }
    </div>
  )
}

export default AllProductsPage;