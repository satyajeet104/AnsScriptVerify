const express = require('express')
const path = require('path')
const formidable = require('formidable');
const app = express();
const morgan = require('morgan')

const db = require('./db');

db.connect();
function initialDB(){
    var promise1=new Promise(function(resolve,reject){
  
      var sql = `CREATE TABLE IF NOT EXISTS admin_auth
      (
  
        id int  primary key auto_increment  ,
        username varchar(10) unique not null,
        password varchar(10) not null,      
        name varchar(10) not null
      ); `;
      
      db.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);    
        resolve();
      })
  
    });

    var promise2=new Promise(function(resolve,reject){
  
        var sql = `CREATE TABLE IF NOT EXISTS teacher_auth
        (
    
          id int  primary key auto_increment  ,
          username varchar(10) unique not null,
          password varchar(10) not null,      
          name varchar(10) not null
        ); `;
        
        db.query(sql, function (error, results, fields) {
          if (error) throw error;
          console.log('The solution is: ', results);    
          resolve();
        })
    
      });

      var promise3=new Promise(function(resolve,reject){
  
        var sql = `CREATE TABLE IF NOT EXISTS student_auth
        (
    
          id int  primary key auto_increment  ,
          username varchar(10) unique not null,
          password varchar(10) not null,      
          name varchar(10) not null
        ); `;
        
        db.query(sql, function (error, results, fields) {
          if (error) throw error;
          console.log('The solution is: ', results);
          resolve();    
        })
    
      });
    promise1.then(function(data){
      return promise2;  
  }).then(function(data){
      return promise3;
  }).then(function(data){
      console.log("Initialization done");
  })
  
  }
 initialDB();

app.set("view engine", "ejs");

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
    res.render("index");


})

app.post('/', function (req, res){

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

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(2698, () => console.log('Server started at http://localhost:2678'))
