import { DataTypes } from "sequelize";
import sequelize from "../../config/connection.js";

import UserModel from "../users/model.js";
import ScheduleModel from "../schedule/model.js";

// class User extends Model {}
const Link = sequelize.define('link', {
        // Model attributes are defined here
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        link: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        type: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
      }, {
        freezeTableName:true,
        paranoid:true,
      }
)

Link.belongsTo(UserModel, { foreignKey: 'user_id' });
UserModel.hasMany(Link, { foreignKey: 'user_id' });

Link.belongsTo(ScheduleModel, { foreignKey: 'schedule_id' });
ScheduleModel.hasMany(Link, { foreignKey: 'schedule_id' });

export default Link