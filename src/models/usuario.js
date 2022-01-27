const { DataTypes } = require("sequelize");
const db = require("../db/dataBase");

const usuarioModel = db.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

module.exports = usuarioModel;