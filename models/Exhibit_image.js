const mongoose = require('mongoose');


const Exhbit_Image_Shema = mongoose.Schema({
  image_name:{
    required:false,
    type:String  
  },

  exhibit:{
    required:false,
    type:mongoose.ObjectId,
    ref:"Exhibit"
  },
})
module.exports = mongoose.model('Exhibit_image',Exhbit_Image_Shema);