import { ProductInterface } from "../types/product";

const Card = ({id, imageuri, name, brand, shortDescription, description, furnitureType, theme, price, likes}:ProductInterface):React.ReactElement=>{

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
      <button>장바구니에 담기</button>
    </div>
  )
}

export default Card;