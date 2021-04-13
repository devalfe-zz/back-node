require('dotenv').config();

module.exports = {
  port: parseInt(process.env.PORT, 10) || process.env.PORT,
  url: process.env.DB_CONN,
  session: {
    name: process.env.SECRET_NAME,
    secret: process.env.SECRET_SESSION,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000
    }
  }
};
