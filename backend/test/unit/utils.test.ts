import {logger} from '../../src/utils/logger';
import httpMocks from 'node-mocks-http';
import {Request, Response} from 'express';
import fs from 'fs';
import { emailValidator, passwordValidator, nicknameValidator, generalValidator } from '../../src/utils/validator';
import { ErrorClass } from '../../src/types/ErrorClass';
let req:Request
let res:Response
const option = 'stringtest';
const where = 'stringtest2'

describe('logger', ()=>{
  jest.spyOn(fs, 'appendFileSync').mockImplementation(() => {});

  beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  })
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call appendFileSync', ()=>{
    logger(req, res, option, where);
    expect(fs.appendFileSync).toBeCalled();
  })
})

describe('unit validator', ()=>{
  it('email', ()=>{
    expect(emailValidator('test@test.co.kr')).toBe(true);
    expect(emailValidator('invalid-email-form')).toBe(false);
  })
  it('password', ()=>{
    expect(passwordValidator('nop')).toBe(false)
    expect(passwordValidator('yeah!upto15char123')).toBe(false)
    expect(passwordValidator('한글abc!')).toBe(false)
    expect(passwordValidator('bAc123!@#')).toBe(true)
    expect(passwordValidator('dlwnsdn123')).toBe(false);
    expect(passwordValidator('wnsdn!123')).toBe(true)
  })
  it('nicknameValidator', ()=>{
    expect(nicknameValidator('한글가능')).toBe(true)
    expect(nicknameValidator('engAvailable')).toBe(true) 
    expect(nicknameValidator('15자이상되면실패합니다조심하세요15자가한글도15자였어')).toBe(false)
    expect(nicknameValidator('특수문자는불가능!@#')).toBe(false)
    expect(nicknameValidator('12조합possible')).toBe(true)
  })
})

describe('generalValidator', ()=>{
  beforeEach(()=>{
    const validators = require('../../src/utils/validator');
    validators.emailValidator = jest.fn();
    validators.passwordValidator = jest.fn();
    validators.nicknameValidator = jest.fn();
  });

  afterEach(()=>{
    jest.clearAllMocks();
  });
  it('invalid email', ()=>{
    (emailValidator as jest.Mock).mockReturnValue(false);
    expect(() => generalValidator('invalid', 'validPassword')).toThrow(new ErrorClass(false, '이메일 형식에 맞지 않습니다', 400))
  }); 
  it('invalid password', ()=>{
    (emailValidator as jest.Mock).mockReturnValue(true);
    (passwordValidator as jest.Mock).mockReturnValue(false);
    expect(()=> generalValidator('test@test.com', 'invalidPassword')).toThrow(new ErrorClass(false, '비밀번호 형식에 맞지 않습니다', 400))
  });
  it('invalid nickname', ()=>{
    (emailValidator as jest.Mock).mockReturnValue(true);
    (passwordValidator as jest.Mock).mockReturnValue(true);
    (nicknameValidator as jest.Mock).mockReturnValue(false);
    expect(()=> generalValidator('test@test.com', 'asdfzxcv!12', 'invalidNickname!@#')).toThrow(new ErrorClass(false, '닉네임이 형식에 맞지 않습니다', 400))
  })

})