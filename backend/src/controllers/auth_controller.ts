//libs
import passport from 'passport';
import bcrypt from 'bcrypt';

//models
import User from '../models/user';
import {Response, Request, NextFunction} from 'express';
import { ErrorClass } from '../types/ErrorClass';

//modules
import { idLogger } from '../utils/logger';
import { generalValidator } from '../utils/validator';
import { dbToUser } from '../utils/db_to_user';




//SIGNUP CONTROLLER
export const signUpController = async (req:Request, res:Response, next:NextFunction)=>{
  try{
    generalValidator(req.body.email, req.body.password, req.body.nickname) //general vailidator 
    if(await User.findOne({where : {email:req.body.email}})) throw new ErrorClass(false, '이미 가입되어있는 이메일이에요.', 400) // duplicated check - email
    if(await User.findOne({where : {nickname:req.body.nickname}})) throw new ErrorClass(false, '이미 사용중인 닉네임이에요', 400) // duplicated check - nickname
    const bcryptedPS = await bcrypt.hash(req.body.password, 12); 
    const result = await User.create({ 
      email : req.body.email,
      password : bcryptedPS,
      nickname : req.body.nickname
    });
    if(result) {
      idLogger(req, res, result.id, 'signUpController', result.email)
      res.send({stat:true, message:'회원가입에 성공했어요', data:result, status:201})
    }
    else throw new ErrorClass(false, '회원 등록 중 오류가 발생했어요. : '+ result, 500)
  }
  catch(err){
    next(err)
  }
}

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

//GETMYINFO 
export const getMyInfo = (req:any, res:Response, next:NextFunction):void=>{
  try{
    if(req.user) {
      const { email, id, nickname, rank, roles } = req.user;
      const nowUser = { email, id, nickname, rank, roles };
      res.send({stat:true, message:'사용자 인증이 완료되었어요.', status : 200, data: nowUser})
    }
    else {throw new ErrorClass(false, '세션정보가 없거나 만료되었어요.', 401)}
  }
  catch(err){
    next(err)
  }
}

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