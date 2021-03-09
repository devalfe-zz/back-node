import app from './app';
// eslint-disable-next-line no-unused-vars
const server = app.listen(app.get('port'), () =>
  console.log(
    `Iniciando API REST con Express y MongoDB en el puerto ${app.get('port')}`
  )
);
