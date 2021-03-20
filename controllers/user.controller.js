import models from '../models';
import bcrypt from 'bcryptjs';
import token from '../services/token';

export default {
  add: async (req, res, next) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const reg0 = await models.User.findOne({ email: req.body.email });
      if (reg0) {
        return res.status(400).send({
          message: 'Email ya se encuentra registrado'
        });
      }
      const reg = await models.User.create(req.body);
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      });
      next(e);
    }
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
    try {
      const pas = req.body.password;
      const reg0 = await models.User.findOne({ uid: req.body.uid });
      if (pas != reg0.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      const reg = await models.User.findByIdAndUpdate(
        { uid: req.body.uid },
        {
          role: req.body.role,
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      });
      next(e);
    }
  },
  remove: async (req, res, next) => {
    try {
      const reg = await models.User.findByIdAndDelete({ uid: req.body.uid });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      });
      next(e);
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.User.findOne({ uid: req.query.uid });
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
        { uid: req.body.uid },
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
        { uid: req.body.uid },
        { state: 0 }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      });
      next(e);
    }
  },
  login: async (req, res, next) => {
    try {
      const user = await models.User.findOne({
        email: req.body.email,
        state: 1
      });
      if (user) {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          const tokenReturn = await token.encode(user.uid);
          res.status(200).json({ user, tokenReturn });
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
  }
};
