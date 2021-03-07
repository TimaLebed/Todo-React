import { useContext } from "react";
import PropTypes from "prop-types";
import Context from "../context";

const styles = {
  li: {
    // display: "flex",
    // justifyContent: "space-between",
    // alignItems: "center",
    // padding: ".5rem 1rem",
    // border: "1px solid #ccc",
    // borderRadius: "4px",
    // marginBottom: ".5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    /* padding: 0.5rem 1rem; */
    // border: '1px solid rgb(204, 204, 204)',
    /* border-radius: 4px; */
    /* margin-bottom: 0.5rem; */
    padding: "7px 16px 7px 16px",
    /* border: none; */
    background: "rgba(0, 0, 0, 0.023)",
    boxShadow: "inset 0 -2px 1px rgb(0 0 0 / 3%)",
    outline: "none",
  },
  input: {
    marginRight: "1rem",
  },
  button: {
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '1px solid #dfe6e9',
    borderRadius: '4px',
  }
};

function TodoItem({ todo, index, onChange }) {
  const classes = ["span"];
  const { removeTodo } = useContext(Context);

  if (todo.completed) {
    classes.push("done");
  }

  return (
    <li style={styles.li}>
      <span className={classes.join(" ")}>
        <input
          type="checkbox"
          style={styles.input}
          checked={todo.completed}
          onChange={() => onChange(todo.id)}
          className="input"
        ></input>
        {index + 1}
        &nbsp;
        {todo.value}
      </span>

      <button onClick={() => removeTodo(todo.id)} style={styles.button}>&times;</button>
      {/* <button onClick={removeTodo.bind(null, todo.id)}>&times;</button> */}
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func,
};

export default TodoItem;
