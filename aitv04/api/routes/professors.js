var express = require('express');
var router = express.Router();
var professorService = require('../services/professorService.js');

router.get('/', function (req, res, next) {
    professorService.list(req, res);
});

router.post('/', function (req, res, next) {
    professorService.create(req, res);
});

router.put('/:id', function (req, res, next) {
    professorService.update(req, res);
});

router.delete('/:id', function (req, res, next) {
    professorService.delete(req, res);
});

router.get('/:id', function (req, res, next) {
    professorService.retrieve(req, res);
});

module.exports = router