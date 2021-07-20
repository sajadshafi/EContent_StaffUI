import { Route, Redirect } from "react-router-dom";
import Swal from "sweetalert2";

const RedirectNow = (props) => {
  Swal.fire({
    title: "Oops!",
    text: "You are not authorized to visit this Page",
    icon: "error",
    confirmButtonColor: "#0e0eaf",
    confirmButtonText: "Ok",
  });
  return (
    <Redirect
      to={{
        pathname: "/",
        state: { from: props.location },
      }}
    />
  );
};
const PrivateRoute = ({
  component: Component,
  authenticated,
  IsCorrectRole,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true && IsCorrectRole ? (
          <Component {...props} />
        ) : (
          RedirectNow(props)
        )
      }
    />
  );
};

export default PrivateRoute;
