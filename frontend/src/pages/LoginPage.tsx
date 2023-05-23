import { useState } from "react"
import { emailValidator, passwordValidator } from "../utils/validator"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo_reducer } from "../store";

type UserLoginFormType = {
  email : string,
  password : string
}

const LoginPage = ():React.ReactElement=>{

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userIdPs, setUserIdPs] = useState<UserLoginFormType>({
    email : '',
    password :''
  })

  const onSubmitButton = async (e:React.FormEvent, data:UserLoginFormType):Promise<void>=>{
    e.preventDefault();
    if(!emailValidator(userIdPs.email)){
      alert('이메일 형식으로 하세요')
    }
    else if(!passwordValidator(userIdPs.password)){
      alert('비밀번호 형식에 맞게 적으세요')
    }
    const result = await axios.post('/api/auth/login', userIdPs);
    if(result.data.stat) {
      dispatch(setUserInfo_reducer(result.data.data))
      navigate('/')
    }
    else console.log(result.data)
  }

  return (
    <div className="login_page">
      <form action="POST" onSubmit={(e)=>{onSubmitButton(e,userIdPs)}}>
        email : <input type="text" onChange={(e)=>{setUserIdPs(state => {return {...state, email:e.target.value}})}}/>
        password : <input type="password" onChange={(e)=>{setUserIdPs(state => {return {...state, password:e.target.value}})}}/>
        <button type='submit'>SUBMIT</button>
      </form>
    </div>
  )
}

export default LoginPage;