import React, { useState } from "react";

function ListTask({ tasks, updateTask, deleteTask }) {
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const handleDoubleClick = (id, text) => {
    setEditingId(id);
    setNewTitle(text);
  };

  const handleEditChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleEditKeyUp = (e, id) => {
    if (e.keyCode === 13) {
      updateTask(id, {
        ...tasks.find((task) => task.id === id),
        text: newTitle,
      });
      setEditingId(null);
    } else if (e.keyCode === 27) {
      setEditingId(null);
    }
  };

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`todo ${task.completed ? "completed" : ""} ${
            editingId === task.id ? "editing" : ""
          }`}
        >
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                updateTask(task.id, { ...task, completed: !task.completed })
              }
            />
            <label onDoubleClick={() => handleDoubleClick(task.id, task.text)}>
              {task.text}
            </label>
            <button
              className="destroy"
              onClick={() => deleteTask(task.id)}
              aria-label="Delete Task"
            ></button>
          </div>

          {editingId === task.id && (
            <input
              className="edit"
              type="text"
              value={newTitle}
              onChange={handleEditChange}
              onKeyUp={(e) => handleEditKeyUp(e, task.id)}
              autoFocus
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default ListTask;
