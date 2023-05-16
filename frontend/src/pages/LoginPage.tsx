import { useState } from "react"
import {_axios} from "../utils/_axios"

const LoginPage = ():React.ReactElement =>{
  const [inputState, setInputState] = useState({
    nickname : '',
    password : '',
    email : ''
  })

  const [loginFormState, setloginFormState] = useState({
    email : '',
    password : ''
  })

  const joinRequest = async (e:React.FormEvent<HTMLFormElement>, info:{nickname:string, password:string, email:string})=>{
    e.preventDefault();
    const result = await _axios.post('/api/auth/join', info);
    console.log(result);
  }

  const setInputStateChange = (e:React.ChangeEvent<HTMLInputElement>, type: 'email'|'nickname'|'password'):void=>{
    const newObject = {...inputState};
    newObject[`${type}`] = e.target.value;   
    setInputState(newObject); 
  }

  const setLoginFormStateChange = (e:React.ChangeEvent<HTMLInputElement>, type: 'email'|'password') =>{
    const newObject = {...loginFormState};
    newObject[`${type}`] = e.target.value;   
    setloginFormState(newObject); 
  }

  const loginRequest = async (e:React.FormEvent<HTMLFormElement>, info:{email:string, password:string})=>{
    e.preventDefault();
    const result = await _axios.post('/api/auth/login', info)
    console.log(result);
  }

  const testProxy = async()=>{
    const result = await _axios.get('/api/test')
    console.log(result)
  }

  return (

    

    <div className="LoginPage" >
      <button onClick={testProxy}> 프록시 테스트</button>
      회원가입
      <form action="POST" onSubmit={e => joinRequest(e, inputState)}>
        Email : 
        <input type="email" name="email" onChange={e=>setInputStateChange(e, 'email')}/>
        nickname : 
        <input type="text" name="nickname" onChange={e=>setInputStateChange(e, 'nickname')}/>
        password : 
        <input type="password" name="password" onChange={e=>setInputStateChange(e, 'password')}/>
        <button role="submit">제출하기</button>
      </form>
    <br></br><br></br>
      <form action="POST" onSubmit={e => loginRequest(e, loginFormState)} >
        이메일 : 
        <input type="email" name="email" onChange={e => setLoginFormStateChange(e, 'email')} />
        비밀번호 :
        <input type="password" name="password" onChange ={e => setLoginFormStateChange(e, 'password')}/>
        <button type="submit">로그인하기</button>
      </form>
    </div>
  )
}

export default LoginPage