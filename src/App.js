import { useState, useEffect } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import AddTodo from "./Todo/AddTodo";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, completed: false, value: "one" },
    { id: 2, completed: false, value: "two" },
    { id: 3, completed: false, value: "three" },
  ]);

  useEffect(() => {
    const todos = localStorage.getItem("todos") || [];
    setTodos(JSON.parse(todos));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }

        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function addTodo(value) {
    setTodos(
      todos.concat([
        {
          id: Date.now(),
          completed: false,
          value,
        },
      ])
    );
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1 className='h1'>Todos</h1>
        <AddTodo onCreate={addTodo}></AddTodo>
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo}></TodoList>
        ) : (
          <p>No Todos</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
