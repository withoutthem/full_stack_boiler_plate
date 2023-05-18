export const corsOption = {
  origin: (origin:string | undefined, callback:(err:Error | null, allow?: boolean) => void):void =>{
      if(origin === `http://localhost:3500` || !origin){ //허용 주소
          callback(null, true)
      }
      else{
          callback(new Error('Not allowed by CORS maybe 씨부럴'))
      }
  },
  methods : ['GET', 'POST'],
  credentials: true,  // true시 설정 내용을 응답헤더에 추가해 줌
  optionSuccessStatus : 200
}

