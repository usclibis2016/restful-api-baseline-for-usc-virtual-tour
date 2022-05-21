const mongoose = require('mongoose');


const virtualMapShema = mongoose.Schema({

    image_name:{
        required:false,
        type:String  
      },
      available:{
        required:false,
        type:Boolean
       },
    Library:{
        required:false,
        type:mongoose.ObjectId,
        ref:"Library"
      },


})

module.exports = mongoose.model('virtualMap',virtualMapShema);