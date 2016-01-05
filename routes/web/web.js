"use strict";
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/' , function(req, res, next) {
	res.render('index', { title: 'test' });
});

/* GET home page. */
router.get('/admin' , function(req, res, next) {
	res.render('admin', { title: 'test admin' });
});

module.exports = router;