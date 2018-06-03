const express = require('express')
const path = require('path')

const app = express();
const morgan = require('morgan')
app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.get('/',function(req,res){
    res.send("hello world")

})
app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(2678, () => console.log('Server started at http://localhost:2678'))