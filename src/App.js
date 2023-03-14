import './App.css';
import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (event) => {
    event.preventDefault();
    const todo = event.target.todo.value;
    setTodos([...todos, todo]);
    event.target.reset();
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    
    <div className='TodoWrapper'>
      <h1>Todo List</h1>
      <form onSubmit={addTodo} className="TodoForm">
        <input className="todo-input" type="text" name="todo" placeholder="Add a todo" />
        <button className='todo-btn' type="submit">Add</button>
      </form>
      <ul >
        {todos.map((todo, index) => (
          <li className='Todo' key={index}>
            {todo}
            <button className='todo-delete' onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
