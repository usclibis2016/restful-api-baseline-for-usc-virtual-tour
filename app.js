const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose')
require('dotenv/config');


//Import  Announcement Router
const AnnouncementRoute = require('./route/announcement');
app.use('/announcement',AnnouncementRoute);

//Import  Librarian Router
const LibrarianRoute = require('./route/Librarian');
app.use('/librarian',LibrarianRoute);

// Import  Library Router
const LibraryRoute = require('./route/Library');
app.use('/library',LibraryRoute);

//Import  Exhibit Router
const ExhibitRoute = require('./route/Exhibit');
app.use('/exhibit',ExhibitRoute);

// Import  Library Router
const Exhibit_image_Route = require('./route/Exhibit_image');
app.use('/exhibit_image',Exhibit_image_Route);




//Connect  to DB

mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
     })   
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));

// How to start listening to the server

app.listen(3000);