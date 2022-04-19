const express = require('express');
const app = express();

const router = express.Router();
const Announcement= require('../models/Announcement');

//Add new Announcement
router.post('/', (req, res) => {
   
    const   announcement_text= req.body.announcement_text;
    const   librarian_id=req.body.librarian_id;
    const   image=req.body.image;
    
    
    const newAnnouncement = new Announcement({announcement_text,librarian_id,image});
    newAnnouncement.save()
        .then(post => res.json("Announcement added successfully!"))
        .catch(err => res.status(400).json('Error:' + err));
});

// Delete Announcement
router.route('/:id').delete((req, res) => {
    Announcement.findByIdAndDelete(req.params.id)
        .then(post => res.json('Announcement  deleted Successfully.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//veiw all
router.get('/', (req, res) => {
    Announcement.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));

});

//veiw specific
router.route('/:id').get((req, res) => {
   Announcement.findById(req.params.id)
        
         .then(exhibit =>res.json(exhibit))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;