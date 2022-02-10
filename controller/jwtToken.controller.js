const jwt = require('jsonwebtoken')


module.exports.generateToken = (data) => {
    const token = jwt.sign({username : data.username},"Aman")

    return token;
}
