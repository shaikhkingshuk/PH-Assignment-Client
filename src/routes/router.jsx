import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import ViewProperty from "../components/ViewProperty";
import AddProperty from "../components/AddProperty";

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
      {
        path: "/property/:propertyId",
        element: <ViewProperty></ViewProperty>,
      },
      {
        path: "/addProperty",
        element: <AddProperty></AddProperty>,
      },
    ],
  },
]);

export default router;
