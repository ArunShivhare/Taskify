import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import Footer from './components/Footer';
import { Analytics } from '@vercel/analytics/react';

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const savetols = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  // const toggleFinished = (e) => {
  //   setshowfinished(!showfinished)
  // }

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.isCompleted;
    if (filter === "completed") return todo.isCompleted;
    return true;
  });

  const handleedit = (e, id) => {
    let t = todos.find(i => i.id === id);
    settodo(t.todo);
    setEditId(id);   // Just store which task we’re editing
  }

  const handledelete = (e, id) => {
    const newtodos = todos.filter(item => item.id !== id)
    settodos(newtodos)
    savetols(newtodos)
  }

  const handleadd = () => {
    if (editId) {
      // Editing existing task
      const newtodos = todos.map(item =>
        item.id === editId
          ? { ...item, todo }
          : item
      );

      settodos(newtodos);
      savetols(newtodos);
      setEditId(null);

    } else {
      // Adding new task
      const newtodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      settodos(newtodos);
      savetols(newtodos);
    }

    settodo("");
  }

  const handlechange = (e) => {
    settodo(e.target.value)
  }

  const handlecheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex(item => item.id === id)

    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;

    settodos(newtodos)
    savetols(newtodos)
  }


  return (
    <>
  <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

  <div className="min-h-screen bg-gradient-to-br 
  from-slate-100 via-slate-50 to-white 
  dark:from-slate-900 dark:via-slate-950 dark:to-black 
  transition-colors duration-500 pb-20 py-10 px-4">

    <div className="max-w-3xl mx-auto">

      {/* Main Card */}
      <div className="bg-white/80 dark:bg-slate-900/80
      backdrop-blur-xl 
      shadow-[0_10px_40px_rgba(0,0,0,0.08)]
      dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)]
      rounded-3xl p-8 
      border border-slate-200 dark:border-slate-800
      text-slate-800 dark:text-slate-100
      transition-colors duration-500">

        {/* Title */}
        {/* <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center">
          <span className="text-indigo-600">TASK</span>
          <span className="text-slate-900 dark:text-slate-100">iFY</span>
        </h1> */}
        <div className='flex justify-center'>
          <img width={100} src="/logo.png" alt="" />
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-lg text-center mt-2">
          Plan smart. Execute better.
        </p>

        {/* Add Todo */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Add a ToDo
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">

            <input
              onChange={handlechange}
              value={todo}
              type="text"
              placeholder="Enter your task..."
              className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700
              px-5 py-3 text-slate-700 dark:text-slate-200
              bg-white dark:bg-slate-800
              focus:ring-2 focus:ring-indigo-500 
              focus:border-indigo-500 
              transition-all duration-200 outline-none"
            />

            <button
              onClick={handleadd}
              disabled={todo.length <= 3}
              className={`text-white font-medium px-6 py-3 rounded-xl 
              transition-all duration-200 shadow-sm
              ${editId
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-indigo-600 hover:bg-indigo-700"}
              disabled:bg-slate-300 disabled:cursor-not-allowed`}
            >
              {editId ? "Update Task" : "Add Task"}
            </button>

            {editId && (
              <button
                onClick={() => {
                  setEditId(null);
                  settodo("");
                }}
                className="px-5 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 
                text-white transition-all duration-200 shadow-sm"
              >
                Cancel
              </button>
            )}

          </div>
        </div>

        <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-700 mb-10"></div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-10">

          {[ 
            { label: "Total", value: todos.length, color: "text-slate-800 dark:text-slate-100" },
            { label: "Completed", value: todos.filter(t => t.isCompleted).length, color: "text-emerald-600" },
            { label: "Active", value: todos.filter(t => !t.isCompleted).length, color: "text-indigo-600" },
            { label: "Progress", value: todos.length === 0 ? "0%" : Math.round((todos.filter(t => t.isCompleted).length / todos.length) * 100) + "%", color: "text-purple-600" }
          ].map((stat, index) => (
            <div key={index}
              className="bg-white dark:bg-slate-800
              rounded-2xl p-5 
              border border-slate-100 dark:border-slate-700
              shadow-md hover:shadow-lg
              dark:shadow-[0_5px_20px_rgba(0,0,0,0.5)]
              transition-all duration-300 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
              <p className={`text-3xl font-semibold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}

        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-10">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 
            h-3 rounded-full transition-all duration-500"
            style={{
              width: `${todos.length === 0
                ? 0
                : (todos.filter(t => t.isCompleted).length / todos.length) * 100
              }%`
            }}
          ></div>
        </div>

        {/* Todo Section */}
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Your ToDos
        </h2>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-8">
          {["all", "active", "completed"].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200
              ${filter === type
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-5">

          {todos.length === 0 && (
            <div className="text-slate-500 dark:text-slate-400 text-center py-8">
              ✨ You’re all caught up! Start by adding a task.
            </div>
          )}

          {filteredTodos.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-slate-800
              rounded-2xl p-5 
              border border-slate-100 dark:border-slate-700
              shadow-[0_4px_20px_rgba(0,0,0,0.05)]
              dark:shadow-[0_6px_25px_rgba(0,0,0,0.6)]
              flex flex-col sm:flex-row sm:items-center
              justify-between gap-4
              transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 flex-1">

                <input
                  name={item.id}
                  onChange={handlecheckbox}
                  type="checkbox"
                  checked={item.isCompleted}
                  className="accent-indigo-600 w-4 h-4"
                />

                <div
                  className={`break-words text-slate-700 dark:text-slate-200 ${
                    item.isCompleted
                      ? "line-through text-slate-400"
                      : ""
                  }`}
                >
                  {item.todo}
                </div>

              </div>

              <div className="flex gap-2">

                <button
                  onClick={(e) => handleedit(e, item.id)}
                  className="bg-indigo-500 hover:bg-indigo-600 
                  text-white p-2 rounded-lg transition-all duration-200"
                >
                  <FaRegEdit />
                </button>

                <button
                  onClick={(e) => handledelete(e, item.id)}
                  className="bg-rose-500 hover:bg-rose-600 
                  text-white p-2 rounded-lg transition-all duration-200"
                >
                  <MdDelete />
                </button>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </div>
  </div>

  <Footer />
  <Analytics />
</>
  )
}

export default App
