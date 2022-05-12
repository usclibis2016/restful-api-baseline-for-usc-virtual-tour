const express = require('express');
const app = express();
const multer  = require('multer')

const router = express.Router();
const Library_image= require('../models/Library_image');






const storageFile = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./public/images")
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})
 
const upload = multer({storage:storageFile});

//Add new Exhibit_image
router.post('/', upload.single("image_name"), (req, res) => {
    console.log(req.file);
    const   image_name= req.file.originalname;
    const   library=req.body.library;
    const   newLibrary_image = new Library_image({image_name,library});
    newLibrary_image.save()
        .then(post => res.json("Library_image added successfully!"))
        .catch(err => res.status(400).json('Error:' + err));
});



// Delete Exhibit_image
router.route('/:id').delete((req, res) => {
    Library_image.findByIdAndDelete(req.params.id)
        .then(post => res.json('Library_image  deleted Successfully.'))
        .catch(err => res.status(400).json('Error: ' + err));
});



//veiw all
router.get('/', (req, res) => {
    Library_image.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));

});



//veiw specific images by exhibit id
router.route('/:id').get((req, res) => {
   Library_image.find({"exhibit":req.params.id})
        
         .then(exhibit =>res.json(exhibit))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;