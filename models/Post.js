const mongoose = require('mongoose');


const PostShema = mongoose.Schema({
   exhibits:[{
       exhibitTitle:{type:String},
       exhibitDescription:{type:String},
       images:[String]
   }],
   title:{
    type: String  
   },
   panoramicImg:[String]
   
})

module.exports = mongoose.model('Posts',PostShema);