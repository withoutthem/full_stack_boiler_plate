//css
import { Box } from '@mui/material';

const SampleBox = ({num, children}:any):React.ReactElement=>{
  return (
    <Box sx={{width:'100%', height:'300px', backgroundColor:'#666', color:'#fff', borderRadius:'3px'}}>
      SAMPLEBOX {num && num}<br></br>
      {children && children}
    </Box>
  )
}

export default SampleBox;