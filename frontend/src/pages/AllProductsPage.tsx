import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ProductInterface } from '../types/product';
import { unknownError } from '../utils/open_pop';
import Searcher from '../components/MainPage/Searcher';
import Card from '../components/Card';
import IsLoading from '../components/IsLoading';

const AllProductsPage = () => {
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState<ProductInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [nowSearchParams, setNowSearchParams] = useState<string|null>(null)
  const location = useLocation();

  const getAllProductList = async () => {
    const query = new URLSearchParams(location.search);
    let url: string;

    if(query.get('key')){ // ?key=검색키&value=검색값 (검색키가 검색값인 목록)
      const key: string | null = query.get('key');
      const value: string | null = query.get('value');
      url = `/api/product/get_product_by_query?${key}=${value}`; 
      setIsSearch(true); 
      setNowSearchParams(value)
    }
    else if(query.get('searchparams')){ // ?searchparams=검색키워드 (검색키워드가 포함된 목록)
      const searchparams:string|null = query.get('searchparams');
      url = `/api/product/get_product_search?searchparams=${searchparams}`
    }
    else{
      url = '/api/product/get_product'; //전체목록
      setIsSearch(false); 
      setNowSearchParams(null)
    }
    try {
      const result = await axios.get(url);
      if (!result) return unknownError(dispatch);
      setAllProducts(result.data);
      console.log(result.data);
    } catch (err) {
      console.error(err);
      unknownError(dispatch);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProductList();
  }, [location.search]); 

  return (
    <div className="all_products_page">
      <h3>전체상품</h3>
      {
        isSearch && <div className="is_search">검색결과 : {nowSearchParams}</div>
      }
      <div className="card_wrap">
        {isLoading ? (
          <IsLoading />
        ) : (
          allProducts.map((item: ProductInterface) => <Card {...item} key={item.imageuri} />)
        )}
      </div>
    </div>
  );
};

export default AllProductsPage;