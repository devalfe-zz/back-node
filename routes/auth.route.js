import Router from 'express-promise-router';
import Controllers from '../controllers';
import { check } from 'express-validator';
import Middleware from '../middleware';
const router = Router();

router.post('/login', Controllers.Auth.login);

export default router;
