import { ErrorClass } from "../../src/types/ErrorClass";
import {Request, Response, NextFunction} from 'express';
import { signUpController, loginController, getMyInfo, logoutController, validateUniqueUserAttributes } from "../../src/controllers/auth_controller";
import { emailValidator, nicknameValidator, generalValidator } from "../../src/utils/validator";
import httpMocks from 'node-mocks-http';
import User from "../../src/models/user";
import bcrypt from 'bcrypt';
import { idLogger } from "../../src/utils/logger";
import passport = require("passport");

jest.mock('../../src/utils/validator', ()=>{
  return {
    emailValidator : jest.fn(),
    nicknameValidator : jest.fn(),
    generalValidator : jest.fn(),
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
  afterEach(()=>{
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
  afterEach(()=>{
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
  afterEach(()=>{
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
  afterEach(()=>{
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





describe('validateUniqueUserAttributes', ()=>{
  let req:Request;
  let res:Response;
  let next:NextFunction;
  beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
    res.send = jest.fn();
    (emailValidator as jest.Mock).mockReturnValue(true);
    (nicknameValidator as jest.Mock).mockReturnValue(true);
    jest.clearAllMocks();
  })
  afterEach(()=>{
    jest.clearAllMocks();
  })
  it('should send type validation error if not pass Validator', async ()=>{
    req.body = {type : 'email', value:'inValidEmail'};
    (emailValidator as jest.Mock).mockReturnValue(false);
    await validateUniqueUserAttributes(req,res,next);
    expect(User.findOne).not.toBeCalled();
    expect(next).toBeCalledWith(new ErrorClass(false, `유효하지 않은 ${req.body.type} 이에요`, 400))
  })
  it('should send 404false if email/nickname is already exists', async ()=>{
    req.body = {type : 'email', value:'test@test.com'};
    (User.findOne as jest.Mock).mockResolvedValue(true);
    await validateUniqueUserAttributes(req,res,next)
    expect(res.statusCode).toBe(409);
    expect(res.send).toBeCalledWith({stat:false, message: `이미 있는 ${req.body.type} 이에요`, status:409});
  })
  it('should send 200true if email/nickname is doesnt exist', async()=>{
    req.body = {type : 'nickname', value : 'newNickname'};
    (User.findOne as jest.Mock).mockResolvedValue(false);
    await validateUniqueUserAttributes(req,res,next);
    expect(res.statusCode).toBe(200);
    expect(res.send).toBeCalledWith({stat:true, message: `사용 가능한 ${req.body.type} 이에요`, status:200})
  })
  it('should call nextFunction if something wrong', async ()=>{
    req.body = {type : 'nickname', value : 'newNickname'};
    (User.findOne as jest.Mock).mockRejectedValue(new ErrorClass(false, '알 수 없는 에러에요', 404))
    await validateUniqueUserAttributes(req,res,next);
    expect(next).toBeCalledWith(new ErrorClass(false, '알 수 없는 에러에요', 404));    
  })
})