import Signin from "../routes/Signin";

interface Props {
  component: JSX.Element;
  isAuthenticated: boolean;
}

const PrivateRoute = ({ component, isAuthenticated }: Props) => {
  return (
    isAuthenticated ? component : <Signin />
  );
};

export default PrivateRoute;
