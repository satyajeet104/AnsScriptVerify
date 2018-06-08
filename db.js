var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'anSscript_project'
});




exports=module.exports=connection;
