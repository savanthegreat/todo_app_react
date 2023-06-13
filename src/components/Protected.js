import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const user = useSelector((state) => state.changeUser);
  if (user === "") {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default Protected;
