export const addNewTodo = (todo, user) => {
  return {
    type: "ADD_TODO",
    payload: {
      id: Date.now(),
      title: todo?.title,
      description: todo?.description,
      user: user,
    },
  };
};

export const updateTodo = (id, todo, user) => {
  return {
    type: "UPDATE_TODO",
    payload: {
      todoId: id,
      todoTitle: todo?.title,
      todoDescription: todo?.description,
      user: user,
    },
  };
};

export const markTodoCompleted = (id, user) => {
  return {
    type: "MARK_COMPLETED",
    payload: {
      selectedTodoId: id,
      user: user,
    },
  };
};

export const editTodo = (id, user) => {
  return {
    type: "EDIT_TODO",
    payload: {
      id: id,
      user: user,
    },
    isEdit: true,
  };
};

export const updateUser = (user) => {
  return {
    type: "UPDATE_USER",
    payload: {
      user: user,
    },
  };
};

export const logoutUser = (user) => {
  return {
    type: "LOG_OUT_USER",
    payload: {
      user: user,
    },
  };
};
