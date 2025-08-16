const { response } = require('express');
const Todo = require('../model/todo')

async function handleAddTodo(req, res){
    const {task} = req.body;
    if(!task){
        return res.status(400).json({
            message: "Write something in the input field",
            class:'danger message'
        })
    }
    const newTodo = new Todo({ task });
    await newTodo.save();
    return res.status(200).json({
        data:newTodo,
        message:"Todo created Successfully",
        class:'success message'
    })
}

async function handleGetTodos(req, res){
    const todos = await Todo.find();
    return res.status(200).json({
        todos:todos
    })
}

module.exports = {handleAddTodo,handleGetTodos}