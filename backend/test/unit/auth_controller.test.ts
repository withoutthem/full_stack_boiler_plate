import { ErrorClass } from "../../src/types/ErrorClass";
import {Request, Response, NextFunction} from 'express';
import { signUpController, loginController, getMyInfo, logoutController } from "../../src/controllers/auth_controller";
import { generalValidator } from "../../src/utils/validator";
import httpMocks from 'node-mocks-http';
import User from "../../src/models/user";
import bcrypt from 'bcrypt';
import { idLogger } from "../../src/utils/logger";
import passport = require("passport");

jest.mock('../../src/utils/validator', ()=>{
  return {
    generalValidator : jest.fn()
  }
})
jest.mock('bcrypt', ()=>{
  return {
    hash : jest.fn()
  }
})
jest.mock('../../src/utils/logger')
User.findOne = jest.fn();
User.create = jest.fn();
console.error = jest.fn();
jest.mock('passport', ()=>{
  return {
    authenticate : jest.fn()
  }
})


describe('signUpController', ()=>{
  let req:Request;
  let res:any;
  let next:NextFunction;
  const validData = {email:'valid@test.com',password:'valid!123',nickname:'validname'};
  const inValidData = {email:'inValid', password:'inValid', nickname:'inValid!@#'};
  beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
    req.login = jest.fn();
    jest.clearAllMocks();
  })
  it('should success signup if all values are valid',async ()=>{
    req.body = validData;
    (User.findOne as jest.Mock).mockResolvedValue(false);
    (User.create as jest.Mock).mockResolvedValue(true);
    (bcrypt.hash as jest.Mock).mockResolvedValue('bcryptedPS')
    await signUpController(req,res,next);
    expect(generalValidator).toBeCalledWith('valid@test.com','valid!123','validname')
    expect(User.findOne).toBeCalledWith({where: {email:req.body.email}});
    expect(User.findOne).toBeCalledWith({where :{nickname: req.body.nickname}})
    expect(bcrypt.hash).toBeCalledWith('valid!123', 12)
    expect(User.create).toBeCalledWith({email : 'valid@test.com', password:'bcryptedPS', nickname:'validname'})
    expect(idLogger).toBeCalled()
    expect(req.login).toBeCalled();
  })
  it('should throw error if generalValidator is not passed', async ()=>{
    req.body = inValidData;
    (generalValidator as jest.Mock).mockReturnValue(new ErrorClass(false, '', 400))
    await signUpController(req,res,next);
    expect(generalValidator).toBeCalledWith('inValid', 'inValid', 'inValid!@#');
    expect(next).toBeCalledWith(expect.any(ErrorClass)) 
    expect(User.findOne).not.toBeCalled();
  })
  it('should throw error if email or nickname is already exists', async ()=>{
    req.body = validData;
    (User.findOne as jest.Mock).mockResolvedValue('existingUser');
    (generalValidator as jest.Mock).mockReturnValue(true);
    await signUpController(req,res,next);
    expect(res.statusCode).toBe(400)
    expect(bcrypt.hash).not.toBeCalled();
  })
  it('should throw error if User.create database error', async ()=>{
    req.body = validData;
    (generalValidator as jest.Mock).mockReturnValue(true);
    (User.findOne as jest.Mock).mockResolvedValue(false);
    (User.create as jest.Mock).mockResolvedValue(false);
    await signUpController(req,res,next);
    expect(next).toBeCalledWith(expect.any(ErrorClass));
  })
})





describe('loginController', ()=>{
  let req:Request;
  let res:Response;
  let next:NextFunction;
  beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
    req.login = jest.fn();
    jest.clearAllMocks();
  })
  it('should call passport.authenticate', async()=>{
    (passport.authenticate as jest.Mock).mockImplementation((strategy, callback) => jest.fn())
    await loginController(req,res,next);
    expect(passport.authenticate).toBeCalledWith('local', expect.any(Function))
  })
})




describe('getMyInfo', ()=>{
  let req:Request;
  let res:any;
  let next:NextFunction;
  beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
    jest.clearAllMocks();
  })
  it('should send userData if req.user exists(Server session activated)', ()=>{
    req.user = {email: 'email', nickname:'nickname', id:'someId', rank:'someRank', roles:'root'};
    getMyInfo(req,res,next);
    expect(res._getData()).toEqual({stat:true, message:'사용자 인증이 완료되었어요.', status : 200, data: req.user});
  })
  it('shoud throw error if req.use doesnt exist(Server session deactivated', ()=>{
    req.user = false;
    getMyInfo(req,res,next);
    expect(next).toBeCalledWith(new ErrorClass(false, '세션정보가 없거나 만료되었어요.', 401))
  })
})





describe('logoutController', ()=>{
  let req:Request;
  let res:any;
  let next:NextFunction;
  beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
    req.logout = jest.fn()
    jest.clearAllMocks();
  })
  it('should call req.logout', ()=>{
    logoutController(req,res,next);
    expect(req.logout).toBeCalled()
  })
  it('should call nextFunction if req.logout throws any error', ()=>{
    (req.logout as jest.Mock).mockImplementation(()=> {throw new ErrorClass(false, '', 500)});
    logoutController(req,res,next);
    expect(next).toBeCalledWith(expect.any(ErrorClass));
  })
})