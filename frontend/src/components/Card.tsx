import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//utils
import { addCartOne } from "../utils/to_cart";
import { ProductInterface } from "../types/product";
import { open_ShouldLoginPopup } from '../utils/open_pop';

const Card = ({id, imageuri, name, brand, shortDescription, description, furnitureType, theme, price, likes}:ProductInterface):React.ReactElement=>{

  const storeState:any = useSelector(state => state)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = ()=>{
    if(storeState.userInfo.id) return addCartOne(storeState.userInfo.id, id, dispatch, storeState.userCartFour.items.length);
    else return open_ShouldLoginPopup(dispatch)
  }

  const goToDetailPage = (productId:string)=>{
    navigate(`/detail?id=${productId}`)
  }

  return (
    <div className="card">
      <img src={imageuri} onClick={()=>{goToDetailPage(id)}} alt="" />
      <h3>{name}</h3>
      <div className="spec_wrap">
        <p className="brand">Brand : {brand}</p>
        <p className="short">{shortDescription}</p>
        <p className="type">Type : {furnitureType}</p>
        <p className="theme">Theme : {theme}</p>
        <div className="price">{price} Won</div>
        <div className="likes">Likes : {likes}</div>
      </div>
      <button onClick={()=>{addToCart()}}>장바구니에 담기</button>
    </div>
  )
}

export default Card;