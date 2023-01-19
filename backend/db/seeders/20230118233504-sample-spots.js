'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Spots', [{
        ownerId: 1,
        address: "3230 SW 1st Ave",
        city: "Deerfield Beach",
        state: "Fl",
        country: "USA",
        lat: 49.18254,
        lng: 15.34587,
        name: "3 Bedrooms and 2 Bathrooms",
        description: "Single family home",
        price: 143
      },
    {
      ownerId: 2,
      address: "18320 Colorado Circle",
      city: "Boca Raton",
      state: "Fl",
      country: "USA",
      lat: 42.465782,
      lng: 17.465874,
      name: "2300 square feet",
      description: "Duplex property",
      price: 165
    },
    {
      ownerId: 3,
      address: "115 Deer Creek Blvd",
      city: "Fort Lauderdale",
      state: "Fl",
      country: "USA",
      lat: 41.466282,
      lng: 11.95874,
      name: "2300 square feet",
      description: "Duplex property",
      price: 122
    }], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.dropTable(options)
  }
};
