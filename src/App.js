import './App.css';
import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== "") {
      const todo = {
        title: newTodo,
        done: false,
      };
      setTodos([...todos, todo]);
      setNewTodo("");
    }
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = (index, newTitle) => {
    const newTodos = [...todos];
    newTodos[index].title = newTitle;
    setTodos(newTodos);
  };

  const toggleDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };


  return (
    
    <div className='TodoWrapper'>
      <h1>Todo List</h1>
      <form onSubmit={addTodo} className="TodoForm">
        <input
        className='todo-input'
          type="text"
          name="title"
          placeholder="Add a todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className='todo-btn' type="submit">Add</button>
      </form>
      <ul >
        {todos.map((todo, index) => (
          <li className='Todo' key={index}>
             <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleDone(index)}
            />
            <span style={{ textDecoration: todo.done ? "line-through" : "" }}>
            {todo.title}
            <p className='input'></p></span>
            
            <button className='todo-delete' onClick={() => deleteTodo(index)}>Delete</button>
            <button className='todo-edit'
              onClick={() => {
                const newTitle = prompt("Enter new item:", todo.title);
                if (newTitle !== null) {
                  editTodo(index, newTitle);
                }
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
