import app from './app';
import config from 'config-lite';

require('babel-core/register');

// eslint-disable-next-line no-unused-vars
// const server =
app.listen(config.port, () =>
  console.log(
    `Iniciando API REST con Express y MongoDB en el puerto ${config.port}`
  )
);
