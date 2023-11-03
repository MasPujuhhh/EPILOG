import { DataTypes } from "sequelize";
import sequelize from "../../config/connection.js";

// class User extends Model {}
const Schedule = sequelize.define('schedule', {
        // Model attributes are defined here
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        date: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      }, {
        freezeTableName:true,
        paranoid:true,
      }
)


export default Schedule