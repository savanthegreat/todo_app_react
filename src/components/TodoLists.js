import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editTodo, markTodoCompleted } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { AddTodo } from "./AddTodo";
import { logoutUser } from "../redux/actions";
import Protected from "./Protected";
export const TodoLists = () => {
  const user = useSelector((state) => state.changeUser);

  const navigate = useNavigate();
  if (user === "") {
    navigate("/login");
  }

  const todos = useSelector((state) => state.todoReducer.todos[user]);
  const dispatch = useDispatch();
  const [selectedTodo, setSelectedTodo] = useState([]);
  const isEdit = useSelector((state) => state.todoReducer.isEdit);
  const actionClick = (data) => {
    if (data && data?.type === "edit") {
      dispatch(editTodo(data?.todo?.id, user));
    }
  };

  const changeEvent = (e, todoId) => {
    if (e?.target?.name !== "select_all_todo" && e?.target?.checked === true) {
      if (selectedTodo.indexOf(todoId) === -1) {
        setSelectedTodo((todo) => [...todo, todoId]);
      }
    } else if (
      e?.target?.name !== "select_all_todo" &&
      e?.target?.checked === false
    ) {
      const todos = selectedTodo.filter((todo) => todo !== todoId);
      setSelectedTodo(todos);
    }

    if (e?.target?.name === "select_all_todo" && e?.target?.checked === true) {
      todos &&
        todos.forEach((todo, index) => {
          const allChkbox = document.getElementsByName(`todo_${index}`);

          for (let chk of allChkbox) {
            chk.checked = true;
            let todoId = todo?.id;

            setSelectedTodo((todo) => [...todo, todoId]);
          }
        });
    } else if (
      e?.target?.name === "select_all_todo" &&
      e?.target?.checked === false
    ) {
      todos &&
        todos.forEach((todo, index) => {
          const allChkbox = document.getElementsByName(`todo_${index}`);
          for (let chk of allChkbox) {
            chk.checked = false;
            setSelectedTodo([]);
          }
        });
    }
  };

  const markCompleted = () => {
    dispatch(markTodoCompleted(selectedTodo, user));
  };

  return (
    <>
      <Protected>
        {/* {`USER ${user}`} */}
        {isEdit ? <AddTodo /> : <></>}
        <div className="col-xl-2">
          <button
            className="btn btn-primary mb-2"
            type="submit"
            onClick={() => navigate("/add")}
          >
            {" "}
            {"Create Todo"}{" "}
          </button>
        </div>

        <div className="col-xl-2">
          <button
            className="btn btn-primary mb-2"
            type="submit"
            onClick={() => {
              navigate("/login");

              dispatch(logoutUser());
            }}
          >
            LOGOUT
          </button>
        </div>

        <div className="container my-2">
          <div className="row pb-4" style={{ height: "60px" }}>
            <div className="col-xl-12 text-right">
              {selectedTodo.length > 0 && (
                <>
                  <button
                    className="btn btn-success ml-2"
                    onClick={markCompleted}
                  >
                    Mark As Completed
                  </button>
                </>
              )}
            </div>
          </div>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th width="3%">
                  <input
                    type={"checkbox"}
                    onChange={(e) => changeEvent(e)}
                    name={"select_all_todo"}
                  />
                </th>
                <th width="30%">Name</th>
                <th width="32%">Description</th>
                <th width="8%">Status</th>
                <th width="10%">Date and Time</th>
                <th width="20%">Action</th>
              </tr>
            </thead>

            <tbody>
              {todos &&
                todos.map((todo, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type={"checkbox"}
                        value={todo?.id}
                        onChange={(e) => changeEvent(e, todo?.id)}
                        name={`todo_${index}`}
                      />
                    </td>
                    <td>{todo?.title}</td>
                    <td>{todo?.description}</td>
                    <td>
                      {todo?.isCompleted ? (
                        <span
                          className="badge badge-success p-2"
                          style={{ color: "green" }}
                        >
                          Completed
                        </span>
                      ) : todo?.isPending ? (
                        <span
                          className="badge badge-danger p-2"
                          style={{ color: "red" }}
                        >
                          Pending
                        </span>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>{todo?.date}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          actionClick({ todo: todo, type: "edit" })
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Protected>
    </>
  );
};
