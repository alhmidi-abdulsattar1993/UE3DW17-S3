const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
    "mongodb+srv://abdo:alhmidi411@3dw17-s2.o3rkv.mongodb.net/alhmidi_abdulsattar?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
    try {
        await client.connect();
        const database = client.db('alhmidi_abdulsattar');
        const movies = database.collection('pays');
        // Req 
        const query = { "cca2": "AQ" };

        const movie = await movies.findOne(query);
        console.log(movie.name.official);

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

/*
var options = {
    "limit": 20,
    "skip": 10,
    "sort": "title"
}

collection.find({}, options).toArray(...);*/