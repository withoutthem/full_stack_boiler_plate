//libs
import { useState,useEffect } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import {BsCart3} from 'react-icons/bs';
import {BiWon} from 'react-icons/bi';
import {IoClose} from 'react-icons/io5';
import { useNavigate } from "react-router-dom";

// modules
import { open_ShouldLoginPopup, unknownError } from '../utils/open_pop';
import { deleteCartItems_reducer, lostPointByPayment } from "../store";
import { setInfoAll } from "../utils/set_info";
import { formatter } from "../utils/formatter";

//types
import { Cart } from "../types/cart";


const CartPage = ():React.ReactElement=>{
  const [cartItems, setCartItems] = useState<Cart[]|null>(null)
  const [cartState , setCartState] = useState<boolean>()
  const [allCheckButton, setAllCheckButton] = useState<boolean>(false)
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [sureToPay, setSureToPay]= useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeState = useSelector((state:any) => state);
  const getMyCartInfo = async ()=>{
    try{
      const result:any = await setInfoAll(dispatch)
      if(!result.userInfo.data.stat) return open_ShouldLoginPopup(dispatch)
      else{
        if(result.cartInfo.data.length === 0) return setCartState(false)
        setCartState(true);
        setCartItems(result.cartInfo.data.map((item:any) => {
          return {...item, isChecked : false}
        }))
      }
    }
    catch(err){
      open_ShouldLoginPopup(dispatch)
    }
  }

  const checkToggle = (id:string)=>{
    setCartItems(
      cartItems && cartItems?.map((item:Cart) =>
        item.id === id ? {...item, isChecked : !item.isChecked} : item
      )
    )
  }

  const goToDetailPage = (productId:string)=>{
    navigate(`/detail?id=${productId}`)
  }

  const allCheckToggleButton = () => {
    const currentCheckState = !allCheckButton;
    setAllCheckButton(currentCheckState);
    setCartItems(
      cartItems && cartItems?.map((item: Cart) =>
        ({...item, isChecked: currentCheckState})
      )
    );
  }

  const deleteCartOneFromCartPage = async (userId:string, productId:string)=>{
    try{
      const result = await axios.delete('/api/cart/delete_cart_info', {data:{userId, productId}});
      cartItems && setCartItems((state:any) =>{
        return state.filter((item:Cart) => item.productId !== productId)
      })
      setInfoAll(dispatch)
    }
    catch(err){
      alert(err)
    }
  }

  const onPayButton = async ()=>{
    try{
      const userId:string = storeState.userInfo.id;
      const products:string[] = cartItems?.filter((item) => item.isChecked).map((item) => item.productId) || [];
      const result = await axios.post('/api/payment/on_pay', {userId, products});
      console.log(result);
      if(result){
        dispatch(deleteCartItems_reducer({products}))
        setCartItems((prevItems) => prevItems?.filter((item) => !products.includes(item.productId)) || null);
        dispatch(lostPointByPayment(finalAmount))
      }
      alert('구매가 완료되었습니다.')
      window.location.reload(); // 새로고침 보장
    }
    catch(err){
      alert(err)
    }
  }

  useEffect(()=>{
    getMyCartInfo();
  },[])
    
  useEffect(() => {
    if (cartItems?.every((item: Cart) => item.isChecked)) {
      setAllCheckButton(true);
    } else {
      setAllCheckButton(false);
    }

    setFinalAmount(
      cartItems 
        ? cartItems
            .filter((item) => item.isChecked)
            .reduce((total, item) => total + item.Product.price, 0) 
        : 0
    )
  }, [cartItems]);
  

  return (
    <div className="cart_page">
      <h3><BsCart3></BsCart3>장바구니</h3>
      {
        cartState ?       
      <section className="table_wrap">  
        <div className="thead">
          <div className="row">
            <div className="cell"> <input type="checkbox" onChange={allCheckToggleButton} checked={allCheckButton} /> 전체선택</div>
            <div className="cell">상품정보</div>
            <div className="cell">상품금액</div>
          </div>
        </div>
        <div className="tbody">
        {
          cartItems && cartItems.map((item:any) =>{
            return (
              <div className="row" key={item.id}>
                <div className="cell check_cell"> <input type="checkbox" checked={item.isChecked} onChange={()=>{checkToggle(item.id)}} /></div>
                <div className="cell info_cell">
                  <img className="cart_item_img" onClick={()=>{goToDetailPage(item.productId)}} src={item.Product.imageuri} alt="" /> 
                  <div className="cart_box">
                    <div className="name_title">{item.Product.name}</div>
                    <p className="description" onClick={()=>{goToDetailPage(item.productId)}}>{item.Product.shortDescription}</p>
                  </div>
                  </div>
                <div className="cell price_cell">
                  <div className="price">
                    <BiWon></BiWon><span className="value">{formatter(item.Product.price)}</span>
                  </div>
                  <button className="delete_button" onClick={()=>{deleteCartOneFromCartPage(item.userId, item.productId)}}><IoClose></IoClose></button>
                </div>
              </div>
            )
          })
        }
        </div>
      </section> :
        <div className="nothing_in_here">
          장바구니에 아무것도 없어요.
        </div>
      }

      {cartState ? 
      <>
      <div className="inspect_wrap">
        <div className="my_point"> <span>내 포인트:</span> {formatter(storeState.userInfo.point)} p </div>
        -
        <div className="final_payment"><span>총 금액 :</span> {formatter(finalAmount)} p</div>
        =
        <div className="remain"><span>결제 후 잔액 :</span> {formatter(storeState.userInfo.point - finalAmount)} p</div>
      </div>
      <div className="final_button_wrap">
        <button onClick={()=>{navigate('/all_products')}}>계속 쇼핑하기</button>
        <button onClick={()=>{setSureToPay(true)}} disabled={(finalAmount ===0 || storeState.userInfo.point - finalAmount<0)}>구매하기</button>
      </div>
      {(storeState.userInfo.point - finalAmount<0) ? <div className="no_point">포인트가 부족해요</div> : null}
      </>
      : null
      }
      {
        sureToPay ? 
        <div className="pay_pop_wrap">
          <div className="sure_to_pay_pop">
            <img src="/images/icon_ok.png" alt="are you sure to pay?" />
            <div className="are_you_sure">정말 구매 하시겠어요?</div>
            <div className="button_wrap">
              <button className="close_btn" onClick={()=>{setSureToPay(false)}} >아니요<br></br>생각해볼래요.</button>
              <button className="on_pay_button" onClick={()=>{onPayButton()}}>구매하기</button>
            </div>
          </div>
        </div> : null 
      }
    </div>
  )
}

export default CartPage;