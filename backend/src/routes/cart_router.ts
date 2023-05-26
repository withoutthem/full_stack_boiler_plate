import express from 'express';

import { getCartInfo, postCartInfo, deleteCartInfo } from '../controllers/cart_controller';

const authRouter = express();



authRouter.post('/get_cart_info', getCartInfo);
authRouter.post('/post_cart_info', postCartInfo);
authRouter.delete('/delete_cart_info', deleteCartInfo);

export default authRouter;