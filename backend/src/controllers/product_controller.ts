import Product from "../models/product"
import {Response, Request, NextFunction} from 'express';

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
export const getProductDataByQuery = async (req:Request,res:Response,next:NextFunction) =>{
  try{
    const condition = req.query;
    res.send(condition)
  }
  catch(err){
    console.log(err)
    res.send(err)
  }
}