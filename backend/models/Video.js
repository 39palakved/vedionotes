const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    videoId:{
         type: String,
        required: true
     },
    notes:{
        type: String,
        required: true, 
    },
    
    date:{
        type: Date,
        default: Date.now
    },
  });
const Video=mongoose.model('notes', NotesSchema);
  module.exports = Video;