import express, { Request, Response, NextFunction } from 'express'
const authRouter = express.Router();

import passport from 'passport';
import {loginController, joinController, logOutController} from '../controllers/auth_controller';
import { isLoggedIn, isNotLoggedIn } from '../middleware/login_status';
import { generalValidatorMiddleWare } from '../middleware/general_validator';

authRouter.use((req:Request, res:Response, next:NextFunction)=>{
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.follwingCount = 0;
  res.locals.followingIdList = [];
  next();
})

authRouter.post('/login', isNotLoggedIn , generalValidatorMiddleWare, loginController)
authRouter.post('/join', isNotLoggedIn, generalValidatorMiddleWare, joinController)
authRouter.get('/logout', isLoggedIn, logOutController)

export default authRouter;