const { Sequelize } = require("sequelize");

const db = new Sequelize('BRM', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
});

module.exports = db;