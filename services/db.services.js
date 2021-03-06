const dbConfig = require('../config/db.config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect : dbConfig.dialect
})

const db = {};

db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require('../models/user.model')(sequelize,Sequelize);
db.Book = require('../models/book.model')(sequelize,Sequelize);
db.RentedBook = require('../models/rentedBook.model')(sequelize,Sequelize);
module.exports = db;

