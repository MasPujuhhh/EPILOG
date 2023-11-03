import { DataTypes } from "sequelize";
import sequelize from "../../config/connection.js";

import UserModel from "../users/model.js";
import LogbookModel from "../logbook/model.js";

// class User extends Model {}
const Grade = sequelize.define('grade', {
        // Model attributes are defined here
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        grade: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
      }, {
        freezeTableName:true,
        paranoid:true,
      }
)

Grade.belongsTo(UserModel, { foreignKey: 'user_id' });
UserModel.hasMany(Grade, { foreignKey: 'user_id' });

Grade.belongsTo(LogbookModel, { foreignKey: 'logbook_id' });
LogbookModel.hasMany(Grade, { foreignKey: 'logbook_id' });

export default Grade