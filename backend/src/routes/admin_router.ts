import  express from "express";
import { getTableData, getModelList, deleteTableData, postExampleData, postExampleData2 } from '../controllers/admin_controller';

const adminRouter = express();

adminRouter.get('/get_model_list', getModelList);
adminRouter.get('/data/:id', getTableData);
adminRouter.post('/delete_data', deleteTableData);

//EXAMPLE PRODUCTDATA 
adminRouter.get('/exampledata', postExampleData);
adminRouter.get('/exampledata2', postExampleData2);

export default adminRouter;