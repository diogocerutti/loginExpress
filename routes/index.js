var express = require('express');
var router = express.Router();

/* Rota da página principal (GET) */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Aplicação Node.Js' });
});

module.exports = router;
