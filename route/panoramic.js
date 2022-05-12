const express = require('express');
const app = express();
const multer  = require('multer')
const fs = require("fs")
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

//Add new Panoramic images
router.post('/', upload.single("image_name"), (req, res) => {
    console.log(req.file);

    const   image_name= req.file.originalname;
    const   Library=req.body.Library;
    const   available=req.body.available
    const NewPanoramic = new Panoramic({image_name,Library,available});
    NewPanoramic.save()
        .then(post => res.json("panoramic added successfully!"))
        .catch(err => res.status(400).json('Error:' + err));
});

// Delete panoramic images
router.route('/:id').delete((req, res) => {

    Panoramic.findByIdAndDelete(req.params.id)
            .then(panoImage=> {
                fs.unlink("./public/images/"+panoImage.image_name, function(err) {
                    if (err) {
                        throw err
                    } else {
                       res.json("Deleted successfully")
                    
                    }
                    })})
            .catch(err => res.status(400).json('Error: ' + err));
})

//veiw all
router.get('/', (req, res) => {
    Panoramic.find()
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err));

});


//veiw specific images by exhibit id
router.route('/:id').get((req, res) => {
   Panoramic.findById(req.params.id)
         .then(panoramic =>res.json(panoramic))
        .catch(err => res.status(400).json('Error: ' + err));
});

// update panoramic images
router.post('/update/:id',upload.single("image_name"),(req, res) => {
   
    Panoramic.findById(req.params.id) 
    .then(panoImage=> { 
     
        fs.unlink("./public/images/"+panoImage.image_name, function(err) {
            if (err) {
                throw err
            } else {
               panoImage.image_name=req.file.originalname;
               panoImage.available=req.body.available;
               panoImage.save()
                    .then(post => res.json("Panoramic  was updated."))
                    .catch(err => res.status(400).json('Error: ' + err));
            } 
        })
        })
    .catch(err => res.status(400).json('Error: ' + err));
        
});

module.exports = router;    