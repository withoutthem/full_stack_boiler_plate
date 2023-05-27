import { useState } from "react";
import axios from 'axios';

const CartPage = ():React.ReactElement=>{

  const [cartState , setCartState] = useState<[]|null>()

  return (
    <div className="cart_page">
      <h3>장바구니</h3>
      <section className="table_wrap">  
          <div className="thead">
            <div className="row">
              <div className="cell">전체선택</div>
              <div className="cell">상품정보</div>
              <div className="cell">상품정보</div>
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