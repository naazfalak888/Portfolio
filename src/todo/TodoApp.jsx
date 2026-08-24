import { useEffect, useState } from "react";
import "./TodoApp.css";

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("falak-todo-tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("falak-todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const trimmedTask = task.trim();

    if (!trimmedTask) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: trimmedTask,
        completed: false,
      },
    ]);

    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const completedCount = tasks.filter((item) => item.completed).length;

  return (
    <div className="todo-page">
      <div className="todo-card">
        <p className="todo-label">TODO APP</p>

        <h1>My Tasks</h1>

        <p className="todo-subtitle">
          Organize your day, one task at a time.
        </p>

        <div className="todo-input-area">
          <input
            type="text"
            placeholder="What do you need to do?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />

          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="todo-stats">
          <span>{tasks.length} Tasks</span>
          <span>{completedCount} Completed</span>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div>✨</div>
              <p>No tasks yet</p>
              <span>Add your first task above.</span>
            </div>
          ) : (
            tasks.map((item) => (
              <div
                className={`task-item ${
                  item.completed ? "completed" : ""
                }`}
                key={item.id}
              >
                <button
                  className="check-button"
                  onClick={() => toggleTask(item.id)}
                >
                  {item.completed ? "✓" : ""}
                </button>

                <span className="task-text">{item.text}</span>

                <button
                  className="delete-button"
                  onClick={() => deleteTask(item.id)}
                  aria-label="Delete task"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoApp;