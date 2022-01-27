const { DataTypes } = require("sequelize");
const db = require("../db/dataBase");

const producto = db.define('productos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numeroLote: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fechaIngreso: {
        type: DataTypes.DATE,
        allowNull: false
    },
})

module.exports = producto;