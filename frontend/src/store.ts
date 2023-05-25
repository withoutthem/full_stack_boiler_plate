import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserInfoStore = {
  id : string|null,
  email : string|null,
  nickname : string|null,
  rank : string|null,
  roles : string|null
}

const userInfo = createSlice({
  name : 'userInfo',
  initialState : {
    id : null,
    email : null,
    nickname : null,
    rank : null,
    roles : null
  } as UserInfoStore,
  reducers : {
    setUserInfo_reducer(state, action:PayloadAction<UserInfoStore>) {
      const {id, email, nickname, rank, roles} = action.payload;
      state.id = id;
      state.email = email;
      state.nickname = nickname;
      state.rank = rank;
      state.roles = roles;
    },
    deleteUserInfo_reducer(state){
      state.id = null;
      state.email = null;
      state.nickname = null;
      state.rank = null;
      state.roles = null;    
    }
  }
})

export const { setUserInfo_reducer, deleteUserInfo_reducer } = userInfo.actions;

export default configureStore({
  reducer: {
    userInfo : userInfo.reducer
  }
})