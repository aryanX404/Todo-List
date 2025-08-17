const express = require('express')
const router = express.Router();
const {handleGetTodos, handleAddTodo, handleDeleteTodo, handleCheckTodo} = require('../controller/Handletodos.js')

router.post('/todos',handleAddTodo);
router.get('/',handleGetTodos)
// router.put('/update-todo/:id', handleUpdateTodo);
// router.delete('/todos/:id', handleDeleteTodo)

router.route('/todos/:id')
.delete(handleDeleteTodo)
.put(handleCheckTodo)

module.exports = router;