import { ITodo } from "./containers";

export const addNewTodoLocal = (todo: ITodo) => {
  const localTodo = localStorage.getItem("todo");
  const todoList = localTodo ? JSON.parse(localTodo) : [];
  todoList.push(todo);
  localStorage.setItem("todo", JSON.stringify(todoList));
};

export const getTodoLocal = (): [] | ITodo[] => {
  const localTodo = localStorage.getItem("todo");
  const ititTodo = localTodo ? JSON.parse(localTodo) : [];
  return ititTodo;
};
