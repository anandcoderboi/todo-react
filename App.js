

import React, {useState, useEffect} from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaCheck, FaPlusCircle, FaTrash} from 'react-icons/fa';

function App() {
  const [todos, setTodos] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [input , setInput] = useState('');
  const notify = () => toast("Todo added");
  const notify1 =() => toast("Todo moved to progress");
  const notify2 =() => toast("Todo moved to completed");
  const addTodo = () => {
    const todo = {
      id: Math.floor(Math.random() * 1000),
      text: input
      
    }
    setTodos([todo, ...todos]);
    // setInput('');
    
  }
  const swapText1 = ()=>{
    setInprogress(todos);
    setTodos(inprogress);
  };
  const swapText2 = ()=>{
    setCompleted(inprogress);
    setInprogress(completed);
  };
  const addToProgress = (id) => {
    const item = todos.find(x => x.id === id);
    setInprogress([item, ...inprogress]);
    const filterarray = todos.filter(x => x.id !== id);
    setTodos(filterarray);
  }
  const deleteTodo = (id) => {
    const filterarray = todos.filter(x => x.id !== id);
    setTodos(filterarray);
  }
  const addtoCompleted = (id) => {
    const item = inprogress.find(x => x.id === id);
    setCompleted([item, ...completed]);
    const filterarray = inprogress.filter(x => x.id !== id);
    setInprogress(filterarray);
  }

  return (
    <div className="App">
      <div className="container">
        <h3 className="title">ToDo List App</h3>
        <form className="form_todo">
          <input type="text" className="form-control" value = {input}onChange={(e) => setInput(e.target.value)} placeholder="Enter Your Todo" name="text"/>
        <button type="button" className="btn" onClick={() => {
            addTodo(input);
            setInput('');
            notify("Todo added successfully")
          } }>ADD
          <ToastContainer />
          </button>
        </form>
        <div className="todos_wrapper">
         <div className="todos_list">
           <h3 className="todo_title">Todos List</h3>
           {todos.map((item) => 
            <div className="todo_card" key={item.id}>
              <p className="card_text">{item.text}</p>
              <div className='icons'>
                <FaCheck onClick={() => {
                addToProgress(item.id)
                notify1("Todo added to progress")

              } }
              className="icon-check-todo"/>
              <ToastContainer />

              <FaTrash onClick={() => deleteTodo(item.id)} className="icon-trash-todo"/>
              </div>
            </div>
           )}
         </div>
         <button  className="swap-btn btn" onClick={swapText1}>Swap All</button>
         
         <div className="todos_list">
           <h3 className="todo_title">InProgress</h3>
           {inprogress.map((item) =>
            <div className="progress_card" key={item.key}>
              <p className="card_text">{item.text}</p>
              <FaCheck onClick={() => {
                addtoCompleted(item.id)
                notify2("Todo added to completed")

              }} className="icon-progress-todo"/>
              <ToastContainer />
            </div>
           )}
         </div>
         <button  className="swap-btn btn" onClick={swapText2}>Swap All</button>
         <div className="todos_list">
           <h3 className="todo_title">Completed</h3>
           {completed.map((item) => 
            <div className="completed_card" key={item.id}>
              <p className="card_text">{item.text}</p>
            </div>
           )}
         </div>
        </div>
      </div>
    </div>
  );
}

export default App;