import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

describe("Unit Tests : Todo Application", () => {
  test("Add Task", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Add a task");

    fireEvent.change(input, { target: { value: "Test Task 1" } });
    fireEvent.click(screen.getByLabelText("Add Task"));

    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
  });

  test("Edit Task", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Add a task");

    fireEvent.change(input, { target: { value: "Test Task 2" } });
    fireEvent.click(screen.getByLabelText("Add Task"));

    const taskItem = screen.getByText("Test Task 2");
    fireEvent.doubleClick(taskItem);
    const inputField = screen.getByDisplayValue("Test Task 2");
    fireEvent.change(inputField, { target: { value: "Updated Task" } });
    fireEvent.keyUp(inputField, { keyCode: 13 });

    expect(screen.getByText("Updated Task")).toBeInTheDocument();
  });

  test("Delete Task", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Add a task");

    fireEvent.change(input, { target: { value: "Test Task 3" } });
    fireEvent.click(screen.getByLabelText("Add Task"));

    const taskItem = screen.getByText("Test Task 3");
    const deleteButton = within(taskItem.closest("li")).getByRole("button", {
      name: /delete/i,
    });
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Test Task 3")).toBeNull();
  });

  test("Toggle Task Status", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Add a task");

    fireEvent.change(input, { target: { value: "Test Task 4" } });
    fireEvent.click(screen.getByLabelText("Add Task"));

    const taskItem = screen.getByText("Test Task 4");
    const checkbox = within(taskItem.closest("li")).getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  test("Filter Tasks", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Add a task");

    fireEvent.change(input, { target: { value: "Test Task 5" } });
    fireEvent.click(screen.getByLabelText("Add Task"));
    fireEvent.change(input, { target: { value: "Test Task 6" } });
    fireEvent.click(screen.getByLabelText("Add Task"));

    const firstTaskCheckbox = within(
      screen.getByText("Test Task 5").closest("li")
    ).getByRole("checkbox");
    fireEvent.click(firstTaskCheckbox);

    fireEvent.click(screen.getByText("Completed"));
    expect(screen.getByText("Test Task 5")).toBeInTheDocument();
    expect(screen.queryByText("Test Task 6")).toBeNull();

    fireEvent.click(screen.getByText("Pending"));
    expect(screen.getByText("Test Task 6")).toBeInTheDocument();
    expect(screen.queryByText("Test Task 5")).toBeNull();
  });
});
