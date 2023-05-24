//libs
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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
    <div className="login_page">
      <form action="POST" onSubmit={(e)=>{onSubmitButton_Login(e,userIdPs, navigate, dispatch)}}>
        email : <input type="text" onChange={(e)=>{setUserIdPs(state => {return {...state, email:e.target.value}})}}/>
        password : <input type="password" onChange={(e)=>{setUserIdPs(state => {return {...state, password:e.target.value}})}}/>
        <button type='submit'>SUBMIT</button>
      </form>
    </div>
  )
}

export default LoginPage;