const express = require('express')
const router = express.Router()
const db = require('./../../db')
const formidable = require('formidable');


router.get('/',(req,res)=> {
   
    res.render("index1");
    

})


router.post('/', function (req, res){

    var promise1=new Promise(function(resolve,reject){
        var form = new formidable.IncomingForm();

        form.parse(req);
    
        form.on('fileBegin', function (name, file){
            file.path = __dirname + '/public/uploads/' + file.name;
        });
    
        form.on('file', function (name, file){
            console.log('Uploaded ' + file.name);
            resolve();
        });
    

    })

    promise1.then(function(data){
        console.log("resolved");


    })
      
    
});
exports=module.exports = router