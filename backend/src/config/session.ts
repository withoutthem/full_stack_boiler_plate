export const sessionOption = {
  resave :false,
  saveUninitialized : false,
  secret : process.env.COOKIE_SECRET ? process.env.COOKIE_SECRET : 'ERROR',
  cookie : {
    httpOnly : true,
    secure : false //https 적용할 때 true로 변경
  }
}