import axios from "axios";
import { useState, useEffect, useCallback } from "react";

import { EventType } from "@testing-library/react";


const Admin = ():React.ReactElement=>{

  const [modelList, setModelList] = useState<any>();
  const [modelListData, setModelListData] = useState<any>();
  const [tableData, setTableData] = useState<any>();
  const [nowModelViewSwitch, setNowModelViewSwitch] = useState<string>('');

  //API : getModelList
  const getModelList = async ():Promise<void> =>{
    const result = await axios.get('/api/admin/get_model_list'); 
    const listName = Object.keys(result.data);
    const listData = listName.map(name => {
      return result.data[name];
    })
    setModelList(listName)
    setModelListData(listData)
    setNowModelViewSwitch(listName[0])
  }

  //API : getModelData
  const getModelData = async ():Promise<void>=>{
    try{
      if(nowModelViewSwitch) {
        const result = await axios.get(`/api/admin/data/${nowModelViewSwitch}`)
        setTableData(result.data)
      }
    }
    catch(err){
      console.log(err)
    }
  }

  //API : postModel
  const postModel = async (e:React.FormEvent<HTMLFormElement>):Promise<void>=>{
    try{
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const formDataAll = [nowModelViewSwitch,Object.fromEntries(formData.entries())];
      const result = await axios.post('/api/admin/post_data', formDataAll) 
    }
    catch(err){
      console.log(err)
    }
  }

  //API : deleteData
  const deleteData = async()=>{
    
  }

  //HOOKS
  useEffect(()=>{
    getModelList();
  }, [])

  useEffect(()=>{
    getModelData();
  },[nowModelViewSwitch])
  
  return (
    <div className="admin_panel">
      <h1>admin panel</h1>
      <div className="button_zone">
        {
          modelList && modelList.map((list:string) =>{
            return (<button key={list + 'button'} onClick={e => {setNowModelViewSwitch(list)}}>{list}</button>)
          })
        }
      </div>
      <div className="table_zone">
        <h2>{nowModelViewSwitch}</h2>
      <div className="tb_col head">
          {
            tableData && Object.keys(tableData[0]).map((data:any)=>{
              return(
                <div className="tb_row" key={data.toString()}>
                  {data.toString()}
                </div>
              )
            })
          }
        </div>
          {
            tableData && tableData.map((col:any,idx1:number) =>{
              const nowData = Object.values(col);
              return(
                <div className="tb_col" key={idx1 + 'tb_col_inner_key'}>
                  {
                    nowData.map((data:any, idx2:number) => {
                      return (
                        <div className="tb_row" key={data ? data.toString() + idx2 : idx2}>
                          {data ? data.toString() : 'null'}
                        </div>
                      )
                    })
                  }
                  <button className='delete_button'>DELETE</button>
                </div>
              )
            })
          }
      </div>

      <form action="POST" className="input_zone" onSubmit={postModel}>
        {
          modelListData && modelListData.map((dataList:string[], idx:number) => {
            if(modelList[idx] === nowModelViewSwitch){
              return (
                <div className="input_set" key={modelList[idx] + 'input_set'}>
                  <h3 className="input_name" key={modelList[idx]}>{modelList[idx]}</h3>
                  {
                    dataList && dataList.map((list:string) => {
                      return (
                        <div className="input_set" key={list + 'input_set'}>
                          {list} : <input name={list} type="text" key={list + 'input'} onChange={e =>{}}/>
                        </div>
                      )
                    })
                  }
                </div>
                )
            }
          })
        }
        <button type='submit'>SUBMIT</button>
      </form>
      
    </div>
  )
}

export default Admin;