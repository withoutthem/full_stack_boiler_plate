import {useState, useEffect} from 'react';
import axios from 'axios';
import { emailValidator, passwordValidator, nicknameValidator } from '../utils/validator';

type InputType = {
  email : string,
  nickname : string,
  password: string,
  password_confirm : string,
}

const SignInPage = ():React.ReactElement=>{

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

  const isAllValid = Object.values(userInfoValidation).every(Boolean);

  const onChangeUserInfo =(type:string, value:string):void=>{
    setUserInfo(state => { 
      return {...state, [type]:value}
    });
  }

  const onSubmitButton = async (e:React.FormEvent, value:InputType):Promise<void>=>{
    e.preventDefault();
    try{
      const result:any = await axios.post('/api/auth/sign_up', value);
      if(result.stat) console.log(result.message);
      console.log(result)
    }
    catch(err){
      console.log(err)
    }
  }

  // const onDuplicatedButton = async ():Promise<void>=>{
  //   const result = await axios.get('/')
  // }

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
  }, [userInfo]);
    
  return (
    <div className="sign_up_page">
      <form action="POST" className="sign_up" onSubmit={ (e) => {onSubmitButton(e, userInfo)}}>
        email : <input type="email" onChange={(e) => onChangeUserInfo('email', e.target.value)} /> {userInfoValidation.email ? <span style={{color : 'green'}}>OK</span> : <span>NO</span>} <br></br>
        <button>이메일중복검사</button>
        nickname : <input type="text" onChange={(e) => onChangeUserInfo('nickname', e.target.value)} /> {userInfoValidation.nickname ? <span style={{color : 'green'}}>OK</span> : <span>NO</span>} <br></br>
        <button>닉네임중복검사</button>
        password : <input type="password" onChange={(e) => onChangeUserInfo('password', e.target.value)} /> {userInfoValidation.password ? <span style={{color : 'green'}}>OK</span> : <span>NO</span>} <br></br>
        password again : <input type="password" onChange={(e) => onChangeUserInfo('password_confirm', e.target.value)} /> {userInfoValidation.password_confirm ? <span style={{color : 'green'}}>OK</span> : <span>NO</span>} <br></br>
        allTrue : {isAllValid.toString()}
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  )
}

export default SignInPage;