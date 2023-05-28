import {Request, Response, NextFunction} from 'express'
import User from '../models/user'
import Cart from '../models/cart'
import Product from '../models/product'
import Collection from '../models/collection'

export const onPayment = async (req:Request,res:Response,next:NextFunction)=>{
  try{
    const {userId, products} = req.body;
    const user = await User.findOne({where: {id:userId}});
    //user 찾기
    if(!user) return res.status(404).send({stat:false, message:'잘못된 사용자입니다.'});
    //calculate totalPrice
    let totalPrice = 0;
    const foundProducts = await Promise.all(products.map(async (productId:string) => {
      const product = await Product.findOne({ where: { id: productId } });
      if(product) {
        totalPrice += product.price;
      }
      return product;
    })); 
    //user 포인트 차감
    user.point -= totalPrice;
    await user.save();
    //user cart에서 삭제
    await Promise.all(foundProducts.map(async (product) => {
      if(product) {
        await Cart.destroy({ where: { userId, productId: product.id } });
      }
    }));
    //collection에 추가
    await Promise.all(foundProducts.map(async (product) => {
      if(product) {
        const existingCollection = await Collection.findOne({ where: { userId, productId: product.id } });
        if (existingCollection) {
          existingCollection.count += 1;
          await existingCollection.save();
        } else {
          await Collection.create({ userId, productId: product.id, count: 1 });
        }
      }
    }));
    res.status(200).send("Payment successful");
  }
  catch(err){
    next(err)
  }
}