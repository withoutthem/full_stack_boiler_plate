//libs 
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//modules
import { logOutButton } from '../controllers/auth_controller';
import { openPop } from '../utils/open_pop';
import {TiShoppingCart} from 'react-icons/ti';

//components
import Searcher from './MainPage/Searcher';


const Header = ():React.ReactElement=>{

  const storeState:any = useSelector(state => state)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const testPopUpData = {
    active : true,
    icon : 'question',
    title : 'testTitle',
    description : 'this is test Description of pop up',
    fatal : false,
    goToLogin : false
  }

  return(
    <header className="header">
      <div className="auth_sub_header">
        <button onClick={()=>{openPop(testPopUpData, dispatch)}}>글로벌팝업 열어보기</button>
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
          <li><Link to='/collection'>컬렉션</Link></li>
          <li><Link to='/event'>이벤트</Link></li>
          { storeState.userInfo.roles === 'root' && 
            <>
            <li><Link to='/admin_panel'>ADMIN PANEL</Link></li>
            <li><Link to='/404testasdf'>404 test</Link></li>
            </> }
        </ul>
        <div className="user_zone">
          <Link className="go_to_cart" to='/cart_page'>
            <TiShoppingCart className="header_cart_icon"/>
            {
              storeState.userCart.productId.length !== 0 ? <div className="count_badge"><span>{storeState.userCart.productId.length}</span></div>  : null
            }
            </Link>
        </div>
      </nav>
    </header>
  )
}


export default Header;
