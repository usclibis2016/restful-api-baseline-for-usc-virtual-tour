const mongoose = require('mongoose');


const PanoramicShema = mongoose.Schema({

    image_name:{
        required:true,
        type:String  
      },
      available:{
        required:true,
        type:Boolean
       },
    Library:{
        required:true,
        type:mongoose.ObjectId,
        ref:"Library"
      },


})

module.exports = mongoose.model('PanoramicView',PanoramicShema);