const express = require("express");

const routes = express.Router();

const multer = require('multer');
const multerConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const upload = multer(multerConfig);

routes.post('/session', SessionController.index);
routes.get('/spot', SpotController.index);
routes.post('/spot', upload.single('thumbnail'), SpotController.store);
routes.get('/dashboard', DashboardController.show);

routes.post('/spot/:spot_id/booking', BookingController.store);


module.exports = routes;