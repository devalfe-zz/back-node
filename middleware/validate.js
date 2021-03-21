import { validationResult } from 'express-validator';

export default {
  validateResult: async (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(404).send({
        error: errores.mapped()
      });
    }
    next();
  }
};
