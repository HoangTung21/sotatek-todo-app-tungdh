import { Fragment, useState } from "react";
import { ITodo } from "..";
import { TodoItem } from "./TodoItem";

export const TodoList = ({
  todoList,
  removeTodo,
  updateTodo,
}: {
  todoList: ITodo[];
  updateTodo: (todo: ITodo) => void;
  removeTodo: (todoId: string) => void;
}): JSX.Element => {
  const [detailTodo, setDetailTodo] = useState<string | null>(null);

  return (
    <div className="todo-list">
      {todoList.map((todo) => (
        <Fragment key={todo.id}>
          <TodoItem
            setIsShowDetail={setDetailTodo}
            isShowDetail={detailTodo === todo.id}
            removeTodo={removeTodo}
            todo={todo}
            updateTodo={updateTodo}
          />
        </Fragment>
      ))}
    </div>
  );
};
