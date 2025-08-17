import React, {useState, useEffect, use} from 'react'
import axios from 'axios'
import './Home.css'

export default function Home() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [active, setActive] = useState('all');

  
  const handleClickAll = () => setActive('all')
  const handleClickTodo = () =>setActive('todo')
  const handleClickCompleted = () =>setActive('completed');


  async function handleGetTodos() {
    try{
      const response = await axios.get('http://localhost:8000/');
      if(active === 'all') {
        setTodos(response.data.todos);
      }
      else if(active==='completed'){
        setTodos(response.data.todos.filter(todo=>todo.completed===true));
      }
      else if(active === 'todo'){
        setTodos(response.data.todos.filter(todo=>todo.completed===false));
      }
  
      // console.log('todos fetched', response.data.todos);
    }catch(error){
      console.log('error while fetching todos', error.message)
    }
  }

  async function handleDelete(id){
    try{
      const response = await axios.delete(`http://localhost:8000/todos/${id}`)
      // console.log(response.data);
      console.log(response.data.message);
      handleGetTodos();
    }catch(error){
      console.log('error while deletin: ', error.message)
    }
  }

  async function handleCheck(id){
    try{
      const todo = todos.find(todo => todo._id===id)
      const response = await axios.put(`http://localhost:8000/todos/${id}`,{completed:!todo.completed})
      // console.log(response.data);
      console.log(response.data.message);
      handleGetTodos();
    }catch(error){
      resizeBy.status(500).json({
        message:'internal server error'
      })
    }
  }
    
  useEffect(() => {
    handleGetTodos();
  }, [active]);


  async function handleAddTask() {
    try{
      const response = await axios.post('http://localhost:8000/todos',{
        task
      })
      console.log('todo created', response.data);
      setTask('');
      handleGetTodos();
    }catch(error){
      console.log('error while creating todo', error.message)
    }
  }
  return (
    <>
    <div className="home">
      <h1 className='heading'>Welcome to the Todo List App</h1>
      <p className='sub-heading'>Manage your tasks efficiently!</p>

      <div className="input-task">
        <input 
        type="text" 
        value={task}
        onChange={(e)=>setTask(e.target.value)}
        placeholder='Add Task'/>

        <button 
        className='add-btn'
        onClick={handleAddTask}
        >Add</button>
      </div>
      
      <div className="nav-btn">
        <button 
        className={`all-btn btn ${active==='all'? 'active':''}`} 
        onClick={handleClickAll}>
          All
        </button>
        <button 
        className={`todo-btn btn ${active==='todo'? 'active':''}`} 
        onClick={handleClickTodo}>
          Todo
          </button>
        <button 
        className={`complete-btn btn ${active==='completed'? 'active':''}`}
        onClick={handleClickCompleted}>
          Completed
          </button>
      </div>
      <div className="task-container">
        {todos.map((todo) => (
          <div className="task" key={todo._id}>
            <input 
            className='checkbox' 
            type="checkbox" 
            checked={todo.completed}
            onClick={()=>handleCheck(todo._id)} 
            readOnly />
            <span className={todo.completed?"strike":""}>{todo.task}</span>
            {/* <i className="fa-solid fa-pen update-icon"></i> */}
            <i className="fa-regular fa-trash-can delete-icon" onClick={()=>handleDelete(todo._id)}></i>
          </div>
        ))}
      </div>
      <footer className="footer">
        <p>© 2025 Graceful Gleam. All rights reserved.</p>
      </footer>

    </div>
    
    </>
  )
}
