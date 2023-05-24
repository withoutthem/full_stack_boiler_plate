import { ErrorClass } from "../types/ErrorClass";

//NOTE:TEST:OK

//이메일 형식에 맞아야 합니다.
export const emailValidator = (email:string):boolean=>{
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

// 최소 4자 이상, 최대 15자 이하의 길이여야 합니다.
// 적어도 하나의 영문(대문자 또는 소문자)이 포함되어야 합니다.
// 적어도 하나의 숫자가 포함되어야 합니다.
// 특수 문자 중 하나 (!@#$%^&*)가 포함되어야 합니다.
// 알파벳 대소문자, 숫자, 특수 문자 (!@#$%^&*)로만 구성되어야 합니다.
export const passwordValidator = (password:string):boolean =>{
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{4,15}$/;
  return passwordRegex.test(password);
}

// 최소 두 개의 한글 또는 영문이 포함되어야 합니다.
// 한글이 포함된 경우 완성된 글자여야 하며, ㅁ, ㄱ, ㅏ, ㅊ, ㅂ, ㅛ, ㅠ, ㅢ 등의 글자는 허용되지 않습니다.
// 특수 문자는 포함되면 안됩니다.
// 숫자는 포함될 수 있으나, 숫자로만 이루어져서는 안됩니다.
export const nicknameValidator = (nickname:string):boolean =>{
  const nicknameRegex = /^[가-힣a-zA-Z\d]*$/;
  if(nickname.length < 2 || nickname.length >= 15) return false;
  return nicknameRegex.test(nickname);
}

export const generalValidator = (email:string, password:string, nickname?:string)=>{
  if(!emailValidator(email)) return new ErrorClass(false, '이메일 형식에 맞지 않습니다', 400);
  if(!passwordValidator(password)) return new ErrorClass(false, '비밀번호 형식에 맞지 않습니다', 400)
  if(nickname && !nicknameValidator(nickname)) return new ErrorClass(false, '닉네임이 형식에 맞지 않습니다', 400)
  return true
}