import React from "react";

function Filters({ filter, setFilter }) {
  const filters = ["All", "Completed", "Pending"];
  return (
    <ul className="filters">
      {filters.map((f) => (
        <li key={f}>
          <a
            href="#/"
            className={filter === f ? "selected" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Filters;
