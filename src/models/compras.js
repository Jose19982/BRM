const { DataTypes } = require("sequelize");
const db = require("../db/dataBase");

const compras = db.define('compras', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nombreCliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombreProducto: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = compras;