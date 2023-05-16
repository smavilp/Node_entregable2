const db = require("../utils/database");
const {DataTypes} = require("sequelize");

const Todo = db.define("todo", {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title:{
    type:DataTypes.STRING,
    allowNull: false,
  },
  description:{
    type:DataTypes.TEXT,
  },
  completed:{
    type:DataTypes.BOOLEAN,
    allowNull: false,
  }
});

module.exports = Todo;