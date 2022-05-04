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
<<<<<<< HEAD
    required:false,
    type:String
=======
    required:true,
    type:mongoose.ObjectId,
    ref:"PanoramicView"
>>>>>>> 56584ed178595c9d9b011024dd6b76f59b1f1ca1
  }],
  librarian:{
    required:true,
    type:mongoose.ObjectId,
    ref:"Librarian"
  },


})

module.exports = mongoose.model('Library',LibraryShema);