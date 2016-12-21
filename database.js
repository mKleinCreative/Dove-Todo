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
// Grabs a list name
function getListName(request, response ) {
  var listID = parseInt(request.params.id);
  return db.one(
  `SELECT
    name
   FROM
    list
   WHERE
    id = $1`, listID)
}
// Grabs all the todos in a list
function getTodosInList(listID) {
  return db.many(
    `SELECT *
    FROM todo
    WHERE
    list_id = $1`, listID)
}

// {
//   list_id, title
//   todos: [
//     { name, comp, description },
//     { name, comp, description },
//     { name, comp, description }
//   ]
// }

// Grabs all information from everything.
function getTodosFromList(request, response, next) {
  var todoId = parseInt(request.params.id);
  return db.one(
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
}

// Creates a single todo
function createTodo(list_id, description, complete, deadline) {
  return db.one(
    `INSERT INTO
      todo
     VALUES
      ( $1, $2, $3, $4 )`, [ list_id, description, false, deadline ]
  )
}

// Creates a single list.
function createList(name) {
  return db.one(
    `INSERT INTO
    list ( name, complete )
    VALUES
    ( $1, $2 )
    RETURNING id`, [ name, false ]
  )
}

// Updates todos, yay
function updateTodo( description, deadline ) {
  return db.any(
  `UPDATE
    todo
   SET
    description=$2,
    deadline=$3`, [ description, deadline ]
)}

// changes the complete value of the todo.
function completeTodo( id, complete) {
  return db.none(
  `UPDATE
    todo
   SET
    complete=$2
   WHERE id=$1`, [ id, complete ]
  )
}

// changes the complete value of the list.
function completeList( id, complete) {
  return db.none(
  `UPDATE
    list
   SET
    complete=$2
   WHERE id=$1`, [ id, complete ]
  )
}

// updates the title of the list.
function updateListTitle( id, title) {
  return db.none(
  `UPDATE
    list
   SET
    title=$2
   WHERE id=$1`, [ id, title ]
  )
}

// removes todo.
function removeTodo( id ) {
  return db.none(
    `DELETE FROM
      todo
     WHERE
      id=$1`, [id]
  )
}

// removes list.
function removeList( id ) {
  return db.none(
    `DELETE FROM
      list
     WHERE
      id=$1`, [id]
  )
}

function getLists() {
  return db.any(
    "select * from list left outer join todo on list.id=todo.list_id order by id asc"
  )
}

module.exports = {
  getAllLists,
  getAllTodos,
  getListName,
  getLists,
  getTodosFromList,
  getTodosInList,
  createTodo,
  createList,
  updateTodo,
  completeTodo,
  completeList,
  updateListTitle,
  removeTodo,
  removeList
};
