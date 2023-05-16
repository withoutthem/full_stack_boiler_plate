import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import User from '../models/user';
import bcrypt from 'bcrypt';

export const local = ()=>{
  passport.use(new LocalStrategy({
    usernameField : 'email', //req.body.email
    passwordField: 'password', //req.body.password
    passReqToCallback :false // if true 면 다음 함수에 req가 필요하면 처음 파라미터에 req가 들어감
  }, 
  async (email, password, done)=>{ //done(서버실패, 성공유저, 로직실패)
    try{
      const exUser = await User.findOne({where : {email}})
      if(exUser){
        const bcryptedResult = await bcrypt.compare(password, exUser.password)
        if(bcryptedResult) done(null, exUser);
        else done(null, false, {message : '비밀번호가 일치하지 않습니다.'})
      }
      else done(null, false, {message : '가입하지 않았다.'})
    }
    catch(err){
      done(err)
    }
  }))
}