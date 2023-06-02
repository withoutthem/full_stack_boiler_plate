
//libs
import { useNavigate, useLocation } from 'react-router-dom';
//css
import { styled } from '@mui/material';
import Button from '@mui/material/Button';

const StyledTESTBUTTON = styled(Button)(({ theme }) => ({
  theme,
  width: '200px',
  height: '100px',
  backgroundColor: '#1e1e1e',
  color: '#fff',
  fontSize: '20px',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#e6e6e6',
    color: '#101010',
    border: '1px solid #101010'
  },
  position: 'fixed',
  bottom: '10px',
  right: '10px'
}));

const TESTBUTTONCOMPONENT = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    '/', 
    '/admin',
    '/data_grid', 
    '/tab_menu',
    '/chart',
    '/sagongsa',
  ];

  // 다음 페이지로 이동하는 함수
  const goToNextPage = () => {
    const currentIndex = routes.indexOf(location.pathname);
    const nextIndex = (currentIndex + 1) % routes.length; // 다음 인덱스 계산

    navigate(routes[nextIndex]); // 다음 페이지로 이동
  };

  return (
    <StyledTESTBUTTON onClick={goToNextPage}>Next Page</StyledTESTBUTTON>
  );
};

export default TESTBUTTONCOMPONENT;