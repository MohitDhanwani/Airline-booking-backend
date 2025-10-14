const express = require('express');
const airplaneRoutes = require('./airplane-routes');
const { InfoController } = require('../../controllers');
const router = express.Router();

router.use('/airplanes' , airplaneRoutes);
router.get('/info', InfoController.info);

module.exports = router; 