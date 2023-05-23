import express from 'express';

import {getMyInfo, loginController, logoutController, signUpController} from '../controllers/auth_controller';

const authRouter = express();

authRouter.post('/login', loginController);
authRouter.post('/sign_up', signUpController);
authRouter.get('/get_my_info', getMyInfo);
authRouter.get('/logout', logoutController);

export default authRouter;