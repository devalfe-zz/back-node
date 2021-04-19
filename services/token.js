import jwt from 'jsonwebtoken';
import models from '../models';

async function checkToken(token) {
  let __id = null;
  try {
    const { _id } = await jwt.decode(token);
    __id = _id;
  } catch (e) {
    return false;
  }
  const user = await models.User.findOne({ _id: __id, state: 1 });
  if (user) {
    const token = jwt.sign({ _id: __id }, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '1d'
    });
    return { token, role: user.role };
  } else {
    return false;
  }
}

export default {
  encode: async _id => {
    const token = jwt.sign({ _id: _id }, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '3h'
    });
    return token;
  },
  decode: async token => {
    try {
      const { _id } = await jwt.verify(token, process.env.SECRETORPRIVATEKEY);
      const user = await models.User.findOne({ _id, state: 1 });
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (e) {
      const newToken = await checkToken(token);
      return newToken;
    }
  }
};
