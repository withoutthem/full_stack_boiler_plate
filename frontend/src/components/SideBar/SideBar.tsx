//libs
import { useState } from 'react';

//css
import { Button, Box } from '@mui/material';
import {SwipeableDrawer} from '@mui/material';

//styledComponents
import StyledSideBarWrap from './_StyledSideBarWrap';

const SideBar = ():React.ReactElement=>{
  
  const [sideBarSwitch, setSideBarSwitch] = useState<boolean>(false);

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setSideBarSwitch(open);
    };


  return(
    <>
    <Button onClick={toggleDrawer(true)}>SIDEBAROPENBUTTON</Button>
    <SwipeableDrawer
      anchor={'left'}
      open={sideBarSwitch}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      {/* sx를 사용하면 custom css를 props의 형태로 component에 override 할 수 있다. */}
      <StyledSideBarWrap sx={{background:'red', color:'#101010', }}> 
        sample TEXT
      </StyledSideBarWrap>
    </SwipeableDrawer>
    </>
  )
}

export default SideBar;