import { useState, useEffect } from "react";
import DataPanel from "../components/Admin/DataPanel";
import TestPanel from '../components/Admin/TestPanel';

const Admin = ():React.ReactElement=>{

  const panelMap:{[string:string] : React.ReactElement} = {
    'DataPanel' : <DataPanel/>,
    'TestPanel' : <TestPanel/>
  }
  const [nowPanel, setNowPanel] = useState<string>('DataPanel')

  return (
    <div className="admin_panel">
      <h1>admin Panel</h1>
      {
        Object.keys(panelMap).map(item => {
          return(
            <button onClick={()=>{setNowPanel(item)}} key={item}>go To {item}</button>
          )
        })
      }
      <h2>
        {nowPanel}
      </h2>
      <div className="now_panel">
        {panelMap[nowPanel]}
      </div>
      
      
    </div>
  )
}

export default Admin;