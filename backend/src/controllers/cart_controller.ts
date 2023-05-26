import {Request, Response, NextFunction} from 'express';
import { ErrorClass } from '../types/ErrorClass';
import Cart from '../models/cart';

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

export const postCartInfo = async (req:Request, res:Response, next:NextFunction) =>{
  const {userId , productId} = req.body
  try{
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
    const result = await Cart.drop({})
  }
  catch(err){

  }
}