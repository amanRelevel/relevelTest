const route = require('express').Router()
const authCtrl = require('../controller/auth.controller')
const isauth = require('../middlewares/auth.middleware').auth

route.post('/login',authCtrl.login);
route.post('/signUp',authCtrl.signUp);

module.exports = route