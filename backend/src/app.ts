// libs
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';

//types
import {Express} from 'express';

//modules 
import mainRouter from './routes';
import { corsOption } from './config/cors';
import { sessionOption } from './config/session';
import errorHandler from './middleware/error_handler';
import reqLogger from './middleware/req_logger'; 
import { passportConfig } from './passport';

require('dotenv').config();

const app:Express = express();

app.use(reqLogger)
app.use(cors()); // cors
app.use(express.json()) // body parser (json)
app.use(express.urlencoded({extended: false})); // body parser (form)
app.use(cookieParser(process.env.COOKIE_SECRET)); // cookie parser

app.use(session(sessionOption)) //cookie session
app.use(passport.initialize()); // req.user, req.login, req.isAuthenticate, req.logout 등이 생긴다 
app.use(passport.session()); // connect.sid 라는 이름으로 세션쿠키가 브라우저로 전송됨
passportConfig();

app.use(express.static(path.join(__dirname, '../public'))) // static middleware

mainRouter(app); // api main router

app.use(errorHandler) //error Handler

export default app;