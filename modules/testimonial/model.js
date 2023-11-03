import { DataTypes } from "sequelize";
import sequelize from "../../config/connection.js";

import UserModel from "../users/model.js";

// class User extends Model {}
const Testimonial = sequelize.define('testimonial', {
        // Model attributes are defined here
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        }
      }, {
        freezeTableName:true,
        paranoid:true,
      }
)

Testimonial.belongsTo(UserModel, { foreignKey: 'user_id' });
UserModel.hasMany(Testimonial, { foreignKey: 'user_id' });

export default Testimonial