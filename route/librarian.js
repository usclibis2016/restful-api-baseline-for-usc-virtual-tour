const express = require('express');
const app = express();

const router = express.Router();
const Librarian= require('../models/Librarian');

//Add new Librarian
router.post('/', (req, res) => {
   
    const   first_name= req.body.first_name;
    const   middle_initial=req.body.middle_initial;
    const   last_name=req.body.last_name;
    const   username= req.body.username;
    const   password=req.body.password;
   
    
    const newLibrarian = new Librarian({first_name,middle_initial,last_name,username,password});
    newLibrarian.save()
        .then(post => res.json("Librarian added successfully!"))
        .catch(err => res.status(400).json('Error:' + err));
});

// Delete Librarian
router.route('/:id').delete((req, res) => {
    Librarian.findByIdAndDelete(req.params.id)
        .then(post => res.json('Librarian  deleted Successfully.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//veiw all
router.get('/', (req, res) => {
    Librarian.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));

});

//veiw specific
router.route('/:id').get((req, res) => {
   Librarian.findById(req.params.id)
        
         .then(librarian =>res.json(librarian))
        .catch(err => res.status(400).json('Error: ' + err));
});

// update librarian
router.route('/update/:id').post((req, res) => {
 
    Librarian.findById(req.params.id)
        .then(librarian => {
              librarian.first_name = req.body.first_name;
              librarian.middle_initial = req.body.middle_initial;
              librarian.last_name = req.body.last_name;
              librarian.username = req.body.username;
              librarian.password = req.body.password;
            librarian.save()
                .then(user => res.json("Record was updated."))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;