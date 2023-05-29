//libs
import axios from 'axios';

//modules
import { clearAllFour_reducer, clearCart_reducer, setUserInfo_reducer } from "../store";
import { emailValidator, passwordValidator } from "../utils/validator";
import { UserLoginFormType } from "../pages/LoginPage";
import {deleteUserInfo_reducer} from '../store'
import { setInfoAll } from '../utils/set_info';
import { clearAllInfo } from '../utils/set_info';

//types
import { InputType } from '../pages/SignUpPage';

//NOTE:TEST:OK
export const onSubmitButton_Login = async ( e:React.FormEvent, data:UserLoginFormType, navigate:(root:string) => void, dispatch:Function):Promise<void> => {
  try{
    e.preventDefault();
    if(!emailValidator(data.email)){
      alert('이메일 형식으로 하세요');
    } else if(!passwordValidator(data.password)){
      alert('비밀번호 형식에 맞게 적으세요');
    } else {
      const result = await axios.post('/api/auth/login', data);
      if(result.data.stat) {
        await setInfoAll(dispatch)
        navigate('/')
      } else {
        throw new Error(result.data.message)
      }
    }
  }
  catch(err){
    console.error(err)
  }
}

//NOTE:TEST:OK
export const onSubmitButton_SignUp = async (e:React.FormEvent, userInfo:InputType, navigate:(root:string)=>void, dispatch:Function):Promise<void>=>{
  e.preventDefault();
  try{
    const result:any = await axios.post('/api/auth/sign_up', userInfo);
    if(result.data.stat) {
      alert(result.data.message);
      console.log(result.data.data)
      dispatch(setUserInfo_reducer(result.data.data))
      navigate('/')
      window.location.reload();
    }
    else{
      throw new Error('통신 도중 에러가 발생했어요.')
    }
  }
  catch(err){
    alert(err)
  }
}

//NOTE:TEST:OK
export const logOutButton = async (navigate:(root:string)=>void, dispatch:Function)=>{
  try{
    const result = await axios.get('/api/auth/logout')
    if(result.data.stat) {
      alert(result.data.message)
      clearAllInfo(dispatch)
      navigate('/')
      window.location.reload();
    }
    else throw new Error('통신 도중 에러가 발생했어요.')
  }
  catch(err){
    alert(err)
  }

}