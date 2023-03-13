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
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678737612/b490fb4f41473bdd44b2dce317b8a0c0_ijdbix.jpg",
      previewImage: true
    },
    {
      spotId: 1,
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678737613/download_1_o14roz.jpg",
      previewImage: false
    },
    {
      spotId: 1,
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678737616/download_2_t14fwr.jpg",
      previewImage: false
    },
    {
      spotId: 2,
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678737616/download_2_t14fwr.jpg",
      previewImage: true
    },
    {
      spotId: 2,
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678737621/download-23_y6xhat.jpg",
      previewImage: false
    },
    {
      spotId: 2,
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678737628/istockphoto-1249280573-612x612_z87m4v.jpg",
      previewImage: false
    },
    {
      spotId: 3,
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678151608/webuyhouseshouse_bandits_qslkqp.jpg",
      previewImage: true
    }, 
    {
      spotId: 3,
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678737628/istockphoto-1249280573-612x612_z87m4v.jpg",
      previewImage: false
    }, 
    {
      spotId: 3,
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678737624/Holly_Hills_1CMYK_exyvvt.jpg",
      previewImage: false
    }, 
    {
      spotId: 4,
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678153248/800px-Equality_House_-_Rainbow_House_Across_Street_from_Westboro_Baptist_Church__Topeka__Kansas__30224409157_auuxtu.jpg",
      previewImage: true
    }, 
    {
      spotId: 4,
      url: "https://res.cloudinary.com/dhruiovd0/image/upload/v1678737624/Holly_Hills_1CMYK_exyvvt.jpg",
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
