module.exports = (sequelize,Sequelize) =>{
    const RentedBook = sequelize.define('rentedBook',{
        userId : Sequelize.INTEGER,
        IsbnNo : Sequelize.STRING(50)
    });

    return RentedBook;
}