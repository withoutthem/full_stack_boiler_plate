
import {Request, Response, NextFunction} from 'express'
import errorHandler from '../../src/middleware/error_handler';
import { ErrorClass } from '../../src/types/ErrorClass';
import httpMocks from 'node-mocks-http'

describe('errorHandler MiddleWare', ()=>{

  let req:Request;
  let res:any;
  let next:NextFunction;
  let error:ErrorClass;
  beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  }) 

  it('should be error handling middleware', ()=>{
    expect(typeof errorHandler)
  })

  it('should response with 500, message with no error status', ()=>{
    error = new ErrorClass(false, 'message');
    errorHandler(error, req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._isEndCalled).toBeTruthy();
    expect(res._getData()).toBe('message') 
  })

  it('should not expose error details in production environment', ()=>{
    process.env.NODE_ENV = 'production';
    error = new ErrorClass(false, 'Detailed error message', 555);
    errorHandler(error, req, res, next);
    expect(res.statusCode).toBe(555);
    expect(res._isEndCalled).toBeTruthy();
    expect(res._getData()).toBe('')
  })
}) 