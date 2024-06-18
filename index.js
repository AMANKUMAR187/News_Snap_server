const express = require('express');
const mongoose = require('mongoose');
const DB= 'mongodb+srv://kumaraman187187:Kumar187187@cluster0.q1445m1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const authrouter = require('./route/auth.js');
const noteroute = require('./route/note.js');

// init
const port  = 4000;
const app = express();

// midware
app.use(express.json());
app.use(authrouter); 
app.use(noteroute);


mongoose.connect(DB).then(()=>{
    console.log('connection successfully');
}).catch((err) => {
    console.log(err);
});

app.listen(port,"0.0.0.0",()=>{
    console.log("server started `http://localhost:4000`");
});


// use name  =>  kumaraman187187
// pas => Kumar187187 
//  mongodb+srv://kumaraman187187:<password>@cluster0.q1445m1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0