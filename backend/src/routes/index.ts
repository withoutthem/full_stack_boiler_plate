import {Express} from 'express';
import path from 'path';
import {logger} from '../utils/logger';

import adminRouter from './admin_router';
import authRouter from './auth_router';
import productRouter from './product_router'

const mainRouter = (app :Express):void=>{
  
  app.use('/api/auth', authRouter)
  app.use('/api/admin', adminRouter);
  app.use('/api/product', productRouter);

  //404 To Front Router
  app.get('*', (req,res) =>{
    res.status(404);
    logger(req, res, '404', 'Main_Router')
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});
}

export default mainRouter;