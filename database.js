var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/dove-todo';
var db = pgp(connectionString);

// add query functions

function getAllLists(request, response, next) {
  return db.many(' select * from list ')
}

//     v v v THIS ONE WORKS WOOOO v v v
function getAllTodos(request, response, next) {
  return db.many(
  `SELECT
	  *
   FROM
    list
   JOIN
    todo
   ON
    id = todo.list_id
    ORDER BY
    id asc`)
}

function getSingleList(request, response, next) {
  var listID = parseInt(request.params.id);
  db.one(
  `SELECT
    *
   FROM
    list
   WHERE
    id = $1`, listId)
  .then(function (data) {
    response.status(200)
  });
}

function getTodosFromList(request, response, next) {
  var todoId = parseInt(request.params.id);
  db.one(
  `SELECT
    todo
   FROM
    list
   JOIN
    todo
   ON
    todo.list_id = id
   WHERE
    id=$1`, todoId)
  .then(function (data) {
    response.status(200)
  });
}

function createTodo(list_id, description, complete, deadline) {
  return db.one(
    `INSERT INTO
      todo
     VALUES
      ( $1, $2, $3, $4 )`, [ list_id, description, false, deadline ]
  )
}
function createList(name) {
  return db.one(
    `INSERT INTO
    list ( name, complete )
    VALUES
    ( $1, $2 )
    RETURNING id`, [ name, false ]
  )
}

function updateTodo( description, deadline ) {
  return db.any(
  `UPDATE
    todo
   SET
    description=$2,
    deadline=$3`, [ description, deadline ]
)}

function completeTodo( id, complete) {
  return db.none(
  `UPDATE
    todo
   SET
    complete=$2
   WHERE id=$1`, [ id, complete ]
  )
}

function completeList( id, complete) {
  return db.none(
  `UPDATE
    list
   SET
    complete=$2
   WHERE id=$1`, [ id, complete ]
  )
}

function updateListTitle( id, title) {
  return db.none(
  `UPDATE
    list
   SET
    title=$2
   WHERE id=$1
   `, [ id, title ]
  )
}

function removeTodo( id ) {
  return db.none(
    `DELETE FROM
      todo
     WHERE
      id=$1`, [id]
  )
}
function removeList( id ) {
  return db.none(
    `DELETE FROM
      list
     WHERE
      id=$1`, [id]
  )
}


module.exports = {
  getAllLists,
  getAllTodos,
  getSingleList,
  getTodosFromList,
  createTodo,
  createList,
  updateTodo,
  completeTodo,
  completeList,
  updateListTitle,
  removeTodo,
  removeList
};
