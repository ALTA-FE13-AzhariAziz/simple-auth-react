import { FC, FormEvent, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import axios from "axios";

import { handleAuth } from "@/utils/redux/reducers/reducer";
import { useTitle } from "@/utils/hooks";
import { ThemeContext } from "@/utils/context";

interface ObjSubmitType {
  username: string;
  password: string;
}

const Login: FC = () => {
  const [objSubmit, setObjSubmit] = useState<ObjSubmitType>({
    username: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [, setCookie] = useCookies();

  const navigate = useNavigate();
  useTitle("Login | User Management");

  useEffect(() => {
    const isEmpty = Object.values(objSubmit).every((val) => val !== "");
    setIsDisabled(!isEmpty);
  }, [objSubmit]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsDisabled(true);

    axios
      .post("login", objSubmit)
      .then((response) => {
        const { data } = response;
        console.log(data);
        alert(data.message);
        setCookie("tkn", data.token);
        setCookie("uname", data.username);
        navigate("/");
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => setIsDisabled(false));
  }

  const { theme, setTheme } = useContext(ThemeContext);

  function handleTheme(mode: string) {
    console.log(mode);
    setTheme(mode);
  }

  return (
    <div className="bg-slate-200 dark:bg-slate-600 transition-all">
      <div className=" navbar absolute w-full">
        <div className=" flex-none items-end">
          <label className="opacity-100 swap swap-rotate dark:text-slate-200  items-end">
            <input
              onChange={() => handleTheme(theme === "dark" ? "light" : "dark")}
              className="invisible"
              type="checkbox"
            />
            <svg
              className="swap-on fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {theme === "dark" ? (
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              ) : (
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              )}
            </svg>
          </label>
        </div>
      </div>
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left text-slate-600 dark:text-slate-200">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6 ">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl ">
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className="card-body">
                <div className="form-control">
                  <label className="label ">
                    <span className="label-text text-slate-600 dark:text-slate-200">
                      Username
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered "
                    onChange={(event) =>
                      setObjSubmit({
                        ...objSubmit,
                        username: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-slate-600 dark:text-slate-200">
                      Password
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    onChange={(event) =>
                      setObjSubmit({
                        ...objSubmit,
                        password: event.target.value,
                      })
                    }
                  />
                  <label className=" mt-5 ml-2 text-slate-600 dark:text-slate-200 ">
                    Don't have a account? Register{" "}
                    <Link className="font-bold" to="/register">
                      here!
                    </Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isDisabled}
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
