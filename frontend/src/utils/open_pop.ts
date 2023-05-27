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

export const addCartPopup = (dispatch:Function)=>{
  const data = {
    active: true,
    icon : 'ok',
    title : '장바구니에 담겼어요!',
    description : '장바구니를 확인해보세요.',
    fatal : false,
    goToLogin : false
  }
  dispatch(popOpen_reducer(data))
}

export const addCartPopup_duplicated = (dispatch:Function)=>{
  const data = {
    active : true,
    icon : 'exclam',
    title : '이미 있어요!',
    description : '장바구니에 이미 있는 상품이에요!',
    fatal : false,
    goToLogin : false
  }
  dispatch(popOpen_reducer(data))
}

export const unknownError = (dispatch:Function) =>{
  const data = {
    active : true,
    icon : 'fatal',
    title : '알 수 없는 에러에요.',
    description : '한번만 봐주세요. 열심히 다시 확인해볼게요.',
    fatal : true,
    goToLogin : false
  }
  dispatch(popOpen_reducer(data))
}