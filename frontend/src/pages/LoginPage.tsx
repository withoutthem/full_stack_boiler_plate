import { useState } from "react"
import { emailValidator, passwordValidator } from "../utils/validator"

type UserLoginFormType = {
  id : string,
  password : string
}

const LoginPage = ():React.ReactElement=>{

  const [userIdPs, setUserIdPs] = useState<UserLoginFormType>({
    id : '',
    password :''
  })

  const onSubmitButton = async (e:React.FormEvent, data:UserLoginFormType):Promise<void>=>{
    e.preventDefault();
    if(!emailValidator(userIdPs.id)){
      alert('이메일 형식으로 하세요')
    }
    else if(!passwordValidator(userIdPs.password)){
      alert('비밀번호 형식에 맞게 적으세요')
    }
    // const result = await axios.get('/')
    console.log(userIdPs)
  }

  return (
    <div className="login_page">
      <form action="POST" onSubmit={(e)=>{onSubmitButton(e,userIdPs)}}>
        id : <input type="text" onChange={(e)=>{setUserIdPs(state => {return {...state, id:e.target.value}})}}/>
        password : <input type="password" onChange={(e)=>{setUserIdPs(state => {return {...state, password:e.target.value}})}}/>
        <button type='submit'>SUBMIT</button>
      </form>
    </div>
  )
}

export default LoginPage;