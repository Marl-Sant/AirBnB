'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    await queryInterface.bulkInsert(options, [{
      reviewId: 1,
      url: "FIRST PIC URL"
    },
    {
      reviewId: 1,
      url: "SECOND PIC URL"
    },
    {
      reviewId: 1,
      url: "THIRD PIC URL"
    },
    {
      reviewId: 2,
      url: "FIRST PIC URL"
    },
    {
      reviewId: 2,
      url: "SECOND PIC URL"
    },
    {
      reviewId: 2,
      url: "THIRD PIC URL"
    },
    {
      reviewId: 3,
      url: "FIRST PIC URL"
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ["https://imgur.com/a/PEQkQCf"] }
    }, {});
  }
};
