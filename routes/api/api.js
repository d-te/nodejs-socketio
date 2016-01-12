'use strict';

var express = require('express');
var router = express.Router();

var authApi = require('./auth');
var userApi = require('./user');
var statisticsApi = require('./statistics');
var logApi = require('./log');

router.use('/auth', authApi);
router.use('/user', userApi);
router.use('/statistics', statisticsApi);
router.use('/log', logApi);

module.exports = router;