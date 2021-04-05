import Router from 'express-promise-router';
import userRouter from './user.route';
import authRouter from './auth.route';

const router = Router();

router.get('/', function(req, res) {
  res.send('API RUNNING');
});

router.use('/user', userRouter);
router.use('/auth', authRouter);

export default router;
