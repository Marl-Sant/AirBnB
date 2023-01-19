'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [{
      spotId: 1,
      imageURL: "https://imgur.com/a/PEQkQCf",
      previewImage: true
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      imageURL: { [Op.in]: ["https://imgur.com/a/PEQkQCf"] }
    }, {});
  }
};
