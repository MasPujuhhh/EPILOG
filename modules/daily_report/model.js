import { DataTypes } from "sequelize";
import sequelize from "../../config/connection.js";

import UserModel from "../users/model.js";

// class User extends Model {}
const Notification = sequelize.define('Notification', {
        // Model attributes are defined here
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        report: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        comment: {
          type: DataTypes.INTEGER,
          allowNull: true,
        }
      }, {
        freezeTableName:true,
        paranoid:true,
      }
)

Notification.belongsTo(UserModel, { foreignKey: 'user_id' });
UserModel.hasMany(Notification, { foreignKey: 'user_id' });

export default Notification