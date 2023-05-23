import {Request, Response, NextFunction} from 'express'
import { generalValidator } from '../utils/validator'
import { ErrorClass } from '../types/ErrorClass';

export const generalValidatorMiddleWare = (req:Request, res:Response, next:NextFunction)=>{
  const {email , password} = req.body;
  if(!email || !password){
    next(new ErrorClass(false, '이메일 혹은 비밀번호가 없습니다', 400))
    return
  } 
  try{
    console.log(email, password);
    if(generalValidator(email, password)) next();
  }
  catch(err){
    next(err)
  }
}