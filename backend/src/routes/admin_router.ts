import express from 'express'
import adminController from '../controllers/admin_controller';

const adminRouter = express();

adminRouter.get('/', adminController)

export default adminRouter;