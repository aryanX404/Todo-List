import React, {useState, useEffect, use} from 'react'
import axios from 'axios'
import './Home.css'

export default function Home() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  

  async function handleGetTodos() {
    try{
      const response = await axios.get('http://localhost:8000/');
      setTodos(response.data.todos);
      console.log('todos fetched', response.data.todos);
    }catch(error){
      console.log('error while fetching todos', error.message)
    }
  }
    
  useEffect(() => {
    handleGetTodos();
  }, []);



  async function handleAddTask() {
    try{
      const response = await axios.post('http://localhost:8000/add-todo',{
        task
      })
      console.log('todo created', response.data);
      setTask('')
    }catch(error){
      console.log('error while creating todo', error.message)
    }
  }
  return (
    <>
    <div className="home">
      <h1>Welcome to the Todo List App</h1>
      <p>Manage your tasks efficiently!</p>

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
      
      <div className="task-container">
        {todos.map((todo) => (
          <div className="task" key={todo._id}>
            <input className='checkbox' type="checkbox" checked={todo.completed} readOnly />
            <span>{todo.task}</span>
            <button className='delete-btn'>Delete</button>
          </div>
        ))}
      </div>


      {/* <div className="task-container">
        {todos.map((todo)=>{
          <div className="task">
            <input className='checkbox' type="checkbox" checked={todo.completd}/>
            <span>{todo.task}</span>
            <button className='delete-btn'>Delete</button>

          </div>
        })}
        
      </div> */}
    </div>
    </>
  )
}
