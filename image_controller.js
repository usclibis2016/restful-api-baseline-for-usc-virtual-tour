var multer= require('multer')


exports.getfile=function(req,res){
    res.download('images/'+req.params.path)
}