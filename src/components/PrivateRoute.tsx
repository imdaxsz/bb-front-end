import { Navigate } from "react-router-dom";

interface Props {
  component: JSX.Element;
  token: string | null;
}

const PrivateRoute = ({ component, token }: Props) => {
  return token ? component : <Navigate replace to="/signin" />;
};

export default PrivateRoute;
