const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose')
require('dotenv/config');


//Import Router
const postsRoute = require('./route/posts');
app.use('/posts',postsRoute);




//Connect  to DB

mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
     })   
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));

// How to start listening to the server

app.listen(3000);