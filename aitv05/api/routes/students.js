var express = require('express');
var router = express.Router();
var studentService = require('../services/studentService.js');

router.get('/', function (req, res, next) {
    studentService.list(req, res);
});

router.post('/', function (req, res, next) {
    studentService.create(req, res);
});

router.put('/:id', function (req, res, next) {
    studentService.update(req, res);
});

router.delete('/:id', function (req, res, next) {
    studentService.delete(req, res);
});

router.get('/:id', function (req, res, next) {
    studentService.retrieve(req, res);
});

module.exports = router