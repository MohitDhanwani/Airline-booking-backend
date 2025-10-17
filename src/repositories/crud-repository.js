const { Logger } = require("../config");

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
    return resposne;
  }

  async get(data) {
    const resposne = await this.model.findByPk(data);
    return resposne;
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
