const express = require('express')
const router = express.Router()
const db = require('./../../db')
const formidable = require('formidable');
const mkdirp = require('mkdirp');



router.get('/', (req, res) => {

    res.render("index1");


})

router.post('/recog', function (req, res) {

    var promise1 = new Promise(function (resolve, reject) {
        var form = new formidable.IncomingForm();


        form.parse(req);




        form.on('fileBegin', function (name, file) {
            file.path = __dirname + '/../../public/uploads/temp/' + file.name;
            console.log(file.path);
            form.on('file', function (name, file) {
                console.log('Uploaded ' + file.name);

            });

        });




    })

    promise1.then(function (data) {
        console.log("resolved");
    })




    res.render("index1");

})


router.post('/uploadFile', function (req, res) {

    console.log(req.body.student)
    var promise1 = new Promise(function (resolve, reject) {
        var form = new formidable.IncomingForm();


        form.parse(req);




        form.on('fileBegin', function (name, file) {
            file.path = __dirname + '/../../public/uploads/' + file.name;
            console.log(file.path);
            form.on('file', function (name, file) {
                console.log('Uploaded ' + file.name);

            });


        });




    })

    promise1.then(function (data) {
        console.log("resolved");


    })


});
exports = module.exports = router