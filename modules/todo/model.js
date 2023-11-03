import { DataTypes } from "sequelize";
import sequelize from "../../config/connection.js";

import UserModel from "../users/model.js";

// class User extends Model {}
const Todo = sequelize.define('todo', {
        // Model attributes are defined here
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        }
      }, {
        freezeTableName:true,
        paranoid:true,
      }
)

Todo.belongsTo(UserModel, { foreignKey: 'user_id' });
UserModel.hasMany(Todo, { foreignKey: 'user_id' });

export default Todo