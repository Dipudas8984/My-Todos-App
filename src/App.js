import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';
import './App.css'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const [markTitle, setMarkTitle] = useState('mark all')
  const todoNameRef = useRef()
  
  function getTime(){
    const now = new Date()
    const time = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear() + '  ' + (now.getHours() > 12 ? now.getHours() - 12  + ':' + now.getMinutes() + ' PM' : now.getHours() + ':' + now.getMinutes() + ' AM');
    return time
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
    const currentTime = getTime()
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, time: currentTime , complete: false}]
    })
    getTime()
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function handelToggleMarkAll(){
    const newTodos = todos.map(todo => {
      markTitle === 'mark all' ?  todo.complete = true : todo.complete = false
      return todo
    })
    setTodos(newTodos)
    markTitle === 'mark all' ? setMarkTitle('unmark all') : setMarkTitle('mark all')
  }

  return (
    <div>
    <div className="heading">
      MY TODOS
    </div>
    <div className='main-container'>
      {todos.length !== 0 ? <span onClick={handelToggleMarkAll} className='mark'>{markTitle}</span> : ''}
    
    <div className="todo-container">
      {todos.length === 0 ? <h5>**No Available Todos**</h5>: <TodoList todos={todos} toggleTodo={toggleTodo}/>}
    </div>
    <div className="btn-container">
        <input ref={todoNameRef} type="text" className="input" placeholder="Add Your Todos Here "/>
        <button onClick={handleAddTodo} id="add">Add Todo</button>
        <button onClick={handleClearTodos}>Clear Completed</button>
      </div>
      <div className="text">
        <span>{todos.length !== 0 ? todos.length + ' todos in total' : '0 todos in total'} </span>
        <span>{todos.filter(todo => !todo.complete).length} left to do</span>
      </div>
    </div>
    </div>
    
  )
}

export default App;
