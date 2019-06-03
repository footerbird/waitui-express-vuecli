var express = require('express');
var router = express.Router();
//关联主程序
var api = require('../controllers/api.js');

router.post('/get_articleListBaseAjax', function(req, res, next) {
    api.get_articleListBaseAjax(req, res, next);
});

router.post('/get_articleListAjax', function(req, res, next) {
    api.get_articleListAjax(req, res, next);
});

router.post('/get_articleSearchBaseAjax', function(req, res, next) {
    api.get_articleSearchBaseAjax(req, res, next);
});

router.post('/get_articleSearchAjax', function(req, res, next) {
    api.get_articleSearchAjax(req, res, next);
});

router.post('/get_articleDetailBaseAjax', function(req, res, next) {
    api.get_articleDetailBaseAjax(req, res, next);
});

module.exports = router;
