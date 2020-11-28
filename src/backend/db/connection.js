require('dotenv').config();
const mongoose = require('mongoose');
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const dbCluster = process.env.DB_CLUSTER;
const mongoDB = `mongodb+srv://${user}:${pass}@${dbCluster}/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).catch(error => handle(error))

const db = mongoose.connection.on('error', err => {
    console.log(err);
});

if (!db) {
    console.log("Error connecting db");
} else {
    console.log("Db connected successfully");
}

module.exports = mongoose;
