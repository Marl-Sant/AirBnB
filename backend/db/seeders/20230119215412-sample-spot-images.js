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
      imageURL: "PREVIEW IMAGE URL 1",
      previewImage: true
    },
    {
      spotId: 1,
      imageURL: "NONPREVIEW IMAGE URL 1",
      previewImage: false
    },
    {
      spotId: 2,
      imageURL: "PREVIEW IMAGE URL 2",
      previewImage: true
    },
    {
      spotId: 2,
      imageURL: "NONPREVIEW IMAGE URL 1",
      previewImage: false
    },
    {
      spotId: 3,
      imageURL: "PREVIEW IMAGE URL 3",
      previewImage: true
    }, 
    {
      spotId: 3,
      imageURL: "NONPREVIEW IMAGE URL 1",
      previewImage: false
    }, 
    {
      spotId: 4,
      imageURL: "PREVIEW IMAGE URL 3",
      previewImage: true
    }, 
    {
      spotId: 4,
      imageURL: "NONPREVIEW IMAGE URL 1",
      previewImage: false
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      imageURL: { [Op.in]: ["PREVIEW IMAGE URL 1","NONPREVIEW IMAGE URL 1","PREVIEW IMAGE URL 2","PREVIEW IMAGE URL 3",] }
    }, {});
  }
};
