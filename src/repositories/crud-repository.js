const { Logger } = require("../config");
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const resposne = await this.model.create(data);
    return resposne;
  }

  async destroy(data) {
    const resposne = await this.model.destroy({
      where: {
        id: data,
      },
    });
    if(!resposne){
      throw new AppError("Not able to destroy the requested resource ", StatusCodes.NOT_FOUND);
    }
    return resposne;
  }

  async get(data) {
    const response = await this.model.findByPk(data);
    if(!response){
      throw new AppError("Not able to find the resource ", StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async getAll(data) {
    const resposne = await this.model.findAll();
    return resposne;
  }

  async update(id, data) {
    const resposne = await this.model.update(data, {
      where: {
        id: id,
      },
    });
    return resposne;
  }
}

module.exports = CrudRepository;
