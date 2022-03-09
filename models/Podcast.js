const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Podcast extends Model {}
//need to review this, copied from student activity 16.
Podcast.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "podcast",
  }
);

module.exports = Podcast;
