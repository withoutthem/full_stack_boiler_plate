import {Request, Response, NextFunction} from 'express';
import {ErrorClass} from '../types/ErrorClass';

export const isLoggedIn = (req:Request, res:Response, next:NextFunction)=>{
  if(req.isAuthenticated()){ //passport를 통해서 로그인 했는지 확인
    next()
  }
  else{
    res.status(403).send('로그인 필요')
  }
}


export const isNotLoggedIn = (req:Request, res:Response, next:NextFunction)=>{
  if(!req.isAuthenticated()){
    next()
  }
  else{
    const error = new ErrorClass(false, '이미 로그인한 상태입니다', 400)
    next(error)
  }
}