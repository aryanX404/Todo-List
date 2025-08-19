import React, {useState, useEffect, use} from 'react'
import axios from 'axios'
import './Home.css'
import Clock from '../components/Clock.jsx'

export default function Home() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [active, setActive] = useState('all');
  const [selectedDate, setSelectedDate] = useState(() => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // "YYYY-MM-DD" format
  });


  
  const handleClickAll = () => setActive('all')
  const handleClickTodo = () =>setActive('todo')
  const handleClickCompleted = () =>setActive('completed');


  async function handleGetTodos() {
    try{
      const response = await axios.get('http://localhost:8000/');
      //filter todos by date
      const filteredTodos = response.data.todos.filter((todo)=>{
        const todoDate = new Date(todo.date).toISOString().split('T')[0];
        return todoDate === selectedDate;
      })
      

      if(active === 'all') {
        setTodos(filteredTodos);
      }
      else if(active==='completed'){
        setTodos(filteredTodos.filter(todo=>todo.completed===true));
      }
      else if(active === 'todo'){
        setTodos(filteredTodos.filter(todo=>todo.completed===false));
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
  }, [active, selectedDate]);


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
      <div className="navbar">
        <p className='title'>STUDY-MODE</p>
        <Clock />
      </div>
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
        <div className="date-picker">
          <label>Select Date: </label>
          <input 
            type="date" 
            value={selectedDate} 
            max={new Date().toISOString().split("T")[0]} // prevents future dates selection
            onChange={(e) => setSelectedDate(e.target.value)} 
          />
        </div>

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
        {todos.length === 0? (
          <p className="no-todos">You have no todos for this date.</p>
        ):
        (todos.map((todo) => (
          <div className="task" key={todo._id}>
            <input 
            className='checkbox' 
            type="checkbox" 
            checked={todo.completed}
            onClick={()=>handleCheck(todo._id)} 
            readOnly />
            <span 
            className={todo.completed?"strike":""}
            onClick={()=>handleCheck(todo._id)}
            >
              {todo.task}
            </span>
            {/* <i className="fa-solid fa-pen update-icon"></i> */}
            <small>{new Date(todo.date).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit', 
              hour12:true
              })}</small>
            <i className="fa-regular fa-trash-can delete-icon" onClick={()=>handleDelete(todo._id)}></i>
          </div>
        )))
        }
      </div>
      <footer className="footer">
        <p>© 2025 Aryan. All rights reserved.</p>
      </footer>

    </div>
    
    </>
  )
}
