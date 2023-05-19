import { useState, useEffect } from "react";
import DataPanel from "../components/Admin/DataPanel";

const Admin = ():React.ReactElement=>{

  const panelMap:{[string:string] : React.ReactElement} = {
    'DataPanel' : <DataPanel/>,
  }
  const [nowPanel, setNowPanel] = useState<string>('DataPanel')

  return (
    <div className="admin_panel">
      admin Panel
      {panelMap[nowPanel]}
    </div>
  )
}

export default Admin;