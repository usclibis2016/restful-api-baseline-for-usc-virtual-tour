const express = require('express');
const app = express();
const multer  = require('multer');
const fs = require("fs");
const router = express.Router();
const imagefile=require('../image_controller');
const virtualMap = require('../models/VirtualMap');

const storageFile = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./public/images")
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})
 
const upload = multer({storage:storageFile});

//Add new virtual map images
router.post('/', upload.single("image_name"), (req, res) => {
    console.log(req.file);

    const   image_name= req.file.originalname;
    const   Library=req.body.Library;
    const   available=req.body.available
    const NewVirtualMap = new virtualMap({image_name,Library,available});
    NewVirtualMap.save()
        .then(post => res.json("virtualmap added successfully!"))
        .catch(err => res.status(400).json('Error:' + err));
});

// Delete virtual map images
router.route('/:id').delete((req, res) => {

    virtualMap.findByIdAndDelete(req.params.id)
            .then(vmapImage=> {
                fs.unlink("./public/images/"+vmapImage.image_name, function(err) {
                    if (err) {
                        throw err
                    } else {
                       res.json("Deleted successfully")
                    
                    }
                    })})
            .catch(err => res.status(400).json('Error: ' + err));
})

//view all
router.get('/', (req, res) => {
    virtualMap.find()
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err));

});


//veiw specific images by exhibit id
router.route('/:id').get((req, res) => {
   virtualMap.findById(req.params.id)
         .then(virtualMap =>res.json(virtualMap))
        .catch(err => res.status(400).json('Error: ' + err));
});

// update virtual map images
router.post('/update/:id',upload.single("image_name"),(req, res) => {
   
    virtualMap.findById(req.params.id) 
    .then(vmapImage=> { 
        fs.unlink("./public/images/"+vmapImage.image_name, function(err) {
            if (err) {
                throw err
            } else {
               vmapImage.image_name=req.file.originalname;
               vmapImage.save()
                    .then(post => res.json("Virtual map  was updated."))
                    .catch(err => res.status(400).json('Error: ' + err));
            } 
        })
        })
    .catch(err => res.status(400).json('Error: ' + err));
        
});

module.exports = router;    