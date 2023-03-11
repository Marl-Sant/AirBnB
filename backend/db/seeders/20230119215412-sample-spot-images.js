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
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678153248/800px-Equality_House_-_Rainbow_House_Across_Street_from_Westboro_Baptist_Church__Topeka__Kansas__30224409157_auuxtu.jpg",
      previewImage: false
    },
    {
      spotId: 2,
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678151494/52d8f9ad5c3e3c6a5b0033f4.format-webp.width-1440_AcuQiV0Iv4hyThCK_t6pzk8.webp",
      previewImage: true
    },
    {
      spotId: 2,
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678153248/800px-Equality_House_-_Rainbow_House_Across_Street_from_Westboro_Baptist_Church__Topeka__Kansas__30224409157_auuxtu.jpg",
      previewImage: false
    },
    {
      spotId: 3,
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678151608/webuyhouseshouse_bandits_qslkqp.jpg",
      previewImage: true
    }, 
    {
      spotId: 3,
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678152994/ZbKwuazZYQTcjxVWPnH-NLTGC4IOB81uEP_9DF9UFCE_if4gtl.webp",
      previewImage: false
    }, 
    {
      spotId: 4,
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678151696/_5dc395f4-aad7-11e9-bdb2-acd0277ecbef_n4exb0.jpg",
      previewImage: true
    }, 
    {
      spotId: 4,
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678152892/d1f86c5b39a0ad3243f3897dcb65657d_h3rziv.jpg",
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
