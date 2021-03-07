import { useState } from "react";
import PropTypes from "prop-types";

function AddTodo({ onCreate }) {
  const [value, setValue] = useState("");

  function handleInputChange({ target: { value } }) {
    setValue(value);
  }

  function submitHandler(event) {
    event.preventDefault();

    if (value.trim()) {
      onCreate(value);
      setValue('');
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        value={value}
        onChange={(event) => handleInputChange(event)}
      ></input>
      <button type="submit" className='form__btn'>
        Add Todo
      </button>
    </form>
  );
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default AddTodo;
