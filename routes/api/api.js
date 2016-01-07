"use strict";

var express = require('express');
var router = express.Router();

var userApi = require('./user');

router.use('/user', userApi);

module.exports = router;