const mongoose = require('mongoose');


const AnnouncementShema = mongoose.Schema({
  
  announcement_title:{
    required:true,
    type:String
  },
  announcement_text:{
    required:true,
    type:String
     
  },
  librarian:{
      required:true,
      type:mongoose.ObjectId,
      ref:"Librarian"

  },
  date:{
    type:Date,
    default:Date.now
  },
  image:{
    type:String,
  },
   
   
})

module.exports = mongoose.model('Announcement',AnnouncementShema);