const express = require('express');
const app = express();
const multer  = require('multer')
const router = express.Router();
const Library= require('../models/Library');






const storageFile = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./public/panoramic_view")
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})
 
const upload = multer({storage:storageFile});


//Add new Library
router.post('/',upload.single("panoramic_view"), (req, res) => {
   
    const   library_name= req.body.library_name;
    const   library_location=req.body.library_location;
    const   theme=req.body.theme;
    const   library_description= req.body.library_description;
    const   panoramic_view=req.file.originalname;
    const   librarian=req.body.librarian;
   
    
    const newLibrary = new Library({library_name,library_location,theme,library_description,panoramic_view,librarian});
    newLibrary.save()
        .then(post => res.json("Library added successfully!"))
        .catch(err => res.status(400).json('Error:' + err));
});

//Add new Panoramic view on specific Library


// Delete Library

router.route('/:id').delete((req, res) => {
    Library.findByIdAndDelete(req.params.id)
        .then(post => res.json('Library  deleted Successfully.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//veiw all
router.get('/', (req, res) => {
    Library.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));

});

//veiw specific
router.route('/:id').get((req, res) => {
   Library.findById(req.params.id)
        
         .then(exhibit =>res.json(exhibit))
        .catch(err => res.status(400).json('Error: ' + err));
});

// update exhibit
router.route('/update/:id').post((req, res) => {
   
    Library.findById(req.params.id) 
    .then( library=> {
                    library.library_name = req.body.library_name;
                    library.library_description = req.body.library_description;
                    library.save()
                        .then(post => res.json("Library  was updated."))
                        .catch(err => res.status(400).json('Error: ' + err));
                })
                .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;