'use strict';

var express = require('express');
var router = express.Router();

var authApi = require('./auth');
var userApi = require('./user');

router.use('/auth', userApi);
router.use('/user', userApi);

module.exports = router;