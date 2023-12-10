const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');

const connectToDB = async () => {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
};

const teachers = client.db("web73-homework").collection('teachers');

module.exports = {
    connectToDB,
    teachers,
    // other collections if any
};
