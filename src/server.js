const express = require('express');
const app = express();
const cors = require('cors');
const apiRouter = require('./backend/express/routes/apiRouter');
const dbConnection = require('./backend/db/connection');

app.use(express.json());
app.use(cors());
app.use('/todolist', apiRouter);

module.exports = app;
