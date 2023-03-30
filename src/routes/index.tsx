import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Component } from "react";
import axios from "axios";

import Home from "@/pages";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Profile from "@/pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "profile/:username",
    element: <Profile />,
  },
]);

axios.defaults.baseURL =
  "https://virtserver.swaggerhub.com/devanada/hells-kitchen/1.1.0";

class Router extends Component {
  render() {
    return <RouterProvider router={router} />;
  }
}

export default Router;
