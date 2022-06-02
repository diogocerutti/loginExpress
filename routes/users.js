var express = require('express');
var router = express.Router();

/* Rota para mostrar todos os usuários (GET) */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
