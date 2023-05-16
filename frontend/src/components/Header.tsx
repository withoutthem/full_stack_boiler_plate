import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Header = ():React.ReactElement=>{
  return(
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">LOGO</Navbar.Brand>
      <Nav className="me-auto">
        <Link to='/' className='link'>Home</Link>
        <Link to='/404testasdf' className='link'>404test</Link>
        <Link to='/login' className='link'>login</Link>
      </Nav>
    </Container>
  </Navbar>
  )
}


export default Header;
