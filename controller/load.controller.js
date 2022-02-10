module.exports.load = (req,res) =>{
    console.log(req.query)
    return res.send({
        a : req.query.a
    })
}