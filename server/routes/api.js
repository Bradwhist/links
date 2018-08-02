var express = require('express');
var router = express.Router();
//var models = require('./../../src/models');
router.get('/api', function(req, res) {
  res.send('hello');
})

return router;
