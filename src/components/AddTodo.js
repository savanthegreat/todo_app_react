import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, updateTodo } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import Protected from "./Protected";

export const AddTodo = () => {
  const [value, setValue] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const isEdit = useSelector((state) => state.todoReducer.isEdit);
  const editTodo = useSelector((state) => state.todoReducer.editTodo);
  const user = useSelector((state) => state.changeUser);
  const navigate = useNavigate();

  useEffect(() => {
    editTodo && setValue(() => editTodo);
  }, [editTodo]);

  const onSubmit = (e) => {
    e.preventDefault();

    // value.user = user;
    if (!value?.title) {
      setError((error) => ({
        ...error,
        title: "Please enter todo title",
      }));
      return;
    }
    if (!value?.description) {
      setError((error) => ({
        ...error,
        description: "Please enter todo description",
      }));
      return;
    }

    if (isEdit) {
      dispatch(updateTodo(editTodo.id, value, user));
    } else {
      dispatch(addNewTodo(value, user));
    }
    setValue({ title: "", description: "" });
    document.getElementById("todoForm").reset();

    navigate("/");
  };

  const changeEvent = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    if (e?.target?.name === "title") {
      setError({
        title: "",
      });
    }
    if (e?.target?.name === "description") {
      setError({
        description: "",
      });
    }
  };

  return (
    <Protected>
      <div className="container my-4 py-1 border">
        <form
          className="mt-3 mb-2"
          id="todoForm"
          onSubmit={onSubmit}
          style={{ width: "100%" }}
        >
          <div className="row">
            <div className="col-xl-3">
              <label className="sr-only">Name</label>
              <input
                type="text"
                name="title"
                className="form-control mb-2 mr-sm-3"
                placeholder="Todo Title"
                defaultValue={value?.title}
                onChange={(e) => changeEvent(e)}
              />
              <span className="text-danger">{error?.title}</span>
            </div>

            <div className="col-xl-3">
              <label className="sr-only">Description</label>
              <input
                type="text"
                name="description"
                className="form-control mb-2 mr-sm-3"
                placeholder="Description"
                defaultValue={value?.description}
                onChange={(e) => changeEvent(e)}
              />
              <span className="text-danger">{error?.description}</span>
            </div>

            <div className="col-xl-2 mx5 ">
              <button className="btn btn-primary mb-2 my-4" type="submit">
                {" "}
                {isEdit ? "Update Todo" : "Create Todo"}{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Protected>
  );
};
