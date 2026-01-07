import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import ViewProperty from "../components/ViewProperty";
import AddProperty from "../components/AddProperty";
import MyProperties from "../components/MyProperties";
import UpdateProperty from "../components/UpdateProperty";
import RatingsList from "../components/RatingsList";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../privateRoute/PrivateRoute";
import ErrorPage from "../components/ErrorPage";

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
        element: (
          <PrivateRoute>
            <ViewProperty></ViewProperty>
          </PrivateRoute>
        ),
      },
      {
        path: "/addProperty",
        element: (
          <PrivateRoute>
            <AddProperty></AddProperty>
          </PrivateRoute>
        ),
      },
      {
        path: "/myProperties",
        element: (
          <PrivateRoute>
            <MyProperties></MyProperties>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateProperty/:propertyId",
        element: (
          <PrivateRoute>
            <UpdateProperty></UpdateProperty>
          </PrivateRoute>
        ),
      },
      {
        path: "/myPropertyReviews",
        element: (
          <PrivateRoute>
            <RatingsList></RatingsList>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
