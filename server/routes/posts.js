var express = require('express');
var router = express.Router();
const connection = require('../modules/connection');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (!req.query.user_id) {
        connection.query(`SELECT * FROM posts WHERE deleted = 0  LIMIT 50`, (err, result) => {
            if (err) console.log(err);
            res.json(result);
        })
    } else {
        connection.query(`SELECT * FROM posts WHERE user_id=${req.query.user_id} AND deleted = 0`, (err, result) => {
            if (err) console.log(err);
            res.json(result);
        })
    }
});

router.get('/:post_id/', function (req, res, next) {
    connection.query(`SELECT * FROM posts WHERE post_id=${req.params.post_id} AND deleted = 0`, (err, result) => {
        if (err) console.log(err);
        res.json(result);
    });
});

router.get('/:post_id/comments', function (req, res, next) {
    connection.query(`SELECT * FROM comments WHERE post_id=${req.params.post_id} AND deleted = 0`, (err, result) => {
        if (err) console.log(err);
        res.json(result);
    });
});

router.post('/', function ({ body }, res, next) {
    connection.query(`INSERT INTO posts (body , user_id) VALUES('${body.body}' , ${body.user_id});`, function (err, result) {
        if (err) console.log(err);
        console.log('post added successfully');
        connection.query(`SELECT * FROM posts WHERE post_id=${result.insertId};`, function (err, result) {
            if (err) console.log(err);
            res.json(result);
        })
    })
})

router.put('/:post_id', function (req, res, next) {
    connection.query(`UPDATE posts SET body=${req.body.body} WHERE post_id=${req.params.post_id};`, function (err, result) {
        if (err) console.log(err);
        connection.query(`SELECT * FROM posts WHERE post_id=${req.params.post_id}`, function (err, result) {
            if (err) console.log(err);
            res.json(result);
        })
    })
})

router.delete('/:post_id', function (req, res, next) {
    connection.query(`UPDATE posts SET deleted = 1 WHERE post_id=${req.params.post_id}`, function (err, result) {
        if (err) console.log(err);
        connection.query(`UPDATE comments SET deleted = 1 WHERE post_id=${req.params.post_id}`, function (err, result) {
            if (err) console.log(err);
            res.send('post and related comments deleted');
        })
    })
  })

module.exports = router;