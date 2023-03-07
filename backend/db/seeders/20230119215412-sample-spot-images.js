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
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678151508/ugly3_hs94oh.jpg",
      previewImage: true
    },
    {
      spotId: 1,
      url: "NONPREVIEW IMAGE URL 1",
      previewImage: false
    },
    {
      spotId: 2,
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678151494/52d8f9ad5c3e3c6a5b0033f4.format-webp.width-1440_AcuQiV0Iv4hyThCK_t6pzk8.webp",
      previewImage: true
    },
    {
      spotId: 2,
      url: "NONPREVIEW IMAGE URL 2",
      previewImage: false
    },
    {
      spotId: 3,
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678151608/webuyhouseshouse_bandits_qslkqp.jpg",
      previewImage: true
    }, 
    {
      spotId: 3,
      url: "NONPREVIEW IMAGE URL 3",
      previewImage: false
    }, 
    {
      spotId: 4,
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678151696/_5dc395f4-aad7-11e9-bdb2-acd0277ecbef_n4exb0.jpg",
      previewImage: true
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
