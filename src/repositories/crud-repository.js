const { Logger } = require('../config')

class CrudRepository {
    
    constructor(model){
        this.model = model;
    }

    async create(data){
        try {
            const resposne = await this.model.create(data);
            return resposne;
        } catch (error) {
            Logger.error("Something went wrong in Crud Repo : create");
            throw error;
        }
    }

    async destroy(data){
        try {
            const resposne = await this.model.destroy({
                where : {
                    id : data,
                }
            });
            return resposne;
        } catch (error) {
            Logger.error("Something went wrong in Crud Repo : destroy");
            throw error;
        }
    }

    async get(data){
        try {
            const resposne = await this.model.findByPk(data);
            return resposne;
        } catch (error) {
            Logger.error("Something went wrong in Crud Repo : get");
            throw error;
        }
    }

    async getAll(data){
        try {
            const resposne = await this.model.findAll();
            return resposne;
        } catch (error) {
            Logger.error("Something went wrong in Crud Repo : getAll");
            throw error;
        }
    }

    async update(id, data){
        try {
            const resposne = await this.model.update(data , {
                where: {
                    id: id,
                }
            });
            return resposne;
        } catch (error) {
            Logger.error("Something went wrong in Crud Repo : update");
            throw error;
        }
    }
};

module.exports = CrudRepository;