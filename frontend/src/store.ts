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

export type CartOnlyFour = {
  items : string[] | null
}

export type GlobalPopStore = {
  active : boolean,
  icon : string,
  title : string,
  description : string,
  fatal : boolean,
  goToLogin : boolean
}

//userInfo
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
    },
    earnPoint_reducer(state) {
      state.point && (state.point += 50);
    },
    lostPoint_reducer(state){
      state.point && (state.point -= 30);
    },
    lostPointByPayment(state, action:PayloadAction<number>){
      if(state.point){
        state.point -= action.payload;
      }
    }
  }
})

//userCart
const userCart = createSlice({
  name : 'userCart',
  initialState : {
    user : null,
    productId : []
  } as UserCartStore,
  reducers : {
    setCart_reducer(state, action:PayloadAction<{user : string, productId:string[]}>) {
      const {user, productId} = action.payload;
      state.user = user;
      state.productId = productId;
    },
    clearCart_reducer(state){
      state.user = null;
      state.productId = [];
    },
    addCart_reducer(state, action:PayloadAction<{productId:string}>) {
      const {productId} = action.payload;
      state.productId && state.productId.push(productId);
    },
    deleteCart_reducer(state, action:PayloadAction<{productId:string}>){
      const {productId} = action.payload;
      state.productId && state.productId.filter(e => e!==productId)
    },
    deleteCartItems_reducer(state, action:PayloadAction<{products:string[]}>){
      const {products} = action.payload;
      state.productId = state.productId.filter(id => !products.includes(id))
    }
  }
})

//only four cart items for mainPage side bar
const userCartFour = createSlice({
  name : 'userCartFour',
  initialState : {
    items : []
  } as CartOnlyFour,
  reducers : {
    setCartFour_reducer(state:any, action:PayloadAction<CartOnlyFour>) {
      state.items = action.payload;
    },
    clearAllFour_reducer(state:any){
      state.items = [];
    },
    addCartFour_reducer(state:any, action:PayloadAction<any>){
      state.items.push(action.payload);
    }
  }
})

//global_pop
const globalPop = createSlice({
  name : 'globalPop',
  initialState : {
    active : false,
    icon : '/images/icon_question.png',
    title : '',
    description:'',
    fatal : false,
    goToLogin : false,
  } as GlobalPopStore,
  reducers : {
    popOpen_reducer(state, action:PayloadAction<GlobalPopStore>) {
      const {active, icon, title, description, fatal, goToLogin} = action.payload;
      state.active = active;
      state.icon = icon;
      state.title = title;
      state.description = description;
      state.fatal = fatal;
      state.goToLogin = goToLogin;
    },
    popClose_reducer(state){
      state.active = false;
    }
  }
})

export const { setUserInfo_reducer, deleteUserInfo_reducer, earnPoint_reducer, lostPoint_reducer,lostPointByPayment } = userInfo.actions;
export const { addCart_reducer , deleteCart_reducer, setCart_reducer, clearCart_reducer, deleteCartItems_reducer} = userCart.actions;
export const { popOpen_reducer, popClose_reducer } = globalPop.actions;
export const { setCartFour_reducer, clearAllFour_reducer, addCartFour_reducer, } = userCartFour.actions;

export default configureStore({
  reducer: {
    userInfo : userInfo.reducer,
    userCart : userCart.reducer,
    globalPop : globalPop.reducer,
    userCartFour : userCartFour.reducer
  }
})