
import {Request, Response, NextFunction} from 'express';
import Collection from '../models/collection';

export const getMyCollection = async (req:any, res:Response, next:NextFunction)=>{
  try{
    if(!req.user) return res.status(400).send({stat:false, message: '로그인 하세요!', status:400})
    const { id } = req.user;
    const result = await Collection.findAll({where : {userId : id},include:['Product']});
    if(!result) return res.status(404).send({stat:false, message:'구매 내역이 없습니다.', status:404})
    res.send(result);
  }
  catch(err){
    next(err)
  }
}