import models from '../models';
import bcrypt from 'bcryptjs';
import token from '../services/token';
import formidable from 'formidable';

export default {
  login: async (req, res, next) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send({
          status: 0,
          type: 'FORM_DATA_ERROR',
          message: 'Error de información del formulario'
        });
        return;
      }

      const { email, password, state = 1 } = fields;
      try {
        if (!email) {
          throw new Error('El email es requerido');
        } else if (!password) {
          throw new Error('Error de parámetro de contraseña');
        }
      } catch (e) {
        // console.log(err.message, err);
        res.send({
          status: 0,
          type: 'GET_ERROR_PARAM',
          message: e.message
        });
        return;
      }
      try {
        const exists = await models.User.findOne({
          email: email,
          state: 1
        });
        if (exists) {
          const match = await bcrypt.compare(password, exists.password);
          if (match) {
            const tokenReturn = await token.encode(exists._id);
            res.status(200).json({ exists, tokenReturn });
          } else {
            res.status(404).send({
              message: 'Password Incorrecto'
            });
          }
        } else {
          res.status(404).send({
            message: 'No existe el User'
          });
        }
      } catch (e) {
        res.status(500).send({
          message: 'Ocurrió un error'
        });
        next(e);
      }
    });
  }
};
