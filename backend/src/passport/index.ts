import passport from 'passport'
import {local} from './local_strategy';
import User from '../models/user';

export const passportConfig = ()=>{
  
  passport.serializeUser((user:any, done)=>{ // req.login() 으로부터 호출
      done(null, user?.id) //user.id만 추출해서 메모리에 세션쿠키 저장
  });

  passport.deserializeUser( async (id, done)=>{ // 이거는 connect.sid 가 있을 경우 passport가 호출한다.
    try{
      const user = await User.findOne({where:{id}})
      done(null, user) // authRouter에서 req.user 에 정보가 담긴다.
    }
    catch(err){
      done(err)
    }
  });
  
  local()
}