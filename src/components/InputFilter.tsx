import { Dispatch, SetStateAction } from "react";
import { ITodo } from "../containers";
import { getTodoLocal } from "../utils";

export const InputFilter = ({
  setFilterValue,
  setFilterTodo,
  filterValue,
}: {
  filterValue: string;
  setFilterValue: Dispatch<SetStateAction<string>>;
  setFilterTodo: Dispatch<SetStateAction<ITodo[]>>;
}) => {
  const localTodo = getTodoLocal();
  const onChange = (e: any) => {
    setFilterValue(e.target.value);
    const filterTodo = localTodo.filter((todo) =>
      todo.title?.includes(e.target.value)
    );
    setFilterTodo(filterTodo);
  };

  return (
    <div className="filter-wrapper">
      {localTodo.length !== 0 && (
        <>
          <h1>To Do List</h1>
          <input
            value={filterValue}
            placeholder="Search ..."
            onChange={onChange}
          />
        </>
      )}
    </div>
  );
};
