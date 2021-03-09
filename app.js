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
