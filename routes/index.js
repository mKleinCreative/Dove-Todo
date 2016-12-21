var express = require('express');
var router = express.Router();

var db = require('../database.js');

/* GET home page. */
router.get('/', function(request, response) {
  db.getAllTodos()
    .then( lists => {
      response.render('index', { lists })
    })
    .catch( error => {
      response.render('error')
    })
});

router.get('/todos', function(request, response) {
  db.getTodosFromList()
    .then( todos => {
      response.render('todos', { todos })
    })
    .catch( error => {
      response.render('error')
    })
});

module.exports = router;
