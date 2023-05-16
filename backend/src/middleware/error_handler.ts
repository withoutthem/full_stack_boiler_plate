import {Response, Request, NextFunction} from 'express'
import {ErrorClass} from '../types/ErrorClass';
import logger from '../utils/logger';

const errorHandler = (error:ErrorClass, req:Request, res:Response, next:NextFunction):void=>{
  if(process.env.NODE_ENV === 'production') (error.message = '');
  logger(req, res, error.message, 'Error_Handler')
  res.status(error.status ?? 500).send(error.message ?? '알 수 없는 에러입니다.')
}

export default errorHandler;