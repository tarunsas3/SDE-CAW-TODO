import React, { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import ListTask from "./components/ListTask";
import Filters from "./components/Filters";
import "./styles.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);

  const updateTask = (id, updatedTask) =>
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return false;
  });

  return (
    <div className="todoApp">
      <header className="header">
        <AddTask addTask={addTask} />
      </header>
      <section className="main">
        <ListTask
          tasks={filteredTasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </section>
      <footer className="footer">
        <Filters filter={filter} setFilter={setFilter} />
      </footer>
    </div>
  );
}

export default App;
