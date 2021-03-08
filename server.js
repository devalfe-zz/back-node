import app from './app';

const server = app.listen(app.get('port'), () =>
  console.log(
    `Iniciando API REST con Express y MongoDB en el puerto ${app.get('port')}`
  )
);
