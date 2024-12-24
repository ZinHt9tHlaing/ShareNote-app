import { createBrowserRouter } from "react-router-dom";

 const router = createBrowserRouter([
   {
     path: "/",
     element: "",
     children: [
       {
         index: true,
         element: "",
       },
       {
         path: "/create",
         element: "",
       },
       {
         path: "/edit/:id",
         element: "",
       },
     ],
   },
 ]);

 export default router