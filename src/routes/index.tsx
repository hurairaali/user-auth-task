import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";
import Home from "../pages/home";
import { useAuth } from "../provider/AuthProvider";

const Routes = () => {
  const { isAuthenticated } = useAuth();

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: isAuthenticated ? <Home /> : <Navigate to="/sign-in" />,
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/sign-in",
      element: !isAuthenticated ? <SignIn /> : <Navigate to="/" />,
    },
    {
      path: "/sign-up",
      element: !isAuthenticated ? <SignUp /> : <Navigate to="/" />,
    },
    {
      path: "*",
      element: <Navigate to="/sign-in" />,
    },
  ];

  const router = createBrowserRouter([
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
