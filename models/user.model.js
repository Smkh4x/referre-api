import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.ENUM(
            'admin',
            'commissaire',
            'arbitre',
            'consultation'
        ),
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING,

    }
},
    {
        tableName: "users",
        timestamps: false
    })
export default User;