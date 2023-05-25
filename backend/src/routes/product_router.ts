import express from 'express';

import { getProductData, getProductDataByQuery } from '../controllers/product_controller';

const productRouter = express();

productRouter.get('/get_product', getProductData);
productRouter.get('/get_product_by_condition', getProductDataByQuery)

export default productRouter;