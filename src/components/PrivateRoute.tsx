import { Navigate } from "react-router-dom";

interface Props {
  component: JSX.Element;
  isAuthenticated: boolean;
}

const PrivateRoute = ({ component, isAuthenticated }: Props) => {
  return isAuthenticated ? component : <Navigate replace to="/signin" />;
};

export default PrivateRoute;
