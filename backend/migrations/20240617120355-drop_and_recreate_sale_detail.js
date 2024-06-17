'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop existing table
    await queryInterface.dropTable('saledetails'); // Drop 'saledetails' if it exists

    // Recreate table with updated schema
    await queryInterface.createTable('saledetails', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sale_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      book_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      // Add or modify columns as needed
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop table if migration is rolled back
    await queryInterface.dropTable('saledetails'); // Drop 'saledetails' if it exists
  }
};
