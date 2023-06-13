import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AddTodo } from "./components/AddTodo";
import { TodoLists } from "./components/TodoLists";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="container p-4 mt-2">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route exact path="/" element={<TodoLists />} />
          <Route path="/add" element={<AddTodo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
