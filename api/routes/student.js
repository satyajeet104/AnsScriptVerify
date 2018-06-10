const express = require('express')
const router = express.Router()
const db = require('./../../db')

router.post('/session',function(req,res){

    var sql = 'select * from student_auth where id=?;';
  
    db.query(sql, [req.user], function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
      if (results[0] == null) {
        res.send(null);
      }
      else {
        res.render('chat', { username: results[0].name, teacher: req.body.tname });
  
      }
  
    })
    
  })



exports=module.exports = router