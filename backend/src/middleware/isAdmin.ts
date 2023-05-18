import {Request, Response, NextFunction} from 'express';

const isAdmin = async(req:Request, res:Response, next:NextFunction)=>{

  // jwt 쿠키를 검사한다. 탈취에 주의한다.
  

}

export default isAdmin;