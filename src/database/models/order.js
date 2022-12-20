'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Cart,{
        foreignKey : 'orderId',
        as : 'carts',
        onDelete : 'cascade'
      });

      this.belongsTo(models.User, {
        foreignKey : 'userId',
        as : 'user'
      });

      this.belongsTo(models.State, {
        foreignKey : 'stateId',
        as : 'status'
      });
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    stateId: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};