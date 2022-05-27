const mongoose = require('mongoose');


const ExhibitShema = mongoose.Schema({

   exhibit_title:{
   
    type:String
   },
   available:{
  
    type:Boolean,
    default:true
   },
   exhibit_description:{
  
    type:String 
  },
  library:{
    required:true,
    type:mongoose.ObjectId,
    ref:"Library"
  },
})

module.exports = mongoose.model('Exhibit',ExhibitShema);