const express = require('express');
const app = express();
const router = express.Router();
const Exhibits = require('../models/Exhibits');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//veiw all
router.get('/', (req, res) => {
    Exhibits.find().populate('library')
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));

});
// view specific
router.route('/specific/:id').get((req, res) => {
    Exhibits.findById(req.params.id).populate('library')
          .then(exhibit =>res.json(exhibit))
         .catch(err => res.status(400).json('Error: ' + err));
 });


// veiw by library
router.route('/:id').get((req, res) => {
   Exhibits.find({library:req.params.id})
        
         .then(exhibit =>res.json(exhibit))
        .catch(err => res.status(400).json('Error: ' + err));
});




//Add 
router.post('/', (req, res) => {
    const exhibit_title = req.body.exhibit_title;
    const exhibit_description= req.body.exhibit_description;
    const library=req.body.library;
    const newExhibit = new Exhibits({exhibit_title,exhibit_description,library});

    newExhibit.save()
        .then(post => res.json("Exhibit added successfully!"))
        .catch(err => res.status(400).json('Error:' + err));
});
    

// delete exhibit
router.route('/:id').delete((req, res) => {
    Exhibits.findByIdAndDelete(req.params.id)
        .then(post => res.json('Record was deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// update exhibit
router.route('/update/:id').post((req, res) => {
 
    Exhibits.findById(req.params.id)
        .then(exhibit => {
            exhibit.exhibit_title = req.body.exhibit_title;
            exhibit.exhibit_description = req.body.exhibit_description;
            exhibit.available = req.body.available;
          
            exhibit.save()
                .then(user => res.json("Record was updated."))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;