import MainSwiper from "../components/MainPage/MainSwiper";
import UserInfo from '../components/MainPage/UserInfo';

const MainPage = ():React.ReactElement=>{
  return (
    <div className="main_page">
      <div className="hero_wrap">
        <div className="hero_banner">
        <MainSwiper></MainSwiper>
        </div>
        <div className="user_interface">
          <UserInfo></UserInfo>
        </div>
      </div>
    </div>
  )
}

export default MainPage;