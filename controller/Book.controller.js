const bookModel = require('../services/db.services').Book
const Sequelize = require('sequelize')
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
    let query = `select `
}