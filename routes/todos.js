var express = require('express');
var router = express.Router();

var db = require('../database.js');

const formatLists = results => {
  const lists = results.reduce( (memo, result) => {
    if( ! memo.find( item => item.id === result.id ) ) {
      memo.push({
        id: result.id,
        name: result.name,
        complete: result.complete,
        todos: []
      })
    }

    const index = memo.findIndex( item => item.id === result.id )

    if( result.list_id ) {
      memo[ index ].todos.push({
        description: result.description,
        complete: result.complete,
        deadline: result.deadline
      })
    }

    return memo
  }, [])

  return lists
}

router.get( '/', (request, response, next) => {
  db.getLists()
    .then( formatLists )
    .then( lists => response.render( 'todos', { lists }))
})

module.exports = router
