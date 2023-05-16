import { sequelize, initializeAllModels, modelsOrder } from './models';
import { ErrorClass } from './types/ErrorClass';

export const dbConnect = async (): Promise<void> => {
  try{
    await initializeAllModels(modelsOrder);
    const connectResult = await sequelize.sync({force:false});
    if(connectResult){
      console.log('db 연결 성공');
    }
    else{
      throw new ErrorClass(false, 'db연결 에러', 500)
    }
  }
  catch(err){
    console.log(`DB연결 에러 : ${err} at ${__filename}`);
  }
};