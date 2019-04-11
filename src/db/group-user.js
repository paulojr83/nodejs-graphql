import mongoose from 'mongoose';

const GroupUserSchema = new mongoose.Schema({
  group_id: {
    type: String,
    required: true,
  },  
  user_id: {
    type: String,
    required: true,
  },  
  createdOn: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model('GroupUser', GroupUserSchema);