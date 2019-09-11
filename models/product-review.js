'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductReview = sequelize.define('ProductReview', {
    reviewComment: DataTypes.STRING
  }, {});
  ProductReview.associate = function(models) {
    // associations can be defined here
    models.ProductReview.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.ProductReview.belongsTo(models.Product, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return ProductReview;
};