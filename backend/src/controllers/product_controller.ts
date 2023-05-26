import Product from "../models/product"
import {Response, Request, NextFunction} from 'express';
import { ErrorClass } from "../types/ErrorClass";

//TODO:TEST
export const getProductData = async (req:Request,res:Response,next:NextFunction)=>{
  try{
    // if(req.params.)
    const result = await Product.findAll({order : [['furnitureType','desc']]});
    res.send(result);
  }
  catch(err){
    next(err);
  }
}

//TODO:TEST
export const getProductDataByQuery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const condition = req.query;
    const result = await Product.findAll({ where: condition });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const getProductDataByLikes = async (req:Request, res:Response, next:NextFunction)=>{
  try{
    const result = await Product.findAll({
      order: [['likes', 'DESC']], // 'likes' 속성을 기준으로 내림차순 정렬
      limit: 10 // 결과를 최대 10개로 제한
    });
    if(!result) throw new ErrorClass(false, '불러오기 오류입니다', 500)
    res.send(result);
  }
  catch(err){
    next(err)
  }
}