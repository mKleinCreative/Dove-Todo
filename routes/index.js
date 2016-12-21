var express = require('express');
var router = express.Router();

var db = require('../database.js');

/* GET home page. */
router.get('/', function(request, response) {
  db.getAllTodos()
    .then( lists => {
      lists = lists.reduce((result, todoItem) => {
        if(result[todoItem.list_id]) {
          result[todoItem.list_id].push(todoItem)
        } else {
          result[todoItem.list_id] = [todoItem]
        }
        return result
      }, {})
      response.render('lists', { lists })
    })
    .catch( error => {
      response.render('error')
    })
});
//
// router.get('/todos', function(request, response) {
//   db.getTodosFromList()
//     .then( todos => {
//       response.render('todos', { todos })
//     })
//     .catch( error => {
//       response.render('error')
//     })
// });

// Generates todos
router.get('/todos/:id', function(request, response) {
  const listID = request.params.id
  return db.getTodosInList(listID)
    .then( todo => {
      console.log('todos', todo );
      response.render('todos', { todo })
    })
   .catch( error => {
      response.render('error')
    })
});

// Generates list names? Hopefully please, praise be to lord xenu.
router.get('/lists/:id', function(request, response) {
  const listID = request.params.id
  db.getListName(listID)
    .then( list => {
      response.render('lists', { list })
    })
   .catch( error => {
      response.render('error')
    })
});



module.exports = router;
