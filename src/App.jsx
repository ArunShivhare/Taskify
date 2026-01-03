import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if(todostring){
    let todos = JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
    }
  }, [])
  

  const savetols = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowfinished(!showfinished)
  }

  const handleedit = (e, id)=>{
    let t = todos.filter(i=>i.id === id)
    settodo(t[0].todo)
    let newtodos = todos.filter(item=>{
      return item.id !== id;
    });
    settodos(newtodos)
    savetols()
  }

  const handledelete = (e, id)=>{
    let newtodos = todos.filter(item=>{
      return item.id !== id;
    });
    settodos(newtodos)
    savetols()
  }

  const handleadd = ()=>{
    settodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    settodo("")
    savetols()
  }

  const handlechange = (e)=>{
    settodo(e.target.value)
  }

  const handlecheckbox = (e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos)
    savetols()
  }


  return (
    <>
    <Navbar/>
     <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-3 bg-cyan-100 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-3xl'>Taskify - Plan Your Day</h1>
      <div className="addtodo my-5">
        <h2 className='text-xl font-bold my-3'>Add a ToDo</h2>
        <div className="flex">
        <input onChange={handlechange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
        <button onClick={handleadd} disabled={todo.length<=3} className='bg-cyan-500 hover:bg-cyan-700 text-sm font-bold px-2 py-1 text-white mx-3 rounded-full'>Save</button>
        </div>
      </div>
      <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showfinished}/> Show Finished
      <div class="h-[1px] w-full bg-gray-700 opacity-10 my-3"></div>
      <h2 className="text-xl font-bold">Your ToDos</h2>
      <div className="todos">
        {todos.length === 0 && <div className='m-5'>No todos for display</div>}
        {todos.map(item=>{
        return(showfinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between">
          <div className='flex gap-5'>
          <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.isCompleted} />
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
          <div className="buttons flex h-full">
            <button onClick={(e)=>{handleedit(e,item.id)}} className='bg-cyan-500 hover:bg-cyan-700 text-sm font-bold px-2 py-1 text-white rounded-md mx-1'><FaRegEdit /></button>
            <button onClick={(e)=>{handledelete(e, item.id)}} className='bg-cyan-500 hover:bg-cyan-700 text-sm font-bold px-2 py-1 text-white rounded-md mx-1'><MdDelete /></button>
          </div>
        </div>
        })}
      </div>
     </div>
    </>
  )
}

export default App
