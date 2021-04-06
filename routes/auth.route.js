import Router from 'express-promise-router';
import Controllers from '../controllers';
const router = Router();

router.post('/login', Controllers.Auth.login);

export default router;
