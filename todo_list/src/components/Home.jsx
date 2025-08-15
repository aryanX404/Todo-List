import React, {useState} from 'react'
import './Home.css'

export default function Home() {
  const [task, setTask] = useState('Add task');
  async function handleAddTask() {
    
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
        onChange={(e)=>setTask(e.target.value)}/>

        <button 
        className='add-btn'
        onClick={handleAddTask}
        >Add</button>
      </div>

      <div className="task-container">
        <div className="task">
          <input className='checkbox' type="checkbox" />
          <span>Sample Task</span>
          <button className='delete-btn'>Delete</button>
        </div>
      </div>
    </div>
    </>
  )
}
