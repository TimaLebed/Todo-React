import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

const styles = {
  ul: {
    listStyle: 'none',
    width: '327px'
  }
}

function TodoList({ todos, onToggle }) {
  return (
    <ul style={styles.ul}>
      {
        todos.map((todo, idx) => {
          return <TodoItem todo={todo} key={todo.id} index={idx} onChange={onToggle}></TodoItem>
        })
      }
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default TodoList