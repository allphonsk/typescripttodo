// import React, {FormEventHandler, useState}from 'react';  
import React, { useState} from 'react'; 
import { v4 as uuid } from 'uuid';
// references this already available
// type formElement = React.FormEvent<HTMLFontElement>

// creates a new obj
interface ITodo {
  id: string
  text: string
  completed: boolean
}





function App() {  
  const [todo, setTodo] = useState<string>(''); // todo of type string
  const [completed, setCompleted] =useState<boolean>(false)
  const [todos, setTodos] = useState<ITodo[]>([]); // array of type Itodo

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addTodo(todo);
  }

  const addTodo  = (text: string) :void => {
    let id = uuid();
    // const newTodo = [...todo, {text, completed: false}] 
    const newTodos: ITodo[] = [...todos, {id, text:text, completed: false}]
    setTodos(newTodos); 
    setTodo(''); 
  }

  const handleCompleted = (todoId: string ) :void =>{ 
    console.log('todoId ', todoId);
    const newTodos: ITodo[] = [...todos];
    // newTodos[todoId].completed = !newTodos[todoId].completed 
    newTodos.map((item)=>{
      if (item.id === todoId) {
        item.completed = !item.completed
      }
    })
    setTodos(newTodos);   
  }

  const handleRemove = (todoId: string) :void =>{  
    // todos.filter((todo)=>{  todo.id !== todoId })
    // const newTodos: ITodo[] = todos.filter((todo)=>{  todo.id !== todoId }); 
    setTodos(todos.filter((item) => item.id !== todoId));  
  }


  // console.log('app tsx');
  // console.log(todos); 
  
  return (
    <div className="App" style={{margin: '50px'}}>
      <h3>Todo list</h3>
      <form onSubmit={handleSubmit}>
        <input type='text' value={todo} onChange={(e)=>{setTodo(e.target.value)}} required />
        <button type='submit'> Add </button>
      </form>
      < hr style={{margin: '20px'}}/>
      <div>
        {todos.map((todo, index)=>{
          return (
            <div key={index}>
              {(todo.id).slice(0,2)} {" "} {todo.text} {" "} {todo.completed? 'Completed' : 
              <input type="checkbox"  onClick={()=>handleCompleted(todo.id)} />}
              {' '} <button type='submit' onClick={()=>{handleRemove(todo.id)}} style={{color: 'red'}}> X </button>
            </div>
          )

        })}
      </div>
  
    </div>
  );
}

export default App;
