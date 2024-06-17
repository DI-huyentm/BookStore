'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Migration logic to apply changes
    await queryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      total: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Add any additional constraints or alterations here

    // Example of adding foreign key constraint
    await queryInterface.addConstraint('sales', {
      type: 'foreign key',
      fields: ['user_id'],
      name: 'fk_sales_user_id',
      references: {
        table: 'users', // Adjust to your actual users table name
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Migration logic to revert changes
    await queryInterface.dropTable('sales');

    // Example of dropping foreign key constraint
    await queryInterface.removeConstraint('sales', 'fk_sales_user_id');
  },
};
