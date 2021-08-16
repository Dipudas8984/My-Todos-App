import React from 'react'

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  
  return (
      <div className="todo">
        <label>
            <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
            {todo.complete ? <span className='todo-text complete'>{todo.name}</span> : <span className='todo-text'>{todo.name}</span>}
            <span className="time">{todo.time}</span>
        </label>
    </div>
  )
}
