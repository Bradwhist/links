var express = require('express');
var router = express.Router();

module.exports = function (passport){

  router.post('/login', function(req, res) {
    res.send('login');
  })


  return router;
}
