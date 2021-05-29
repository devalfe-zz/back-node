import app from './app';
import config from 'config-lite';
const chalk = require('chalk');

require('babel-core/register');

app.listen(config.port, () =>
  console.log(
    chalk.cyan(
      `Iniciando API REST con Express y MongoDB en el puerto ${config.port}`
    )
  )
);
