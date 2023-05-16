import {Request, Response, NextFunction} from 'express';
import { sequelize } from '../models';
import { ErrorClass } from '../types/ErrorClass';

const adminController = async (req:Request,res:Response,next:NextFunction)=> {
  if(req.cookies){console.log(req.cookies)} //쿠키값 검증 후 admin일 경우
  const { tableName } = req.body.tableName;
  const result = await sequelize.query(`SELECT * FROM ${tableName}`)
  if(!result) next(new ErrorClass(false, 'No table found', 400));
}

export default adminController;