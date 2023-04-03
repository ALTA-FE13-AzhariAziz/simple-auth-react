import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { FC, useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import axios from "axios";

import Home from "@/pages";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Profile from "@/pages/Profile";
import { ThemeContext } from "@/utils/context";

import { handleAuth } from "@/utils/redux/reducers/reducer";
axios.defaults.baseURL =
  "https://virtserver.swaggerhub.com/devanada/hells-kitchen/1.1.0";

const Router: FC = () => {
  const [theme, setTheme] = useState<string>("light");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);
  // const token = localStorage.getItem("tkn")
  const [cookie] = useCookies(["tkn", "uname"]);
  // useDispatch untuk merubah nilai dari suatu state
  const dispatch = useDispatch();
  const checkToken = cookie.tkn;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: "/login",
      element: checkToken ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: checkToken ? <Navigate to="/" /> : <Register />,
    },
    {
      path: "profile/:username",
      element: <Profile />,
    },
  ]);

  useEffect(() => {
    if (cookie.tkn) {
      dispatch(handleAuth({ isLoggedIn: true, uname: cookie.uname }));
    } else {
      dispatch(handleAuth({ isLoggedIn: false, uname: "" }));
    }
  }, [cookie]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={background}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};

export default Router;
