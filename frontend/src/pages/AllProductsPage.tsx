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
    const key: string | null = query.get('key');
    const value: string | null = query.get('value');
    console.log(key)
    if (!key) {url = '/api/product/get_product'; setIsSearch(false); setNowSearchParams(null)}
    else {url = `/api/product/get_product_by_query?${key}=${value}`; setIsSearch(true); setNowSearchParams(value)}
    console.log(url)
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