import { FC, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import axios from "axios";

import { handleAuth } from "@/utils/redux/reducers/reducer";
import { useTitle } from "@/utils/hooks";

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

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-bordered"
                  onChange={(event) =>
                    setObjSubmit({ ...objSubmit, username: event.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  onChange={(event) =>
                    setObjSubmit({ ...objSubmit, password: event.target.value })
                  }
                />
                <label className=" mt-5 ml-2">
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
  );
};

export default Login;
