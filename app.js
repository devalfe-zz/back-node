import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import db from './database/db';

import routes from './routes/index';
import session from 'express-session';
import connectMongo from 'connect-mongo';
// import cookieParser from 'cookie-parser';
import config from 'config-lite';

const publicDir = path.join(__dirname, 'public');
const restFul = require('express-method-override')('_method');

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

// const MongoStore = connectMongo(session);

app
  // .set('port', port)
  // .use(cookieParser)

  // .use(
  //   session({
  //     name: config.session.name,
  //     secret: config.session.secret,
  //     resave: true,
  //     saveUninitialized: false,
  //     cookie: config.session.cookie
  //     // store: new MongoStore({
  //     //   autoReconnect: true,
  //     //   url: config.url
  //     // })
  //   })
  // )
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
  // .use(db)
  .use('/api', routes);

export default app;
