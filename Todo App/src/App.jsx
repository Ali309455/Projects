import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";


function App() {
  const [todo, settodo] = useState('')
  const [Todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Create a new Date object
    const date = new Date();

    // Get the day of the week (0 for Sunday, 6 for Saturday)
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = daysOfWeek[date.getDay()];

    // Get the date (e.g., 1, 2, 3)
    const dayOfMonth = date.getDate();

    // Get the month (0 is January, so we add 1)
    const month = date.getMonth() + 1;

    // Get the year
    const year = date.getFullYear();

    // Format the date as you like, e.g., "Tuesday, 02/10/2024"
    const formattedDate = `${dayName}, ${dayOfMonth}/${month}/${year}`;

    // Update state with the formatted date
    setCurrentDate(formattedDate);
  }, []);
  useEffect(() => {
    let storedTodos = JSON.parse(localStorage.getItem("todos"))
    if (storedTodos){
    setTodos(storedTodos)
    }
  }, [])
  useEffect(() => {
    if (Todos.length > 0){
    localStorage.setItem("todos", JSON.stringify(Todos))
    }
  }, [Todos])

  const handledelete = (e, id) => {
    setTodos(Todos.filter((i) => i.id!== id));
  };
  const handleEdit = (e, id) =>{
    let t = Todos.filter((i) =>i.id === id);
    settodo(t[0].todo)
    handledelete(e,id)
  }
  const handleadd =()=>{
    setTodos([...Todos,{id: uuidv4() ,todo, isCompleted:false}])
    settodo("")
  }
  const handlecheck = (e) => {
    let id = e.target.name
    let index = Todos.findIndex(e =>{ return e.id === id})
    let newtodos = [...Todos]
    newtodos[index].isCompleted =!Todos[index].isCompleted
    setTodos(newtodos)
  }
  const handlechange = (e) => {
    settodo(e.target.value)
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleadd();
    }
  };
  const togglefinished = () => {
    setshowfinished(!showfinished)
  }
  


  return (
    <>
      <div className="cont flex items-center justify-center h-[100vh] bg-blue-600">
        <div className="main p-2 justify-center w-[50vw] max-md:w-[80vw] m-auto rounded-lg bg-gray-800 ">
          <Navbar />
          <div className="flex flex-col text-white justify-center items-center py-4 h-[15vh]">
            <h3 className="text-2xl font-bold max-md:text-lg">{currentDate.split(",")[0]}</h3>
            <h5 className="text-sm max-md:text-xs text-gray-400">
              {currentDate.split(",")[1]}
            </h5>
          </div>
          <div className="w-[85%] mx-auto flex flex-col">
            <div className="flex  gap-x-2 items-start max-sm:flex-col max-sm:items-center">
              <div className="bg-gray-900 p-2 rounded-lg mb-3 flex gap-2 w-[85%]">
              {/* <span class="material-symbols-outlined">
              menu
              </span> */}
                <input
                  type="text"
                  name="todo"
                  value={todo}
                  placeholder="Add a task.."
                  className="w-full bg-transparent border-none focus:outline-none focus:ring-0 caret-white text-white placeholder:text-sm"
                  onChange={handlechange}
                  onKeyDown={handleKeyDown} 
                />
              </div>
              <button onClick={handleadd}  disabled={todo.length<=3} className="text-white p-2 bg-blue-600 h-[10%] rounded-md hover:font-bold w-[70%]">
                Save
              </button>
            </div>
            <div className="self-center p-3 text-white text-xl font-bold max-md:text-[16px]">Your Todo-List</div>
            <div>
            <input type="checkbox" onChange={togglefinished} checked={showfinished} className=""/> <span className="text-white text-md max-md:text-sm">Show Finished</span>
            </div>
            <div className="break h-[1px] bg-gray-900 w-full mb-1"></div>
            {Todos.length == 0 &&  <div className="p-2 text-white m-auto text-sm" > Set some Todo's for Today...</div>}
            {Todos.map(item=>{
              return (showfinished || !item.isCompleted) && <div key={item.id} className="flex max-sm:flex-col p-1 justify-around items-center" >
              <div className="w-[75%] max-md:w-[100%]  p-3 rounded-lg flex items-center gap-x-2 h-[20px] ">
              <input type="checkbox" name={item.id} onChange={handlecheck} checked={item.isCompleted} className=""/>
                <span className={"text-white text-md w-[100%] leading-tight overflow-hidden truncate max-md:text-xs" + (item.isCompleted?" line-through decoration-2 decoration-gray-900":"")} > {item.todo} </span>
              </div>
              <div className="icons flex gap-1 max-sm:w-[100%] max-sm:justify-center text-white max-sm:border-blue-900 max-sm:border-b-2">
                <button className="hover:cursor-pointer p-2 mx-1 bg-blue-700 rounded-lg max-sm:bg-transparent " onClick={(e)=>{handleEdit(e,item.id)}}><BiEdit /></button>
                <button className="hover:cursor-pointer p-2 mx-1 bg-blue-700 rounded-lg md:text-sm max-sm:bg-transparent" onClick={(e)=>{handledelete(e,item.id)}}><MdDelete /></button>
              </div>
            </div>
            })}
            {/* <div className="flex p-2 justify-around">
              <div className="w-[75%]  p-2 rounded-lg">
              <input type="checkbox" className=""/>
                <span className="text-white text-sm"> 11am meeting </span>
              </div>
              <div className="icons flex gap-1 text-white">
                <button className="hover:cursor-pointer" onClick={handledelete}>delete</button>
                <button className="hover:cursor-pointer" onClick={handlecompleted}>completed</button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
