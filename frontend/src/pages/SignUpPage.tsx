//libs
import {useState, useEffect} from 'react';
import { emailValidator, passwordValidator, nicknameValidator } from '../utils/validator';
import { useNavigate } from 'react-router-dom';
import { onSubmitButton_SignUp } from '../controllers/auth_controller';
import { useDispatch } from 'react-redux';
import { IoMdCheckmarkCircle } from "react-icons/io";
import iconJoin from '../assets/images/icon_join.png'
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
    <div className="sign_up_page typeA">
        <div className="inner">
            <div className='img_box'>
            <img src={iconJoin} alt="" />
            <h2>회원가입</h2>
            <p></p>
          </div>
          <form action="POST" className="sign_up" onSubmit={ (e) => {onSubmitButton_SignUp(e, userInfo, navigate, dispatch)}}>
            <ul className='join_list'>
                <li>
                  <h3>이메일</h3>
                  <div>
                      <div className='inp'>
                        <input type="email" onChange={(e) => onChangeUserInfo('email', e.target.value)} placeholder='이메일을 입력해주세요.' />
                        {duplicatedCheck.email ? <IoMdCheckmarkCircle></IoMdCheckmarkCircle> : <button onClick={ e =>{onDuplicatedButton_SignUp(e, 'email', userInfo.email)}}>중복확인</button>}
                      </div>
                      {userInfoValidation.email ? <p style={{color : 'green'}}>사용가능한 이메일 입니다.</p> : <p style={{color:'red'}}>사용불가능한 이메일 입니다.</p>}
                  </div>
                </li>
                <li>
                  <h3>닉네임</h3>
                  <div>
                    <div className='inp'>
                      <input type="text" placeholder='닉네임을 입력하세요.' onChange={(e) => onChangeUserInfo('nickname', e.target.value)} />
                      {duplicatedCheck.nickname ? <IoMdCheckmarkCircle></IoMdCheckmarkCircle> : <button onClick={ e =>{onDuplicatedButton_SignUp(e, 'nickname', userInfo.nickname)}}>중복확인</button>}
                    </div>
                    {userInfoValidation.nickname ? <p style={{color : 'green'}}>사용가능한 닉네임 입니다.</p> : <p>사용불가능한 닉네임 입니다.</p>}
                  </div>
                </li>
                <li>
                  <h3>비밀번호</h3>
                  <div>
                    <div className="inp">
                      <input type="password" placeholder='비밀번호를 입력하세요.' onChange={(e) => onChangeUserInfo('password', e.target.value)} />
                    </div>
                    {userInfoValidation.password ? <p style={{color : 'green'}}>사용가능한 비밀번호 입니다.</p> : <p>사용불가능한 비밀번호 입니다.</p>}
                  </div>
                </li>
                <li>
                  <h3>비밀번호 확인</h3>
                  <div>
                    <div className="inp">
                      <input type="password" placeholder='비밀번호를 입력하세요.' onChange={(e) => onChangeUserInfo('password_confirm', e.target.value)} />
                    </div>
                    {userInfoValidation.password_confirm ? <p style={{color : 'green'}}>사용가능한 비밀번호 입니다.</p> : <p>사용불가능한 비밀번호 입니다.</p>}
                  </div>
                </li>
            </ul>
            {/* allTrue : {isAllValid.toString()} */}
            <button type="submit" disabled={!isAllValid}>가입하기</button>
          </form>
        </div>
    </div>
  )
}

export default SignInPage;