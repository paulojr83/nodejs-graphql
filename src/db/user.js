import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model('User', UserSchema);