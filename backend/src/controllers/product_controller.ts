import Product from "../models/product"
import {Response, Request, NextFunction} from 'express';
import { ErrorClass } from "../types/ErrorClass";
import { Op } from "sequelize";

//TODO:TEST
export const getProductData = async (req:Request,res:Response,next:NextFunction)=>{
  try{
    const result = await Product.findAll({});
    if(!result) throw new ErrorClass(false, '아무것도 없어요. 서버에러일거에요.', 500)
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

// description 
// name
// furnitureType

//TODO:TEST
export const getProductBySearch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchparams = req.query.searchparams;
    const result = await Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${searchparams}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${searchparams}%`,
            },
          },
          {
            shortDescription: {
              [Op.like]: `%${searchparams}%`,
            },
          },
          {
            furnitureType: {
              [Op.like]: `%${searchparams}%`,
            },
          },
        ],
      },
    });
    if(!result) res.status(404).send({stat:false, message:'검색된 상품도 없어요.', status:404})
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};