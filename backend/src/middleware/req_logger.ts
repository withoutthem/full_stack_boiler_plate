import { Request, Response, NextFunction } from "express"
import logger from '../utils/logger'
const reqLogger = (req:Request, res:Response, next:NextFunction)=>{
  logger(req, res, '', 'Req_Logger');
  next();
}

export default reqLogger;