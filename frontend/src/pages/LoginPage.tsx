//libs
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import loginImg from '../assets/images/icon_login.png';


//modules
import { onSubmitButton_Login } from '../controllers/auth_controller';

//types
export type UserLoginFormType = {
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


  return (
    <div className="login_page typeA">
      <div className="inner"> 
        <img src={loginImg}  alt="" />
        <form action="POST" onSubmit={(e)=>{onSubmitButton_Login(e,userIdPs, navigate, dispatch)}}>
        <input type="text" placeholder="이메일을 입력해주세요." onChange={(e)=>{setUserIdPs(state => {return {...state, email:e.target.value}})}}/>
        <input type="password" placeholder="비밀번호를 입력해주세요." onChange={(e)=>{setUserIdPs(state => {return {...state, password:e.target.value}})}}/>
          <button type='submit'>로그인</button> 
        </form>
      </div>
    </div>
  )
}

export default LoginPage;