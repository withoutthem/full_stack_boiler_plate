import express from 'express';

import { onPayment } from '../controllers/payment_controller';

const paymentRouter = express();



paymentRouter.post('/on_pay', onPayment);


export default paymentRouter;