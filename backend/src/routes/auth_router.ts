import express from 'express';

import {getMyInfo, loginController, logoutController, signUpController, validateUniqueUserAttributes} from '../controllers/auth_controller';

const authRouter = express();

authRouter.post('/login', loginController);
authRouter.post('/sign_up', signUpController);
authRouter.post('/dupcheck', validateUniqueUserAttributes);
authRouter.get('/get_my_info', getMyInfo);
authRouter.get('/logout', logoutController);

export default authRouter;