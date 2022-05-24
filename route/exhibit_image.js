const express = require('express');
const cors = require("cors");

const app = express();
const router = express.Router();
app.use(cors()); // migzapp will use cors

const Exhibit_image= require('../models/Exhibit_image');
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true,parameterLimit:1000000}));
//Add new Exhibit_image thru base64
router.post('/', (req, res) => {
    const   image_name= req.body.image_name;
    const   exhibit=req.body.exhibit;
    const   newExhibit_image = new Exhibit_image({image_name,exhibit});

    newExhibit_image.save()
        .then(post => res.json("added successfully"))
        .catch(err => res.status(400).json('Error:' + err));
});


// Delete Exhibit_image
router.route('/:id').delete((req, res) => {
    Exhibit_image.findByIdAndDelete(req.params.id)
    .then(image=> {res.json("Deleted successfully")})
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