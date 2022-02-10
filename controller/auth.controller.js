const userModel = require("../services/db.services").User
const generateToken = require("../controller/jwtToken.controller").generateToken
const bcrypt = require('bcrypt')

module.exports.login = (req,res) =>{
    userModel.findOne({
        where : {
            user : req.body.username,
        }
    }).then(data =>{
        if(data.length == 0){
            return res.send({
                msg : "Please SignUp"
            })
        }
        if(bcrypt.compareSync(req.body.password,data.password)){
            const token = generateToken(data)
            return res.send({
                token:token,
                msg: "login Successful",
            })      
        }
        return res.send({
            msg : "Password Incorrect"
        })
    }).catch(err => {
        console.log("Error in login controller",err)
        res.send({
            msg: "Not Able to login" 
        })
    })
}

module.exports.signUp = (req,res) => {
    userModel.findAll({
        where : {
            user : req.body.username
        }
    }).then(data => {
        console.log(data)
        if(data.length == 0){
            const hash = bcrypt.hashSync(req.body.password,10);
            userModel.create({ 
                user:req.body.username,
                password:hash
            }).catch(err => console.log("Error in signup controller",err))

            return res.send({
                msg: "User Signed Up Successfully"
            })
        }
        return res.send({
            msg : "user already exist"

        })
    }).catch(err => console.log("Error in signup controller",err))
}