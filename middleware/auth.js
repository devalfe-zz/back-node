import { validationResult } from 'express-validator';
import tokenService from '../services/token';

export default {
  validate: async (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty) {
      return res.status(404).send({
        message: 'No token'
      });
    }
    next();
  },

  verifyUsuario: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: 'No token'
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (
      response.rol == 'Administrador' ||
      response.rol == 'Vendedor' ||
      response.rol == 'Almacenero'
    ) {
      next();
    } else {
      return res.status(403).send({
        message: 'No autorizado'
      });
    }
  },
  verifyAdministrador: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: 'No token'
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.rol == 'Administrador') {
      next();
    } else {
      return res.status(403).send({
        message: 'No autorizado'
      });
    }
  },
  verifyAlmacenero: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: 'No token'
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.rol == 'Administrador' || response.rol == 'Almacenero') {
      next();
    } else {
      return res.status(403).send({
        message: 'No autorizado'
      });
    }
  },
  verifyVendedor: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: 'No token'
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.rol == 'Administrador' || response.rol == 'Vendedor') {
      next();
    } else {
      return res.status(403).send({
        message: 'No autorizado'
      });
    }
  }
};
