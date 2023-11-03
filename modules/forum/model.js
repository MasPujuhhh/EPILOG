import { DataTypes } from "sequelize";
import sequelize from "../../config/connection.js";

import UserModel from "../users/model.js";

// class User extends Model {}
const Forum = sequelize.define('forum', {
        // Model attributes are defined here
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        message: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        source: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        link: {
          type: DataTypes.TEXT,
          allowNull: false,
        }
      }, {
        freezeTableName:true,
        paranoid:true,
      }
)

Forum.belongsTo(UserModel, { foreignKey: 'user_id' });
UserModel.hasMany(Forum, { foreignKey: 'user_id' });

export default Forum