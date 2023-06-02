
import highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'  
import { useRef,useState } from 'react'
import { useStore } from 'zustand';

const options: Highcharts.Options = {
  title: {
    text: 'My chart',
  },
  series: [
    {
      type: 'bar',
      data: [1, 2, 3],
    },
  ],
};
const ChartPage = (props:HighchartsReact.Props):React.ReactElement=>{

    

    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    return (
        <div>
            <HighchartsReact options={options} highcharts={highcharts} ref={chartComponentRef} {...props}></HighchartsReact>
        </div>
    )
}

export default ChartPage;