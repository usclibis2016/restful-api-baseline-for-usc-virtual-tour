const mongoose = require('mongoose');


const LibraryShema = mongoose.Schema({

  library_name:{
    required:true,
    type:String
  },
  library_location:{
    required:true,
    type:String
  },
  theme:{
    required:true,
    type:String
  },
   library_description:{
    required:true,
    type:String
  },
  panoramic_view:[{
    required:true,
    type:mongoose.ObjectId,
    ref:"PanoramicView"
  }],
  librarian:{
    required:false,
    type:mongoose.ObjectId,
    ref:"Librarian"
  },


})

module.exports = mongoose.model('Library',LibraryShema);