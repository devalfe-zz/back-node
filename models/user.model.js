import mongoose, { Schema } from 'mongoose';

const userSchema = Schema({
  name: {
    type: String,
    maxlength: 150,
    required: true
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    unique: true,
    lowercase: true

    // validate: {
    //   validator: () => Promise.resolve(false),
    //   message: 'Email validation failed'
    // }
  },
  password: {
    type: String,
    maxlength: 64,
    required: true
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE'
  },
  google: {
    type: Boolean,
    default: false
  },
  state: {
    type: Number,
    default: 1
  },
  createdAt: { type: Date, default: Date.now }
});

userSchema.method('toJSON', function() {
  // eslint-disable-next-line no-unused-vars
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

const User = mongoose.model('user', userSchema);

export default User;
