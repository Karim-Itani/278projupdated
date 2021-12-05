var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var alert = require('alert');

var dbConn = mongodb.MongoClient.connect('mongodb+srv://cmpsnonstudy:cmps278@278cluster.fpuge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, '')));

app.post('/post-feedback', function (req, res) {
    dbConn.then(function(client) {
        let db = client.db('plantdatabase');
        delete req.body._id; // for safety reasons
        db.collection('feedbacks').insertOne(req.body);
    });    
    //res.send('Data received:\n' + JSON.stringify(req.body))
    alert('Message Submitted Successfully');
});

// app.get('/view-feedbacks',  function(req, res) {
//     dbConn.then(function(client) {
//         let db = client.db('plantdatabase');
//         db.collection('feedbacks').find({}).toArray().then(function(feedbacks) {
//             res.status(200).json(feedbacks);
//         });
//     });
// });

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0' );