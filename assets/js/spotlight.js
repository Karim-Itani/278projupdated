var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://cmpsnonstudy:cmps278@278cluster.fpuge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const express = require("express");
const app = express();

app.listen(5000, () => {
    console.log(`Server is up and running on 5000 ...`);
  });


MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("plantdatabase");
    dbo.collection('plant_info').aggregate([
        { $sample: { size: 1 } }
    ]).toArray(function (err, res) {
        if (err) throw err;
        console.log(JSON.stringify(res));
        db.close();
    });
});

