import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setInfoAll } from "../utils/set_info";
import Card from "../components/Card";
import { open_ShouldLoginPopup } from '../utils/open_pop';
import { BsBagCheckFill } from 'react-icons/bs';

const Collection = ():React.ReactElement=>{

  const dispatch = useDispatch();

  const [myCollection, setMyCollection] = useState<[]>();

  const getCollectionById = async ()=>{
    try{
      const response:any = await setInfoAll(dispatch)
      console.log(response)
      if(!response) return open_ShouldLoginPopup(dispatch)
      const result = await axios.get('/api/collection/get_my_collection');
      setMyCollection(result.data);
      console.log(result.data)
    }
    catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    getCollectionById()
  },[])

  return(
    <div className="collection_page_wrap">
      <h3>컬렉션</h3>
      <div className="collection_page">
        {
          myCollection && myCollection.map((item:any) =>{
            return(
              <>
              <div className="collection_card">
                <div className="count"><BsBagCheckFill></BsBagCheckFill> <span>{item.count}</span></div>
                <Card {...item.Product} key={item.Product.id} ></Card>
              </div>
              </>
            )
          })
        }
      </div>
    </div>
  )
}

export default Collection;