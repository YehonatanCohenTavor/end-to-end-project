var express = require('express');
var router = express.Router();
const connection=require('../modules/connection');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (!req.query.user_id) {
        connection.query(`SELECT * FROM todos WHERE deleted = 0 LIMIT 50`, (err, result) => {
            if (err) console.log(err);
            res.json(result);
        })
    } else {
        connection.query(`SELECT * FROM todos WHERE user_id=${req.query.user_id} AND deleted = 0`, (err, result) => {
            if (err) console.log(err);
            res.json(result);
        })
    }
});

router.get('/:todo_id', function (req, res, next) {
    connection.query(`SELECT * FROM todos WHERE todo_id=${req.params.todo_id} AND deleted = 0`, (err, result) => {
        if (err) console.log(err);
        res.json(result);
    });
});


router.post('/', function ({ body }, res, next) {
    connection.query(`INSERT INTO todos ( user_id , task,completed) VALUES(${body.user_id} , ${body.task} , ${body.completed?body.completed:"DEFAULT"});`, function (err, result) {
      if (err) console.log(err);
      console.log('todo added successfully');
      connection.query(`SELECT * FROM todos where  todo_id = ${result.insertId};`, function (err, result) {
        if (err) console.log(err);
        res.json(result);
      })
    })
  })

  router.put('/:todo_id', function (req, res, next) {
    connection.query(`UPDATE todos SET completed = ${req.body.completed} WHERE todo_id=${req.params.todo_id};`, function (err, result) {
        if (err) console.log(err);
        connection.query(`SELECT * FROM todos WHERE todo_id = ${req.params.todo_id};`, function (err, result) {
            if (err) console.log(err);
            res.json(result);
        })
    })
  })

  router.put('/', function (req, res, next) {
    connection.query(`UPDATE todos SET completed = ${req.body.completed};`, function (err, result) {
        if (err) console.log(err);
        connection.query(`SELECT * FROM todos WHERE deleted=0;`, function (err, result) {
            if (err) console.log(err);
            res.json(result);
        })
    })
  })

  router.delete('/:todo_id', function (req, res, next) {
    connection.query(`UPDATE todos SET deleted = 1 WHERE todo_id=${req.params.todo_id}`, function (err, result) {
        if (err) console.log(err);
        res.send('Deleted');
    })
  })

module.exports = router;