require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const userroutes = require('./routes/userroutes');
const taskroutes = require('./routes/taskroutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, 'public')));

const conectionURI = "mongodb://d348142ea8d3bf5e699e3ac88298a5d7:mekaro12@12a.mongo.evennode.com:27018/d348142ea8d3bf5e699e3ac88298a5d7";


app.use('/user', userroutes);
app.use('/task', taskroutes);

app.get('/login', (req, res) => {
    res.sendFile('./views/login.html', { root: __dirname });
});
app.get('/register', (req, res) => {
    res.sendFile('./views/register.html', { root: __dirname });
});
app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
});

mongoose.connect(conectionURI)
    .then((result) => {
        console.log('DB IS ON');
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        });  
    })
    .catch((err) => console.log(err));

