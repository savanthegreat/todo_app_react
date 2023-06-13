export const addNewTodo = (todo) => {
  return {
    type: "ADD_TODO",
    payload: {
      id: Date.now(),
      title: todo?.title,
      description: todo?.description,
    },
  };
};

export const updateTodo = (id, todo) => {
  return {
    type: "UPDATE_TODO",
    payload: {
      todoId: id,
      todoTitle: todo?.title,
      todoDescription: todo?.description,
    },
  };
};

export const markTodoCompleted = (id) => {
  return {
    type: "MARK_COMPLETED",
    payload: {
      selectedTodoId: id,
    },
  };
};
