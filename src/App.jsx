import logo from "../src/assets/images/logo.png";
import { useState, useEffect } from "react";
import { Trash, Check } from 'lucide-react';
import './App.css';

export default function App() {
  const [complete, setComplete] = useState(false);
  const [task, setTask] = useState({
    task: "",
    description: ""
  });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks) || []);  // Ensure it's an array
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Stringify before saving
  }, [tasks]);

  function handleToggle() {
    setComplete(!complete);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  }

  function addTask() {
    if (task.task && task.description) {
      setTasks(prevTasks => [...(prevTasks || []), { ...task, completed: false }]);  // Add completed: false
      setTask({ task: "", description: "" }); // Reset the input fields
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function completeTask(index) {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: true } : t
    );
    setTasks(updatedTasks);
  }

  return (
    <div className="max-w-7xl mx-auto pt-20 px-6">
      <div className="flex justify-center items-center gap-8 w-full">
        
        <h1 className="max-sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text uppercase font-bold">Task Master</h1>
      </div>
      <div className="mt-9 mx-auto p-5 max-w-5xl h-auto bg-gray-900 rounded-sm">
        <div className="flex flex-wrap max-sm:flex-col justify-around gap-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-xl">Title:</label>
            <input
              type="text"
              placeholder="What is your task"
              className="bg-white px-3 py-2 outline-blue-600 text-black border-none rounded-sm w-[100%]"
              name="task"
              value={task.task}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="Description" className="text-xl">Description:</label>
            <input
              type="text"
              placeholder="What is the description"
              className="bg-white px-3 py-2 outline-blue-600 text-black border-none rounded-sm"
              name="description"
              value={task.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-700 text-white py-2 px-4 rounded-sm hover:bg-blue-900 transition-all 3s"
              onClick={addTask}
            >
              Add
            </button>
          </div>
        </div>

        <div className="mt-9 border-t border-gray-800 pt-4 px-2">
          <div className="flex items-start gap-1">
            <button className={`secondary-btn ${!complete && "active"}`} onClick={handleToggle}>Tasks</button>
            <button className={`secondary-btn ${complete && "active"}`} onClick={handleToggle}>Completed</button>
          </div>
        </div>
        
        <div className="mt-5 shadow-lg border border-gray-800 px-4 py-2">
          {complete ? (
            tasks.filter(task => task.completed).length > 0 ? (
              tasks.filter(task => task.completed).map((task, index) => (
                <div key={index} className="flex justify-between mt-3 border border-gray-800 p-4">
                  <div className="flex flex-col flex-wrap justify-center">
                    <h2 className="text-2xl font-bold text-blue-600">{task.task}</h2>
                    <h5 className="text-slate-200 ">{task.description}</h5>
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <Trash className="text-blue-600 cursor-pointer" onClick={() => deleteTask(index)} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-200">No completed tasks yet.</p>
            )
          ) : (
            tasks.filter(task => !task.completed).length > 0 ? (
              tasks.filter(task => !task.completed).map((task, index) => (
                <div key={index} className="flex justify-between mt-3 border border-gray-800 p-4">
                  <div className="flex flex-col flex-wrap justify-center">
                    <h2 className="text-2xl font-bold text-blue-600">{task.task}</h2>
                    <h5 className="text-slate-200">{task.description}</h5>
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <Trash className="text-blue-600 cursor-pointer" onClick={() => deleteTask(index)} />
                    <Check className="text-blue-600 cursor-pointer" onClick={() => completeTask(index)} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-200">No tasks added yet.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
