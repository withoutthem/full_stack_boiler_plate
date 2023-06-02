import Grid from "@mui/material/Unstable_Grid2";
import SampleBox from "./SampleBox";
import { Box } from "@mui/material";

const GridSample = ():React.ReactElement=>{
  return (
    <Box sx={{flexGrow:1}}>
    <Grid container spacing={2} rowSpacing={5} columnSpacing={2}>
      <Grid xs={3}>
        <SampleBox num={3}>xs=3</SampleBox>
      </Grid>
      <Grid xs={4}>
        <SampleBox num={4}>xs=4</SampleBox>
      </Grid>
      <Grid xs={5}>
        <SampleBox num={5}>xs=5</SampleBox>
      </Grid>
      <Grid xs={2}>
        <SampleBox num={2}>xs=2</SampleBox>
      </Grid>
      <Grid xs={2}>
        <SampleBox num={2}>xs=2</SampleBox>
      </Grid>
      <Grid xs={4}>
        <SampleBox num={4}>xs=4</SampleBox>
      </Grid>
      <Grid xs={3}>
        <SampleBox num={3}>xs=3</SampleBox>
      </Grid>
      <Grid xs={1}>
        <SampleBox num={1}>xs=1</SampleBox>
      </Grid>
      <Grid xs={2}>
        <SampleBox num={2}>xs=2</SampleBox>
      </Grid>
    </Grid>
    </Box>
  )
}

export default GridSample;