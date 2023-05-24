import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutButton } from '../controllers/auth_controller';

const Header = ():React.ReactElement=>{

  const storeState = useSelector(state => state)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return(
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">LOGO</Navbar.Brand>
      <Nav className="me-auto">
        <Link to='/' className='link'>Home</Link>
        <Link to='/404testasdf' className='link'>404test</Link>
        <Link to='/admin_panel' className='link'>ADMIN PANEL</Link>
      </Nav>
      <Link to='/login' className='link'>LOGIN</Link>
      <Link to='/sign_up' className='link'>SIGNIN</Link>
      <button onClick={()=>{console.log(storeState)}}>현재REDUX check하기</button>
      <button onClick={()=>{logOutButton(navigate, dispatch)}}>로그아웃하기</button>
    </Container>
  </Navbar>
  )
}


export default Header;
