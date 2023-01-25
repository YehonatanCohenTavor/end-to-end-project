var express = require('express');
var router = express.Router();
const connection = require('../modules/connection');


router.get('/', function (req, res, next) {
    if (!req.query.post_id) {
        connection.query(`SELECT * FROM comments WHERE deleted = 0 LIMIT 50`, (err, result) => {
            if (err) console.log(err);
            res.json(result);
        })
    } else {
        connection.query(`SELECT * FROM comments WHERE post_id=${req.query.post_id} AND deleted = 0`, (err, result) => {
            if (err) console.log(err);
            res.json(result);
        })
    }
});



router.get('/:comment_id', function (req, res, next) {
    connection.query(`SELECT * FROM comments WHERE comment_id=${req.params.comment_id} AND deleted = 0`, (err, result) => {
        if (err) console.log(err);
        res.json(result);
    });
});

router.post('/', function ({ body }, res, next) {
    connection.query(`INSERT INTO comments (post_id , user_id , body) VALUES(${body.post_id} , ${body.user_id} , ${body.body});`, function (err, result) {
        if (err) console.log(err);
        console.log('comment added successfully');
        connection.query(`SELECT * FROM comments where  comment_id = ${result.insertId};`, function (err, result) {
            if (err) console.log(err);
            res.json(result);
        })
    })
})

router.put('/:comment_id', function (req, res, next) {
    connection.query(`UPDATE comments SET body = ${req.body.body} WHERE comment_id=${req.params.comment_id};`, function (err, result) {
        if (err) console.log(err);
        connection.query(`SELECT * FROM comments where  comment_id = ${req.params.comment_id};`, function (err, result) {
            if (err) console.log(err);
            res.json(result);
        })
    })
})



router.delete('/:comment_id', function (req, res, next) {
    connection.query(`UPDATE comments SET deleted = 1 WHERE comment_id=${req.params.comment_id}`, function (err, result) {
        if (err) console.log(err);
        res.send('Deleted');
    })
  })

module.exports = router;