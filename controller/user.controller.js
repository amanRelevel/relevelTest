const User = require('../services/db.services').User

module.exports.insertUser = async (req,res) => {
    let data = await User.create(req.body)
    return res.send(data)
}