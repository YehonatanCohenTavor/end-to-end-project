let mysql  = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'z10mz10m',
    database : 'placeholder_clone'
});



connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


module.exports = connection;