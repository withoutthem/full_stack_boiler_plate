import { Request, Response, NextFunction } from "express";

export const getAddDummyData = async (req:Request, res:Response, next:NextFunction)=>{
  try{
    
    res.status(200).json({message:'success'})
  }
  catch(err){

  }
}