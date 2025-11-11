import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/AllProducts",
        element: <AllProducts></AllProducts>,
      },
    ],
  },
]);

export default router;
