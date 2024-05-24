import React from "react";
import { Todo } from "./model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodo: Todo[];
  setCompletedTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const ToDoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodo,
  setCompletedTodo,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided,snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragActive":""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos-heading">Completed Tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todos={todos}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided,snapshot) => (
          <div
          className={`todos remove ${snapshot.isDraggingOver ? "dragComplete":""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos-heading">Completed Tasks</span>
            {completedTodo.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todos={completedTodo}
                key={todo.id}
                setTodos={setCompletedTodo}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ToDoList;
