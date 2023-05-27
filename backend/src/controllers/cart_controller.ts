import {Request, Response, NextFunction} from 'express';
import { ErrorClass } from '../types/ErrorClass';
import Cart from '../models/cart';
import Product from '../models/product';

//GET CART INFO BY ID
export const getCartInfo = async(req:Request,res:Response,next:NextFunction) =>{
  const {id} = req.body
  try{
    const result = await Cart.findAll({where : {userId : id}})
    if(!result) throw new ErrorClass(false, '장바구니 데이터가 없어요.', 404)
    res.send(result);
  }
  catch(err){
    next(err)
  }
}

// POST CART ONLY FOUR ITEMS BY ID
export const getCartInfoOnlyFourWithImage = async(req:Request, res:Response, next:NextFunction) =>{
  const {id} = req.body;
  try{
    const result = await Cart.findAll({
      where: {userId : id},
      limit: 4,
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Product,
          attributes: ['imageuri', 'name']
        }
      ]
    });
    if(!result) throw new ErrorClass(false, '장바구니 데이터가 없어요.', 404);
    res.send(result);
  }
  catch(err){
    next(err);
  }
}

//POST CART INFO BY ID
export const postCartInfo = async (req:Request, res:Response, next:NextFunction) =>{
  const {userId , productId} = req.body
  try{
    const dupCheck = await Cart.findOne({where : {userId: userId, productId : productId}});
    if(dupCheck) return res.send({stat:false, message:'이미 있는 상품이에요', status:409})
    const result = await Cart.create({userId : userId, productId : productId})
    if(!result) throw new ErrorClass(false, '생성이 제대로 되지 않았어요.', 500);
    res.status(201).send({stat:true, message: '생성에 성공했어요.', status:201});
  }
  catch(err){
    next(err)
  }
}


export const deleteCartInfo = async (req:Request, res:Response, next:NextFunction) =>{
  const {userId, productId} = req.body;
  try{
    const result = await Cart.destroy({where :{userId : userId, productId : productId}});
    if(!result) throw new ErrorClass(false, '삭제가 제대로 되지 않았어요. 서버문제인가봐요.', 500)
    res.send({stat:true, data:result, message:'삭제에 성공했어요.', status:200})
  }
  catch(err){
    next(err)
  }
}