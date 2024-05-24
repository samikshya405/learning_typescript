import React, { useState } from "react";
import InputField from "./component/InputField";
import { Todo } from "./component/model";
import ToDoList from "./component/ToDoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  // console.log(todo);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [completedTodo, setCompletedTodo] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
    console.log(todos);
  };
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if(destination.droppableId ===source.droppableId && destination.index===source.index) return;
    let add,
    active = todos,
    complete = completedTodo

    if(source.droppableId === "TodosList"){
      add = active[source.index]
      active.splice(source.index,1)
    }else{
      add = complete[source.index]
      complete.splice(source.index,1)
    }
    if(destination.droppableId==="TodosList"){
      active.splice(destination.index,0,add)
    }else{
      complete.splice(destination.index,0,add)
    }
    setCompletedTodo(complete)
    setTodos(active)
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>

        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <ToDoList
          todos={todos}
          setTodos={setTodos}
          completedTodo={completedTodo}
          setCompletedTodo={setCompletedTodo}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
