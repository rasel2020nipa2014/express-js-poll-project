const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const PollController = require('./pollController')

const app = express()

//middleware
app.use(morgan('dev'))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

//set up template engine
app.set('view engine', 'ejs')

//route handler


app.get('/create', PollController.createPollGetController)
app.post('/create', PollController.createPollPostController)
app.get('/polls', PollController.getAllPolls)
app.get('/polls/:id', PollController.singlepolls)
app.post('/polls/:id', PollController.singlepollsPost)

app.get('/', (req, res) => {
    res.render('index')
})


const uri = "mongodb+srv://express-cc:express-cc@cluster0.naqcc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(4545, () => {
            console.log('app is ready to server on port 4545');
        })
    }).catch((error) => {
        console.log(error);
    })


// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://express-cc:express-cc@cluster0.naqcc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });