// StyledSideBarWrap.tsx
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';



const StyledSideBarWrap = styled(Box)(({ theme}) => ({
  width: '350px',
  height: '100%',
  padding: '30px',
  backgroundColor: '#1e1e1e',
  color: '#fff',
  theme
}));

export default StyledSideBarWrap;