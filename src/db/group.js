import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },  
  name: {
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

export default mongoose.model('Group', GroupSchema);