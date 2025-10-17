const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.flightNumber) {
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = new AppError(["Flight Number is not found in the request"], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.airplaneId) {
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = new AppError(["Airplane Id is not found in the request"], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.departureAirportId) {
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = new AppError(["Departure Airport id is not found in the request"], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.arrivalAirportId) {
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = new AppError(["Arrival airport id is not found in the request"], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.arrivalTime) {
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = new AppError(["Arrival time is not found in the request"], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.departureTime) {
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = new AppError(["Departure Time is not found in the request"], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.price) {
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = new AppError(["Price is not found in the request"], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.boardingGate) {
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = new AppError(["Boarding Gate is not found in the request"], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.totalSeats) {
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = new AppError(["Total Seats is not found in the request"], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
};
