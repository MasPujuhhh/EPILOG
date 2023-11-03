import { DataTypes } from "sequelize";
import sequelize from "../../config/connection.js";

import UserModel from "../users/model.js";

// class User extends Model {}
const Announcement = sequelize.define('announcement', {
        // Model attributes are defined here
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        desciption: {
          type: DataTypes.TEXT,
          allowNull: false,
        }
      }, {
        freezeTableName:true,
        paranoid:true,
      }
)

Announcement.belongsTo(UserModel, { foreignKey: 'user_id' });
UserModel.hasMany(Announcement, { foreignKey: 'user_id' });

export default Announcement