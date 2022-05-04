const mongoose = require('mongoose');


const PanoramicShema = mongoose.Schema({

    image_name:{
        required:false,
        type:String  
      },
    
    Library:{
        required:false,
        type:mongoose.ObjectId,
        ref:"Library"
      },


})

module.exports = mongoose.model('PanoramicView',PanoramicShema);