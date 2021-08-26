import moment from "moment";
import { useEffect, useState } from "react";
import { BulkActions } from "../components/BulkActions";
import { InputFilter } from "../components/InputFilter";
import { getTodoLocal } from "../utils";
import { CreateTodo } from "./CreateTodo";
import { TodoList } from "./TodoList";

export interface ITodo {
  id: string;
  title: string;
  des: string;
  date: string;
  priority: string;
  selected: boolean;
  isDone: boolean;
}

export const TodoApp = (): JSX.Element => {
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [isDisplayBulkAction, setIsDisplayBulkAction] = useState(false);
  const [filterTodo, setFilterTodo] = useState<ITodo[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");

  const updateTodoList = (newTodoList: ITodo[]) => {
    setTodoList(newTodoList);
    localStorage.setItem("todo", JSON.stringify(newTodoList));
  };

  const createTodo = (newTodo: ITodo) => {
    const localTodo = getTodoLocal();
    const newTodoList = [...localTodo, newTodo];
    newTodoList.sort((a, b) => moment(a.date).unix() - moment(b.date).unix());
    updateTodoList(newTodoList);
  };

  const removeTodo = (todoId: string) => {
    const localTodo = getTodoLocal();
    for (let idx = 0; idx < localTodo.length; idx++) {
      if (localTodo[idx].id === todoId) {
        localTodo.splice(idx, 1);
      }
    }
    updateTodoList(localTodo);
  };

  const updateTodo = (targetTodo: ITodo) => {
    const localTodo = getTodoLocal();
    let checkSelected = false;
    for (let idx = 0; idx < localTodo.length; idx++) {
      if (localTodo[idx].id === targetTodo.id) {
        if (targetTodo.selected && localTodo[idx].selected) {
          localTodo[idx].selected = false;
        } else {
          localTodo[idx] = targetTodo;
        }
      }
      localTodo[idx].selected && (checkSelected = true);
    }
    localTodo.sort((a, b) => moment(a.date).unix() - moment(b.date).unix());
    setIsDisplayBulkAction(checkSelected);
    updateTodoList(localTodo);
  };

  const multiDone = () => {
    const localTodo = getTodoLocal();
    for (let idx = 0; idx < localTodo.length; idx++) {
      if (localTodo[idx].selected) localTodo[idx].isDone = true;
    }
    updateTodoList(localTodo);
  };
  const multiRemove = () => {
    const localTodo = getTodoLocal();
    for (let idx = localTodo.length - 1; idx > 0; idx--) {
      if (localTodo[idx].selected) localTodo.splice(idx, 1);
    }
    setIsDisplayBulkAction(false);
    updateTodoList(localTodo);
  };

  useEffect(() => {
    const ititTodo = getTodoLocal();
    for (let idx = 0; idx < ititTodo.length; idx++) {
      ititTodo[idx].selected = false;
    }
    updateTodoList(ititTodo);
  }, []);

  return (
    <div className="todo-wrapper">
      <div className="todo-wrapper__left">
        <CreateTodo createTodo={createTodo} />
      </div>
      <div className="todo-wrapper__right">
        <InputFilter
          setFilterTodo={setFilterTodo}
          setFilterValue={setFilterValue}
          filterValue={filterValue}
        />
        {!!todoList.length && (
          <TodoList
            removeTodo={removeTodo}
            todoList={filterValue ? filterTodo : todoList}
            updateTodo={updateTodo}
          />
        )}
        {isDisplayBulkAction && (
          <BulkActions multiDone={multiDone} multiRemove={multiRemove} />
        )}
      </div>
    </div>
  );
};
