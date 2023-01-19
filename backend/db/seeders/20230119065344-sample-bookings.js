'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [{
      spotId: 2,
      userId: 1,
      startDate: "2023-10-10",
      endDate: "2023-11-11"
    },
    {
      spotId: 1,
      userId: 2,
      startDate: "2023-12-12",
      endDate: "2023-12-13"
    },
    {
      spotId: 3,
      userId: 3,
      startDate: "2023-12-14",
      endDate: "2023-12-15"
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['ROFL', 'LMAO', 'LOL'] }
    }, {});
  }
};
