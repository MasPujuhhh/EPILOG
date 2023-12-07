import { DataTypes } from "sequelize";
import sequelize from "../../config/connection.js";

import TodoModel from "../todo/model.js";

// class User extends Model {}
const TodoList = sequelize.define('list', {
        // Model attributes are defined here
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        done: {
          type: DataTypes.BOOLEAN,
          default:false,
          allowNull: false,
        }
      }, {
        freezeTableName:true,
        paranoid:true,
      }
)

TodoList.belongsTo(TodoModel, { foreignKey: 'todo_id' });
TodoModel.hasMany(TodoList, { foreignKey: 'todo_id' });

export default TodoList