//libs
import passport from 'passport';
import bcrypt from 'bcrypt';
import {Response, Request, NextFunction} from 'express';
//models
import User from '../models/user';
import Cart from '../models/cart';
//modules
import { idLogger } from '../utils/logger';
import { generalValidator } from '../utils/validator';
import { dbToUser } from '../utils/db_to_user';
import { ErrorClass } from '../types/ErrorClass';
//utils
import { emailValidator, nicknameValidator } from '../utils/validator';


//NOTE:TEST:OK
//TODO:POSTMAN
//SIGNUP CONTROLLER
export const signUpController = async (req:Request, res:Response, next:NextFunction)=>{
  try{
    const {email, password, nickname} = req.body;
    const isValid = generalValidator(email, password, nickname);
    if(isValid instanceof ErrorClass) throw isValid;
    const [existingUserByEmail, existingUserByNickname] = await Promise.all([
      User.findOne({where:{email}}),
      User.findOne({where:{nickname}})
    ]);
    if (existingUserByEmail) 
      return res.status(400).json({ stat: false, message: `${email} 은 이미 있는 이메일이에요.`, status:400 });
    if (existingUserByNickname) 
      return res.status(400).json({ stat: false, message: `${nickname} 은 이미 있는 닉네임이에요.`, status:400 });
    const bcryptedPS = await bcrypt.hash(password, 12);
    const result = await User.create({ email, password:bcryptedPS, nickname });
    if(!result) throw new ErrorClass(false, '회원 등록 중 오류가 발생했어요.', 500)
    idLogger(req, res, result.id, 'signUpController', result.email)
    req.login(result, (err) => {
      if(err) throw new ErrorClass(false, '세션 생성 중 오류가 발생했어요.', 500);
      res.status(201).send({stat:true, message:'회원가입에 성공했어요.', data:dbToUser(result), status:201})
    });
  }
  catch(err){
    console.error('signUpController Error:', err);
    next(err)
  }
}

//NOTE:TEST:OK
//TODO:POSTMAN
//LOGIN CONTROLLER
export const loginController = async(req:Request, res:Response, next:NextFunction)=>{
  try{
    passport.authenticate('local', (authError:Error|ErrorClass|null, user:User|false, info:any)=>{ //local_strategy.ts 호출
      if(authError) return next(authError); // authError : done함수의 1번째 파라미터
      if(!user) return next(new ErrorClass(false, info.message, 404));
      return req.login(user, (loginError)=>{ // index의 serializeUser 호출
        if(loginError) return next(loginError); //loginError : 세션 저장 중 에러
        idLogger(req, res, user.id, 'loginController', user.email)
        res.send({stat:true, message: '로그인에 성공했어요', data:dbToUser(user), status:200})
      })
    })(req,res,next);
  }
  catch(err){
    next(err);
  }
} 

//NOTE:TEST:OK
//TODO:POSTMAN
//GETMYINFO 
export const getMyInfo = (req:any, res:Response, next:NextFunction):void=>{
  try{
    if(req.user) {
      const { email, id, nickname, rank, roles, point } = req.user;
      const nowUser = { email, id, nickname, rank, roles, point };
      res.send({stat:true, message:'사용자 인증이 완료되었어요.', status : 200, data: nowUser})
    }
    else {throw new ErrorClass(false, '세션정보가 없거나 만료되었어요.', 401)}
  }
  catch(err){
    next(err)
  }
}

//NOTE:TEST:OK
//TODO:POSTMAN
//LOGOUT CONTROLLER
export const logoutController = async (req:any, res:Response, next:NextFunction)=>{
  try{
    req.logout(() => {
      res.status(200).send({stat:true, message:'로그아웃 되었어요', status:200});
    });
  }
  catch(err){
    next(err)
  }
}

//NOTE:TEST:OK
//TODO:POSTMAN
export const validateUniqueUserAttributes = async (req:Request,res:Response,next:NextFunction) =>{
  try{
    const {type, value}:{type:string, value:string} = req.body;
    let isValid:boolean;
    if(type==='email') isValid = emailValidator(value)
    else if(type==='nickname') isValid = nicknameValidator(value)
    else throw new ErrorClass(false, '타입이 이상해요', 400)
    if(isValid){
      const result = await User.findOne({where : {[type] : value}, paranoid: false});
      if(result)res.status(409).send({stat:false, message: `이미 있는 ${type} 이에요`, status:409})
      else res.status(200).send({stat:true, message: `사용 가능한 ${type} 이에요`, status:200})
    }
    else throw new ErrorClass(false, `유효하지 않은 ${type} 이에요`, 400)
  }
  catch(err){
    next(err)
  }
}

