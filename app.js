import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import dbConnection from './database/config';
import routes from './routes/index';

const publicDir = path.join(__dirname, 'public');
const restFul = require('express-method-override')('_method');

const port = process.env.PORT || 3000;

const app = express();
app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';
  res.header('Access-Control-Allow-Origin', allowOrigin);
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('X-Powered-By', 'Express');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app
  .set('port', port)
  .use(json())
  .use(
    urlencoded({
      extended: true
    })
  )
  .use(express.static(publicDir))
  .use(morgan('dev'))
  .use(cors())
  .use(restFul)
  .use(dbConnection)
  .use('/api', routes);

export default app;
