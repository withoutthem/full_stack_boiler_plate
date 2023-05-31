import { useNavigate } from 'react-router-dom';

const SagongSa = ():React.ReactElement=>{

  const navigate = useNavigate()
  const getBack = ():void=>{
    navigate(-1)
  }

  return (
    <div className="sagongsa">
      <button onClick={getBack} className="get_back_button">돌아가기</button>
      <p>페이지를 찾을수없어요</p>
    </div>
  )
}

export default SagongSa;