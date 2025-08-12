import React from 'react'
import './Home.css'

export default function Home() {
  return (
    <>
    <div className="home">
      <h1>Welcome to the Todo List App</h1>
      <p>Manage your tasks efficiently!</p>

      <div className="input-task">
        <input type="text" placeholder='Add task'/>
        <button className='add-btn'>Add</button>
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
