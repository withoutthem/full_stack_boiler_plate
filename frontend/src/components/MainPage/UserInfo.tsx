//libs
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
//assets
import sampleImg from '../../assets/images/random_man.png'
const UserInfo = ():React.ReactElement=>{

  const storeState:any = useSelector(state => state);
  const {nickname, email, rank, roles, point} = storeState.userInfo;

  return(
    <>
    <div className="user_info">
      <img className="profile_img" src={sampleImg} alt="" />
      <div className="profile">
        <p className="nickname">{nickname}</p>
        <ul className="info">
          <li className="membership">멤버쉽 : {roles}</li>
          <li className="point">내 포인트 : {point}</li>
          <li className="email">이메일 : {email}</li>
        </ul>
      </div>
    </div>
    <div className="profile_button">
      <Link className='button_cart' to='/cart'>장바구니</Link>
      <Link className='button_collection' to='/collection'>컬렉션</Link>
    </div>
    </>
  )
}

export default UserInfo;