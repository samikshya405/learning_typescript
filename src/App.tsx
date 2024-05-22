import React, { useState } from "react";
import InputField from "./component/InputField";
import { Todo } from "./component/model";
import ToDoList from "./component/ToDoList";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  // console.log(todo);
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("")
    }
    console.log(todos);
    
  };

  return (
    <div className="App">
      <span className="heading">Taskify</span>

      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
    <ToDoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
