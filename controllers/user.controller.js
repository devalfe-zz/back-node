import models from '../models';
import bcrypt from 'bcryptjs';
import token from '../services/token';
import formidable from 'formidable';

export default {
  add: async (req, res, next) => {
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
      const { name, password, email } = fields;
      try {
        if (!name) {
          throw new Error('El nombre es requerido');
        } else if (!password) {
          throw new Error('El password es requerido');
        } else if (!email) {
          throw new Error('El email es requerido');
        }
      } catch (error) {
        res.send({
          status: 0,
          type: 'GET_ERROR_PARAM',
          message: error.message
        });
        return;
      }
      try {
        const salt = bcrypt.genSaltSync();
        const cryPassword = bcrypt.hashSync(password, salt);
        const exists = await models.User.findOne({ email: email });
        if (exists) {
          return res.send({
            status: 0,
            type: 'EMAIL_HAS_EXIST',
            message: 'Email ya se encuentra registrado'
          });
        }
        const newUser = {
          name,
          password: cryPassword,
          email
        };
        const reg = await models.User.create(newUser);
        res.status(200).json(reg);
      } catch (e) {
        res.status(500).send({
          status: 0,
          type: 'USER_ADD_FAILED',
          message: e.message
        });
        next(e);
      }
    });
  },
  list: async (req, res, next) => {
    try {
      const valor = req.query.valor;
      const reg = await models.User.find(
        {
          $or: [
            { name: new RegExp(valor, 'i') },
            { email: new RegExp(valor, 'i') }
          ]
        },
        { createdAt: 0 }
      ).sort({ createdAt: -1 });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      });
      next(e);
    }
  },
  update: async (req, res, next) => {
    const uid = req.params.uid;
    if (!uid) {
      res.send({
        status: 0,
        type: 'ERROR_USERID',
        message: 'user_id error de parámetro'
      });
      return;
    }
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send({
          status: 0,
          type: 'FORM_ERROR',
          message: 'Error de información del formulario'
        });
        return;
      }

      const { name, password, email, state, role } = fields;
      try {
        if (!name) {
          throw new Error('El nombre es requerido');
        } else if (!password) {
          throw new Error('El password es requerido');
        } else if (!email) {
          throw new Error('El email es requerido');
        } else if (!state) {
          throw new Error('El state es requerido');
        } else if (!role) {
          throw new Error('El role es requerido');
        }
        const inPassword = fields.password;
        const exists = await models.User.findById({ _id: uid });
        if (inPassword != exists.password) {
          const salt = bcrypt.genSaltSync();
          const newPassword = bcrypt.hashSync(password, salt);
          const newData = { name, password: newPassword, email, state, role };
          await models.User.findByIdAndUpdate(
            { _id: uid },
            {
              $set: newData
            }
          );
          res.send({
            status: 1,
            success: 'Se logró modificar la información'
          });
        }
      } catch (e) {
        res.send({
          status: 0,
          type: 'ERROR_UPDATE_USER',
          message: e.message
        });
        next(e);
      }
    });
  },
  remove: async (req, res, next) => {
    const uid = req.params.uid;
    const exists = await models.User.findOne({ _id: uid });
    console.log(uid);
    if (!uid || !exists) {
      return res.send({
        status: 0,
        type: 'ERROR_USERID',
        message: 'user_id error de parámetro'
      });
    }
    try {
      await models.User.findByIdAndDelete({ _id: uid });
      // res.status(200).json(reg);
      res.send({
        status: 1,
        success: 'Se logró Eliminar con éxito'
      });
    } catch (e) {
      res.send({
        status: 0,
        type: 'ERROR_DELETE_USER',
        message: e.message
      });
      next(e);
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.User.findOne({ _id: req.query.uid });
      if (!reg) {
        res.status(404).send({
          message: 'El registro no existe'
        });
      } else {
        res.status(200).json(reg);
      }
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      });
      next(e);
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await models.User.findByIdAndUpdate(
        { _id: req.body.uid },
        { state: 1 }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.User.findByIdAndUpdate(
        { _id: req.body.uid },
        { state: 0 }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      });
      next(e);
    }
  }
};
