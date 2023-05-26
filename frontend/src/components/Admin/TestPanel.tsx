import axios from 'axios';

const TestPanel = ():React.ReactElement=>{

  const massiveDataCreate = async ()=>{
    try{
      const result = await axios.get('/api/admin/exampledata')
      console.log(result)
    }
    catch(err){
      console.error(err)
    }
  }
  const massiveDataCreate2 = async ()=>{
    try{
      const result = await axios.get('/api/admin/exampledata2')
      console.log(result)
    }
    catch(err){
      console.error(err)
    }
  }

  return (
    <div className="test_panel">
      <button onClick={massiveDataCreate}>MASSIVE PRODUCT DATA CREATE BUTTON</button>
      <button onClick={massiveDataCreate2}>MASSIVE QUIZ DATA CREATE BUTTON</button>
    </div>
  )
}

export default TestPanel;