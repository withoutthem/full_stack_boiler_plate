import { useState, useEffect } from "react"
import axios from 'axios';

const DataPanel = ():React.ReactElement=>{

  const [nowViewModel, setNowViewModel] = useState<string>('privilege.ts') // view Switch
  const [fileNameList, setFileNameList] = useState<any>(); // fileName list .ts
  const [nowAllData, setNowAllData] = useState<any[]>([]); // all Data
  const [columnListData, setColumnListData] = useState<string[]>([]);

  //API
  const getListData = async ()=>{
    const result = await axios.get('/api/admin/get_model_list');
    console.log(result.data);
    setFileNameList(result.data)
  }
  
  const getTableData = async (id:string)=>{
    const result = await axios.get(`/api/admin/data/${id}`);
    console.log(result.data);
    if(!result.data || result.data.length === 0){
      setNowAllData([]);
      setColumnListData([]);
      return
    } 
    const nowColumnData = Object.keys(result.data[0])
    setColumnListData(nowColumnData);
    setNowAllData(result.data);
  }

  const deleteData = async (fileName:string, primaryKey:string, primaryValue:string)=>{
    const result = await axios.post(`/api/admin/delete_data`, [fileName,{primaryKey, primaryValue}]);
    if(result.status === 200) {
      setNowAllData(nowAllData.filter(item =>item[primaryKey] !== primaryValue))
    }
    console.log(result.data);
  }

  const postExampleData = async(model:string)=>{
    const result = await axios.get(`/api/admin/example/${model}`);
    console.log(result)
  }

  //HOOKS
  useEffect(()=>{
    getListData()
  },[])

  useEffect(()=>{
    getTableData(nowViewModel)
  },[nowViewModel])

  return (
    <div className="data_panel">
      datapanel
      <div className="h2">{nowViewModel}</div>
      {nowViewModel === 'user.ts' && <button onClick={()=>{postExampleData(nowViewModel)}} className="example_button">ExampleData Push</button>}
      {
        fileNameList && Object.keys(fileNameList).map((data:string, idx:number)=>{
          return(
            <button key={data + 'button'} onClick={()=>{setNowViewModel(data)}}>{data}</button>
          )
        })
      }

      <div className="table_area">
        <div className="table_col colhead">
          {
            columnListData && columnListData.map((data:string, idx:number)=>{
              return (
                <div key={data + 'colHead'} className='table_row'>
                  {data}
                </div>
              )
            })
          }
        </div>

        {
          nowAllData && nowAllData.map((col:any , idx1:number)=>{
            const primaryKey = fileNameList[nowViewModel][0]
            return (
              <div className="table_col" key={idx1 +'table_col'}>
                {Object.values(col).map((row:any, idx2:number)=>{
                  return (
                    <div className="table_row" key={row ? row.toString()+idx2 : 'null' +idx1 + idx2 + 'table_row'}>
                      {row ? row.toString() : '0'}
                    </div>
                  )
                })}
                <button className="delete_button" key={idx1 + 'delbtn'} onClick={()=>{deleteData(nowViewModel, primaryKey, col&&col[primaryKey])}}>DELETE</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default DataPanel;