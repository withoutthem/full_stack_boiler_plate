import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@mui/material/Button';
// // // Styled component
// const Button = styled.button`
//   /* CSS styles here */
//   background-color: #007bff;
//   color: #fff;
//   padding: 8px 16px;
//   border-radius: 4px;
//   border: none;
//   font-size: 16px;
//   cursor: pointer;
//   position:fixed;
//   bottom:10px;
//   right:10px; 
//   &:hover {
//     background-color: #0056b3;
//   }
// `;


const TESTBUTTONCOMPONENT = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = ['/', '/admin', '/sagongsa'];

  // 다음 페이지로 이동하는 함수
  const goToNextPage = () => {
    const currentIndex = routes.indexOf(location.pathname);
    const nextIndex = (currentIndex + 1) % routes.length; // 다음 인덱스 계산

    navigate(routes[nextIndex]); // 다음 페이지로 이동
  };

  return (
    <Button onClick={goToNextPage}>Next Page</Button>
  );
};

export default TESTBUTTONCOMPONENT;