const mongoose = require('mongoose');
const virtualMapSchema = mongoose.Schema({

    image_name:{
        required:true,
        type:String  
      },
   
      location:{
        required:true,
        type:String  
      }
    
    

})

module.exports = mongoose.model('VirtualMap', virtualMapSchema);