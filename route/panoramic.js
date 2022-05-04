const express = require('express');
const app = express();
const multer  = require('multer')

const router = express.Router();
const Panoramic= require('../models/Panoramic');




const imagefile=require('../image_controller')

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
    const   Library=req.body.library;
    const NewPanoramic = new Panoramic({image_name,Library});
    NewPanoramic.save()
        .then(post => res.json("Exhibit_image added successfully!"))
        .catch(err => res.status(400).json('Error:' + err));
});

// Delete Exhibit_image
router.route('/:id').delete((req, res) => {
    Panoramic.findByIdAndDelete(req.params.id)
        .then(post => res.json('Panoramic  deleted Successfully.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//veiw all
router.get('/', (req, res) => {
    Panoramic.find({}).populate('Library')
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));

});


//veiw specific images by exhibit id
router.route('/:id').get((req, res) => {
   Panoramic.find({"exhibit":req.params.id})
        
         .then(panoramic =>res.json())
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;