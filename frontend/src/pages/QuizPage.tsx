import {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
//modules
import { GlobalPopStore, earnPoint_reducer, lostPoint_reducer, setUserInfo_reducer, deleteUserInfo_reducer } from '../store';
import { open_ShouldLoginPopup } from '../utils/open_pop';
import { openPop } from '../utils/open_pop';

type Quiz = {
  id:string,
  category:string,
  quiz:string,
  options:string[],
  answer:string
}

const QuizPage = ():React.ReactElement =>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeState:any = useSelector(state => state);

  const [nowQuiz, setNowQuiz] = useState<Quiz>(
    {
      id:'',
      category:'데이터 받는 중...',
      quiz:'데이터 받는 중...',
      options:[],
      answer: '데이터 받는 중...'
    }
  )

  const correctPopUp:GlobalPopStore = {
    active: true,
    icon:'ok',
    title:'정답입니다!',
    description:'50포인트가 올랐어요!',
    fatal:false,
    goToLogin : false
  }
  const inCorrectPopUp:GlobalPopStore = {
    active: true,
    icon:'fatal',
    title:'틀렸어요.',
    description:'30포인트를 잃었습니다.',
    fatal:false,
    goToLogin : false
  }
  const errorPopUp:GlobalPopStore = {
    active :true,
    icon:'fatal',
    title:'오류에요.',
    description : '알 수 없는 오류',
    fatal:true,
    goToLogin :false
  }

  const getQuizData = async():Promise<void>=>{
    try{
      const result = await axios.get('/api/quiz/get_random')
      setNowQuiz(result.data)
    }
    catch(err){
      alert(err);
      navigate('/')
    }
  }

  const submitAnswer = async (idx:number)=>{
    try{
      console.log({id:nowQuiz.id, answer:nowQuiz.options[idx]})
      const result = await axios.post('/api/quiz/answer_check', {id:nowQuiz.id, answer:nowQuiz.options[idx]})
      console.log(result);
      const message = result.data.message;
      if(!result.data.stat) openPop({...errorPopUp, description:message}, dispatch) //서버err
      if(result.data.result) {
        openPop({...correctPopUp, title:message}, dispatch); //정답
        dispatch(earnPoint_reducer())
        await getQuizData()
      }
      else if(!result.data.result){
        openPop({...inCorrectPopUp, title:message}, dispatch) //오답
        dispatch(lostPoint_reducer())
        await getQuizData()
      }
      else{
        throw new Error('알 수 없는 에러')
      }
    }
    catch(err){
      console.error(err)
      openPop(errorPopUp, dispatch) //err
    }
  }

  useEffect(()=>{ // get Info setting with 
    const getMyInfo = async ():Promise<void>=>{
      try{
        const result:any = await axios.get('/api/auth/get_my_info')
        if(result.data.stat) dispatch(setUserInfo_reducer(result.data.data))
      }
      catch(err){
        open_ShouldLoginPopup(dispatch)
        dispatch(deleteUserInfo_reducer())
      }
    }
    getMyInfo();
  },[dispatch])

  useEffect(()=>{
    getQuizData()
  },[])

  return (
    <div className="quiz_page">
      
      <div className='quiz_img_wrap'>
        <div className="quiz_img_box">
          <img src="/images/quizImg1.png" alt="" />
        </div>
        {
          storeState.globalPop.active ? null :
          <div className="quiz">
            <div className="category">
              {nowQuiz.category}
            </div>
            <div className="quiz_box">
              {nowQuiz.quiz}
              {
                nowQuiz.options.map((item:string,idx:number) => {
                  return(
                    <button onClick={e => {submitAnswer(idx)}} key={item}>{item}</button>
                  )
                })
              }
            </div>
          </div>
        }
        <div className="quiz_img_box flex">
          <div className="my_info">
            <div className="nickname">{storeState.userInfo.nickname}</div>
            <p className="point">현재 포인트<br /> <span>{storeState.userInfo.point}</span></p>
          </div>
          <img src="/images/quizImg2.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default QuizPage;