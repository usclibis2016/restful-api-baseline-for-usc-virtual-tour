const express = require('express');
const app = express();

const router = express.Router();
const Exhibit_image= require('../models/Exhibit_image');

//Add new Exhibit_image
router.post('/', (req, res) => {
   
    const   image_name= req.body.image_name;
    const   image_url=req.body.image_url;
    const    exhibit=req.body.exhibit;
    const newExhibit_image = new Exhibit_image({image_name,image_url,exhibit});
    newExhibit_image.save()
        .then(post => res.json("Exhibit_image added successfully!"))
        .catch(err => res.status(400).json('Error:' + err));
});

// Delete Exhibit_image
router.route('/:id').delete((req, res) => {
    Exhibit_image.findByIdAndDelete(req.params.id)
        .then(post => res.json('Exhibit_image  deleted Successfully.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//veiw all
router.get('/', (req, res) => {
    Exhibit_image.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));

});

//veiw specific images by exhibit id
router.route('/:id').get((req, res) => {
   Exhibit_image.find({"exhibit":req.params.id})
        
         .then(exhibit =>res.json(exhibit))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;