const mongoose = require('mongoose');
const virtualMapSchema = mongoose.Schema({

    image_name:{
        required:false,
        type:String  
      },
    Library:{
        required:false,
        type:mongoose.ObjectId,
        ref:"Library"
      }
})

module.exports = mongoose.model('VirtualMap', virtualMapSchema);