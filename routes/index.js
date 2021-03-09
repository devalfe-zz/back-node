import Router from 'express-promise-router';
import userRouter from './user.route';

const router = Router();

router.get('/', function(req, res) {
  res.send('API RUNNING');
});

router.use('/user', userRouter);

export default router;
