import { useState, useEffect } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import AddTodo from "./Todo/AddTodo";

const data = [
  { id: 1, completed: false, value: "one" },
  { id: 2, completed: false, value: "two" },
  { id: 3, completed: false, value: "three" },
];

function App() {
  const [todos, setTodos] = useState(data);
  const [activeTodos, setActiveTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [listState, setListState] = useState("all");

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
    setActiveTodos(todos.filter((todo) => !todo.completed));
    setCompletedTodos(todos.filter((todo) => todo.completed));
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

  function showAllTodos() {
    setTodos(todos);
    setListState("all");
  }

  function showActiveTodos() {
    setActiveTodos(todos.filter((todo) => !todo.completed));
    setListState("active");
  }

  function showCompletedTodos() {
    setCompletedTodos(todos.filter((todo) => todo.completed));
    setListState("completed");
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1 className="h1">Todos React</h1>
        <AddTodo onCreate={addTodo}></AddTodo>
        <span>{listState} todos:</span>
        {listState === "all" ? (
          <TodoList todos={todos} onToggle={toggleTodo}></TodoList>
        ) : null}
        {listState === "active" ? (
          <TodoList todos={activeTodos} onToggle={toggleTodo}></TodoList>
        ) : null}
        {listState === "completed" ? (
          <TodoList todos={completedTodos} onToggle={toggleTodo}></TodoList>
        ) : null}
        {listState === "all" && !todos.length ? <p>No Todos</p> : null}
        {listState === "active" && !activeTodos.length ? (
          <p>No Active Todos</p>
        ) : null}
        {listState === "completed" && !completedTodos.length ? (
          <p>No Completed Todos</p>
        ) : null}
        <div className="wrapper-btn">
          <button className={'btn'} onClick={showAllTodos}>All</button>
          <button className={'btn'} onClick={showActiveTodos}>Active</button>
          <button className={'btn'} onClick={showCompletedTodos}>Completed</button>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
