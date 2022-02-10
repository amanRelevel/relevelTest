const jwt = require('jsonwebtoken');
const userModel = require('../services/db.services').User;

module.exports.auth = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1];

        jwt.verify(token,"Aman",(err,user) =>{
            if(err){
                return res.send({
                    msg : "Invalid Token"
                })
            }
            let data = await userModel.findOne({
                where:{
                    id : user
                }
            }).catch(err => console.log("Error while fetching user data",err))
            req.user = data;
            next();
        })
    }
    else {
        return res.send({
            msg : "Authorization Required"
        })
    }
}
