const jwt = require('jsonwebtoken')

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
            req.user = user;
            next();
        })
    }
    else {
        return res.send({
            msg : "Authorization Required"
        })
    }
}
