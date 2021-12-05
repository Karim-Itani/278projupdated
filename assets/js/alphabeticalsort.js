const MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://cmpsnonstudy:cmps278@278cluster.fpuge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//sort alphabetically

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("plantdatabase");
    var mysort = { name: 1 };
    dbo.collection("plant_info").find().sort(mysort).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});



// var char = 'a';
// Model.find({"name": {$regex: '^' + char, $options: 'i'}}).exec(callback);