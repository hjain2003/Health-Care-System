import express from 'express';
import { deleteStockItem, editStockCount, stockAdd, viewAllStocks } from '../controllers/stock_controller.js';

const stockRouter = express.Router();

stockRouter.post('/addInfo',stockAdd);
stockRouter.get('/viewStock',viewAllStocks);
stockRouter.delete('/delStock/:stockId',deleteStockItem);
stockRouter.put('/editCount/:stockId', editStockCount);

export default stockRouter;