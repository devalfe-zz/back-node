import Router from 'express-promise-router';
import Controllers from '../controllers';
import { check } from 'express-validator';
import Middleware from '../middleware';
const router = Router();
router.post(
  '/add',
  [
    check('name', 'El nombre es requerido')
      .not()
      .isEmpty(),
    check('password', 'El password es requerido')
      .not()
      .isEmpty(),
    check('email', 'El email es requerido')
      .not()
      .isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    Middleware.Validate.validateResult
  ],
  Controllers.User.add
);
router.get('/list', Controllers.User.list);
router.put('/update', Controllers.User.update);
router.delete('/remove', Controllers.User.remove);
router.get('/query', Controllers.User.query);
router.put('/activate', Controllers.User.activate);
router.put('/deactivate', Controllers.User.deactivate);
router.post('/login', Controllers.User.login);

export default router;
