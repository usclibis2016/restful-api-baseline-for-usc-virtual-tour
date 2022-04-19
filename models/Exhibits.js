const mongoose = require('mongoose');


const ExhibitShema = mongoose.Schema({

   exhibit_title:{
    required:true,
    type:String
   },
   exhibit_description:{
    required:true,
    type:String 
  },
  library:{
    required:true,
    type:mongoose.ObjectId,
    ref:"Exhibit_image"
  },
})

module.exports = mongoose.model('Exhibit',ExhibitShema);