const express = require('express');
const app = express();
const router = express.Router();
const Librarian= require('../models/Librarian');
const JWT= require('jsonwebtoken')
const checkAuth= require("../middleware/checkAuth")  
const {
    userAuth,
    userLogin,
    checkRole,
    userRegister,
    serializeUser
  } =require("../middleware/checkAuth")
//Add new Librarian
router.post('/', async (req, res) => {
   await userRegister(req.body,"admin",res)
   
});
// update librarian
router.route('/update/:id').post((req, res) => {
 
    Librarian.findById(req.params.id)
        .then(librarian => {
              librarian.first_name = req.body.first_name;
              librarian.middle_initial = req.body.middle_initial;
              librarian.last_name = req.body.last_name;
              librarian.username = req.body.username;
            librarian.save()
                .then(user => res.json("Record was updated."))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
// Delete Librarian
router.route('/:id').delete(userAuth,checkRole(['super admin']),(req, res) => {
    Librarian.findByIdAndDelete(req.params.id)
        .then(post => res.json('Librarian  deleted Successfully.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//veiw all
router.get('/',userAuth,checkRole(['super admin']),(req, res) => {
    Librarian.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));

});


//get profile
router.route('/profile').get(userAuth,checkRole(['admin','super admin']),(req, res) => {
   res.json(req.user)
});


//veiw specific
router.route('/:id').get(userAuth,checkRole(['admin','super admin']),(req, res) => {
    Librarian.findById(req.params.id)
         
          .then(user =>res.json(user))
         .catch(err => res.status(400).json('Error: ' + err));
 });



//login route
router.route('/login').post( async (req, res) => {
    
    await userLogin(req.body,res);
 });
module.exports = router;