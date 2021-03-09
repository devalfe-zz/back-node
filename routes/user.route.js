import Router from 'express-promise-router';
import controllers from '../controllers';

const router = Router();
router.post('/add', controllers.User.add);
router.get('/query', controllers.User.query);
router.get('/list', controllers.User.list);
router.put('/update', controllers.User.update);
router.delete('/remove', controllers.User.remove);
router.put('/activate', controllers.User.activate);
router.put('/deactivate', controllers.User.deactivate);
router.post('/login', controllers.User.login);

export default router;
