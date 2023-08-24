import express from 'express';
import { deleteStockItem, stockAdd, viewAllStocks } from '../controllers/stock_controller.js';

const stockRouter = express.Router();

stockRouter.put('/incrementCount',);
stockRouter.put('/decrementCount',)
stockRouter.post('/addInfo',stockAdd);
stockRouter.get('/viewStock',viewAllStocks);
stockRouter.delete('/delStock/:stockId',deleteStockItem);

export default stockRouter;