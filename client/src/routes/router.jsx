import Main from "../layouts/Main";
import { createBrowserRouter } from "react-router-dom";
import { Create, Details, Edit, Home } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
    ],
  },
]);

export default router;
