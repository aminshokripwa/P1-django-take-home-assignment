import { Router } from 'express';
import { verifyToken } from '../middleware/verify_token';
import * as truck from '../controllers/truck_controller';

const router = Router();

    router.get('/truck', [ verifyToken], truck.showTruckInformation );

export default router;