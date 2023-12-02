import { Router } from 'express';
import * as user from '../controllers/user_controller';

const router = Router();

    router.post('/user', user.createUser ); 

export default router;