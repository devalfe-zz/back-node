import mongoose from 'mongoose';
import express from 'express';
require('dotenv').config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
};
const dbConnection = express();
const db = process.env.DB_CONN;

mongoose.Promise = global.Promise;

mongoose
  .connect(db, options)
  .then(() => console.log(`Conexión con MongoDB es OK!`))
  .catch(err => console.log(err));

export default dbConnection;
