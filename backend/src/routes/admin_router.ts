import  express from "express";
import {getTableData, getModelList, deleteTableData} from "../controllers/admin_controller";

const adminRouter = express();

adminRouter.get('/get_model_list', getModelList);
adminRouter.get('/data/:id', getTableData);
adminRouter.post('/delete_data', deleteTableData);

export default adminRouter;