const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Task Schema 
const TaskSchema = new Schema({

  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  media: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: true,
    default: "Open"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  taskId: {
    type: Schema.Types.ObjectId,
    ref: 'tasks'
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
  
});

module.exports = Task = mongoose.model('tasks', TaskSchema);