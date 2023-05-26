import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserInfoStore = {
  id : string|null,
  email : string|null,
  nickname : string|null,
  rank : string|null,
  roles : string|null,
  point: number|null
}

export type UserCartStore = {
  user : string|null,
  productId : string[]
}

const userInfo = createSlice({
  name : 'userInfo',
  initialState : {
    id : null,
    email : null,
    nickname : null,
    rank : null,
    roles : null,
    point : null,
  } as UserInfoStore,
  reducers : {
    setUserInfo_reducer(state, action:PayloadAction<UserInfoStore>) {
      const {id, email, nickname, rank, roles, point} = action.payload;
      state.id = id;
      state.email = email;
      state.nickname = nickname;
      state.rank = rank;
      state.roles = roles;
      state.point = point;
    },
    deleteUserInfo_reducer(state){
      state.id = null;
      state.email = null;
      state.nickname = null;
      state.rank = null;
      state.roles = null;    
      state.point = null;
    }
  }
})

const userCart = createSlice({
  name : 'userCart',
  initialState : {
    user : null,
    productId : []
  } as UserCartStore,
  reducers : {
    addCart_reducer(state, action:PayloadAction<{productId:string}>) {
      const {productId} = action.payload;
      state.productId && state.productId.push(productId);
    },
    deleteCart_reducer(state, action:PayloadAction<{productId:string}>){
      const {productId} = action.payload;
      state.productId && state.productId.filter(e => e!==productId)
    }
  }
})


export const { setUserInfo_reducer, deleteUserInfo_reducer } = userInfo.actions;
export const { addCart_reducer , deleteCart_reducer} = userCart.actions;


export default configureStore({
  reducer: {
    userInfo : userInfo.reducer,
    userCart : userCart.reducer
  }
})