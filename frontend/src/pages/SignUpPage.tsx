//libs
import {useState, useEffect} from 'react';
import { emailValidator, passwordValidator, nicknameValidator } from '../utils/validator';
import { useNavigate } from 'react-router-dom';
import { onSubmitButton_SignUp } from '../controllers/auth_controller';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export type InputType = {
  email : string,
  nickname : string,
  password: string,
  password_confirm : string,
}

const SignInPage = ():React.ReactElement=>{

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState<InputType>({
    email:'',
    nickname:'',
    password:'',
    password_confirm:'',
  })

  const [userInfoValidation, setUserInfoValidation] = useState({
    email : false,
    nickname : false,
    password : false,
    password_confirm : false
  })

  const [duplicatedCheck, setDuplicatedCheck] = useState({
    email : false,
    nickname : false
  })

  const isAllValid = Object.values(userInfoValidation).every(Boolean) && Object.values(duplicatedCheck).every(Boolean)

  const onChangeUserInfo =(type:string, value:string):void=>{
    setUserInfo(state => { 
      return {...state, [type]:value}
    });
    if(type === 'email' || 'nickname') setDuplicatedCheck(state => {return {...state ,[type]:false}})
  }

  const onDuplicatedButton_SignUp = async (e:React.FormEvent, type:string, value:string):Promise<void>=>{
    e.preventDefault();
    try{
      const data = {type , value}
      const result = await axios.post('/api/auth/dupcheck', data)
      if(result.data.stat) setDuplicatedCheck(state => {return {...state, [data.type] : true}})
    }
    catch(err){
      alert(`${type} 이 중복되었어요. 다른 ${type}을 사용해주세요.`);
    }
  }

  useEffect(() => {
    const isEmailValid = emailValidator(userInfo.email);
    const isNicknameValid = nicknameValidator(userInfo.nickname);
    const isPasswordValid = passwordValidator(userInfo.password);
    const isPasswordConfirmValid = (userInfo.password.length !== 0 && userInfo.password_confirm.length !==0) && (userInfo.password === userInfo.password_confirm);

    setUserInfoValidation({
      email: isEmailValid,
      nickname: isNicknameValid,
      password: isPasswordValid,
      password_confirm: isPasswordConfirmValid
    });

    setDuplicatedCheck({
      email : !!duplicatedCheck.email,
      nickname : !!duplicatedCheck.nickname
    })
  }, [userInfo]);
    
  return (
    <div className="sign_up_page">
      <form action="POST" className="sign_up" onSubmit={ (e) => {onSubmitButton_SignUp(e, userInfo, navigate, dispatch)}}>
        email : <input type="email" onChange={(e) => onChangeUserInfo('email', e.target.value)} /> {userInfoValidation.email ? <span style={{color : 'green'}}>OK</span> : <span>NO</span>} <br></br>
        {duplicatedCheck.email ? <div>OK</div> : <button onClick={ e =>{onDuplicatedButton_SignUp(e, 'email', userInfo.email)}}>이메일중복검사</button>}
        nickname : <input type="text" onChange={(e) => onChangeUserInfo('nickname', e.target.value)} /> {userInfoValidation.nickname ? <span style={{color : 'green'}}>OK</span> : <span>NO</span>} <br></br>
        {duplicatedCheck.nickname ? <div>OK</div> : <button onClick={ e =>{onDuplicatedButton_SignUp(e, 'nickname', userInfo.nickname)}}>닉네임중복검사</button>}
        password : <input type="password" onChange={(e) => onChangeUserInfo('password', e.target.value)} /> {userInfoValidation.password ? <span style={{color : 'green'}}>OK</span> : <span>NO</span>} <br></br>
        password again : <input type="password" onChange={(e) => onChangeUserInfo('password_confirm', e.target.value)} /> {userInfoValidation.password_confirm ? <span style={{color : 'green'}}>OK</span> : <span>NO</span>} <br></br>
        allTrue : {isAllValid.toString()}
        <button type="submit" disabled={!isAllValid}>SUBMIT</button>
      </form>
    </div>
  )
}

export default SignInPage;