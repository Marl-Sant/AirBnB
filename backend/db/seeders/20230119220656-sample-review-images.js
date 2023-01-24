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
      imageURL: "FIRST PIC URL"
    },
    {
      reviewId: 1,
      imageURL: "SECOND PIC URL"
    },
    {
      reviewId: 1,
      imageURL: "THIRD PIC URL"
    },
    {
      reviewId: 2,
      imageURL: "FIRST PIC URL"
    },
    {
      reviewId: 2,
      imageURL: "SECOND PIC URL"
    },
    {
      reviewId: 2,
      imageURL: "THIRD PIC URL"
    },
    {
      reviewId: 3,
      imageURL: "FIRST PIC URL"
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      imageURL: { [Op.in]: ["https://imgur.com/a/PEQkQCf"] }
    }, {});
  }
};
