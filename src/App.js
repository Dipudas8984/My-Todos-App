import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';
import './App.css'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  
  function getTime(){
    const currentDateTime= Date().toLocaleString()
    console.log(currentDateTime);
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    getTime()
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div className='main-container'>
    <div className="todo-container">
      {todos.length === 0 ? <h5>**No Available Todos**</h5>: <TodoList todos={todos} toggleTodo={toggleTodo}/>}
    </div>
    <div className="btn-container">
        <input ref={todoNameRef} type="text" className="input" placeholder="Add Your Todos Here "/>
        <button onClick={handleAddTodo}>Add Todo</button>
        <button onClick={handleClearTodos}>Clear Complete</button>
      </div>
      <div className="text">
        <span>{todos.length !== 0 ? todos.length + ' todos in total' : '0 todos in total'} </span>
        <span>{todos.filter(todo => !todo.complete).length} left to do</span>
      </div>
    </div>
  )
}

export default App;
