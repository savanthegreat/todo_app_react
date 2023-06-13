const initialstate = "";

const changeUser = (state = initialstate, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      state = action.payload.user;
      console.log(state);
      return state;
    case "LOG_OUT_USER":
      return (state = "");
    default:
      return state;
  }
};

export default changeUser;
