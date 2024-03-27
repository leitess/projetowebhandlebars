const Sequelize = require("sequelize");
const sequelize = new Sequelize("dsm","root","A8zZ6UaM2kjCZDNEGakdAO5YcmvnEhLY",{
    host: "192.168.1.12",
    dialect: "mysql"
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
}