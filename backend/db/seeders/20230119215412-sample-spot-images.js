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
      url: "PREVIEW IMAGE URL 1",
      previewImage: true
    },
    {
      spotId: 1,
      url: "NONPREVIEW IMAGE URL 1",
      previewImage: false
    },
    {
      spotId: 2,
      url: "PREVIEW IMAGE URL 2",
      previewImage: true
    },
    {
      spotId: 2,
      url: "NONPREVIEW IMAGE URL 2",
      previewImage: false
    },
    {
      spotId: 3,
      url: "PREVIEW IMAGE URL 3",
      previewImage: true
    }, 
    {
      spotId: 3,
      url: "NONPREVIEW IMAGE URL 3",
      previewImage: false
    }, 
    {
      spotId: 4,
      url: "PREVIEW IMAGE URL 4",
      previewImage: false
    }, 
    {
      spotId: 4,
      url: "NONPREVIEW IMAGE URL 4",
      previewImage: false
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,null, {});
  }
};
