const express = require('express');
const mongoose = require('mongoose');
const routes = require('./router');

const app = express();

mongoose.connect("mongodb://localhost:27017/aircnc", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(3000);