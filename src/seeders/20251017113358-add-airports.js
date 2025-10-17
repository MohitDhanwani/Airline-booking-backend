'use strict';
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert("Airports", [
      {
        name: "Kempegowda International Airport",
        code: "BLR",
        cityId: "1",
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name: "Mumbai International Airport",
        code: "BOM",
        cityId: "2",
        createdAt: new Date(),
        updatedAt: new Date(), 
      }
    ])
  },

  async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Airports", { [Op.or]: [{ code: "BLR" }, { code: "BOM" }] });
  }
};
