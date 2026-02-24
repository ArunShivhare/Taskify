import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])


  const savetols = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
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
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id;
    });
    settodos(newtodos)
    savetols()
  }

  const handledelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id;
    });
    settodos(newtodos)
    savetols()
  }

  const handleadd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    savetols()
  }

  const handlechange = (e) => {
    settodo(e.target.value)
  }

  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos)
    savetols()
  }


  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-cyan-50 to-white py-10 px-4">

        <div className="max-w-3xl mx-auto">

          {/* Main Card */}
          <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-6 sm:p-8 border border-cyan-200">

            {/* Title */}
            <h1 className="font-bold text-center text-2xl sm:text-3xl md:text-4xl mb-8">
              Taskify - Plan Your Day
            </h1>

            {/* Add Todo */}
            <div className="mb-8">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Add a ToDo
              </h2>

              <div className="flex flex-col sm:flex-row gap-3">

                <input
                  onChange={handlechange}
                  value={todo}
                  type="text"
                  placeholder="Enter your task..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none"
                />

                <button
                  onClick={handleadd}
                  disabled={todo.length <= 3}
                  className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                >
                  Save
                </button>

              </div>
            </div>

            <div className="h-[1px] w-full bg-gray-200 mb-6"></div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">

              <div className="bg-white shadow rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-2xl font-bold">{todos.length}</p>
              </div>

              <div className="bg-white shadow rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {todos.filter(t => t.isCompleted).length}
                </p>
              </div>

              <div className="bg-white shadow rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl font-bold text-cyan-600">
                  {todos.filter(t => !t.isCompleted).length}
                </p>
              </div>

              <div className="bg-white shadow rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500">Progress</p>
                <p className="text-2xl font-bold text-purple-600">
                  {todos.length === 0
                    ? "0%"
                    : Math.round(
                      (todos.filter(t => t.isCompleted).length / todos.length) * 100
                    ) + "%"}
                </p>
              </div>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div
                className="bg-cyan-600 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${todos.length === 0
                    ? 0
                    : (todos.filter(t => t.isCompleted).length / todos.length) * 100
                    }%`
                }}
              ></div>
            </div>

            {/* Todo List */}
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Your ToDos
            </h2>

            {/* Filter Buttons */}
            <div className="flex gap-3 mb-6">

              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition 
      ${filter === "all" ? "bg-cyan-600 text-white" : "bg-gray-200"}`}
              >
                All
              </button>

              <button
                onClick={() => setFilter("active")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition 
      ${filter === "active" ? "bg-cyan-600 text-white" : "bg-gray-200"}`}
              >
                Active
              </button>

              <button
                onClick={() => setFilter("completed")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition 
      ${filter === "completed" ? "bg-cyan-600 text-white" : "bg-gray-200"}`}
              >
                Completed
              </button>

            </div>

            <div className="space-y-4">

              {todos.length === 0 && (
                <div className="text-gray-500 text-center py-6">
                  ✨ You’re all caught up!
                  Start by adding a task.
                </div>
              )}

              {filteredTodos.map((item) => {
                return (
                  (showfinished || !item.isCompleted) && (

                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    
                      className="bg-white shadow-sm border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >

                      {/* Left Side */}
                      <div className="flex items-center gap-4 flex-1">

                        <input
                          name={item.id}
                          onChange={handlecheckbox}
                          type="checkbox"
                          checked={item.isCompleted}
                          className="accent-cyan-600 w-4 h-4"
                        />

                        <div
                          className={`break-words ${item.isCompleted ? "line-through text-gray-400" : ""
                            }`}
                        >
                          {item.todo}
                        </div>

                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2 self-end sm:self-auto">

                        <button
                          onClick={(e) => handleedit(e, item.id)}
                          className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-lg transition"
                        >
                          <FaRegEdit />
                        </button>

                        <button
                          onClick={(e) => handledelete(e, item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                        >
                          <MdDelete />
                        </button>

                      </div>

                    </motion.div>
                  )
                );
              })}

            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default App
