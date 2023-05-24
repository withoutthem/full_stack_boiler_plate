
import {onSubmitButton_Login, onSubmitButton_SignUp, logOutButton} from '../../src/controllers/auth_controller'
import axios from 'axios'
import { emailValidator, passwordValidator } from '../../src/utils/validator';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();
global.alert = jest.fn(); // window객체에 접근 불가하므로 jest 내장객체 global을 사용한다.

jest.mock('react-redux', ()=>{
  return {
    useDispatch : () => mockDispatch
  }
})
jest.mock('react-router-dom', ()=>{
  return {
    useNavigate : () => mockNavigate
  }
})
jest.mock('../../src/utils/validator');
jest.mock('axios');


describe('onSubmitButton_Login', ()=>{
  let e:any;
  beforeEach(()=>{
    e = {preventDefault : jest.fn()};
    (emailValidator as jest.Mock).mockClear();
    (passwordValidator as jest.Mock).mockClear();
    mockDispatch.mockClear();
    mockNavigate.mockClear();
  })
  it('should not req when email is inValid', async ()=>{
    (emailValidator as jest.Mock).mockReturnValue(false);
    await onSubmitButton_Login(e, {email:'invalid', password:'valid!12'}, mockNavigate, mockDispatch);
    expect(e.preventDefault).toBeCalled();
    expect(global.alert).toBeCalledWith('이메일 형식으로 하세요')
    expect(emailValidator).toBeCalledWith('invalid');
    expect(axios.post).not.toBeCalled();
  })
  it('should not req when ps is inValid', async ()=>{
    (emailValidator as jest.Mock).mockReturnValue(true);
    (passwordValidator as jest.Mock).mockReturnValue(false);
    await onSubmitButton_Login(e, {email:'valid@test.com', password:'inValid'}, mockNavigate, mockDispatch);
    expect(e.preventDefault).toBeCalled();
    expect(global.alert).toBeCalledWith('비밀번호 형식에 맞게 적으세요')
    expect(passwordValidator).toBeCalledWith('inValid');
    expect(axios.post).not.toBeCalled();
  })
  it('should call axios.post when email/ps is valid', async ()=>{
    (emailValidator as jest.Mock).mockReturnValue(true);
    (passwordValidator as jest.Mock).mockReturnValue(true);
    (axios.post as jest.Mock).mockResolvedValue({data:{stat:true,data:'testData'}});
    await onSubmitButton_Login(e, {email:'valid@test.com', password:'valid!123'}, mockNavigate, mockDispatch);
    expect(axios.post).toBeCalledWith('/api/auth/login', {email:'valid@test.com', password:'valid!123'});
    expect(mockDispatch).toBeCalled();
    expect(mockNavigate).toBeCalledWith('/');
  })
  it('should throw error when result stat is falsy', async ()=>{
    (emailValidator as jest.Mock).mockReturnValue(true);
    (passwordValidator as jest.Mock).mockReturnValue(true);
    (axios.post as jest.Mock).mockResolvedValue({data:{stat:false,data:'testData', message:'mock_ErrorFromServer'}});
    await onSubmitButton_Login(e, {email:'valid@test.com', password:'valid!123'}, mockNavigate, mockDispatch);
    expect(mockDispatch).not.toBeCalled()
    expect(mockNavigate).not.toBeCalled()
  })
})

describe('onSubmitButton_SignUp', ()=>{
  let e:any;
  const testData = {
    email : 'test123@test.com',
    nickname : 'validnick',
    password : 'valid!123',
    password_confirm : 'valid!123'
  }
  beforeEach(()=>{
    e = {preventDefault : jest.fn()};
    mockDispatch.mockClear();
    mockNavigate.mockClear();
  })
  it('should right way', async ()=>{
    (axios.post as jest.Mock).mockResolvedValue({data:{stat:true, message:'successMessage', data:'testData'}});
    await onSubmitButton_SignUp(e, testData, mockNavigate, mockDispatch);
    expect(e.preventDefault).toBeCalled();
    expect(global.alert).toBeCalledWith('successMessage');
    expect(mockDispatch).toBeCalled();
    expect(mockNavigate).toBeCalled();
  })
  it('should not dispatch or navigate if server response status is falsy', async ()=>{
    (axios.post as jest.Mock).mockResolvedValue({data:{stat:false, message:'failed'}});
    await onSubmitButton_SignUp(e, testData, mockNavigate, mockDispatch);
    expect(e.preventDefault).toBeCalled();
    expect(global.alert).toBeCalledWith(new Error('통신 도중 에러가 발생했어요.'));
    expect(mockDispatch).not.toBeCalled();
    expect(mockNavigate).not.toBeCalled();
  })
})

describe('logOutButton', ()=>{
  beforeEach(()=>{
    mockDispatch.mockClear();
    mockNavigate.mockClear();
  })
  it('should right way', async()=>{
    (axios.get as jest.Mock).mockResolvedValue({data:{stat:true, message:'successMessage'}})
    await logOutButton(mockNavigate, mockDispatch);
    expect(global.alert).toBeCalledWith('successMessage');
    expect(mockDispatch).toBeCalled();
    expect(mockNavigate).toBeCalledWith('/')
  })
  it('should not dispatch or navigate if server res status is falsy', async ()=>{
    (axios.get as jest.Mock).mockResolvedValue({data:{stat:false, message:'failed'}});
    await logOutButton(mockNavigate, mockDispatch);
    expect(global.alert).toBeCalledWith(new Error('통신 도중 에러가 발생했어요.'))
  })
})