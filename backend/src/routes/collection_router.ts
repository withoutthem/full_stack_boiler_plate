
import express from 'express';

import { getMyCollection } from '../controllers/collection_controller';

const collectionRouter = express();



collectionRouter.get('/get_my_collection', getMyCollection);

export default collectionRouter;