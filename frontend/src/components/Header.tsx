//libs 
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//modules
import { logOutButton } from '../controllers/auth_controller';

//components
import Searcher from './MainPage/Searcher';


const Header = ():React.ReactElement=>{

  const storeState:any = useSelector(state => state)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return(
    <header className="header">
      <div className="auth_sub_header">
        <button onClick={()=>{console.log(storeState)}}>현재REDUX check하기</button>
        {storeState.userInfo.id && <div className="header_nickname">{storeState.userInfo.nickname}</div>}
        <Link to='/privacy'>공지사항</Link>
        { !storeState.userInfo.id ? 
          <>
            <Link to='/login'>LOGIN</Link>
            <Link to='/sign_up'>SIGNUP</Link>
          </> : 
          <button className="logout_button" onClick={()=>{logOutButton(navigate, dispatch)}}>LOGOUT</button> }
      </div>
      
      <Searcher></Searcher>

      <nav className="header_gnb">
        <ul>
          <li><Link to='/'>HOME</Link></li>
          <li><Link to='/quiz'>퀴즈풀기(포인트 벌기)</Link></li>
          <li><Link to='/all_products'>전체상품</Link></li>
          <li><Link to='/event'>이벤트</Link></li>
          { storeState.userInfo.roles === 'root' && 
            <>
            <li><Link to='/admin_panel'>ADMIN PANEL</Link></li>
            <li><Link to='/404testasdf'>404 test</Link></li>
            </> }
        </ul>
        <div className="user_zone">
          <Link className="go_to_cart" to='/cart'>go to my cart</Link>
        </div>
      </nav>
    </header>
  )
}


export default Header;
