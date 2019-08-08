const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const server = express();

mongoose.connect("mongodb://localhost:27017/tindev", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

server.use(express.json());
server.use(routes);
server.use(cors());

server.listen(3001);
