module.exports = (sequelize,Sequelize) =>{
    const Book = sequelize.define('Books',{
        BookName : Sequelize.STRING(50),
        Author: Sequelize.STRING(50),
        PublishedOn : Sequelize.DATE,
        AddedOn : Sequelize.DATE,
        IsbnNo : Sequelize.STRING(50),
        Status : Sequelize.BOOLEAN
    });

    return Book;
}