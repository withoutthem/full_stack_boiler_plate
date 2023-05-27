import { useDispatch, useSelector } from "react-redux";

//utils
import { addCartOne } from "../utils/to_cart";
import { ProductInterface } from "../types/product";
import { open_ShouldLoginPopup } from '../utils/open_pop';

const Card = ({id, imageuri, name, brand, shortDescription, description, furnitureType, theme, price, likes}:ProductInterface):React.ReactElement=>{

  const storeState:any = useSelector(state => state)
  const dispatch = useDispatch();

  const addToCart = ()=>{
    if(storeState.userInfo.id) return addCartOne(storeState.userInfo.id, id, dispatch);
    else return open_ShouldLoginPopup(dispatch)
  }

  return (
    <div className="card">
      <img src={imageuri} alt="" />
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