import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model('Message', MessageSchema);