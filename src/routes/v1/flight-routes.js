const express = require('express');
const { FlightController } = require('../../controllers');
const { FlightMiddleware } = require('../../middlewares');
const router = express.Router();

// /api/v1/flights POST
router.post('/', FlightMiddleware.validateCreateRequest, FlightController.createFlight);
router.get('/', FlightController.getAllFlights);
router.get('/:id', FlightController.getFlight);
router.patch('/:id/seats', FlightMiddleware.validateSeatsRequest, FlightController.updateSeats);

module.exports = router;