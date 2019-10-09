const express = require('express');
const mongoose = require('mongoose');
const routes = require('./router');
const cors = require('cors');

const path = require('path');

const app = express();

mongoose.connect("mongodb://localhost:27017/aircnc", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

app.listen(3000);
