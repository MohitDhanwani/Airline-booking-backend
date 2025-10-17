const express = require('express');
const { AirportController } = require('../../controllers');
const { AirportMiddleware } = require('../../middlewares');
const router = express.Router();

// /api/v1/airplanes POST
router.post('/', AirportMiddleware.validateCreateRequest, AirportController.createAirport);
router.get('/', AirportMiddleware.validateCreateRequest, AirportController.getAirports);
router.get('/:id', AirportMiddleware.validateCreateRequest, AirportController.getAirport);
router.delete('/:id', AirportMiddleware.validateCreateRequest, AirportController.destroyAirport);


module.exports = router;