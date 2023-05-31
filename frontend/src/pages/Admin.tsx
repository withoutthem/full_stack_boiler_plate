import useStore from '../store';

const Admin = ():React.ReactElement=>{

  const user = useStore(state => state.user)

  const storeCheck = ()=>{console.log(user)}

  return (
    <div className="admin_panel">
      ADMIN
      <button onClick={storeCheck}>STATE CHECK</button>
    </div>
  )
}

export default Admin;