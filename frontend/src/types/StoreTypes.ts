import { StoreApi } from "zustand";

export type SetState = StoreApi<StoreState>['setState']

export interface User{
  email: string;
  nickname: string;
  age:number;
}

export interface SampleDataType{
  id: string;
  dataType : string;
  data: any;
  expireDate: string;
}

export interface BannerType{
  type: string;
  message: string;
}

//전체 StoreState
export interface StoreState {
  user : User | null;
  sampleData: SampleDataType[];
  bannerType: BannerType;
}

//전체 Actions
export interface Actions {
  setUser : (user:User) => void;
  setSampleData : (data:SampleDataType[]) => void;
  setBannerType : (type:BannerType) => void;
}