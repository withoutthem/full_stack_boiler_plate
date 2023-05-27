import { useState,useEffect } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { open_ShouldLoginPopup, unknownError } from '../utils/open_pop';
import { deleteUserInfo_reducer } from "../store";

const CartPage = ():React.ReactElement=>{

  const [cartState , setCartState] = useState<[]|null>()
  const storeState:any = useSelector(state => state);
  const dispatch = useDispatch();
  const getMyCartInfo = async ()=>{
    try{
      const {id} = storeState.userInfo;
      if(!id) {
        open_ShouldLoginPopup(dispatch)
        dispatch(deleteUserInfo_reducer())
        return
      }      
      const result = await axios.post('/api/cart/get_cart_info', {id});
      if(!result || result.data.length===0) return setCartState(null);
      console.log(result.data);
      setCartState(result.data)
    }
    catch(err){
      unknownError(dispatch);
    }
  }

  useEffect(()=>{
    getMyCartInfo();
  },[])

  return (
    <div className="cart_page">
      <h3>장바구니</h3>
      <section className="table_wrap">  
          <div className="thead">
            <div className="row">
              <div className="cell"> <input type="checkbox" /> 전체선택</div>
              <div className="cell">상품정보</div>
              <div className="cell">수량</div>
              <div className="cell">상품금액</div>
            </div>
          </div>
          <div className="tbody">
            <div className="row">
            </div>
          </div>
      </section>
      
    </div>
  )
}

export default CartPage;