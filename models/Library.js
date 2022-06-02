const mongoose = require('mongoose');


const LibraryShema = mongoose.Schema({

  library_name:{
    required:true,
    type:String
  },
  library_location:{
    required:false,
    type:String
  },
   library_description:{
    required:true,
    type:String
  },
  librarian:{
    required:false,
    type:mongoose.ObjectId,
    ref:"Librarian"
  },


})

module.exports = mongoose.model('Library',LibraryShema);