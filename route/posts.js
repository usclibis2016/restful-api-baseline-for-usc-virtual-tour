const express = require('express');
const app = express();

const router = express.Router();
const Post = require('../models/Post');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//veiw all
router.get('/', (req, res) => {
    Post.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));

});
//veiw specific
router.route('/:id').get((req, res) => {
    Post.findById(req.params.id)
        
        .then((Exhibits) => {
            for (var i = 0; i < Exhibits.exhibits.length; i++){
            if(Exhibits.exhibits[i].id=='6196021b31f02cfe7dea1515'){
                res.json(Exhibits.exhibits[i])
                break;
            }else{
                res.json("")
            }
        } 
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
//Add 
router.post('/', (req, res) => {
   
    const title = req.body.title;
    const panoramicImg= req.body.panoramicImg
    const exhibits =req.body.exhibits
    
    
    const newPost = new Post({title, panoramicImg,exhibits
        });
    newPost.save()
        .then(post => res.json(req.body.title))
        .catch(err => res.status(400).json('Error:' + err));
});

// delete
router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(post => res.json('Record was deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// update
// router.route('/update/:id').post((req, res) => {
//     Post.findById(req.params.id)
//         .then(post => {
//             post.title = req.body.title;
//             post.description = req.body.description;
//             post.save()
//                 .then(post => res.json("Record was updated."))
//                 .catch(err => res.status(400).json('Error: ' + err));
//         })
//         .catch(err => res.status(400).json('Error: ' + err));
// });
// update spicific exhibits
router.route('/update/:id').post((req, res) => {
   
   Post.findById(req.params.id)
        
   .then((Exhibits) => {
       
        for (var i = 0; i < Exhibits.exhibits.length; i++){
        if(Exhibits.exhibits[i].id=='6196021b31f02cfe7dea1515'){
            Exhibits.exhibits[i].exhibitTitle=req.body.exhibitTitle
            Exhibits.exhibits[i].exhibitDescription=req.body.exhibitDescription
            Exhibits.save()
                    .then(Exhibits => res.json("Record was updated."))
                    .catch(err => res.status(400).json('Error: ' + err));
            break;
        }else{
            res.json("")
        }
    } 
   })
   .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;