import sagongsaImg from '../assets/images/404page.webp';
import { useNavigate } from 'react-router-dom';

const SagongSa = ():React.ReactElement=>{

  const navigate = useNavigate()
  const getBack = ():void=>{
    navigate(-1)
  }

  return (
    <div className="sagongsa">
      <img src="/images/sagongsa.png" alt="404 page" />
      <button onClick={getBack} className="get_back_button">돌아가기</button>
      <p>페이지를 찾을수없어요</p>
    </div>
  )
}

export default SagongSa;