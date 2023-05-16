import {Request, Response, NextFunction} from 'express';
import { ErrorClass } from "../../src/types/ErrorClass";
import httpMocks from 'node-mocks-http'
import bcrypt from 'bcrypt';
import passport from 'passport';
import { joinController, loginController, logOutController } from "../../src/controllers/auth_controller"
import User from '../../src/models/user';

//Models mock function
jest.mock('../../src/models/user', ()=>{
  return {
    findOne : jest.fn(),
    create : jest.fn()
  }
}) 

jest.mock('passport', ()=>{
  return {
    authenticate : jest.fn()
  }
})

let req:Request;
let res:Response;
let next:NextFunction;
let error:ErrorClass;
let mockUser:any

//joinController
describe('joinController',()=>{
  beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
    req.body = {
      nickname : 'test',
      email : 'test@test.com',
      password : 'password'
    }
    mockUser = {
      nickname : 'test',
      email : 'test@test.com',
      password : bcrypt.hashSync('password', 12)
    }
  }) 

  it('should be function type', ()=>{
    expect(typeof joinController).toBe('function')
  })

  it('should throw error if email is already exists', async ()=>{
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    await joinController(req, res, next);
    expect(next).toBeCalledWith(new ErrorClass(false, '이미 존재하는 이메일입니다.', 409))
  })

  it('should create userInfo if email is not exists', async ()=>{
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (User.create as jest.Mock).mockResolvedValue(true);
    await joinController(req, res, next);
    expect(User.create).toBeCalledWith({
      nickname : 'test',
      email : 'test@test.com',
      password : expect.any(String)
    })
  })

  it('should throw error if any type of fatal error', async ()=>{
    (User.create as jest.Mock).mockRejectedValue(false);
    await joinController(req, res, next);
    expect(next).toBeCalledWith(expect.any(ErrorClass))
  })
}) 


//loginController
describe('loginController', ()=>{
  let mockAuthenticateInnerFunction: jest.Mock;
  let loginMock:jest.Mock;
  beforeEach(()=>{
    req = httpMocks.createRequest({
      login : loginMock
    });
    res = httpMocks.createResponse();
    next = jest.fn();

    mockAuthenticateInnerFunction = jest.fn((req,res,next)=>{
      const user = {email: 'test@test.com'};
      const authCallback = (passport.authenticate as jest.Mock).mock.calls[0][1];
      authCallback(null, user, null)
    });

    (passport.authenticate as jest.Mock).mockReturnValue(mockAuthenticateInnerFunction);
    loginMock = jest.fn((user, done)=>{done(null)}) //req.login()
  })

  it('should be function type', ()=>{
    expect(typeof loginController).toBe('function');
  })

  it('should be called passport.authenticate', async ()=>{
    await loginController(req,res,next);
    expect(passport.authenticate).toBeCalled()
    expect(mockAuthenticateInnerFunction).toBeCalledWith(req,res,next)
  })

  it('should call next function if user doesnt exists', async ()=>{
    (passport.authenticate as jest.Mock).mockImplementation((strategy, callback) => {
      return (req:Request,res:Response,next:NextFunction)=>{
        const user = false;
        callback(null, user, null);
      }
    });
    await loginController(req,res,next);
    expect(next).toBeCalledWith(new ErrorClass(false, '아이디가 없습니다', 404))
  })
  
  it('should send with user data if login success', async ()=>{
    let user;
    (passport.authenticate as jest.Mock).mockImplementation((strategy, callback)=>{
      return (req:Response, res:Response, next:NextFunction)=>{
        user = {email : 'test@test.com'}
        callback(null, user, null);
      }
    })
    await loginController(req,res,next);
    expect((res as any)._getData()).toEqual({
      stat:true, 
      message: '로그인 성공입니다', 
      data:'test@test.com', 
      status:200})
    expect((res as any)._isEndCalled).toBeTruthy();
    expect((res as any).statusCode).toBe(200);
  })
}) 

//logOut controller
describe('logOutController', ()=>{
  let logout:()=>{}
  beforeEach(()=>{
    req = httpMocks.createRequest({
      logout : jest.fn(callback => callback())
    });
    res = httpMocks.createResponse();
    next = jest.fn();
  })
  
  it('should call req.logout', async ()=>{
    const resSendSpy = jest.spyOn(res, 'send')
    await logOutController(req,res,next);
    expect(req.logout).toBeCalled()
    expect((res as any)._isEndCalled).toBeTruthy();
    expect(resSendSpy).toBeCalledWith({stat: true, message: '로그아웃 성공', status:200})
  })
})