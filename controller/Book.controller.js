const bookModel = require('../services/db.services').Book
const Sequelize = require('sequelize')
const userModel = require('../services/db.services').User
const rentedBookModel = require('../services/db.services').RentedBook

module.exports.fetchAllBook = async (req,res) => {
    let data = await bookModel.findAll().catch(err => console.log("Error in fetchAllBook",err))
    return res.status(200).send(data)
}

module.exports.addBook = async (req,res) => {

    await bookModel.create(req.body).catch(err => console.log("Error in addBook",err))

    return res.status(200).send({
        msg : "Book Added"
    })
}

module.exports.bookDelete = async (req,res) => {

    if(req.query.delete == true){
        await bookModel.delete({
            where : {
                IsbnNo : req.body.isbnNo
            }
        }).catch(err => console.log("Error in bookDelete",err))
    }
    else if(req.query.rent == true){
        let userData = await userModel.findOne({
            where:{
                id:req.user.id
            }
        })
        if(userData.noOfRentedBook == 2){
            return res.send({
                msg : "Cannot Rent More Than 2 Book"
            })
        }
        await bookModel.findAll({
            where : {
                IsbnNo : req.body.IsbnNo,
                Status : 0
            }
        }).then(data => {
            if(data.length > 0){
                await bookModel.update({Status : 1},{
                    where:{
                        IsbnNo: req.body.IsbnNo
                    }
                }).catch(err => console.log("Error in bookRentUpdate",err))

                await userModel.update({noOfRentedBook : userData.noOfRentedBook + 1},{
                    where : {
                        userId : userData.id
                    }
                }).catch(err => console.log("Error in Updating no of rented Book",err))

                await rentedBookModel.create({
                    userId : req.user.id,
                    IsbnNo : req.body.IsbnNo
                }).catch(err => console.log("Error in Adding rentedBook",err))

                res.send({
                    msg : "Book is rented"
                })
            }
            res.send({
                msg : "Book is not available"
            })
        }).catch(err => console.log("Error in bookRent",err))
    }
    else if(req.query.return == true){
        await bookModel.findAll({
            where : {
                IsbnNo : req.body.IsbnNo,
                Status : 1
            }
        }).then(data => {
            if(data.length > 0){
                await bookModel.update({Status : 0},{
                    where:{
                        IsbnNo: req.body.IsbnNo
                    }
                }).catch(err => console.log("Error in bookRentUpdate",err))
                let userData = await userModel.findOne({
                    where : {
                        id : req.user.id
                    }
                }).catch(err => console.log("Error in Fetching user data",err))
                await userModel.update({noOfRentedBook : userData.noOfRentedBook-1},{
                    where : {
                        userId : userData.id
                    }
                }).catch(err => console.log("Error in Updating no of rented Book",err))

                await rentedBookModel.delete({
                    where:{
                        userId : req.user.id,
                        IsbnNo : req.body.IsbnNo
                    }
                }).catch(err => console.log("Error in removing rentedBook",err))

                res.send({
                    msg : "Book is returned"
                })
            }
            res.send({
                msg : "Book is not rented"
            })
        }).catch(err => console.log("Error in bookRent",err))
    }
}

module.exports.rentedBookByUser = async (req,res) => {
    let query = `select * from rentedBook left join Books on Books.IsbnNo = rentedBook.IsbnNo where rentedBook.useriId = $userId;`;

   let data =  await sequelize.query(
        query,
        {
        bind: { userId: req.params.userId },
        type: QueryTypes.SELECT
        }
    ).catch(err => console.log("Err in rentedBookByUser",err))

    return res.send(data)
}