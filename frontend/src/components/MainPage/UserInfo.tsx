import { useEffect } from "react";
import { useSelector } from "react-redux"

const UserInfo = ():React.ReactElement=>{

  const storeState = useSelector(state => state);
  return(
    <div className="user_info">
      
    </div>
  )
}

export default UserInfo;