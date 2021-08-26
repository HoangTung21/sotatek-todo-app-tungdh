import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ITodo } from "..";

const defaultTodo = {
  id: "",
  title: "",
  des: "",
  date: moment().format("YYYY-MM-DD"),
  priority: "normal",
  isDone: false,
  selected: false,
};

export const CreateTodo = ({
  createTodo,
  todoDetail,
  updateTodo,
}: {
  createTodo?: (todo: ITodo) => void;
  todoDetail?: ITodo;
  updateTodo?: (todo: ITodo) => void;
}): JSX.Element => {
  const [todo, setTodo] = useState<ITodo>({ ...defaultTodo });

  const formRef = useRef<HTMLFormElement>(null);

  const capitalizeFirstLetter = (string: String) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const onChange = (e: any) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const onClickUpdate = () => {
    if (!updateTodo) return;
    updateTodo(todo);
    setTodo(todo);
  };

  const onClickAdd = () => {
    if (!createTodo || !formRef.current?.reportValidity()) return;
    createTodo({ ...todo, id: uuidv4(), isDone: false });
    setTodo({ ...defaultTodo });
  };

  useEffect(() => {
    todoDetail && setTodo(todoDetail);
  }, [todoDetail]);

  return (
    <div className="create-todo">
      {!updateTodo && (
        <div className="create-todo__title">
          <h1>New Task</h1>
        </div>
      )}
      <form className="create-todo__wrapper" ref={formRef}>
        <input
          value={todo.title}
          placeholder="Add new task ..."
          onChange={onChange}
          required
          name="title"
        />
        <label>Description</label>
        <textarea value={todo.des} onChange={onChange} name="des"></textarea>
        <div className="create-todo__bottom">
          <div className="create-todo__date">
            <label>Due Date</label>
            <input
              type="date"
              name="date"
              onChange={onChange}
              min={moment().format("YYYY-MM-DD")}
              value={todo.date}
            />
          </div>
          <div className="create-todo__priority">
            <label>Priority</label>
            <select name="priority" onChange={onChange} value={todo.priority}>
              {["normal", "low", "high"].map((item, index) => (
                <option value={item} key={`${item}_${index}`}>
                  {capitalizeFirstLetter(item)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="button"
          className="create-todo__btn-add"
          onClick={updateTodo ? onClickUpdate : onClickAdd}
        >
          {createTodo ? "Add" : "Update"}
        </button>
      </form>
    </div>
  );
};
