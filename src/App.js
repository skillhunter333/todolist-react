import './App.css';
import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState((JSON.parse(localStorage.getItem('todos'))) || []);
  const [newTodo, setNewTodo] = useState("");
  const [newDate, setNewDate] = useState("");

  

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const addTodo = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== "") {
      const todo = {
        title: newTodo,
        done: false,
        date: newDate,
      };
      setTodos([...todos, todo]);
      setNewTodo("");
      setNewDate("");
    }
  };

  const deleteTodo = (index) => {
   
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = (index, newTitle, newDate) => {    
    const newTodos = [...todos];
    newTodos[index].title = newTitle;
    newTodos[index].date = newDate;
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
      <form className="TodoForm" onSubmit={addTodo}>
        <input
          className="todo-input"
          type="text"
          name="title"
          placeholder="Add a todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <input
          type="date"
          name="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <button className='todo-btn' type="submit">Add</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className='Todo'>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleDone(index)}
            />
            <span style={{ textDecoration: todo.done ? "line-through" : "" }}>
            {todo.title}</span>
            <span>{todo.date}</span>
            <div className="buttons-container">
              <button className='todo-delete' onClick={() => deleteTodo(index)}>Delete</button>
              <button
              className='todo-edit'
                onClick={() => {
                  const newTitle = prompt("Enter new title:", todo.title);
                  const newDate = prompt("Enter new due date:", todo.date);
                  if (newTitle !== null) {
                    editTodo(index, newTitle, newDate);
                  }
                }}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;