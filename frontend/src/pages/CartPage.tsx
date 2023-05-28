//libs
import { useState,useEffect } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
// modules
import { open_ShouldLoginPopup, unknownError } from '../utils/open_pop';
import { deleteUserInfo_reducer, deleteCart_reducer, deleteCartItems_reducer, lostPointByPayment } from "../store";
import { setInfoAll } from "../utils/set_info";
//types
import { Cart } from "../types/cart";


const CartPage = ():React.ReactElement=>{
  const [cartItems, setCartItems] = useState<Cart[]|null>(null)
  const [cartState , setCartState] = useState<boolean>()
  const [allCheckButton, setAllCheckButton] = useState<boolean>(false)
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [sureToPay, setSureToPay]= useState<boolean>(false);

  const dispatch = useDispatch();
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
      console.log(result);
      if(result){
        dispatch(deleteCart_reducer({productId}))
        cartItems && setCartItems((state:any) =>{
          return state.filter((item:Cart) => item.productId !== productId)
        })
      }
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
      <h3>장바구니</h3>
      <button onClick={()=>{console.log(cartState)}}>CHECK CARTSTATE</button>
      <button onClick={()=>{console.log(cartItems)}}>CHECK CARTITEMS</button>
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
                <div className="cell"> <input type="checkbox" checked={item.isChecked} onChange={()=>{checkToggle(item.id)}} /> 선택</div>
                <div className="cell">
                  <img className="cart_item_img" src={item.Product.imageuri} alt="" /> 
                  <div className="cart_box">
                    <div className="name_title">{item.Product.name}</div>
                    <p className="description">{item.Product.shortDescription}</p>
                  </div>
                  </div>
                <div className="cell">
                  <div className="price">
                    {item.Product.price} Won
                  </div>
                  <button className="delete_button" onClick={()=>{deleteCartOneFromCartPage(item.userId, item.productId)}}>DELETE</button>
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
        <div className="my_point">
          내 포인트 : {storeState.userInfo.point}
        </div>
        <div className="final_payment">총 금액 : {finalAmount}</div>
        <div className="remain">결제 후 잔액 : {storeState.userInfo.point - finalAmount}</div>
        {(storeState.userInfo.point - finalAmount<0) ? <div className="no_point">포인트가 부족해요</div> : null}
      </div>
      <button onClick={()=>{setSureToPay(true)}} disabled={(finalAmount ===0 || storeState.userInfo.point - finalAmount<0)}>구매하기</button>
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