import {Response, Request, NextFunction} from 'express';
import User from '../models/user';
import { ErrorClass } from '../types/ErrorClass';
import bcrypt from 'bcrypt';
import passport from 'passport';

// post : api/auth/join
export const joinController = async (req:Request, res:Response, next:NextFunction)=>{
  const {nickname, email, password} = req.body;
  try{
    const exUser = await User.findOne({where : {email}})
    if(exUser) throw new ErrorClass(false, '이미 존재하는 이메일입니다.', 409)
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      nickname,
      password : hashedPassword
    })
    res.status(201).send(result)
  }
  catch(err:any){
    if(err instanceof ErrorClass) return next(err)
    else {
      const error = new ErrorClass(false, err.message ?? 'joinController Error', err?.status)
      next(error);
    }
  }
}

// post : api/auth/login
export const loginController = async (req:Request, res:Response, next:NextFunction)=>{
  passport.authenticate('local', (authError:Error|ErrorClass|null, user:User|false, info:any)=>{
    if(authError) return next(authError);
    if(!user) return next(new ErrorClass(false, '아이디가 없습니다', 404))
    return req.login(user, (loginError)=>{
      if(loginError) return next(loginError);
      console.log(`로그인 성공 : ${user}`)
      res.send({stat:true, message: '로그인 성공입니다', data:user.email, status:200});
    })
  })(req, res, next);
}
// login 을 요청하면
// passport.authenticate('local' ~~ ) 이 호출됨 (loginController)
// strategy에 따라서 local_strategy.ts 의 콜백에서 판단함 (passport/local_strategy.ts)
// 다시 돌아와서 req.login이 호출되면서 로그인 성공
// req.login 메서드가 호출되면 passport.serializeUser 호출 (passport/index.ts)
// req.session에 사용자 아이디만 저장해서 세션 생성
// passport.session()으로 브라우저에 connect.sid 세션 쿠키 전송 (app.ts)
// 로그인 완료

// GET : api/auth/logout
export const logOutController = async (req:Request, res:Response, next:NextFunction)=>{
  req.logout(()=>{
    res.send({stat: true, message: '로그아웃 성공', status:200})
  })
}