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
    unique: true
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

const User = mongoose.model('user', userSchema);

export default User;
