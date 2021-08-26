import { Dispatch, SetStateAction } from "react";
import { ITodo } from "..";
import { CreateTodo } from "../CreateTodo";

export const TodoItem = ({
  todo,
  removeTodo,
  setIsShowDetail,
  isShowDetail,
  updateTodo,
}: {
  todo: ITodo;
  setIsShowDetail: Dispatch<SetStateAction<string | null>>;
  isShowDetail: boolean;
  updateTodo: (todo: ITodo) => void;
  removeTodo: (todoId: string) => void;
}) => {
  const onClickDetail = () => {
    isShowDetail ? setIsShowDetail(null) : setIsShowDetail(todo.id);
  };

  const onClickRemove = () => {
    removeTodo(todo.id);
  };

  const selectTodo = () => {
    updateTodo({ ...todo, selected: true });
  };

  return (
    <>
      <div className={`todo-item ${todo.isDone ? "done" : ""}`}>
        <div className="todo-item__right">
          <input
            type="checkbox"
            name="vehicle1"
            checked={todo.selected}
            onChange={selectTodo}
          />
          <span className="todo-item__title">{todo.title}</span>
        </div>
        <div className="todo-item__actions-wrapper">
          <button className="todo-item__detail-btn" onClick={onClickDetail}>
            Detail
          </button>
          <button className="todo-item__remove-btn" onClick={onClickRemove}>
            Remove
          </button>
        </div>
      </div>
      {isShowDetail && <CreateTodo todoDetail={todo} updateTodo={updateTodo} />}
    </>
  );
};
