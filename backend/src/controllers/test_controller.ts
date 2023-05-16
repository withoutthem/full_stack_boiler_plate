import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import Post from '../models/post';


export const testController = async (req:Request,res:Response,next:NextFunction):Promise<void> =>{
  try{
    const {tableName} = req.body;
    
  }
  catch(err :any){
    res.status(555).send(err.message)     
  }
}

