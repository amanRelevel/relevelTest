const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const db = require('./services/db.services')
const authRoute = require('./routes/auth.routes')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));

db.sequelize.sync();
// db.sequelize.sync({force : true});
// 

app.get('/',(req,res) =>{   
    return res.send({
        data : 1
    })
})

app.listen(5555,(req,res) =>{
    console.log("server started at ",5555)
})