const { MongoClient, ObjectID } = require("mongodb");
const Express = require("express");
const Cors = require("cors");
const BodyParser = require("body-parser");
const { request } = require("express");

const client = new MongoClient("mongodb+srv://cmpsnonstudy:cmps278@278cluster.fpuge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
const server = Express();

server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));
server.use(Cors());

var collection;

server.get("/search", async(request, response) => {
    try {
        let result = await collection.aggregate([
            {
                "$search": {
                    "index": "searchPlants2", 
                    "autocomplete": {
                        "query": `${request.query.query}`,
                        "path": "scientificname",
                        "fuzzy": {
                            "maxEdits": 2,
                            "prefixLength": 3
                        }
                    }
                }
            }
        ]).toArray();
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});
server.get("/get/:id", async(request, response) => {
    try {
        let result = await collection.findOne({ "_id": ObjectID(request.params.id) });
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});

server.listen("3500", async() => {
    try {
        await client.connect();
        collection = client.db("plantdatabase").collection("plant_info");
    } catch (e) {
        console.error(e);
    }
});

