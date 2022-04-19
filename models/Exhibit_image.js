const mongoose = require('mongoose');


const Exhbit_Image_Shema = mongoose.Schema({
  image_name:{
    required:true,
    type:String  
  },
  image_url:{
    required:true,
    type:String  
  },
  exhibit:{
    required:true,
    type:mongoose.ObjectId,
    ref:"Exhibit"
  },
})
module.exports = mongoose.model('Exhibit_image',Exhbit_Image_Shema);    