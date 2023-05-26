import { useDispatch, useSelector } from "react-redux";
import { GlobalPopStore, popClose_reducer } from '../store';
import { Link, useNavigate } from "react-router-dom";

const GlobalPop = ():React.ReactElement =>{

const dispatch = useDispatch();
const navigate = useNavigate();

const popInfo:any = useSelector(state => state)
const {active, icon, title, description, fatal, goToLogin} = popInfo.globalPop;

  const iconList: {[index:string]: JSX.Element} = {
    question : <img className="icon_img" src='images/icon_question.png' alt="question" />,
    exclam : <img className="icon_img" src="images/icon_exclam.png" alt="exclam" />,
    fatal : <img className="icon_img" src="images/icon_fatal.png" alt="fatal" />,
    ok : <img className="icon_img" src="images/icon_ok.png" alt="ok" />
  }

  const closeClick =(link?:string)=>{
    if(link) navigate(link)
    dispatch(popClose_reducer())
  }

  return(
    <div className="global_pop">
      <div className="pop">
        {iconList[icon]}
        <h4 className="title">{title}</h4>
        <p className="description">{description}</p>
        {
          fatal ? <button onClick={()=>{closeClick('/')}} className="pop_ok_button">메인화면</button> :
          goToLogin ? <button onClick={()=>{closeClick('/login')}} className="pop_ok_button">로그인하기</button> :
          <button onClick={()=>{closeClick()}} className="pop_ok_button">네, 알았어요</button>
        }
        {
          (goToLogin || fatal) ? null : <button className="pop_close_button" onClick={()=>{closeClick()}} ><img src="/images/icon_close.png" alt="" /></button>
        }
      </div>
    </div>
  )
}

export default GlobalPop;