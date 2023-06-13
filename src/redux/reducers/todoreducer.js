const initialState = {
  todos: {
    Bob: [
      {
        id: 1,
        title: "TodoList 1 B",
        description: "This is first todo",
        isCompleted: true,
        isPending: false,
        date: "2023-06-14-01:54:41",
      },
      {
        id: 2,
        title: "TodoList 2 B",
        description: "This is second todo",
        isCompleted: false,
        isPending: true,
        date: "2023-06-14-01:54:41",
      },
      {
        id: 3,
        title: "TodoList 3 B",
        description: "This is third todo",
        isCompleted: false,
        isPending: true,
        date: "2023-06-14-01:54:41",
      },
    ],
    Alex: [
      {
        id: 1,
        title: "TodoList 1 A",
        description: "This is first todo",
        isCompleted: true,
        isPending: false,
        date: "2023-06-14-01:54:41",
      },
      {
        id: 2,
        title: "TodoList A",
        description: "This is second todo",
        isCompleted: false,
        isPending: true,
        date: "2023-06-14-01:54:41",
      },
      {
        id: 3,
        title: "TodoList A",
        description: "This is third todo",
        isCompleted: false,
        isPending: true,
        date: "2023-06-14-01:54:41",
      },
    ],
    Caren: [
      {
        id: 1,
        title: "TodoList C",
        description: "This is first todo",
        isCompleted: true,
        isPending: false,
        date: "2023-06-14-01:54:41",
      },
      {
        id: 2,
        title: "TodoList C",
        description: "This is second todo",
        isCompleted: false,
        isPending: true,
        date: "2023-06-14-01:54:41",
      },
      {
        id: 3,
        title: "TodoList C",
        description: "This is third todo",
        isCompleted: false,
        isPending: true,
        date: "2023-06-14-01:54:41",
      },
    ],
    Dave: [
      {
        id: 1,
        title: "TodoList D",
        description: "This is first todo",
        isCompleted: true,
        isPending: false,
        date: "2023-06-14-01:54:41",
      },
      {
        id: 2,
        title: "TodoList D",
        description: "This is second todo",
        isCompleted: false,
        isPending: true,
        date: "2023-06-14-01:54:41",
      },
      {
        id: 3,
        title: "TodoList D",
        description: "This is third todo",
        isCompleted: false,
        isPending: true,
        date: "2023-06-14-01:54:41",
      },
    ],
  },
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      const { id, title, description, user } = action.payload;
      console.log({ id, title, description, user });

      const dateObj = new Date(Date.now()); // Convert the timestamp to a Date object
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      const hours = String(dateObj.getHours()).padStart(2, "0");
      const minutes = String(dateObj.getMinutes()).padStart(2, "0");
      const seconds = String(dateObj.getSeconds()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}-${hours}:${minutes}:${seconds}`;
      console.log(formattedDate);
      const data = {
        ...state,
        todos: {
          ...state.todos,
          [user]: [
            ...state.todos[user],
            {
              id: id,
              title: title,
              description: description,
              isCompleted: false,
              isPending: true,
              date: formattedDate,
            },
          ],
        },
        isEdit: action.isEdit,
      };

      console.log(data);
      return {
        ...state,
        todos: {
          ...state.todos,
          [user]: [
            ...state.todos[user],
            {
              id: id,
              title: title,
              description: description,
              isCompleted: false,
              isPending: true,
              date: formattedDate,
            },
          ],
        },
        isEdit: action.isEdit,
      };

    case "EDIT_TODO":
      const editTodo = action.payload;
      console.log(editTodo);
      // console.log();
      console.log(state?.todos);
      let newEditTodo = state?.todos?.[editTodo.user].find(
        (item) => item?.id === editTodo?.id
      );
      return {
        ...state,
        isEdit: action.isEdit,
        editTodo: newEditTodo,
      };

    case "UPDATE_TODO":
      const { todoId, todoTitle, todoDescription } = action.payload;
      console.log(action.payload.user);
      // user = action.paylod.user;
      const todos = state.todos[action.payload.user].filter((todo) => {
        return todo.id !== todoId;
      });

      const todo = state.todos[action.payload.user].find(
        (todo) => todo?.id === todoId
      );
      todo.title = todoTitle;
      todo.description = todoDescription;
      todos.push(todo);

      console.log({
        ...state,
        todos: { ...state.todos, [action.payload.user]: [todos] },

        isEdit: false,
      });
      return {
        ...state,
        todos: { ...state.todos, [action.payload.user]: todos },

        isEdit: false,
      };

    case "MARK_COMPLETED":
      const { selectedTodoId } = action.payload;
      let allTodos = [];

      selectedTodoId.forEach((id) => {
        allTodos = state.todos[action.payload.user].filter((todo) => {
          return todo.id !== id;
        });

        const selectedTodo = state.todos[action.payload.user].find(
          (todo) => todo?.id === id
        );
        selectedTodo.title = selectedTodo?.title;
        selectedTodo.description = selectedTodo?.description;
        selectedTodo.isCompleted = true;
        selectedTodo.isPending = selectedTodo?.isPending;
        allTodos.push(selectedTodo);
      });

      return {
        ...state,
        todos: { ...state.todos, [action.payload.user]: [...allTodos] },
        isEdit: false,
      };

    default:
      return state;
  }
};
export default todoReducer;
