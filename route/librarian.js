const express = require('express');
const app = express();
<<<<<<< HEAD

const router = express.Router();
const Librarian= require('../models/Librarian');

//Add new Librarian
router.post('/', (req, res) => {
=======
const router = express.Router();
const Librarian= require('../models/Librarian');
const JWT= require('jsonwebtoken')
const checkAuth= require("../middleware/checkAuth")  
//Add new Librarian
router.post('/', async (req, res) => {
>>>>>>> a8b241123a80e3ae36b7708a22fa9f44e34d73d4
   
    const   first_name= req.body.first_name;
    const   middle_initial=req.body.middle_initial;
    const   last_name=req.body.last_name;
    const   username= req.body.username;
    const   password=req.body.password;
   
    
    const newLibrarian = new Librarian({first_name,middle_initial,last_name,username,password});
    newLibrarian.save()
<<<<<<< HEAD
        .then(post => res.json("Librarian added successfully!"))
        .catch(err => res.status(400).json('Error:' + err));
=======
    const token=await JWT.sign({newLibrarian},"my_secret_key")
    res.json({token})
        // .then(admin => )
        // .catch(err => res.status(400).json('Error:' + err));
>>>>>>> a8b241123a80e3ae36b7708a22fa9f44e34d73d4
});

// Delete Librarian
router.route('/:id').delete((req, res) => {
    Librarian.findByIdAndDelete(req.params.id)
        .then(post => res.json('Librarian  deleted Successfully.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//veiw all
<<<<<<< HEAD
router.get('/', (req, res) => {
=======
router.get('/',checkAuth, (req, res) => {
>>>>>>> a8b241123a80e3ae36b7708a22fa9f44e34d73d4
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

<<<<<<< HEAD
=======



>>>>>>> a8b241123a80e3ae36b7708a22fa9f44e34d73d4
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
<<<<<<< HEAD
=======
//login route
router.route('/login').post( async (req, res) => {
    
  Librarian.find({"username":req.body.username})
   .then (librarian=>{ 
     if(librarian.length==0){
        return res.json({
            msg:"invalid credential"
            
        })
     }else{
        if(librarian[0].password!=req.body.password){
            return res.json({
                msg:"invalid credential"
                
            })
          
         }
            
     }
     const token= JWT.sign({librarian},"my_secret_key")
     res.json({
         token:token,
         adminID:librarian[0]._id
         })
    })
 });
>>>>>>> a8b241123a80e3ae36b7708a22fa9f44e34d73d4
module.exports = router;