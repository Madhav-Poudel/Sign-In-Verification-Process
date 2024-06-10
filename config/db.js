const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('db_student', 'root', 'parrot', {
    host: 'localhost',
    dialect: "mysql"
});

module.exports = sequelize