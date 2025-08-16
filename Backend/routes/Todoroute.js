const express = require('express')
const router = express.Router();
const {handleGetTodos, handleAddTodo} = require('../controller/Handletodos.js')

router.post('/add-todo',handleAddTodo);
router.get('/',handleGetTodos)

module.exports = router;