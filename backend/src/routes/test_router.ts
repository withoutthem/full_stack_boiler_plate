import express from 'express'
const testRouter = express.Router();

import {testController} from '../controllers/test_controller';

testRouter.get('/', testController)


export default testRouter;