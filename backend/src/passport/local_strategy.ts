//lib
import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local';
import bcrypt from 'bcrypt'

//model
import User from '../models/user';
import {generalValidator} from '../utils/validator';


export const local = ()=>{
  passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : false
  },
  async (email:string, password:string, done)=>{
    try{
      // vaildator 
      if(!generalValidator(email, password))return done(null, false, {message: '아이디 혹은 비밀번호가 유효하지 않은 형식이에요. 너 해커세요?'})

      // db-email check
      const existUser = await User.findOne({where :{email}});
      if(!existUser) return done(null, false, {message:'아이디가 없어요.'})

      // db-password check
      const bcryptedResult = await bcrypt.compare(password, existUser.password)
      if(!bcryptedResult) return done(null, false ,{message: '비밀번호가 일치하지 않아요.'});

      done(null, existUser)
    }
    catch(err){
      done(err) 
    }
  }
  ))
}