import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';


//interfaces
import {SetState, User, SampleDataType, BannerType, StoreState, Actions} from './types/StoreTypes';

//sample data
import allData from './sampleData.json';
const {sampleUser, sampleData, sampleType} = allData;

const store = (set:SetState)=>{
  //ACTIONS
  const setUser = (user:User) => set(state => {
    state.user = user;
    return state;
  });
  const setSampleData = (data:SampleDataType[]) => set(state => {
    state.sampleData = data;
    return state;
  });
  const setBannerType = (type:BannerType) => set(state => {
    state.bannerType = type;
    return state;
  });

  //GLOBAL STORE
  return {
    //user
    user: sampleUser,
    setUser : setUser,

    //sampleData
    sampleData: sampleData,
    setSampleData: setSampleData,

    //type
    bannerType: sampleType,
    setBannerType: setBannerType
  }
}

const useStore = create(
  immer<StoreState & Actions>(store)
)

export default useStore; 