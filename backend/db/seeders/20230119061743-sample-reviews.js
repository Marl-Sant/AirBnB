'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [{
      userId: 1,
      spotId: 4,
      review: "Not great",
      stars: 1
    },
    {
      userId: 1,
      spotId: 3,
      review: "Totally recommended",
      stars: 5
    },
        {
      userId: 2,
      spotId: 1,
      review: "You should pass on this",
      stars: 2
    },
    {
      userId: 2,
      spotId: 4,
      review: "The place needs alot of love",
      stars: 2
    },
    {
      userId: 3,
      spotId: 2,
      review: "Pretty decent for the price",
      stars: 3
    },
    {
      userId: 3,
      spotId: 1,
      review: "Heads over heels, have already booked another stay",
      stars: 5
    },
    {
      userId: 4,
      spotId: 3,
      review: "One of the best places I've rented through the app",
      stars: 4
    },
    {
      userId: 4,
      spotId: 2,
      review: "Left after about an hour staying there",
      stars: 1
    },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['ROFL', 'LMAO', 'LOL'] }
    }, {});
  }
};
