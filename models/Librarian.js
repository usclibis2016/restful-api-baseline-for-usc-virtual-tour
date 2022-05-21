const { append } = require('express/lib/response');
const mongoose = require('mongoose');

const LibrarianShema = mongoose.Schema({

  first_name:{
    required:true,
    type:String
  },
  middle_initial:{
    required:true,
    type:String
  },
  last_name:{
    required:true,
    type:String
  },
   username:{
    required:true,
    type:String
  },
  password:{
    required:true,
    type:String
  },
  addedAT:{
    type:Date,
    default:Date.now()
  },
}) 
module.exports = mongoose.model('Librarian',LibrarianShema);