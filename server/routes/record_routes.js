import express from 'express';
import { addRecord, deleteRecord, viewAllRecords, viewMyRecords } from '../controllers/record_controller.js';
import { Authenticate } from '../middlewares/auth.js';

const recordRouter = express.Router();

recordRouter.get('/viewMyRecords',Authenticate,viewMyRecords);
recordRouter.get('/viewAllRecords',Authenticate,viewAllRecords);
recordRouter.post('/addRecord/:userId',Authenticate,addRecord);
recordRouter.delete('/deleteRecord/:id',deleteRecord);

export default recordRouter;