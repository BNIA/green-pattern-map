var express = require('express');
var router = new express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {title: 'Express'});
});

module.exports = router;
