const mongoose = require('mongoose');


const AnnouncementShema = mongoose.Schema({
 
  announcement_text:{
    required:true,
    type:String
     
  },
  librarian_id:{
      required:true,
      type:mongoose.ObjectId,
      ref:"Librarian"

  },
  date:{
    type:Date,
    default:Date.now()
  },
  image:{
    type:String,
  },
   
   
})

module.exports = mongoose.model('Announcement',AnnouncementShema);