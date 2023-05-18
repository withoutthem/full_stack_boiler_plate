import  express from "express";
import {getTableData, getModelList, postModelData} from "../controllers/admin_controller";

const adminRouter = express();

adminRouter.get('/get_model_list', getModelList);
adminRouter.get('/data/:id', getTableData);
adminRouter.post('/post_data', postModelData);

export default adminRouter;