import Main from "../layouts/Main";
import { createBrowserRouter } from "react-router-dom";
import { Create, Details, Edit, Home, Login, Register } from "../pages";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/notes/:id",
        element: <Details />,
      },
      {
        path: "/edit/:id",
        element: <Edit />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
