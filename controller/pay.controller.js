module.exports.pay = (req,res) =>{
    console.log(req.body);
    return res.send({
        r : req.body.r
    })
}