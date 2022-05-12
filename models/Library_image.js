const mongoose = require('mongoose');


const Library_Image_Shema = mongoose.Schema({
  image_name:{
    required:false,
    type:String  
  },

  library:{
    required:false,
    type:mongoose.ObjectId,
    ref:"Library"
  },
})
module.exports = mongoose.model('Library_image',Library_Image_Shema);