import Router from 'express-promise-router';
import Controllers from '../controllers';
const router = Router();
router.post(
  '/add',
  // [
  //   check('email', 'El email no es valido').isEmail(),
  //   Middleware.Validate.validateResult
  // ],
  Controllers.User.add
);
router.get('/list', Controllers.User.list);
router.put('/update/:uid', Controllers.User.update);
router.delete('/remove/:uid', Controllers.User.remove);
router.get('/query', Controllers.User.query);
router.put('/activate', Controllers.User.activate);
router.put('/deactivate', Controllers.User.deactivate);

export default router;
