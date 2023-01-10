'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Blogs', [{
      title: 'Best Places to Travel in the Caribbeans',
      body: 'Aruba',
      category: 'travel',
      createdAt: new Date(),
      updatedAt: new Date(),
      
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Blogs', null, {});
  }
};
