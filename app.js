const express = require('express');
const cors = require('cors')
const app = express();



app.use(express.json());
app.use(cors());
const mongoose = require('mongoose')
require('dotenv/config');

app.use('/static', express.static('public'))

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


// Import  Panoramic Router
const Panoramic_image = require('./route/panoramic');
app.use('/panoramic',Panoramic_image)

// import virtual images Router
const Virtual_image = require('./route/virtualMap');
app.use('/virtualMap',Virtual_image)

// Import  Library_image Router
const Library_image_Route = require('./route/Library_image');
app.use('/library_image',Library_image_Route);
//Connect  to DB

mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
     })   
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));

// How to start listening to the server

app.listen(3000);