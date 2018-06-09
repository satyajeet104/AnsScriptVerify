const express = require('express')
const router = express.Router()
const db = require('./../../db')
const formidable = require('formidable');
const mkdirp = require('mkdirp');
var dir="";
var filename="";





router.get('/', (req, res) => {

    res.render("adminDashboard");


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
        filename=file.name;

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

        Jimp.read(__dirname + '/../../public/uploads/temp/'+filename).then(function (lenna) {
            return lenna.quality(60)                 // set JPEG quality
                .crop(240, 150, 350, 50)                     // set greyscale
                .write("lena.jpg"); // save
        }).then(function (data) {
            console.log("lena")

            var Tesseract = require('tesseract.js')

            // replace this with require('tesseract.js')
            myImage = 'lena.jpg';

            Tesseract.recognize(myImage)
                .then((result) => {
                    dir=result.text.split(" ")[0];
                    console.log(dir+dir)
                          
                    var sql3 = 'select * from admin_auth where id=?;';

                    db.query(sql3, [req.user], function (error, results, fields) {
                        if (error) { reject(error); return; }
                        console.log('The solution is: ', results);
                        if (results[0] == null) {
                            res.send(null);
                        }
                        else {
                            res.render("fileUpload", { username: results[0].name, student: result.text });

                        }

                    })


                })


        }).catch(function (err) {
            console.error(err);

        });
    });



})


router.post('/fileUpload', function (req, res) {

   
    var mkdirp = require('mkdirp');
    console.log("fileUpload");

    var promise1=new Promise(function(resolve,reject){
        mkdirp( __dirname + '/../../public/uploads/'+dir, function (err) {
            if (err) console.error(err)
            else {
                var form = new formidable.IncomingForm();


                form.parse(req);
            
            
            
                form.on('fileBegin', function (name, file) {
                    file.path = __dirname + '/../../public/uploads/'+dir+'/' + file.name;
                    console.log(file.path);
            
            
                });
            
                form.on('file', function (name, file) {
                    console.log('Uploaded ' + file.name);
            
                });
                form.on('end', function () {
            
                    res.render('../views/wrong', { success: "Files have been uploaded successfully" });
            
                })
            }
        });
        
    })
    

   });



router.post('/studentAuth', (req, res, next) => {

    var promise1 = new Promise(function (resolve, reject) {
        var name = req.body.name;
        var username = req.body.username;
        var password = req.body.password;
        var id = parseInt(req.body.id);
        var sql = `insert into student_auth values(?,?,?,?);`;

        db.query(sql, [id, username, password, name], function (error, results, fields) {
            if (error) { reject(error); return; }
            console.log('The solution is: ', results);
            var sql3 = 'select * from admin_auth where id=?;';

            db.query(sql3, [req.user], function (error, results, fields) {
                if (error) { reject(error); return; }
                console.log('The solution is: ', results);
                if (results[0] == null) {
                    res.send(null);
                }
                else {
                    res.render('../views/wrong', { success: "You have Successfully created a student" });

                }

            })
        })

    })


    promise1.catch(function (error) {
        console.log(error);
        res.render('../views/wrong', { success: "You have entered an invalid input" });
    });
})

router.post('/teacherAuth', (req, res, next) => {

    var promise1 = new Promise(function (resolve, reject) {
        var name = req.body.name;
        var username = req.body.username;
        var password = req.body.password;
        var id = parseInt(req.body.id);
        var sql = `insert into teacher_auth values(?,?,?,?);`;

        db.query(sql, [id, username, password, name], function (error, results, fields) {
            if (error) { reject(error); return; }
            console.log('The solution is: ', results);
        })
        var sql3 = 'select * from admin_auth where id=?;';

        db.query(sql3, [req.user], function (error, results, fields) {
            if (error) { reject(error); return; }
            console.log('The solution is: ', results);
            if (results[0] == null) {
                res.send(null);
            }
            else {
                res.render('../views/wrong', { success: "You have Successfully created a Teacher" });

            }

        })

    })

    promise1.catch(function (error) {
        console.log(error);
        res.render('../views/wrong', { success: "You have entered an invalid input" });
    });
})

exports = module.exports = router