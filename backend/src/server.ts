import app from './app';
import {Express} from 'express';
import {dbConnect} from './db';

const port = process.env.PORT || 4500;

const startServer = (app: Express):void=>{
  app.listen(port, ()=>{
    console.log(`${port}에서 server start`)
  })
}

const startServerWithConnect = async (app:Express):Promise<void> => {
  try{
    await dbConnect();
    startServer(app);
  }
  catch(err){
    console.log(`최상위 커넥트 error : ${err}`)
  }
}

startServerWithConnect(app);