var express = require('express');
var router = express.Router();
const connection = require('../modules/connection');
const validateLogin = require('../modules/validateLogin');

/* GET users listing. */


router.post('/login',validateLogin, (req, res, next) => {
    connection.query(`SELECT * FROM users WHERE username=${req.body.username};`, (err,result) => {
      if (err) console.log(err);
      res.json(result);
    })
})


router.post('/', function ({ body }, res, next) {
  connection.query(`INSERT INTO users (full_name,username,email,address,city,phone) VALUES(${body.full_name},${body.username},${body.email},${body.address},${body.city},${body.phone});`, function (err, result) {
    if (err) console.log(err);
    console.log('User added successfully');
    connection.query(`INSERT INTO user_passwords (user_id,password) VALUES (${result.insertId},${body.password});`, (err, result) => {
      if (err) console.log(err);
    })
    connection.query(`SELECT * FROM users WHERE username=${body.username};`, function (err, result) {
      if (err) console.log(err);
      res.json(result);
    })
  })
})








module.exports = router;
