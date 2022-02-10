const route = require('express').Router()
const bookCtrl = require('../controller/Book.controller')

route.get('/book/list',bookCtrl.fetchAllBook);
route.post('/book/create',bookCtrl.addBook);
route.post('/book?',bookCtrl.bookDelete);
route.get('/rented/:userid',bookCtrl.rentedBookByUser);
module.exports = route