import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ():React.ReactElement=>{

  const storeState = useSelector(state => state)
  const navigate = useNavigate();

  const logOutButton = async()=>{
    const result = await axios.get('/api/auth/logout')
    console.log(result);
    if(result.data.stat) {
      alert(result.data.message)
      navigate('/')
    }
    else alert(result.data.message);
  }

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
      <button onClick={logOutButton}>로그아웃하기</button>
    </Container>
  </Navbar>
  )
}


export default Header;
