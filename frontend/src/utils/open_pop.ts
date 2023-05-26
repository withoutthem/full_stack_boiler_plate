import {GlobalPopStore, popOpen_reducer} from '../store';

export const openPop = (data:GlobalPopStore, dispatch:Function)=>{
  dispatch(popOpen_reducer(data))
} 

export const open_ShouldLoginPopup = (dispatch:Function)=>{
  const data = {
    active:true, 
    icon:'exclam', 
    title:'로그인이 필요합니다.', 
    description : '로그인을 해주세요', 
    fatal:false, 
    goToLogin: true
  }
  dispatch(popOpen_reducer(data))
} 
