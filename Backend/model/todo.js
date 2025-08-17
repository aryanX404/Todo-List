const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type:Boolean,
        default:false
    },
    date: { 
        type: Date, 
        default: Date.now }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
