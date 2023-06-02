import useStore from '../store';
import { SampleDataType } from '../types/StoreTypes';
import {v4 as uuidv4} from 'uuid';

const Admin = ():React.ReactElement=>{

  const state = useStore(state => state)

  const storeCheck = ()=>{console.log(state)}
  const storeChange = ()=>{
    state.setSampleData(
      state.sampleData.map((item:SampleDataType, idx:number) => {
        return {...item, id : uuidv4(), data : Math.floor(Math.random()*100).toString()}
      })
    )
  }
  return (
    <div className="admin_panel">
      ADMIN
      <div>
        {
          state.sampleData.map(item => {
            return(
              <div key={item.id} style={{display:'flex'}}>
                <p>{item.id}</p>
                <p>{item.data}</p>
              </div>
            )
          })
        }
      </div>
      <button onClick={storeCheck}>STATE CHECK</button>
      <button onClick={storeChange}>STATE CHANGE</button>
    </div>
  )
}

export default Admin;