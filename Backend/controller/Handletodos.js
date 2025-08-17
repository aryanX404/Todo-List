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
    })
}

async function handleGetTodos(req, res){
    const todos = await Todo.find();
    return res.status(200).json({
        todos:todos
    })
}

async function handleDeleteTodo(req, res){
    try{
        const id = req.params.id;
        await Todo.findByIdAndDelete(id);
        return res.status(200).json({
        message: "Todo Deleted Successfully",

    })
    }catch(error){
        return res.status(500).json({ error: err.message });
    }
   
    
}

async function handleCheckTodo(req, res){
    try{
        const id = req.params.id;
        const {completed} = req.body;
        await Todo.findByIdAndUpdate(id,{completed:completed});
        if(completed){
            return res.status(200).json({
                message: "Todo checked Successfully",
            })
        }else{
            return res.status(200).json({
                message: "Todo Unchecked Successfully",
            })
        }
        
    }catch(error){
        return res.status(500).json({ error: err.message });
    }
   
    
}

module.exports = {handleAddTodo,handleGetTodos, handleDeleteTodo, handleCheckTodo}