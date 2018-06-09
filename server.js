const express = require('express')
const path = require('path')

const app = express();
const morgan = require('morgan')
const db = require('./db');
const cookieParser = require('cookie-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);


const auth = require('./api/routes/auth')
const admin = require('./api/routes/admin')

app.set("view engine", "ejs");

db.connect();
function initialDB() {
  var promise1 = new Promise(function (resolve, reject) {

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

  var promise2 = new Promise(function (resolve, reject) {

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

  var promise3 = new Promise(function (resolve, reject) {

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
  promise1.then(function (data) {
    return promise2;
  }).then(function (data) {
    return promise3;
  }).then(function (data) {
    console.log("Initialization done");
  })

}
initialDB();




app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', function (req, res) {
  res.render("index");
})


var options = {
  host: 'localhost',
  user: 'root',
  database: 'anSscript_project'
};


var sessionStore = new MySQLStore(options);

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  store: sessionStore,
  saveUninitialized: false
  // cookie: { secure: true }
}))

app.use(passport.initialize());
app.use(passport.session());



var myLocalStrategy1 = new LocalStrategy(
  function (username, password, done) {

    var sql = `select id from student_auth where username=? and password=?;`;

    db.query(sql, [username, password], function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
      if (results[0] == null) {
        return done(null, false);
        // username and pass not found flash 
      }
      else {
        //res.render('../views/dashboard', {username:username, password:password});
        return done(null, results[0].id);
      }
    })
  });

var myLocalStrategy2 = new LocalStrategy(
  function (username, password, done) {

    var sql = `select id from admin_auth where username=? and password=?;`;

    db.query(sql, [username, password], function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
      if (results[0] == null) {
        return done(null, false);
        // username and pass not found flash 
      }
      else {
        //res.render('../views/dashboard', {username:username, password:password});
        return done(null, results[0].id);
      }
    })
  });
var myLocalStrategy3 = new LocalStrategy(
  function (username, password, done) {

    var sql = `select id from teacher_auth where username=? and password=?;`;

    db.query(sql, [username, password], function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
      if (results[0] == null) {
        return done(null, false);
        // username and pass not found flash 
      }
      else {
        //res.render('../views/dashboard', {username:username, password:password});
        return done(null, results[0].id);
      }
    })
  });
passport.use('local.one', myLocalStrategy1);
passport.use('local.two', myLocalStrategy2);
passport.use('local.three', myLocalStrategy3);


app.get('/studentProfile', authenticationMiddleware1(), (req, res) => {
  var sql = 'select * from student_auth where id=?;';

  db.query(sql, [req.user], function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    if (results[0] == null) {
      res.send(null);
    }
    else {
      res.render('../views/studentDashboard', { username: results[0].name })

    }

  })
})

app.get('/teacherProfile', authenticationMiddleware2(), (req, res) => {
  var sql = 'select * from teacher_auth where id=?;';

  db.query(sql, [req.user], function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    if (results[0] == null) {
      res.send(null);
    }
    else {
      res.render('../views/teacherDashboard', { username: results[0].name });

    }

  })
})

app.get('/adminProfile', authenticationMiddleware3(), (req, res) => {
  var sql = 'select * from admin_auth where id=?;';

  db.query(sql, [req.user], function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    if (results[0] == null) {
      res.send(null);
    }
    else {
      res.render('../views/adminDashboard', { username: results[0].name });

    }

  })
})

app.get('/studentlogin', (req, res) => {
  res.render('studentLogin');
});

app.get('/teacherlogin', (req, res) => {
  res.render('teacherLogin');
});
app.get('/adminlogin', (req, res) => {
  res.render('adminLogin');
});

app.get('/index', (req, res) => {
  res.render('index');

});

app.get('/views/admin', (req, res) => {
  res.render('admin');

});


function authenticationMiddleware1() {
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

    if (req.isAuthenticated()) return next();
    res.redirect('/studentLogin')
  }
}

function authenticationMiddleware2() {
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

    if (req.isAuthenticated()) return next();
    res.redirect('/teacherLogin')
  }
}

function authenticationMiddleware3() {
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

    if (req.isAuthenticated()) return next();
    res.redirect('/adminLogin')
  }
}


app.use('/api/routes/auth', auth);
app.use('/api/routes/admin', admin);



app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(3098, () => console.log('Server started at http://localhost:2678'))
