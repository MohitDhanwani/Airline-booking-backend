const { FlightRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const AppError = require("../utils/errors/app-error");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError("Cannot create a new flight object", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

//flights with custom filters
async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter = [];
  if (query.trips) {
    const [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }
  if (query.price) {
    const [minPrice, maxPrice] = query.price.split("-");

    customFilter.price = {
      [Op.between]: [minPrice, maxPrice],
    };
  }
  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }
  if (query.tripDate) {
    customFilter.departureTime = {
      [Op.eq]: query.tripDate,
    };
  }
  if (query.sort) {
    const params = query.sort.split(",");
    const sortFilters = params.map((param) => param.split("_"));
    sortFilter = sortFilters;
  }
  try {
    const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
    return flights;
  } catch (error) {
    throw new AppError("Cannot fetch data of all the flights", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getFlight(id) {
  try {
    const flight = await flightRepository.get(id);
    return flight;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("The flight you requested is not present", error.statusCode);
    }
    throw new AppError("Cannot fetch data of flight", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateSeats(data){
  try {
    const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.decrease);
    return response;
  } catch (error) {
    throw new AppError("Cannot update data of flight", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats,
};
