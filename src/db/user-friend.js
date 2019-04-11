import mongoose from 'mongoose';

const UserFriendSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  friend_id: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model('UserFriend', UserFriendSchema);