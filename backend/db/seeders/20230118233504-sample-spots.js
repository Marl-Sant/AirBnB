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
        name: "Single Family Home -- Great for Families",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
      name: "Small Condo for Retirees",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
      name: "Studio Apartment in Downtown",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
      name: "Seaside Villa -- 5 mins from Beach!",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      price: 122
    },
  
  
  
  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,null, {});
  }
};
