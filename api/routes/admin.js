const express = require('express')
const router = express.Router()
const db = require('./../../db')
const formidable = require('formidable');
const mkdirp = require('mkdirp');



router.get('/', (req, res) => {

    res.render("index1");


})

router.post('/recog', function (req, res) {

        var form = new formidable.IncomingForm();


        form.parse(req);





        form.on('fileBegin', function (name, file) {
            file.path = __dirname + '/../../public/uploads/temp/' + file.name;
            console.log(file.path);


        });

        form.on('file', function (name, file) {
            console.log('Uploaded ' + file.name);

        });

        form.on('end', function () {
            console.log("endddd")
            var Jimp = require("jimp");

            // open a file called "lenna.png"
      /*      Jimp.read(__dirname + '/../../public/uploads/temp/a2.png', function (err, lenna) {
                if (err) throw err;
                lenna.quality(60)                 // set JPEG quality
                    .crop(240,150,350,50)              // set greyscale
                    .write("lena.jpg") // save
             

    });
*/

    Jimp.read(__dirname + '/../../public/uploads/temp/a2.png').then(function (lenna) {
        return lenna.quality(60)                 // set JPEG quality
             .crop(240,150,350,50)                     // set greyscale
             .write("lena.jpg"); // save
    }).then(function(data){
        console.log("lena")

        var Tesseract = require('tesseract.js')
  
        // replace this with require('tesseract.js')
        myImage ='lena.jpg';

        Tesseract.recognize(myImage)
        .then((result )=>{
            console.log(result.text)
            res.send(result.text);

        }) 


    }).catch(function (err) {
        console.error(err);
    });
});

    
      




   






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