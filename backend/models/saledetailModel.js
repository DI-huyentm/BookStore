// models/saledetailModel.js
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class SaleDetail extends Model {}
  SaleDetail.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sale_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'SaleDetail',
      tableName: 'saledetails', // Ensure Sequelize uses 'saledetails' table
      timestamps: false,
    }
  );

  return SaleDetail;
};
