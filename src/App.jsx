import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import Footer from './components/Footer';

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])


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
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-white pb-20 py-14 px-4">

        <div className="max-w-3xl mx-auto">

          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-xl 
        shadow-[0_10px_40px_rgba(0,0,0,0.08)] 
        rounded-3xl p-8 border border-slate-200">

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-800 text-center">
              <span className="text-indigo-600">TASK</span>
              <span className="text-slate-900">iFY</span>
            </h1>

            <p className="text-slate-500 text-lg text-center mt-2">
              Plan smart. Execute better.
            </p>

            {/* Add Todo */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-700 mb-4">
                Add a ToDo
              </h2>

              <div className="flex flex-col sm:flex-row gap-3">

                <input
                  onChange={handlechange}
                  value={todo}
                  type="text"
                  placeholder="Enter your task..."
                  className="flex-1 rounded-xl border border-slate-300 
                px-5 py-3 text-slate-700
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

            <div className="h-[1px] w-full bg-slate-200 mb-10"></div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-10">

              <div className="bg-white rounded-2xl p-5 border border-slate-100
            shadow-md hover:shadow-lg transition-all duration-300 text-center">
                <p className="text-sm text-slate-500">Total</p>
                <p className="text-3xl font-semibold text-slate-800">
                  {todos.length}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-100
            shadow-md hover:shadow-lg transition-all duration-300 text-center">
                <p className="text-sm text-slate-500">Completed</p>
                <p className="text-3xl font-semibold text-emerald-600">
                  {todos.filter(t => t.isCompleted).length}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-100
            shadow-md hover:shadow-lg transition-all duration-300 text-center">
                <p className="text-sm text-slate-500">Active</p>
                <p className="text-3xl font-semibold text-indigo-600">
                  {todos.filter(t => !t.isCompleted).length}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-100
            shadow-md hover:shadow-lg transition-all duration-300 text-center">
                <p className="text-sm text-slate-500">Progress</p>
                <p className="text-3xl font-semibold text-purple-600">
                  {todos.length === 0
                    ? "0%"
                    : Math.round(
                      (todos.filter(t => t.isCompleted).length / todos.length) * 100
                    ) + "%"}
                </p>
              </div>

            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 rounded-full h-3 mb-10">
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
            <h2 className="text-lg font-semibold text-slate-700 mb-4">
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
                      : "bg-slate-200 text-slate-600 hover:bg-slate-300"}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}

            </div>

            <div className="space-y-5">

              {todos.length === 0 && (
                <div className="text-slate-500 text-center py-8">
                  ✨ You’re all caught up! Start by adding a task.
                </div>
              )}

              {filteredTodos.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}

                  className="bg-white rounded-2xl p-5 border border-slate-100
                shadow-[0_4px_20px_rgba(0,0,0,0.05)]
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
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
                      className={`break-words text-slate-700 ${item.isCompleted
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
    </>
  )
}

export default App
