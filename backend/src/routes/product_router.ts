import express from 'express';

import { getProductData, getProductDataByQuery, getProductDataByLikes } from '../controllers/product_controller';

const productRouter = express();

productRouter.get('/get_product', getProductData);
productRouter.get('/get_product_by_query', getProductDataByQuery)
productRouter.get('/get_product_by_likes', getProductDataByLikes)
export default productRouter;