'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
      await queryInterface.bulkInsert(options, [{
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
      name: "Small seaside condo",
      description: "Guest house on location",
      price: 122
    }, 
    {
      ownerId: 4,
      address: "115478 Congress Ave",
      city: "Delray Beach",
      state: "Fl",
      country: "USA",
      lat: 41.466282,
      lng: 11.95874,
      name: "Villa",
      description: "Located in retirement village - 55+ older renters only",
      price: 122
    },
  
  
  
  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['3230 SW 1st Ave', '115 Deer Creek Blvd', '18320 Colorado Circle"'] }
    }, {});
  }
};
