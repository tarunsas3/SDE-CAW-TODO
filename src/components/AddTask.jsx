import React, { useState } from "react";

function AddTask({ addTask }) {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim() === "") return;

    addTask({
      id: Date.now(),
      text: taskText,
      completed: false,
    });
    setTaskText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="Add a task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        autoFocus
      />
      <button className="new-todo-button" aria-label="Add Task"></button>
    </form>
  );
}

export default AddTask;
